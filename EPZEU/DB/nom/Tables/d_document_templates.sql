CREATE TABLE nom.d_document_templates (
  doc_template_id INTEGER DEFAULT nextval('nom.seq_d_document_templates'::text::regclass) NOT NULL,
  doc_template_ver_id INTEGER NOT NULL,
  document_type_id VARCHAR(10) NOT NULL,
  content TEXT,
  is_last BIT(1) NOT NULL,
  deactivation_ver_id INTEGER,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT d_document_templates_pkey PRIMARY KEY(doc_template_id, doc_template_ver_id)
)
WITH (oids = false);

COMMENT ON TABLE nom.d_document_templates
IS 'Шаблони за документи';

COMMENT ON COLUMN nom.d_document_templates.doc_template_id
IS 'Уникален идентификатор на запис за шаблон на документ';

COMMENT ON COLUMN nom.d_document_templates.doc_template_ver_id
IS 'Уникален идентификатор на версия на шаблон за документ';

COMMENT ON COLUMN nom.d_document_templates.document_type_id
IS 'Идентификатор на вид документ';

COMMENT ON COLUMN nom.d_document_templates.content
IS 'Съдържание на шаблон';

COMMENT ON COLUMN nom.d_document_templates.is_last
IS 'Флаг, указващ дали версията е последна';

COMMENT ON COLUMN nom.d_document_templates.deactivation_ver_id
IS 'Идентификатор на версия с която е деактивиран записа';

COMMENT ON COLUMN nom.d_document_templates.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN nom.d_document_templates.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN nom.d_document_templates.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN nom.d_document_templates.updated_on
IS 'TIMESTAMP на последна промяна на записа';

CREATE UNIQUE INDEX n_d_document_templates_doc_templ_ver_id_is_last_idx ON nom.d_document_templates
  USING btree (doc_template_id)
  WHERE (is_last = (1)::bit(1));

CREATE UNIQUE INDEX n_d_document_templates_document_type_id_is_last_idx ON nom.d_document_templates
  USING btree (document_type_id COLLATE pg_catalog."default")
  WHERE ((is_last = (1)::bit(1)) AND (deactivation_ver_id IS NULL));