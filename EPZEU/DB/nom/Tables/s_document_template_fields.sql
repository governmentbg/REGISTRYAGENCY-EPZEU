CREATE TABLE nom.s_document_template_fields (
  key VARCHAR(50) NOT NULL,
  description VARCHAR(200),
  CONSTRAINT n_s_document_template_fields_pkey PRIMARY KEY(key)
) 
WITH (oids = false);

COMMENT ON TABLE nom.s_document_template_fields
IS 'Статична номенклатура на полетата в шаблон за документ';

COMMENT ON COLUMN nom.s_document_template_fields.key
IS 'Код на поле';

COMMENT ON COLUMN nom.s_document_template_fields.description
IS 'Описание на поле';
