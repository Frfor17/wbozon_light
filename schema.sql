CREATE TABLE public.name (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.second_name (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  something text,
  CONSTRAINT second_name_name_id_fkey FOREIGN KEY (name_id) REFERENCES public.name(id)
);