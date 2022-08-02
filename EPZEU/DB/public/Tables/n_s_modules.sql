CREATE TABLE public.n_s_modules (
  module_id SMALLINT NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT n_s_modules_pkey PRIMARY KEY(module_id)
) 
WITH (oids = false);

COMMENT ON TABLE public.n_s_modules
IS 'Портали/Системи';

COMMENT ON COLUMN public.n_s_modules.module_id
IS 'Идентификатор на портал/система.';

COMMENT ON COLUMN public.n_s_modules.name
IS 'Име.';

COMMENT ON COLUMN public.n_s_modules.description
IS 'Описание.';

COMMENT ON COLUMN public.n_s_modules.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN public.n_s_modules.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN public.n_s_modules.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN public.n_s_modules.updated_on
IS 'Дата и час на редакцията.';
