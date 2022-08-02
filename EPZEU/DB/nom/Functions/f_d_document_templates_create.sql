CREATE OR REPLACE FUNCTION nom.f_d_document_templates_create (
  p_document_type_id varchar,
  p_content text,
  out p_doc_template_id integer,
  out p_doc_template_ver_id integer
)
RETURNS record AS
$body$
DECLARE
  v_user_id     INTEGER;

BEGIN

  IF p_document_type_id IS NULL OR p_content IS NULL
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- определяне на версия
  p_doc_template_ver_id := f_get_next_version_id();

  -- създаване на запис
  INSERT INTO nom.d_document_templates
    (
      doc_template_ver_id,
      document_type_id,
      content,
      is_last,
      deactivation_ver_id,
      created_by,
      created_on,
      updated_by,
      updated_on
    )
  VALUES
    (
      p_doc_template_ver_id,
      p_document_type_id,
      p_content,
      1::bit,
      NULL,
      v_user_id,
      sys.f_current_timestamp(),
      v_user_id,
      sys.f_current_timestamp()
    )
  RETURNING doc_template_id INTO p_doc_template_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
