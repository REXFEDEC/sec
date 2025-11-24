-- Create storage bucket for note files
insert into storage.buckets (id, name, public)
values ('notes', 'notes', false)
on conflict (id) do nothing;

-- RLS Policies for storage bucket
create policy "Users can view their own note files"
  on storage.objects for select
  using (bucket_id = 'notes' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can upload their own note files"
  on storage.objects for insert
  with check (bucket_id = 'notes' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update their own note files"
  on storage.objects for update
  using (bucket_id = 'notes' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete their own note files"
  on storage.objects for delete
  using (bucket_id = 'notes' and auth.uid()::text = (storage.foldername(name))[1]);
