CREATE TABLE nom.d_iisda_services (
  iisda_service_id INTEGER NOT NULL,
  service_number INTEGER NOT NULL,
  name VARCHAR(1000) NOT NULL,
  description TEXT NOT NULL,
  read_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_discontinued BOOLEAN DEFAULT false NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  has_epayment BOOLEAN DEFAULT false NOT NULL,
  short_description VARCHAR(2000) NOT NULL,
  CONSTRAINT d_iisda_services_pkey PRIMARY KEY(iisda_service_id),
  CONSTRAINT d_iisda_services_cb_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_iisda_services_ub_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE nom.d_iisda_services
IS 'Данни на услуги, синхронизирани от ИИСДА';

COMMENT ON COLUMN nom.d_iisda_services.iisda_service_id
IS 'Номер на описанието на услугата в ИИСДА';

COMMENT ON COLUMN nom.d_iisda_services.service_number
IS 'Номер на услугата в ИИСДА';

COMMENT ON COLUMN nom.d_iisda_services.name
IS 'Наименование на услугата';

COMMENT ON COLUMN nom.d_iisda_services.description
IS 'HTML описание на услугата';

COMMENT ON COLUMN nom.d_iisda_services.read_date
IS 'Дата на прочитане на услугата от ИИСДА';

COMMENT ON COLUMN nom.d_iisda_services.is_discontinued
IS 'Флаг дали услугата вече не се предоставя от администрацията';

COMMENT ON COLUMN nom.d_iisda_services.created_by
IS 'Уникален идентификатор на потребител, създал записа';

COMMENT ON COLUMN nom.d_iisda_services.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN nom.d_iisda_services.updated_by
IS 'Уникален идентификатор на потребител, направил последна промяна на записа';

COMMENT ON COLUMN nom.d_iisda_services.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN nom.d_iisda_services.has_epayment
IS 'Флаг, дали услугата се плаща по елекронен път.';

COMMENT ON COLUMN nom.d_iisda_services.short_description
IS 'Кратко описание на услуга';

COMMENT ON CONSTRAINT d_iisda_services_cb_fk ON nom.d_iisda_services
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT d_iisda_services_ub_fk ON nom.d_iisda_services
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

COMMENT ON CONSTRAINT d_iisda_services_pkey ON nom.d_iisda_services
IS 'Уникален идентификатор на данни за услуги.';

CREATE TRIGGER trg_d_iisda_services_ais
  AFTER INSERT 
  ON nom.d_iisda_services
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_iisda_services_trg();

CREATE TRIGGER trg_d_iisda_services_aur
  AFTER UPDATE 
  ON nom.d_iisda_services
  
FOR EACH ROW 
  WHEN (old.name::text IS DISTINCT FROM new.name::text OR old.description IS DISTINCT FROM new.description OR old.is_discontinued IS DISTINCT FROM new.is_discontinued OR old.has_epayment IS DISTINCT FROM new.has_epayment OR old.short_description::text IS DISTINCT FROM new.short_description::text)
EXECUTE PROCEDURE nom.f_d_iisda_services_trg();