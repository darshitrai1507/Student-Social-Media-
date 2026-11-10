-- ========================================================
-- StudentSphere: Supabase Cloud Database & Storage Setup
-- ========================================================
-- Run this in your Supabase Project:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project -> SQL Editor -> New Query
-- 3. Paste this entire script and click "Run"
-- ========================================================

-- 1. Create study_resources table
CREATE TABLE IF NOT EXISTS public.study_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  branch TEXT NOT NULL,
  semester TEXT NOT NULL,
  resource_type TEXT NOT NULL DEFAULT 'NOTE',
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_by_id TEXT,
  uploaded_by_name TEXT NOT NULL,
  uploaded_by_avatar TEXT,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.study_resources ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all study materials
CREATE POLICY "Allow public read access to study resources"
ON public.study_resources FOR SELECT
USING (true);

-- Allow authenticated users to upload study materials
CREATE POLICY "Allow authenticated users to insert study resources"
ON public.study_resources FOR INSERT
WITH CHECK (true);

-- Allow updates (e.g. download count increment)
CREATE POLICY "Allow update to download count"
ON public.study_resources FOR UPDATE
USING (true);

-- 2. Create Storage Bucket for study materials (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('study-resources', 'study-resources', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to files in study-resources bucket
CREATE POLICY "Public Access to study materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'study-resources');

-- Allow authenticated uploads to study-resources bucket
CREATE POLICY "Allow uploads to study-resources"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'study-resources');
