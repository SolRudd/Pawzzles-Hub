create extension if not exists pgcrypto;

create table if not exists calculator_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text,
  dog_name text,
  calculator_type text not null,
  input_data jsonb,
  result_data jsonb not null,
  source_page text,
  source_component text,
  marketing_consent boolean default false,
  analytics_consent boolean default false,
  public_token uuid default gen_random_uuid()
);

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text not null,
  source_page text,
  source_component text,
  interests text[],
  marketing_consent boolean default false,
  analytics_consent boolean default false
);

create table if not exists consent_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text,
  source_page text,
  source_component text,
  analytics_consent boolean default false,
  marketing_consent boolean default false,
  consent_text text,
  consent_version text
);

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
