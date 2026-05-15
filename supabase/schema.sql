create extension if not exists pgcrypto;

create table if not exists calculator_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  submitted_at timestamptz,
  email text,
  dog_name text,
  dog_gender text,
  calculator_type text not null,
  input_data jsonb,
  result_data jsonb not null,
  source_page text,
  source_component text,
  marketing_consent boolean default false,
  analytics_consent boolean default false,
  privacy_accepted boolean default false,
  terms_accepted boolean default false,
  result_email_consent boolean default false,
  consent_text text,
  marketing_consent_text text,
  consent_version text,
  consent_method text,
  privacy_url text,
  terms_url text,
  user_agent text,
  ip_address text,
  brevo_marketing_synced boolean default false,
  brevo_marketing_error text,
  result_email_sent boolean default false,
  result_email_error text,
  public_token uuid default gen_random_uuid()
);

alter table calculator_results
  add column if not exists email text,
  add column if not exists dog_name text,
  add column if not exists dog_gender text,
  add column if not exists source_page text,
  add column if not exists source_component text,
  add column if not exists marketing_consent boolean default false,
  add column if not exists analytics_consent boolean default false,
  add column if not exists submitted_at timestamptz,
  add column if not exists privacy_accepted boolean default false,
  add column if not exists terms_accepted boolean default false,
  add column if not exists result_email_consent boolean default false,
  add column if not exists consent_text text,
  add column if not exists marketing_consent_text text,
  add column if not exists consent_version text,
  add column if not exists consent_method text,
  add column if not exists privacy_url text,
  add column if not exists terms_url text,
  add column if not exists user_agent text,
  add column if not exists ip_address text,
  add column if not exists brevo_marketing_synced boolean default false,
  add column if not exists brevo_marketing_error text,
  add column if not exists result_email_sent boolean default false,
  add column if not exists result_email_error text,
  add column if not exists public_token uuid default gen_random_uuid();

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  submitted_at timestamptz,
  email text not null,
  source_page text,
  source_component text,
  interests text[],
  marketing_consent boolean default false,
  analytics_consent boolean default false,
  privacy_accepted boolean default false,
  terms_accepted boolean default false,
  consent_text text,
  consent_version text,
  consent_method text,
  privacy_url text,
  terms_url text,
  user_agent text,
  ip_address text,
  brevo_synced boolean default false,
  brevo_sync_error text
);

alter table newsletter_signups
  add column if not exists email text,
  add column if not exists source_page text,
  add column if not exists source_component text,
  add column if not exists interests text[],
  add column if not exists marketing_consent boolean default false,
  add column if not exists analytics_consent boolean default false,
  add column if not exists submitted_at timestamptz,
  add column if not exists privacy_accepted boolean default false,
  add column if not exists terms_accepted boolean default false,
  add column if not exists consent_text text,
  add column if not exists consent_version text,
  add column if not exists consent_method text,
  add column if not exists privacy_url text,
  add column if not exists terms_url text,
  add column if not exists user_agent text,
  add column if not exists ip_address text,
  add column if not exists brevo_synced boolean default false,
  add column if not exists brevo_sync_error text;

create table if not exists consent_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  submitted_at timestamptz,
  email text,
  source_page text,
  source_component text,
  analytics_consent boolean default false,
  marketing_consent boolean default false,
  privacy_accepted boolean default false,
  terms_accepted boolean default false,
  result_email_consent boolean default false,
  consent_text text,
  marketing_consent_text text,
  consent_version text,
  consent_method text,
  privacy_url text,
  terms_url text,
  user_agent text,
  ip_address text
);

alter table consent_events
  add column if not exists email text,
  add column if not exists source_page text,
  add column if not exists source_component text,
  add column if not exists analytics_consent boolean default false,
  add column if not exists marketing_consent boolean default false,
  add column if not exists submitted_at timestamptz,
  add column if not exists privacy_accepted boolean default false,
  add column if not exists terms_accepted boolean default false,
  add column if not exists result_email_consent boolean default false,
  add column if not exists consent_text text,
  add column if not exists marketing_consent_text text,
  add column if not exists consent_version text,
  add column if not exists consent_method text,
  add column if not exists privacy_url text,
  add column if not exists terms_url text,
  add column if not exists user_agent text,
  add column if not exists ip_address text;

create index if not exists calculator_results_email_idx
  on calculator_results (email);

create index if not exists calculator_results_calculator_type_idx
  on calculator_results (calculator_type);

create unique index if not exists calculator_results_public_token_idx
  on calculator_results (public_token);

create index if not exists calculator_results_created_at_idx
  on calculator_results (created_at desc);

create index if not exists newsletter_signups_email_idx
  on newsletter_signups (email);

create index if not exists newsletter_signups_created_at_idx
  on newsletter_signups (created_at desc);

create index if not exists consent_events_email_idx
  on consent_events (email);

create index if not exists consent_events_created_at_idx
  on consent_events (created_at desc);
