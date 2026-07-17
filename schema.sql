-- ============================================================
-- منصة حجز الأطباء - هيكلة قاعدة البيانات الكاملة (Supabase/Postgres)
-- ============================================================

-- تفعيل الإضافات المطلوبة
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. المستخدمين (الجدول المشترك - يعتمد على auth.users من Supabase)
-- ============================================================
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null check (role in ('doctor', 'patient', 'admin')),
  created_at timestamptz default now()
);

-- ============================================================
-- 2. التخصصات (هرمية - رئيسي وفرعي)
-- ============================================================
create table public.specialties (
  id uuid primary key default uuid_generate_v4(),
  name_ar text not null,
  name_en text,
  parent_id uuid references public.specialties(id) on delete set null,
  icon text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- 3. الأطباء
-- ============================================================
create table public.doctors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,

  -- بيانات شخصية
  full_name text not null,
  photo_url text,
  bio text,
  years_experience int,

  -- بيانات مهنية
  specialty_id uuid references public.specialties(id),
  license_number text not null,
  license_photo_url text,
  license_verified boolean default false,

  -- بيانات العيادة
  clinic_name text,
  address text,
  city text,
  clinic_photos text[], -- مصفوفة روابط صور
  consultation_fee numeric(10,2),
  available_days text[], -- ['sunday','monday',...]
  available_hours jsonb, -- {"sunday": {"from":"09:00","to":"17:00"}, ...}

  -- بيانات السكرتير (علاقة واحد لواحد)
  secretary_name text,
  secretary_phone text,
  secretary_telegram_chat_id text,
  secretary_link_code text unique, -- كود الربط المؤقت مع البوت

  -- الاشتراك
  subscription_tier text default 'basic' check (subscription_tier in ('basic', 'trusted')),
  subscription_status text default 'trial' check (subscription_status in ('trial', 'active', 'expired')),
  subscription_start_date timestamptz,
  trial_ends_at timestamptz default (now() + interval '14 days'),

  -- حالة الموافقة
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_reason text,

  rating_avg numeric(3,2) default 0,
  rating_count int default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_doctors_specialty on public.doctors(specialty_id);
create index idx_doctors_status on public.doctors(status);
create index idx_doctors_city on public.doctors(city);

-- ============================================================
-- 4. المرضى
-- ============================================================
create table public.patients (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  full_name text not null,
  phone text,
  telegram_chat_id text,
  telegram_link_code text unique,
  date_of_birth date,
  gender text check (gender in ('male', 'female')),
  created_at timestamptz default now()
);

-- ============================================================
-- 5. المواعيد
-- ============================================================
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid references public.doctors(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,

  requested_time timestamptz not null,
  confirmed_time timestamptz,

  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  is_urgent boolean default false,

  notes text,
  cancellation_reason text,

  reminder_24h_sent boolean default false,
  reminder_2h_sent boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_appointments_doctor on public.appointments(doctor_id);
create index idx_appointments_patient on public.appointments(patient_id);
create index idx_appointments_status on public.appointments(status);
create index idx_appointments_time on public.appointments(confirmed_time);

-- ============================================================
-- 6. قائمة الانتظار
-- ============================================================
create table public.waitlist (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid references public.doctors(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,
  preferred_time_range tstzrange,
  status text default 'waiting' check (status in ('waiting', 'notified', 'expired', 'booked')),
  created_at timestamptz default now()
);

-- ============================================================
-- 7. الإحالات بين الأطباء
-- ============================================================
create table public.referrals (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references public.patients(id) on delete cascade,
  from_doctor_id uuid references public.doctors(id) on delete cascade,
  to_specialty_id uuid references public.specialties(id),
  to_doctor_id uuid references public.doctors(id),
  reason text,
  status text default 'pending' check (status in ('pending', 'accepted', 'completed', 'declined')),
  created_at timestamptz default now()
);

-- ============================================================
-- 8. البحث بالأعراض
-- ============================================================
create table public.symptoms_mapping (
  id uuid primary key default uuid_generate_v4(),
  symptom_ar text not null,
  specialty_id uuid references public.specialties(id),
  gender_specific text check (gender_specific in ('male', 'female', null))
);

-- ============================================================
-- 9. التقييمات
-- ============================================================
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid references public.doctors(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,
  appointment_id uuid references public.appointments(id),
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- ============================================================
-- 10. الاشتراكات / الفوترة
-- ============================================================
create table public.subscription_payments (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid references public.doctors(id) on delete cascade,
  tier text check (tier in ('basic', 'trusted')),
  amount numeric(10,2),
  payment_method text default 'mastercard',
  status text default 'pending' check (status in ('pending', 'completed', 'failed')),
  period_start timestamptz,
  period_end timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.users enable row level security;
alter table public.doctors enable row level security;
alter table public.patients enable row level security;
alter table public.appointments enable row level security;
alter table public.reviews enable row level security;

-- المستخدم يشوف بس صفه
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

-- أي شخص (حتى زائر) يشوف الأطباء الموافق عليهم
create policy "doctors_public_read" on public.doctors
  for select using (status = 'approved');

-- الدكتور يعدل بياناته فقط
create policy "doctors_update_own" on public.doctors
  for update using (auth.uid() = user_id);

-- المريض يشوف ويعدل بياناته فقط
create policy "patients_own_data" on public.patients
  for all using (auth.uid() = user_id);

-- الدكتور يشوف مواعيده، المريض يشوف مواعيده
create policy "appointments_doctor_access" on public.appointments
  for select using (
    doctor_id in (select id from public.doctors where user_id = auth.uid())
  );

create policy "appointments_patient_access" on public.appointments
  for select using (
    patient_id in (select id from public.patients where user_id = auth.uid())
  );

-- أي شخص يقرأ التقييمات
create policy "reviews_public_read" on public.reviews
  for select using (true);

-- ============================================================
-- بيانات أولية: التخصصات
-- ============================================================
insert into public.specialties (name_ar, name_en, parent_id, sort_order) values
('الباطنية', 'Internal Medicine', null, 1),
('الجراحة', 'Surgery', null, 2),
('النسائية والتوليد', 'Obstetrics & Gynecology', null, 3),
('الأطفال', 'Pediatrics', null, 4),
('الأسنان', 'Dentistry', null, 5),
('العيون', 'Ophthalmology', null, 6),
('أنف وأذن وحنجرة', 'ENT', null, 7),
('الجلدية', 'Dermatology', null, 8),
('النفسية والعصبية', 'Psychiatry & Neurology', null, 9),
('تخصصات أخرى', 'Other', null, 10);
