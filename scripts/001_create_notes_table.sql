-- Create notes table with metadata
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  file_path text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.notes enable row level security;

-- RLS Policies for notes table
create policy "Users can view their own notes"
  on public.notes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own notes"
  on public.notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own notes"
  on public.notes for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notes"
  on public.notes for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists notes_user_id_idx on public.notes(user_id);
create index if not exists notes_created_at_idx on public.notes(created_at desc);
