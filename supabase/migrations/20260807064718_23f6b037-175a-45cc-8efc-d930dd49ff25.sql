CREATE TABLE public.enquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  mobile text NOT NULL,
  email text,
  topic text NOT NULL,
  preferred_day text,
  message text,
  source_page text NOT NULL,
  source_variant text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  consent boolean NOT NULL DEFAULT false
);

GRANT INSERT ON public.enquiries TO anon;
GRANT INSERT ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);