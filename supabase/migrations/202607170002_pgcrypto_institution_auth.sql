-- Corrige las RPC institucionales para pgcrypto fuera de public.
-- Idempotente y compatible con RLS: las operaciones se realizan únicamente
-- dentro de funciones SECURITY DEFINER con search_path vacío.

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
alter extension pgcrypto set schema extensions;

-- Elimina las versiones existentes sin depender del orden anterior de parámetros.
do $$
declare
  v_function regprocedure;
begin
  for v_function in
    select p.oid::regprocedure
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in (
        'validate_institution_code',
        'register_institution_student',
        'login_institution_student',
        'get_institution_student_progress',
        'logout_institution_student'
      )
  loop
    execute format('drop function %s', v_function);
  end loop;
end;
$$;

create function public.validate_institution_code(p_access_code text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_institution public.institutions;
begin
  select * into v_institution
  from public.institutions
  where upper(access_code) = upper(trim(p_access_code))
    and status = 'active'
    and (expires_at is null or expires_at >= current_date)
  limit 1;

  if v_institution.id is null then return null; end if;
  return jsonb_build_object(
    'id', v_institution.id,
    'name', v_institution.name,
    'access_code', v_institution.access_code,
    'student_limit', v_institution.student_limit,
    'expires_at', v_institution.expires_at,
    'status', v_institution.status
  );
end;
$$;

create function public.register_institution_student(
  p_access_code text,
  p_avatar text,
  p_full_name text,
  p_grade integer,
  p_pin text,
  p_student_code text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_institution public.institutions;
  v_student public.institution_students;
  v_token text;
begin
  if length(trim(p_pin)) < 4 then raise exception 'El PIN debe tener al menos 4 dígitos'; end if;

  select * into v_institution
  from public.institutions
  where upper(access_code) = upper(trim(p_access_code))
    and status = 'active'
    and (expires_at is null or expires_at >= current_date)
  for update;

  if v_institution.id is null then raise exception 'Código institucional inválido o vencido'; end if;
  if (select count(*) from public.institution_students where institution_id=v_institution.id) >= v_institution.student_limit then
    raise exception 'La institución ya no tiene cupos disponibles';
  end if;
  if exists (select 1 from public.institution_students where institution_id=v_institution.id and upper(student_code)=upper(trim(p_student_code))) then
    raise exception 'El código del alumno ya está registrado';
  end if;

  insert into public.institution_students (institution_id, full_name, student_code, pin, grade, avatar, status)
  values (
    v_institution.id,
    trim(p_full_name),
    upper(trim(p_student_code)),
    extensions.crypt(p_pin, extensions.gen_salt('bf')),
    p_grade,
    p_avatar,
    'active'
  )
  returning * into v_student;

  insert into public.institution_student_progress (student_id, streak, progress_data, last_activity_date)
  values (v_student.id, 0, '{}'::jsonb, current_date);

  v_token := encode(extensions.gen_random_bytes(32), 'hex');
  insert into public.institution_student_sessions (student_id, session_token, expires_at)
  values (v_student.id, v_token, now() + interval '12 hours');

  return jsonb_build_object(
    'session_token', v_token,
    'student_id', v_student.id,
    'full_name', v_student.full_name,
    'student_code', v_student.student_code,
    'grade', v_student.grade,
    'avatar', v_student.avatar,
    'status', v_student.status
  );
end;
$$;

create function public.login_institution_student(
  p_access_code text,
  p_pin text,
  p_student_code text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_student public.institution_students;
  v_token text;
begin
  select s.* into v_student
  from public.institution_students s
  join public.institutions i on i.id=s.institution_id
  where upper(i.access_code)=upper(trim(p_access_code))
    and i.status='active'
    and (i.expires_at is null or i.expires_at >= current_date)
    and upper(s.student_code)=upper(trim(p_student_code))
    and s.status='active'
    and s.pin = extensions.crypt(p_pin, s.pin)
  limit 1;

  if v_student.id is null then raise exception 'Código de alumno o PIN incorrecto'; end if;

  delete from public.institution_student_sessions
  where student_id=v_student.id and expires_at <= now();

  v_token := encode(extensions.gen_random_bytes(32), 'hex');
  insert into public.institution_student_sessions (student_id, session_token, expires_at)
  values (v_student.id, v_token, now() + interval '12 hours');

  return jsonb_build_object(
    'session_token', v_token,
    'student_id', v_student.id,
    'full_name', v_student.full_name,
    'student_code', v_student.student_code,
    'grade', v_student.grade,
    'avatar', v_student.avatar,
    'status', v_student.status
  );
end;
$$;

create function public.get_institution_student_progress(p_session_token text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_result jsonb;
begin
  select jsonb_build_object(
    'student_id', s.id,
    'full_name', s.full_name,
    'student_code', s.student_code,
    'grade', s.grade,
    'avatar', s.avatar,
    'status', s.status,
    'streak', coalesce(p.streak, 0),
    'progress_data', coalesce(p.progress_data, '{}'::jsonb),
    'last_activity_date', p.last_activity_date,
    'updated_at', p.updated_at
  ) into v_result
  from public.institution_student_sessions ss
  join public.institution_students s on s.id=ss.student_id and s.status='active'
  join public.institutions i on i.id=s.institution_id and i.status='active'
  left join public.institution_student_progress p on p.student_id=s.id
  where ss.session_token=p_session_token
    and ss.expires_at > now()
    and (i.expires_at is null or i.expires_at >= current_date)
  limit 1;
  return v_result;
end;
$$;

create function public.logout_institution_student(p_session_token text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.institution_student_sessions where session_token=p_session_token;
  return found;
end;
$$;

revoke all on function public.validate_institution_code(text) from public;
revoke all on function public.register_institution_student(text,text,text,integer,text,text) from public;
revoke all on function public.login_institution_student(text,text,text) from public;
revoke all on function public.get_institution_student_progress(text) from public;
revoke all on function public.logout_institution_student(text) from public;

grant execute on function public.validate_institution_code(text) to anon, authenticated;
grant execute on function public.register_institution_student(text,text,text,integer,text,text) to anon, authenticated;
grant execute on function public.login_institution_student(text,text,text) to anon, authenticated;
grant execute on function public.get_institution_student_progress(text) to anon, authenticated;
grant execute on function public.logout_institution_student(text) to anon, authenticated;
