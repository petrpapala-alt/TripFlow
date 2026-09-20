-- TripFlow / Supabase schema
-- Run the whole file once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.tripflow_trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  version bigint not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tripflow_members (
  trip_id uuid not null references public.tripflow_trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'editor', 'viewer')),
  email text,
  created_at timestamptz not null default now(),
  primary key (trip_id, user_id)
);

create table if not exists public.tripflow_invitations (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.tripflow_trips(id) on delete cascade,
  token uuid not null unique default gen_random_uuid(),
  email text,
  role text not null check (role in ('editor', 'viewer')),
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '14 days'),
  accepted_at timestamptz,
  accepted_by uuid references auth.users(id) on delete set null
);

create table if not exists public.tripflow_stop_states (
  trip_id uuid not null references public.tripflow_trips(id) on delete cascade,
  stop_id text not null,
  done boolean not null default false,
  reserved boolean not null default false,
  updated_by uuid not null references auth.users(id) on delete cascade,
  updated_at timestamptz not null default now(),
  primary key (trip_id, stop_id)
);

create table if not exists public.tripflow_documents (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.tripflow_trips(id) on delete cascade,
  stop_id text,
  name text not null,
  storage_path text not null unique,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists tripflow_members_user_id_idx on public.tripflow_members(user_id);
create index if not exists tripflow_stop_states_trip_id_idx on public.tripflow_stop_states(trip_id);
create index if not exists tripflow_documents_trip_id_idx on public.tripflow_documents(trip_id);
create index if not exists tripflow_invitations_trip_id_idx on public.tripflow_invitations(trip_id);

-- SECURITY DEFINER is used only for membership lookups, with a fixed search path,
-- to avoid recursive RLS policies on trip_members.
create or replace function public.tripflow_is_member(p_trip_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.tripflow_members
    where trip_id = p_trip_id and user_id = (select auth.uid())
  );
$$;

create or replace function public.tripflow_can_edit(p_trip_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.tripflow_members
    where trip_id = p_trip_id
      and user_id = (select auth.uid())
      and role in ('owner', 'editor')
  );
$$;

create or replace function public.tripflow_is_owner(p_trip_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.tripflow_trips
    where id = p_trip_id and owner_id = (select auth.uid())
  );
$$;

revoke all on function public.tripflow_is_member(uuid) from public;
revoke all on function public.tripflow_can_edit(uuid) from public;
revoke all on function public.tripflow_is_owner(uuid) from public;
grant execute on function public.tripflow_is_member(uuid) to authenticated;
grant execute on function public.tripflow_can_edit(uuid) to authenticated;
grant execute on function public.tripflow_is_owner(uuid) to authenticated;

create or replace function public.tripflow_add_owner_membership()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.tripflow_members (trip_id, user_id, role, email)
  values (new.id, new.owner_id, 'owner', (select auth.jwt() ->> 'email'))
  on conflict (trip_id, user_id) do update set role = 'owner';
  return new;
end;
$$;

drop trigger if exists tripflow_add_owner_membership on public.tripflow_trips;
create trigger tripflow_add_owner_membership
after insert on public.tripflow_trips
for each row execute function public.tripflow_add_owner_membership();

create or replace function public.tripflow_protect_owner()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.owner_id <> old.owner_id then
    raise exception 'Trip owner cannot be changed';
  end if;
  return new;
end;
$$;

drop trigger if exists tripflow_protect_owner on public.tripflow_trips;
create trigger tripflow_protect_owner
before update on public.tripflow_trips
for each row execute function public.tripflow_protect_owner();

create or replace function public.tripflow_touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tripflow_touch_updated_at on public.tripflow_trips;
create trigger tripflow_touch_updated_at
before update on public.tripflow_trips
for each row execute function public.tripflow_touch_updated_at();

create or replace function public.tripflow_save_trip(
  p_trip_id uuid,
  p_data jsonb,
  p_expected_version bigint
)
returns table(new_version bigint, saved_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.tripflow_can_edit(p_trip_id) then
    raise exception 'trip_edit_forbidden' using errcode = '42501';
  end if;

  return query
    update public.tripflow_trips
      set data = p_data, version = version + 1
      where id = p_trip_id
        and version = p_expected_version
      returning version, updated_at;

  if not found then
    raise exception 'trip_conflict' using errcode = '40001';
  end if;
end;
$$;

-- Create trips through a trusted function. The owner id is always taken from
-- the authenticated JWT and can never be supplied by the browser.
create or replace function public.tripflow_create_trip(
  p_trip_id uuid,
  p_data jsonb
)
returns table(trip_id uuid, trip_data jsonb, trip_version bigint)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception 'authentication_required';
  end if;

  insert into public.tripflow_trips (id, owner_id, data)
  values (p_trip_id, current_user_id, p_data);

  insert into public.tripflow_members (trip_id, user_id, role, email)
  values (
    p_trip_id,
    current_user_id,
    'owner',
    nullif(lower(coalesce((select auth.jwt() ->> 'email'), '')), '')
  )
  on conflict on constraint tripflow_members_pkey do update
    set role = 'owner', email = coalesce(excluded.email, public.tripflow_members.email);

  return query
    select t.id, t.data, t.version
    from public.tripflow_trips t
    where t.id = p_trip_id and t.owner_id = current_user_id;
end;
$$;

create or replace function public.tripflow_accept_invitation(p_token uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  invitation public.tripflow_invitations%rowtype;
  current_email text;
begin
  if (select auth.uid()) is null then
    raise exception 'authentication_required';
  end if;

  select * into invitation
  from public.tripflow_invitations
  where token = p_token
    and accepted_at is null
    and expires_at > now()
  for update;

  if not found then
    raise exception 'invitation_invalid_or_expired';
  end if;

  current_email := lower(coalesce((select auth.jwt() ->> 'email'), ''));
  if invitation.email is not null
     and lower(invitation.email) <> current_email then
    raise exception 'invitation_email_mismatch';
  end if;

  insert into public.tripflow_members (trip_id, user_id, role, email)
  values (invitation.trip_id, (select auth.uid()), invitation.role, nullif(current_email, ''))
  on conflict (trip_id, user_id) do update
    set role = case
      when public.tripflow_members.role = 'owner' then 'owner'
      else excluded.role
    end,
    email = coalesce(excluded.email, public.tripflow_members.email);

  update public.tripflow_invitations
    set accepted_at = now(), accepted_by = (select auth.uid())
    where id = invitation.id;

  return invitation.trip_id;
end;
$$;

revoke all on function public.tripflow_save_trip(uuid, jsonb, bigint) from public;
revoke all on function public.tripflow_create_trip(uuid, jsonb) from public;
revoke all on function public.tripflow_accept_invitation(uuid) from public;
grant execute on function public.tripflow_save_trip(uuid, jsonb, bigint) to authenticated;
grant execute on function public.tripflow_create_trip(uuid, jsonb) to authenticated;
grant execute on function public.tripflow_accept_invitation(uuid) to authenticated;

alter table public.tripflow_trips enable row level security;
alter table public.tripflow_members enable row level security;
alter table public.tripflow_invitations enable row level security;
alter table public.tripflow_stop_states enable row level security;
alter table public.tripflow_documents enable row level security;

drop policy if exists trips_select_member on public.tripflow_trips;
create policy trips_select_member on public.tripflow_trips for select to authenticated
using (public.tripflow_is_member(id));
drop policy if exists trips_insert_owner on public.tripflow_trips;
create policy trips_insert_owner on public.tripflow_trips for insert to authenticated
with check ((select auth.uid()) = owner_id);
drop policy if exists trips_update_editor on public.tripflow_trips;
create policy trips_update_editor on public.tripflow_trips for update to authenticated
using (public.tripflow_can_edit(id)) with check (public.tripflow_can_edit(id));
drop policy if exists trips_delete_owner on public.tripflow_trips;
create policy trips_delete_owner on public.tripflow_trips for delete to authenticated
using (public.tripflow_is_owner(id));

drop policy if exists members_select_member on public.tripflow_members;
create policy members_select_member on public.tripflow_members for select to authenticated
using (user_id = (select auth.uid()) or public.tripflow_is_owner(trip_id));
drop policy if exists members_insert_owner on public.tripflow_members;
create policy members_insert_owner on public.tripflow_members for insert to authenticated
with check (public.tripflow_is_owner(trip_id) and role in ('editor', 'viewer'));
drop policy if exists members_update_owner on public.tripflow_members;
create policy members_update_owner on public.tripflow_members for update to authenticated
using (public.tripflow_is_owner(trip_id) and role <> 'owner')
with check (public.tripflow_is_owner(trip_id) and role in ('editor', 'viewer'));
drop policy if exists members_delete_owner on public.tripflow_members;
create policy members_delete_owner on public.tripflow_members for delete to authenticated
using (public.tripflow_is_owner(trip_id) and role <> 'owner');

drop policy if exists invitations_select_owner on public.tripflow_invitations;
create policy invitations_select_owner on public.tripflow_invitations for select to authenticated
using (public.tripflow_is_owner(trip_id));
drop policy if exists invitations_insert_owner on public.tripflow_invitations;
create policy invitations_insert_owner on public.tripflow_invitations for insert to authenticated
with check (public.tripflow_is_owner(trip_id) and created_by = (select auth.uid()));
drop policy if exists invitations_delete_owner on public.tripflow_invitations;
create policy invitations_delete_owner on public.tripflow_invitations for delete to authenticated
using (public.tripflow_is_owner(trip_id));

drop policy if exists stop_states_select_member on public.tripflow_stop_states;
create policy stop_states_select_member on public.tripflow_stop_states for select to authenticated
using (public.tripflow_is_member(trip_id));
drop policy if exists stop_states_insert_editor on public.tripflow_stop_states;
create policy stop_states_insert_editor on public.tripflow_stop_states for insert to authenticated
with check (public.tripflow_can_edit(trip_id) and updated_by = (select auth.uid()));
drop policy if exists stop_states_update_editor on public.tripflow_stop_states;
create policy stop_states_update_editor on public.tripflow_stop_states for update to authenticated
using (public.tripflow_can_edit(trip_id))
with check (public.tripflow_can_edit(trip_id) and updated_by = (select auth.uid()));
drop policy if exists stop_states_delete_editor on public.tripflow_stop_states;
create policy stop_states_delete_editor on public.tripflow_stop_states for delete to authenticated
using (public.tripflow_can_edit(trip_id));

drop policy if exists documents_select_member on public.tripflow_documents;
create policy documents_select_member on public.tripflow_documents for select to authenticated
using (public.tripflow_is_member(trip_id));
drop policy if exists documents_insert_editor on public.tripflow_documents;
create policy documents_insert_editor on public.tripflow_documents for insert to authenticated
with check (public.tripflow_can_edit(trip_id) and created_by = (select auth.uid()));
drop policy if exists documents_delete_editor on public.tripflow_documents;
create policy documents_delete_editor on public.tripflow_documents for delete to authenticated
using (public.tripflow_can_edit(trip_id));

revoke all on table public.tripflow_trips from anon;
revoke all on table public.tripflow_members from anon;
revoke all on table public.tripflow_invitations from anon;
revoke all on table public.tripflow_stop_states from anon;
revoke all on table public.tripflow_documents from anon;
revoke all on table public.tripflow_trips from authenticated;
revoke all on table public.tripflow_members from authenticated;
revoke all on table public.tripflow_invitations from authenticated;
revoke all on table public.tripflow_stop_states from authenticated;
revoke all on table public.tripflow_documents from authenticated;
grant select, insert, delete on public.tripflow_trips to authenticated;
grant select, insert, update, delete on public.tripflow_members to authenticated;
grant select, insert, delete on public.tripflow_invitations to authenticated;
grant select, insert, update, delete on public.tripflow_stop_states to authenticated;
grant select, insert, delete on public.tripflow_documents to authenticated;

-- Private documents bucket. Storage policies derive the trip id from the first
-- path segment: <trip-uuid>/<random-file-name>.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tripflow-documents',
  'tripflow-documents',
  false,
  20971520,
  array['application/pdf', 'image/*', 'text/plain', 'application/octet-stream']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists trip_documents_storage_select on storage.objects;
create policy trip_documents_storage_select on storage.objects for select to authenticated
using (
  bucket_id = 'tripflow-documents'
  and public.tripflow_is_member(((storage.foldername(name))[1])::uuid)
);
drop policy if exists trip_documents_storage_insert on storage.objects;
create policy trip_documents_storage_insert on storage.objects for insert to authenticated
with check (
  bucket_id = 'tripflow-documents'
  and public.tripflow_can_edit(((storage.foldername(name))[1])::uuid)
);
drop policy if exists trip_documents_storage_delete on storage.objects;
create policy trip_documents_storage_delete on storage.objects for delete to authenticated
using (
  bucket_id = 'tripflow-documents'
  and public.tripflow_can_edit(((storage.foldername(name))[1])::uuid)
);

-- Postgres Changes is sufficient for this small private app. Re-running is safe.
do $$
begin
  begin alter publication supabase_realtime add table public.tripflow_trips; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.tripflow_stop_states; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.tripflow_documents; exception when duplicate_object then null; end;
end $$;
