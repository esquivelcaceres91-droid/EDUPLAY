-- Administración institucional segura para el panel /admin.
-- Idempotente: puede ejecutarse más de una vez.

alter table public.institutions
  add column if not exists notes text;

create or replace function public.assert_eduplay_admin()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  if v_email <> 'esquivelcaceres91@gmail.com'
     and not exists (
       select 1
       from public.admin_users au
       where au.user_id = v_user_id
          or lower(coalesce(au.email, '')) = v_email
     ) then
    raise exception 'ADMIN_REQUIRED' using errcode = '42501';
  end if;
end;
$$;

revoke all on function public.assert_eduplay_admin() from public, anon, authenticated;

create or replace function public.admin_list_institutions()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare v_result jsonb;
begin
  perform public.assert_eduplay_admin();
  select coalesce(jsonb_agg(to_jsonb(x) order by x.created_at desc), '[]'::jsonb)
    into v_result
  from (
    select i.id, i.name, i.access_code, i.student_limit, i.expires_at,
           i.status, i.notes, i.created_at, i.updated_at,
           count(s.id)::integer as registered_students
    from public.institutions i
    left join public.institution_students s on s.institution_id = i.id
    group by i.id
  ) x;
  return v_result;
end;
$$;

create or replace function public.admin_create_institution(
  p_name text, p_access_code text, p_student_limit integer,
  p_expires_at date, p_status text, p_notes text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare v_row public.institutions;
begin
  perform public.assert_eduplay_admin();
  if nullif(trim(p_name), '') is null or nullif(trim(p_access_code), '') is null then
    raise exception 'Nombre y código son obligatorios';
  end if;
  if p_student_limit < 1 then raise exception 'La cantidad de alumnos debe ser mayor que cero'; end if;
  if p_status not in ('active','suspended','expired') then raise exception 'Estado institucional inválido'; end if;
  insert into public.institutions (name, access_code, student_limit, expires_at, status, notes)
  values (trim(p_name), upper(trim(p_access_code)), p_student_limit, p_expires_at, p_status, nullif(trim(p_notes), ''))
  returning * into v_row;
  return to_jsonb(v_row);
end;
$$;

create or replace function public.admin_update_institution(
  p_id uuid, p_name text, p_access_code text, p_student_limit integer,
  p_expires_at date, p_status text, p_notes text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare v_row public.institutions;
begin
  perform public.assert_eduplay_admin();
  if p_status not in ('active','suspended','expired') then raise exception 'Estado institucional inválido'; end if;
  update public.institutions set name=trim(p_name), access_code=upper(trim(p_access_code)),
    student_limit=p_student_limit, expires_at=p_expires_at, status=p_status,
    notes=nullif(trim(p_notes), ''), updated_at=now()
  where id=p_id returning * into v_row;
  if v_row.id is null then raise exception 'Institución no encontrada'; end if;
  return to_jsonb(v_row);
end;
$$;

create or replace function public.admin_set_institution_status(p_id uuid, p_status text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.assert_eduplay_admin();
  if p_status not in ('active','suspended','expired') then raise exception 'Estado institucional inválido'; end if;
  update public.institutions set status=p_status, updated_at=now() where id=p_id;
  if not found then raise exception 'Institución no encontrada'; end if;
  return true;
end;
$$;

create or replace function public.admin_delete_institution(p_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.assert_eduplay_admin();
  delete from public.institution_student_sessions where student_id in (select id from public.institution_students where institution_id=p_id);
  delete from public.institution_student_progress where student_id in (select id from public.institution_students where institution_id=p_id);
  delete from public.institution_students where institution_id=p_id;
  delete from public.institutions where id=p_id;
  if not found then raise exception 'Institución no encontrada'; end if;
  return true;
end;
$$;

create or replace function public.admin_list_institution_students(p_institution_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare v_result jsonb;
begin
  perform public.assert_eduplay_admin();
  select coalesce(jsonb_agg(to_jsonb(s) order by s.full_name), '[]'::jsonb)
    into v_result
  from (
    select id, institution_id, full_name, student_code, grade, avatar, status, created_at, updated_at
    from public.institution_students where institution_id=p_institution_id
  ) s;
  return v_result;
end;
$$;

create or replace function public.admin_update_institution_student(
  p_id uuid, p_full_name text, p_student_code text,
  p_grade integer, p_avatar text, p_status text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare v_row public.institution_students;
begin
  perform public.assert_eduplay_admin();
  if p_status not in ('active','inactive') then raise exception 'Estado del alumno inválido'; end if;
  update public.institution_students set full_name=trim(p_full_name), student_code=upper(trim(p_student_code)),
    grade=p_grade, avatar=p_avatar, status=p_status, updated_at=now()
  where id=p_id returning * into v_row;
  if v_row.id is null then raise exception 'Alumno no encontrado'; end if;
  return to_jsonb(v_row);
end;
$$;

create or replace function public.admin_set_institution_student_status(p_id uuid, p_status text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.assert_eduplay_admin();
  if p_status not in ('active','inactive') then raise exception 'Estado del alumno inválido'; end if;
  update public.institution_students set status=p_status, updated_at=now() where id=p_id;
  if not found then raise exception 'Alumno no encontrado'; end if;
  return true;
end;
$$;

create or replace function public.admin_delete_institution_student(p_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.assert_eduplay_admin();
  delete from public.institution_student_sessions where student_id=p_id;
  delete from public.institution_student_progress where student_id=p_id;
  delete from public.institution_students where id=p_id;
  if not found then raise exception 'Alumno no encontrado'; end if;
  return true;
end;
$$;

revoke all on function public.admin_list_institutions() from public, anon;
revoke all on function public.admin_create_institution(text,text,integer,date,text,text) from public, anon;
revoke all on function public.admin_update_institution(uuid,text,text,integer,date,text,text) from public, anon;
revoke all on function public.admin_set_institution_status(uuid,text) from public, anon;
revoke all on function public.admin_delete_institution(uuid) from public, anon;
revoke all on function public.admin_list_institution_students(uuid) from public, anon;
revoke all on function public.admin_update_institution_student(uuid,text,text,integer,text,text) from public, anon;
revoke all on function public.admin_set_institution_student_status(uuid,text) from public, anon;
revoke all on function public.admin_delete_institution_student(uuid) from public, anon;

grant execute on function public.admin_list_institutions() to authenticated;
grant execute on function public.admin_create_institution(text,text,integer,date,text,text) to authenticated;
grant execute on function public.admin_update_institution(uuid,text,text,integer,date,text,text) to authenticated;
grant execute on function public.admin_set_institution_status(uuid,text) to authenticated;
grant execute on function public.admin_delete_institution(uuid) to authenticated;
grant execute on function public.admin_list_institution_students(uuid) to authenticated;
grant execute on function public.admin_update_institution_student(uuid,text,text,integer,text,text) to authenticated;
grant execute on function public.admin_set_institution_student_status(uuid,text) to authenticated;
grant execute on function public.admin_delete_institution_student(uuid) to authenticated;
