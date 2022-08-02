CREATE OR REPLACE FUNCTION nom.f_d_document_templates_search (
  p_doc_template_ids integer [],
  p_document_type_ids varchar [],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_doc_templates refcursor
)
RETURNS record AS
$body$
BEGIN

  -- Проверка на параметрите.
  IF ( (p_start_index IS NULL AND p_page_size IS NOT NULL ) OR
       (p_start_index IS NOT NULL AND p_page_size IS NULL) OR
       (p_doc_template_ids IS NOT NULL AND p_document_type_ids IS NOT NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  ELSE
    IF (p_doc_template_ids IS NOT NULL)
    THEN
        IF p_calculate_count
        THEN
            SELECT COUNT(*)
            INTO p_count
            FROM nom.d_document_templates t
            WHERE t.is_last = 1 :: BIT
              AND t.deactivation_ver_id IS NULL
              AND t.doc_template_id = ANY (p_doc_template_ids);
        END IF;

        OPEN p_ref_doc_templates FOR
        SELECT t.document_type_id,
               t.doc_template_id,
               t.updated_on,
               t.updated_by
        FROM nom.d_document_templates t
        WHERE t.is_last = 1 :: BIT
          AND t.deactivation_ver_id IS NULL
          AND t.doc_template_id = ANY (p_doc_template_ids)
        ORDER BY t.doc_template_id
        LIMIT p_page_size
        OFFSET p_start_index - 1;

    ELSIF (p_document_type_ids IS NOT NULL)
    THEN
        IF p_calculate_count
        THEN
            SELECT COUNT(*)
            INTO p_count
            FROM nom.d_document_templates t
            WHERE t.is_last = 1 :: BIT
              AND t.deactivation_ver_id IS NULL
              AND t.document_type_id = ANY (p_document_type_ids);
        END IF;

        OPEN p_ref_doc_templates FOR
        SELECT t.document_type_id,
               t.doc_template_id,
               t.updated_on,
               t.updated_by
        FROM nom.d_document_templates t
        WHERE t.is_last = 1 :: BIT
          AND t.deactivation_ver_id IS NULL
          AND t.document_type_id = ANY (p_document_type_ids)
        ORDER BY t.doc_template_id
        LIMIT p_page_size
        OFFSET p_start_index - 1;
    ELSE -- p_doc_template_ids IS NULL AND p_document_type_ids IS NULL
        IF p_calculate_count
        THEN
            SELECT COUNT(*)
            INTO p_count
            FROM nom.d_document_templates t
            WHERE t.is_last = 1 :: BIT
              AND t.deactivation_ver_id IS NULL;
        END IF;

        OPEN p_ref_doc_templates FOR
        SELECT t.document_type_id,
               t.doc_template_id,
               t.updated_on,
               t.updated_by
        FROM nom.d_document_templates t
        WHERE t.is_last = 1 :: BIT
          AND t.deactivation_ver_id IS NULL
        ORDER BY t.doc_template_id
        LIMIT p_page_size
        OFFSET p_start_index - 1;
    END IF;
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
