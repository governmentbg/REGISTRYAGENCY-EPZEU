CREATE OR REPLACE FUNCTION nom.f_d_document_templates_content_read (
  p_template_id integer,
  out p_content text,
  out p_last_updated_on timestamptz
)
RETURNS record AS
$body$
BEGIN
  -- проверка на параметрите
  IF (p_template_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;
  
  SELECT MAX(last_updated_on) 
  	INTO p_last_updated_on
  FROM nom.nomenclature_changes
  WHERE tablename = 'd_document_templates' ;
  
  SELECT t.content
    INTO p_content 
  FROM nom.d_document_templates t
  WHERE t.doc_template_id = p_template_id
    AND t.is_last = 1::bit
    AND t.deactivation_ver_id IS NULL;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;