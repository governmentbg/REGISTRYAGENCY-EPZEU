CREATE TABLE nom.d_services_i18n (
  service_id INTEGER NOT NULL,
  language_id INTEGER NOT NULL,
  name VARCHAR(1000) NOT NULL,
  description TEXT NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  short_description VARCHAR(2000) NOT NULL,
  CONSTRAINT d_iisda_services_i18n_pkey PRIMARY KEY(service_id, language_id),
  CONSTRAINT d_iisda_services_i18n_cb_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_iisda_services_i18n_ub_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_d_iisda_services_i18n_d_languages FOREIGN KEY (language_id)
    REFERENCES nom.d_languages(language_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_d_iisda_services_i18n_iisdasid FOREIGN KEY (service_id)
    REFERENCES nom.d_services(service_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE nom.d_services_i18n
IS 'Превод на услуги';

COMMENT ON COLUMN nom.d_services_i18n.service_id
IS 'Номер на описанието на услугата в ИИСДА';

COMMENT ON COLUMN nom.d_services_i18n.language_id
IS 'Идентификатор на езика, за който е превода на услугата';

COMMENT ON COLUMN nom.d_services_i18n.name
IS 'Наименование на услугата';

COMMENT ON COLUMN nom.d_services_i18n.description
IS 'HTML описание на услугата';

COMMENT ON COLUMN nom.d_services_i18n.created_by
IS 'Уникален идентификатор на потребител, създал записа';

COMMENT ON COLUMN nom.d_services_i18n.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN nom.d_services_i18n.updated_by
IS 'Уникален идентификатор на потребител, направил последна промяна на записа';

COMMENT ON COLUMN nom.d_services_i18n.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN nom.d_services_i18n.short_description
IS 'Кратко описание на услуга';

CREATE TRIGGER d_services_i18n_tr
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_services_i18n
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_services_i18n_trg();

ALTER TABLE nom.d_services_i18n
  OWNER TO epzeu_dev;