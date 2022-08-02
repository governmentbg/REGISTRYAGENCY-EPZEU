--
-- Definition for function f_s_document_template_fields_search : 
--
SET search_path = nom, pg_catalog;
CREATE FUNCTION nom.f_s_document_template_fields_search (
  p_keys character varying[],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_template_fields refcursor
)
RETURNS record
AS 
$body$
BEGIN
  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR (p_start_index IS NOT NULL AND p_page_size IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  --
  IF (p_keys IS NOT NULL)
  THEN
      IF p_calculate_count
      THEN

        SELECT COUNT(*)
        INTO p_count
        FROM nom.s_document_template_fields t
        WHERE t.key = ANY (p_keys);

      END IF;

      OPEN p_ref_template_fields FOR
      SELECT t.*
      FROM nom.s_document_template_fields t
      WHERE t.key = ANY (p_keys)
      ORDER BY t.key
      LIMIT p_page_size
      OFFSET p_start_index - 1;  

  ELSE
    IF p_calculate_count
      THEN
        SELECT COUNT(*)
        INTO p_count
        FROM nom.s_document_template_fields t;

      END IF;

      OPEN p_ref_template_fields FOR
      SELECT t.*
      FROM nom.s_document_template_fields t
      ORDER BY t.key
      LIMIT p_page_size
      OFFSET p_start_index - 1;  
  
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_document_templates_create : 
--
CREATE FUNCTION nom.f_d_document_templates_create (
  p_document_type_id integer,
  p_content text,
  out p_doc_template_id integer,
  out p_doc_template_ver_id integer
)
RETURNS record
AS 
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
LANGUAGE plpgsql;
--
-- Definition for function f_d_document_templates_update : 
--
CREATE FUNCTION nom.f_d_document_templates_update (
  p_doc_template_id integer,
  p_document_type_id integer,
  p_content text,
  out p_doc_template_ver_id integer
)
RETURNS integer
AS 
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;

BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_doc_template_id IS NULL OR p_document_type_id IS NULL OR p_content IS NULL
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
    AND deactivation_ver_id IS NULL; -- последната версия не е деактивирана
  
  -- проверка за наличие на една последна активна версия
  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
  
  -- създаване на нова версия
  INSERT INTO nom.d_document_templates
    (
      doc_template_id,
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
      p_doc_template_id,
      p_doc_template_ver_id,
      p_document_type_id,
      p_content,
      1::bit,
      NULL,
      v_user_id,
      sys.f_current_timestamp(),
      v_user_id,
      sys.f_current_timestamp()
    );

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_document_templates_search : 
--
CREATE FUNCTION nom.f_d_document_templates_search (
  p_doc_template_ids integer[],
  p_document_type_ids integer[],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_doc_templates refcursor
)
RETURNS record
AS 
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
               d.name,
               t.updated_on,
               t.updated_by
        FROM nom.d_document_templates t, nom.d_document_types d
        WHERE t.document_type_id = d.document_type_id
          AND t.is_last = 1 :: BIT
          AND t.deactivation_ver_id IS NULL
          AND t.doc_template_id = ANY (p_doc_template_ids)
        ORDER BY d.name, t.doc_template_id
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
               d.name,
               t.updated_on,
               t.updated_by
        FROM nom.d_document_templates t, nom.d_document_types d
        WHERE t.document_type_id = d.document_type_id
          AND t.is_last = 1 :: BIT
          AND t.deactivation_ver_id IS NULL
          AND t.document_type_id = ANY (p_document_type_ids)
        ORDER BY d.name, t.doc_template_id
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
               d.name,
               t.updated_on,
               t.updated_by
        FROM nom.d_document_templates t, nom.d_document_types d
        WHERE t.document_type_id = d.document_type_id
          AND t.is_last = 1 :: BIT
          AND t.deactivation_ver_id IS NULL
        ORDER BY d.name, t.doc_template_id
        LIMIT p_page_size
        OFFSET p_start_index - 1;     
    END IF;
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_document_templates_delete : 
--
CREATE FUNCTION nom.f_d_document_templates_delete (
  p_doc_template_id integer,
  out p_doc_template_ver_id integer
)
RETURNS integer
AS 
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
LANGUAGE plpgsql;
--
-- Definition for function f_d_document_types_search : 
--
CREATE FUNCTION nom.f_d_document_types_search (
  p_document_type_ids integer[],
  p_with_templates boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_document_types refcursor
)
RETURNS record
AS 
$body$
BEGIN
  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR (p_start_index IS NOT NULL AND p_page_size IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- 
  IF (p_document_type_ids IS NOT NULL)
  THEN
    IF p_calculate_count
    THEN
      
      SELECT COUNT(*)
      INTO p_count
      FROM nom.d_document_types t
      WHERE t.document_type_id = ANY (p_document_type_ids)
        AND ( (p_with_templates IS NULL) OR
              (p_with_templates = true AND EXISTS (SELECT 1 
                                                  FROM nom.d_document_templates dt 
                                                  WHERE dt.document_type_id = t.document_type_id
                                                    AND dt.is_last = 1::bit
                                                    AND dt.deactivation_ver_id IS NULL)) OR
              (p_with_templates = false AND NOT EXISTS (SELECT 1 
                                                        FROM nom.d_document_templates dt 
                                                        WHERE dt.document_type_id = t.document_type_id
                                                          AND dt.is_last = 1::bit
                                                          AND dt.deactivation_ver_id IS NULL)));
        
       
        
    END IF;

    OPEN p_ref_document_types FOR
    SELECT t.*
    FROM nom.d_document_types t
    WHERE t.document_type_id = ANY (p_document_type_ids)
      AND ( (p_with_templates IS NULL) OR
              (p_with_templates = true AND EXISTS (SELECT 1 
                                                  FROM nom.d_document_templates dt 
                                                  WHERE dt.document_type_id = t.document_type_id
                                                    AND dt.is_last = 1::bit
                                                    AND dt.deactivation_ver_id IS NULL)) OR
              (p_with_templates = false AND NOT EXISTS (SELECT 1 
                                                        FROM nom.d_document_templates dt 
                                                        WHERE dt.document_type_id = t.document_type_id
                                                          AND dt.is_last = 1::bit
                                                          AND dt.deactivation_ver_id IS NULL)))
    ORDER BY t.document_type_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;  
    
  ELSIF (p_document_type_ids IS NULL AND p_with_templates IS NOT NULL )
  THEN
    IF p_with_templates 
    THEN 
      IF p_calculate_count
      THEN
          SELECT COUNT(*)
          INTO p_count
          FROM nom.d_document_types t
          WHERE EXISTS (SELECT 1 
                        FROM nom.d_document_templates dt 
                        WHERE dt.document_type_id = t.document_type_id
                          AND dt.is_last = 1::bit
                          AND dt.deactivation_ver_id IS NULL);
      END IF;
      
      OPEN p_ref_document_types FOR
      SELECT t.*
      FROM nom.d_document_types t
      WHERE EXISTS (SELECT 1 
                    FROM nom.d_document_templates dt 
                    WHERE dt.document_type_id = t.document_type_id
                      AND dt.is_last = 1::bit
                      AND dt.deactivation_ver_id IS NULL)
      ORDER BY t.document_type_id
      LIMIT p_page_size
      OFFSET p_start_index - 1;                  
              
    ELSE
      IF p_calculate_count
      THEN
          SELECT COUNT(*)
          INTO p_count
          FROM nom.d_document_types t
          WHERE NOT EXISTS (SELECT 1 
                            FROM nom.d_document_templates dt 
                            WHERE dt.document_type_id = t.document_type_id
                              AND dt.is_last = 1::bit
                              AND dt.deactivation_ver_id IS NULL);
      END IF;
      
      OPEN p_ref_document_types FOR
      SELECT t.*
      FROM nom.d_document_types t
      WHERE NOT EXISTS (SELECT 1 
                        FROM nom.d_document_templates dt 
                        WHERE dt.document_type_id = t.document_type_id
                          AND dt.is_last = 1::bit
                          AND dt.deactivation_ver_id IS NULL)    
      ORDER BY t.document_type_id
      LIMIT p_page_size
      OFFSET p_start_index - 1;  
      END IF;

  ELSE -- p_document_type_ids IS NULL AND p_with_templates IS NULL
    IF p_calculate_count
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM nom.d_document_types t;

    END IF;

    OPEN p_ref_document_types FOR
    SELECT t.*
    FROM nom.d_document_types t
    ORDER BY t.document_type_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;  
  
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_document_templates_content_read : 
--
CREATE FUNCTION nom.f_d_document_templates_content_read (
  p_template_id integer,
  out p_content text
)
RETURNS text
AS 
$body$
BEGIN
  -- проверка на параметрите
  IF (p_template_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;
  
  SELECT t.content
    INTO p_content 
  FROM nom.d_document_templates t
  WHERE t.doc_template_id = p_template_id
    AND t.is_last = 1::bit
    AND t.deactivation_ver_id IS NULL;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_languages_create : 
--
CREATE FUNCTION nom.f_d_languages_create (
  p_code character varying,
  p_name character varying,
  p_is_active boolean,
  out p_language_id integer
)
RETURNS integer
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_code IS NULL
  	OR p_name IS NULL
    OR p_is_active IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO nom.d_languages
  (
    code,
    name,
    is_active,
    created_by,
    created_on,
    updated_by,
    updated_on,
    is_default
  )
  VALUES
  (
    p_code,
    p_name,
    p_is_active,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    false
  )
  RETURNING language_id
    INTO p_language_id;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_languages_update : 
--
CREATE FUNCTION nom.f_d_languages_update (
  p_language_id integer,
  p_code character varying,
  p_name character varying,
  p_is_active boolean
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_language_id IS NULL
     OR p_code IS NULL
     OR p_name IS NULL
     OR p_is_active IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE nom.d_languages
  SET
  	code 		= p_code,
    name    	= p_name,
  	is_active  	= p_is_active,
    updated_by  = v_user_id,
    updated_on  = sys.f_current_timestamp()
  WHERE language_id = p_language_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_labels_update : 
--
CREATE FUNCTION nom.f_d_labels_update (
  p_label_id integer,
  p_code character varying,
  p_value character varying,
  p_description character varying,
  out p_label_ver_id integer
)
RETURNS integer
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_label_id IS NULL
     OR p_value IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

 -- определяне на версия
  p_label_ver_id = f_get_next_version_id(); 


  -- деактивиране на съществуващата последна версия
    UPDATE nom.d_labels
    SET
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp(),
      is_last = 0::bit,
      deactivation_ver_id = p_label_ver_id
    WHERE label_id = p_label_id
      AND is_last = 1::bit -- последна версия
      AND deactivation_ver_id IS NULL; -- версията не е деактивирана
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    -- Проверка дали е редактиран точно един запис
    IF v_count != 1
    THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
    END IF;
    
    -- създаване на нова версия
    INSERT INTO nom.d_labels
      ( label_id, 
        label_ver_id,
        code,
        value,
        description,
        created_by,
        created_on,
        updated_by,
        updated_on,
        is_last,
        deactivation_ver_id
      )
    VALUES 
      ( p_label_id,
        p_label_ver_id,
        p_code,
        p_value,
        p_description,
        v_user_id,
        sys.f_current_timestamp(),
        v_user_id,
        sys.f_current_timestamp(),
        1::bit,
        NULL
      );
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_s_service_types_search : 
--
CREATE FUNCTION nom.f_s_service_types_search (
  p_service_type_ids smallint[],
  out ref_service_types refcursor
)
RETURNS refcursor
AS 
$body$
BEGIN

IF (p_service_type_ids IS NOT NULL)
THEN
      OPEN ref_service_types FOR
          SELECT s.*
            FROM nom.s_service_types s
           WHERE s.service_type_id = ANY (p_service_type_ids)
        ORDER BY s.service_type_id ;  

  ELSE
   OPEN ref_service_types FOR
          SELECT s.*
            FROM nom.s_service_types s
        ORDER BY s.service_type_id ;  
  
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_s_registers_search : 
--
CREATE FUNCTION nom.f_s_registers_search (
  p_registers_ids smallint[],
  out ref_registers refcursor
)
RETURNS refcursor
AS 
$body$
DECLARE

BEGIN

IF (p_registers_ids IS NOT NULL)
THEN
      OPEN ref_registers FOR
          SELECT r.*
            FROM nom.s_registers r
           WHERE r.register_id = ANY (p_registers_ids)
        ORDER BY r.register_id ;  

  ELSE
   OPEN ref_registers FOR
          SELECT r.*
            FROM nom.s_registers r
        ORDER BY r.register_id ;  
  
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_s_application_types_i18n_create : 
--
CREATE FUNCTION nom.f_s_application_types_i18n_create (
  p_id smallint,
  p_language_id integer,
  p_name character varying
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_id IS NULL OR 
     p_language_id IS NULL OR
     p_name IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO nom.s_application_types_i18n
  (
    id,
	language_id,
    name,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES
  (
    p_id,
    p_language_id,
    p_name,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  );

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_s_application_types_i18n_update : 
--
CREATE FUNCTION nom.f_s_application_types_i18n_update (
  p_id smallint,
  p_language_id integer,
  p_name character varying
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_id IS NULL OR
     p_language_id IS NULL OR
     p_name IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

 UPDATE nom.s_application_types_i18n 
    SET name  = p_name,
        updated_by = v_user_id,
        updated_on = sys.f_current_timestamp()
  WHERE id = p_id
    AND language_id = p_language_id;
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    -- Проверка дали е редактиран точно един запис
    IF v_count != 1
    THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
    END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_s_application_types_search : 
--
CREATE FUNCTION nom.f_s_application_types_search (
  p_language_id smallint,
  p_code character varying,
  p_name character varying,
  p_load_separate_value_i18n boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_application_types refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
  
  BEGIN
  IF p_language_id IS NULL OR
     p_start_index IS NULL OR
  	 p_page_size IS NULL OR
     p_load_separate_value_i18n IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  v_stmt := ' SELECT t.id, 
                     t.code,
                     ( CASE WHEN ($1 = false and i18n.name IS NOT null) THEN i18n.name
                            ELSE t.name
                        END) as name,
                     ( CASE WHEN ($1) THEN i18n.name END) as name_i18n
                FROM nom.s_application_types t
           LEFT JOIN nom.s_application_types_i18n i18n 
                 ON (t.id = i18n.id AND
                     i18n.language_id = $2) '; 
                  
             
  IF p_code IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and t.code LIKE concat(''%'',$3, ''%'')
	';
  END IF;
  
  IF p_name IS NOT NULL
  THEN
	/*първо изпълняваме QUERY-то както е до момента и после филтрираме по VALUE, 
    защото в някои случаи във value са merge-нати стойности от "default"-ия език и друг
    и трябва да правим проверки, за да знаем дали да филтрираме LABEL.value или label_i18n.value*/
    v_stmt := ' SELECT * FROM (' || v_stmt || ') vt where vt.name LIKE concat(''%'',$4, ''%'')';
  END IF;
  
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ) tc ';

    EXECUTE v_count_stmt
       INTO p_count
      USING p_load_separate_value_i18n, p_language_id, p_code, p_name;

  END IF;
  
  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt 
             ORDER BY tt.id LIMIT $5 OFFSET $6 - 1';

  OPEN p_ref_application_types FOR EXECUTE v_stmt USING p_load_separate_value_i18n, 
                                             p_language_id, 
                                             p_code, 
                                             p_name, 
                                             p_page_size, 
                                             p_start_index;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_service_create : 
--
CREATE FUNCTION nom.f_d_service_create (
  p_register_id smallint,
  p_service_num integer,
  p_app_type_id smallint,
  p_service_type_ids smallint[],
  p_payment_type_ids smallint[],
  p_processing_date timestamp with time zone,
  p_status integer,
  out p_service_id integer
)
RETURNS integer
AS 
$body$
DECLARE
  v_user_id     INTEGER;
  
BEGIN

  IF p_register_id IS NULL OR
     p_service_num IS NULL OR
     p_app_type_id  IS NULL OR
     p_service_type_ids IS NULL OR
     p_processing_date IS NULL OR
     p_status IS NULL 
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO nom.d_services
    (register_id,
     service_num,
     app_type_id,
     service_type_ids,
     payment_type_ids,
     processing_date,
     status,
     created_by,
     created_on,
     updated_by,
     updated_on
    )
  VALUES 
    (
      p_register_id,
      p_service_num,
      p_app_type_id,
      p_service_type_ids,
      p_payment_type_ids,
      p_processing_date,
      p_status,
      v_user_id,
      sys.f_current_timestamp(),
      v_user_id,
      sys.f_current_timestamp()
    )
  RETURNING service_id INTO p_service_id;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_service_search : 
--
CREATE FUNCTION nom.f_d_service_search (
  p_services_ids integer[],
  p_register_ids smallint[],
  p_statuses integer[],
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_services refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_services_ids is null AND
      p_register_ids IS NULL AND 
      p_statuses IS NULL AND  
      p_start_index  IS NULL AND
      p_page_size  IS NULL AND
      p_max_nor  IS NULL  
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  
  
  IF (p_services_ids is not null ) then
   
     IF (p_calculate_count = TRUE)
      THEN
        
        SELECT COUNT(*)
          INTO p_count
          FROM nom.d_services s
         WHERE s.service_id = ANY (p_services_ids);
          
      END IF;

      OPEN p_ref_services FOR
      SELECT *
        FROM nom.d_services s
       WHERE s.service_id = ANY (p_services_ids)
    ORDER BY s.service_id
       LIMIT p_page_size
      OFFSET p_start_index - 1;  
      
 ELSE
                 
    v_stmt := 'SELECT *
                 FROM nom.d_services s
                WHERE 1 = 1 ';


    IF p_register_ids IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND s.register_id = ANY($1) ';
    END IF;

    IF p_statuses IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND s.status = ANY($2) ';
    END IF;
    
    IF p_calculate_count
    THEN
      v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

      IF (p_max_nor IS NOT NULL)
      THEN
        v_count_stmt := v_count_stmt || '
                                LIMIT $3 + 1';

      END IF;

      v_count_stmt := v_count_stmt || ' ) tc ';
      
      EXECUTE v_count_stmt
         INTO p_count
        USING p_register_ids, p_statuses, p_max_nor;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    v_stmt := v_stmt || ' ORDER BY s.service_id LIMIT $3 OFFSET $4 - 1 ';

    OPEN p_ref_services FOR EXECUTE v_stmt
    USING p_register_ids, p_statuses, p_page_size, p_start_index;
 END IF;
 
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_iisda_services_search : 
--
CREATE FUNCTION nom.f_d_iisda_services_search (
  p_language_id integer,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_services refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_start_index  IS NULL AND
      p_page_size  IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  	/* WORK IN PROCESS ...
    */
  	IF (p_calculate_count = TRUE)
    THEN
        
      SELECT COUNT(*)
        INTO p_count
        FROM nom.d_iisda_services s;
          
    END IF;

    OPEN p_ref_services FOR
    SELECT 
    	s.iisda_service_id,
        s.service_number,
        s.name,
        s.description,
        s.read_date,
        s.is_discontinued
      FROM nom.d_iisda_services s
     LIMIT p_page_size
    OFFSET p_start_index - 1;     
 
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_labels_get_last_version : 
--
CREATE FUNCTION nom.f_labels_get_last_version (
  p_label_id integer
)
RETURNS integer
AS 
$body$
DECLARE 
	v_version_id INTEGER;
  
BEGIN
  SELECT label.label_ver_id 
  FROM nom.d_labels label
  WHERE label.label_id = p_label_id
      AND is_last = 1::bit -- последна версия
      AND deactivation_ver_id IS NULL -- версията не е деактивирана
  INTO v_version_id;
  RETURN v_version_id;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_labels_i18n_update : 
--
CREATE FUNCTION nom.f_d_labels_i18n_update (
  p_label_id integer,
  p_language_id integer,
  p_value character varying
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_label_id IS NULL
     OR p_value IS NULL
     OR p_language_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

 UPDATE nom.d_labels_i18n
    SET
      label_ver_id = nom.f_labels_get_last_version(p_label_id),
      value = p_value,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
    WHERE label_id = p_label_id
      AND language_id = p_language_id;
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    -- Проверка дали е редактиран точно един запис
    IF v_count != 1
    THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
    END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_labels_i18n_create : 
--
CREATE FUNCTION nom.f_d_labels_i18n_create (
  p_label_id integer,
  p_language_id integer,
  p_value character varying
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_label_id IS NULL
  	OR p_language_id IS NULL
    OR p_value IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO nom.d_labels_i18n
  (
    label_id,
	label_ver_id,
    language_id,
    value,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES
  (
    p_label_id,
    nom.f_labels_get_last_version(p_label_id),
    p_language_id,
    p_value,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  );

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_iisda_services_trg : 
--
CREATE FUNCTION nom.f_d_iisda_services_trg (
)
RETURNS trigger
AS 
$body$
BEGIN

	PERFORM sys.f_notify_cache_invalidation('nom.d_iisda_services');
	RETURN NULL;    
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_labels_search : 
--
CREATE FUNCTION nom.f_d_labels_search (
  p_lang_id integer,
  p_code character varying,
  p_value character varying,
  p_load_description boolean,
  p_load_separate_value_i18n boolean,
  p_load_only_untranslated boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_labels refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
  
  BEGIN
  IF p_start_index IS NULL 
  	OR p_page_size IS NULL 
    OR p_lang_id IS NULL
    OR p_load_description IS NULL
    OR p_load_separate_value_i18n IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  v_stmt := ' SELECT label.label_id, label.code,
                  (CASE WHEN $1 THEN label.description END) as description,
                  (CASE
                    WHEN ($2 = false and label_i18n.value IS NOT null) THEN label_i18n.value
                    ELSE label.value
                    END) as value,
                  (CASE
                  WHEN ($2) THEN label_i18n.value END) as value_i18n
                  FROM nom.d_labels label
                    LEFT JOIN nom.d_labels_i18n label_i18n 
                      ON (label.label_id = label_i18n.label_id 
                          and label_i18n.language_id = $3) 
                  WHERE label.is_last = 1::bit 
    					and label.deactivation_ver_id IS NULL'; 
                  
             
  IF p_code IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and label.code LIKE concat(''%'',$4, ''%'')
	';
  END IF;
  
  IF p_load_only_untranslated = TRUE
  THEN
    v_stmt := v_stmt || ' and exists(select label_id from nom.d_labels_i18n where label_id = label.label_id) = false
	';
  END IF;
  
  IF p_value IS NOT NULL
  THEN
	/*първо изпълняваме QUERY-то както е до момента и после филтрираме по VALUE, 
    защото в някои случаи във value са merge-нати стойности от "default"-ия език и друг
    и трябва да правим проверки, за да знаем дали да филтрираме LABEL.value или label_i18n.value*/
    v_stmt := ' SELECT * FROM (' || v_stmt || ') vt where vt.value LIKE concat(''%'',$5, ''%'')
	';
  END IF;
  
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ) tc ';

    EXECUTE v_count_stmt
    INTO p_count
    USING p_load_description, p_load_separate_value_i18n, p_lang_id, p_code, p_value;

  END IF;
  
  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt 
             ORDER BY tt.label_id LIMIT $6 OFFSET $7 - 1';

  OPEN p_ref_labels FOR EXECUTE v_stmt USING p_load_description, 
                                             p_load_separate_value_i18n, 
                                             p_lang_id, 
                                             p_code, 
                                             p_value, 
                                             p_page_size, 
                                             p_start_index;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_languages_search : 
--
CREATE FUNCTION nom.f_d_languages_search (
  p_language_id integer,
  p_code character varying,
  p_name character varying,
  p_is_active boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_languages refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_start_index IS NULL OR p_page_size IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := ' SELECT
                t.language_id,
                t.code,
                t.name,
                t.is_active,
				t.is_default
              FROM nom.d_languages t
              WHERE 1 = 1
             ';

  IF p_language_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.language_id = $1
	';
  END IF;

  IF p_code IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND lower(t.code) = lower($2)
	';
  END IF;
  
  IF p_name IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.name = $3
	';
  END IF;
  
  IF p_is_active IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.is_active = $4
	';
  END IF;

  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ' || ' ) tc ';

    EXECUTE v_count_stmt
    INTO p_count
    USING p_language_id, p_code, p_name, p_is_active;

  END IF;

  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt
             ORDER BY tt.language_id LIMIT $5 OFFSET $6 - 1';

  OPEN p_ref_languages FOR EXECUTE v_stmt USING p_language_id, p_code, p_name, p_is_active, p_page_size, p_start_index;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_service_update : 
--
CREATE FUNCTION nom.f_d_service_update (
  p_service_id integer,
  p_register_id smallint,
  p_service_num integer,
  p_app_type_id smallint,
  p_service_type_ids smallint[],
  p_payment_type_ids smallint[],
  p_processing_date timestamp with time zone,
  p_status integer
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_service_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE nom.d_services s
     SET register_id      = p_register_id,
         service_num      = p_service_num,
         app_type_id      = p_app_type_id,
         service_type_ids = p_service_type_ids,
         payment_type_ids = p_payment_type_ids,
         processing_date  = p_processing_date,
         status           = p_status,
         updated_by       = v_user_id,
         updated_on       = sys.f_current_timestamp()
   WHERE s.service_id = p_service_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_iisda_services_create : 
--
CREATE FUNCTION nom.f_d_iisda_services_create (
  p_iisda_service_id integer,
  p_service_number integer,
  p_name character varying,
  p_description character varying,
  p_read_date timestamp with time zone,
  p_is_discontinued boolean
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_iisda_service_id IS NULL OR p_name IS NULL OR p_description IS NULL OR p_read_date IS NULL OR p_service_number IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO nom.d_iisda_services(
    iisda_service_id,
    service_number,
    name,
    description,
    read_date,
    is_discontinued,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_iisda_service_id,
    p_service_number,
    p_name,
    p_description,
    p_read_date,
    p_is_discontinued,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  );

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_iisda_services_update : 
--
CREATE FUNCTION nom.f_d_iisda_services_update (
  p_iisda_service_id integer,
  p_service_number integer,
  p_name character varying,
  p_description character varying,
  p_read_date timestamp with time zone,
  p_is_discontinued boolean
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_iisda_service_id IS NULL OR p_name IS NULL OR p_description IS NULL OR p_read_date IS NULL OR p_service_number IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  UPDATE nom.d_iisda_services 
  SET  service_number = p_service_number,
       name 		= p_name,
       description  = p_description,
       read_date	= p_read_date,
       is_discontinued = p_is_discontinued,
       updated_by    = v_user_id,
       updated_on    = sys.f_current_timestamp()
  WHERE 
  		service_id = p_service_id;
    
  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_iisda_services_i18n_create : 
--
CREATE FUNCTION nom.f_d_iisda_services_i18n_create (
  p_iisda_service_id integer,
  p_language_id integer,
  p_name character varying,
  p_description character varying
)
RETURNS integer
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_iisda_service_id IS NULL OR p_name IS NULL OR p_description IS NULL OR p_language_id IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO nom.d_iisda_services_i18n(
    iisda_service_id,
    language_id,
    name,
    description,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_iisda_service_id,
    p_language_id,
    p_name,
    p_description,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  );

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_iisda_services_i18n_update : 
--
CREATE FUNCTION nom.f_d_iisda_services_i18n_update (
  p_iisda_service_id integer,
  p_language_id integer,
  p_name character varying,
  p_description character varying
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_iisda_service_id IS NULL OR p_name IS NULL OR p_description IS NULL OR p_language_id IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  UPDATE nom.d_iisda_services_i18n
  SET  name 		= p_name,
       description  = p_description,
       updated_by    = v_user_id,
       updated_on    = sys.f_current_timestamp()
  WHERE 
  		iisda_service_id = p_iisda_service_id
	AND language_id = p_language_id;
    
  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_iisda_services_markasread : 
--
CREATE FUNCTION nom.f_d_iisda_services_markasread (
  p_iisda_service_id integer,
  p_read_date timestamp with time zone
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_iisda_service_id IS NULL OR p_read_date IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  UPDATE nom.d_iisda_services 
  SET  read_date	= p_read_date,
       updated_by   = v_user_id,
       updated_on   = sys.f_current_timestamp()
  WHERE 
       iisda_service_id = p_iisda_service_id;
    
  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_labels_trg : 
--
CREATE FUNCTION nom.f_d_labels_trg (
)
RETURNS trigger
AS 
$body$
BEGIN

	PERFORM sys.f_notify_cache_invalidation('nom.d_labels');
	RETURN NULL;    
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_labels_i18n_trg : 
--
CREATE FUNCTION nom.f_d_labels_i18n_trg (
)
RETURNS trigger
AS 
$body$
BEGIN

	PERFORM sys.f_notify_cache_invalidation('nom.d_labels_i18n');
	RETURN NULL;    
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_d_languages_trg : 
--
CREATE FUNCTION nom.f_d_languages_trg (
)
RETURNS trigger
AS 
$body$
BEGIN

	PERFORM sys.f_notify_cache_invalidation('nom.d_languages');
	RETURN NULL;    
END;
$body$
LANGUAGE plpgsql;