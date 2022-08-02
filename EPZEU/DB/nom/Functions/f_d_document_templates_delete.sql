CREATE OR REPLACE FUNCTION nom.f_d_document_templates_delete (
  p_doc_template_id integer,
  out p_doc_template_ver_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_doc_template_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- определяне на версия
  p_doc_template_ver_id := f_get_next_version_id();  

    -- деактивиране на последната версия
  UPDATE nom.d_document_templates 
  SET 
    is_last = 0::bit,
    deactivation_ver_id = p_doc_template_ver_id,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp()
  WHERE doc_template_id = p_doc_template_id
    AND is_last = 1::bit    -- последната версия
    AND deactivation_ver_id IS NULL; -- версията не е деактивирана
  
  -- проверка за наличие на една последна активна версия
  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
