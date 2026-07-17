-- Persistencia segura del estado EduPlay para alumnos institucionales.
-- El student_id se obtiene exclusivamente de una sesión institucional válida.

create or replace function public.save_institution_student_progress(
  p_session_token text,
  p_progress_data jsonb,
  p_streak integer default 0,
  p_last_activity_date date default current_date
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_student_id uuid;
  v_progress public.institution_student_progress;
begin
  select s.id into v_student_id
  from public.institution_student_sessions ss
  join public.institution_students s on s.id=ss.student_id and s.status='active'
  join public.institutions i on i.id=s.institution_id and i.status='active'
  where ss.session_token=p_session_token
    and ss.expires_at > now()
    and (i.expires_at is null or i.expires_at >= current_date)
  limit 1;

  if v_student_id is null then
    raise exception 'Sesión institucional inválida o vencida' using errcode='42501';
  end if;

  update public.institution_student_progress
  set progress_data=coalesce(p_progress_data,'{}'::jsonb),
      streak=greatest(coalesce(p_streak,0),0),
      last_activity_date=coalesce(p_last_activity_date,current_date),
      updated_at=now()
  where student_id=v_student_id
  returning * into v_progress;

  if v_progress.id is null then
    insert into public.institution_student_progress (student_id,progress_data,streak,last_activity_date)
    values (v_student_id,coalesce(p_progress_data,'{}'::jsonb),greatest(coalesce(p_streak,0),0),coalesce(p_last_activity_date,current_date))
    returning * into v_progress;
  end if;

  return to_jsonb(v_progress);
end;
$$;

revoke all on function public.save_institution_student_progress(text,jsonb,integer,date) from public;
grant execute on function public.save_institution_student_progress(text,jsonb,integer,date) to anon, authenticated;
