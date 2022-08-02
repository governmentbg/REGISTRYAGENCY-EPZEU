CREATE TABLE eml.n_s_email_templates (
  template_id INTEGER NOT NULL,
  subject VARCHAR(2000) NOT NULL,
  body TEXT NOT NULL,
  is_body_html BOOLEAN,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT n_s_email_template_pkey PRIMARY KEY(template_id)
) 
WITH (oids = false);

COMMENT ON COLUMN eml.n_s_email_templates.template_id
IS 'Идентификатор на шаблон на имейл съобщение.';

COMMENT ON COLUMN eml.n_s_email_templates.subject
IS 'Тема на съобщението.';

COMMENT ON COLUMN eml.n_s_email_templates.body
IS 'Тяло на съобщението.';

COMMENT ON COLUMN eml.n_s_email_templates.is_body_html
IS 'Флаг, указващ дали съдържанието е HTML.';

COMMENT ON COLUMN eml.n_s_email_templates.created_by
IS 'Идентификатор на потребителя,създал записа.';

COMMENT ON COLUMN eml.n_s_email_templates.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN eml.n_s_email_templates.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN eml.n_s_email_templates.updated_on
IS 'Дата и час на редакцията.';

CREATE TRIGGER n_s_email_templates_buffer_notify_changes
  AFTER INSERT OR UPDATE OR DELETE 
  ON eml.n_s_email_templates
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE eml.buffer_notify_n_s_email_templates();