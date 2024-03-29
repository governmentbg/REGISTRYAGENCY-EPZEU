-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



--
-- Definition for function f_templates_delete (OID = 18828) : 
--
SET search_path = templates, pg_catalog;
SET check_function_bodies = false;
CREATE FUNCTION templates.f_templates_delete (
  p_template_id integer
)
RETURNS void
AS 
$body$
DECLARE
  v_count NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_template_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива
  DELETE
  FROM templates.templates
  WHERE TEMPLATE_ID = p_template_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е изтрит точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_template_contents_upload (OID = 19471) : 
--
CREATE FUNCTION templates.f_template_contents_upload (
  p_content_id integer,
  p_content bytea
)
RETURNS integer
AS 
$body$

BEGIN
  -- създаване на запис
  UPDATE templates.template_contents
  SET content = p_content
  WHERE content_id = p_content_id;
  RETURN 1;

END;

$body$
LANGUAGE plpgsql;
--
-- Definition for function f_template_contents_read (OID = 19472) : 
--
CREATE FUNCTION templates.f_template_contents_read (
  p_content_id integer
)
RETURNS bytea
AS 
$body$

DECLARE
	ref refcursor;
BEGIN
-- 	OPEN ref FOR 
	return (SELECT 
		e.content
	FROM templates.template_contents e
	WHERE e.content_id = p_content_id);
	
-- 	return ref;
END;

$body$
LANGUAGE plpgsql;
--
-- Definition for function f_template_contents_create (OID = 19480) : 
--
CREATE FUNCTION templates.f_template_contents_create (
  out p_content_id integer,
  p_content bytea
)
RETURNS integer
AS 
$body$

BEGIN

-- създаване на запис
  INSERT INTO templates.template_contents
  (
    content
  )
  VALUES
  (
    p_content
  )
  RETURNING content_id
  INTO p_content_id;
END;

$body$
LANGUAGE plpgsql;
--
-- Definition for function f_template_contents_upload_chunks_oid (OID = 19623) : 
--
CREATE FUNCTION templates.f_template_contents_upload_chunks_oid (
  p_content_id integer,
  p_content oid
)
RETURNS void
AS 
$body$

DECLARE
	v_userid int;
	v_OldContent oid;
BEGIN
  IF (p_content_id IS NULL)
  	THEN
		RAISE EXCEPTION 'PARAMETER ERROR --> %', 'p_content_id';
  END IF;

  SELECT content_large_object INTO v_OldContent FROM templates.template_contents;
  
  IF (v_OldContent IS NULL OR p_content IS NULL)
  		THEN
			UPDATE templates.template_contents
			SET
				"content_large_object"	= p_content
			WHERE content_id = p_content_id;
  ELSE
  		UPDATE templates.template_contents
			SET
				"content_large_object"	= p_content
			WHERE content_id = p_content_id;
  END IF;
  END;
	
  

$body$
LANGUAGE plpgsql;
--
-- Definition for function f_template_contents_read_oid (OID = 19626) : 
--
CREATE FUNCTION templates.f_template_contents_read_oid (
  p_content_id integer
)
RETURNS oid
AS 
$body$

DECLARE
	ref refcursor;
BEGIN
-- 	OPEN ref FOR 
	return (SELECT 
		e.content_large_object
	FROM templates.template_contents e
	WHERE e.content_id = p_content_id);
	
-- 	return ref;
END;

$body$
LANGUAGE plpgsql;
--
-- Definition for function f_templates_search (OID = 19646) : 
--
CREATE FUNCTION templates.f_templates_search (
  p_template_ids integer[],
  p_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_templates refcursor
)
RETURNS record
AS 
$body$
BEGIN
  -- Проверка на параметрите.
  -- Тук според бизнес анализа може да се изредят всичките входящи параметри.
  IF p_start_index IS NULL OR p_page_size IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- Когато имаме много селективен параметър както в случая template_id (primary key на таблицата)
  -- Имаме възможност да съкратим писането като разпишем останалите параметри с OR в WHERE клаузата.
  IF p_template_ids IS NOT NULL
  THEN
    IF p_calculate_count
    THEN
      SELECT COUNT(*)
      INTO p_count
      FROM (SELECT * FROM
            templates.templates t
            WHERE t.template_id = ANY(p_template_ids)
                  AND (p_type IS NULL OR t.type = p_type)
            LIMIT p_max_nor + 1
            ) tc;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    OPEN p_ref_templates FOR
    SELECT t.*
    FROM templates.templates t
    WHERE t.template_id = ANY(p_template_ids)
          AND (p_type IS NULL OR t.type = p_type)
    ORDER BY t.template_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;
  ELSIF p_template_ids IS NULL AND p_type IS NOT NULL
    THEN
      IF p_calculate_count
      THEN
        SELECT COUNT(*)
        INTO p_count
        FROM (SELECT * FROM templates.templates t
              WHERE t.type = p_type
              LIMIT p_max_nor + 1
              ) tc;

        IF p_max_nor IS NOT NULL AND
            p_max_nor < p_count
        THEN
          PERFORM sys.f_raise_excp_max_nor_exceeded();
        END IF;
      END IF;

      OPEN p_ref_templates FOR
      SELECT t.*
      FROM templates.templates t
      WHERE t.type = p_type
      ORDER BY t.template_id
      LIMIT p_page_size
      OFFSET p_start_index - 1;
  ELSE
    IF p_calculate_count
    THEN
      SELECT COUNT(*)
      INTO p_count
      FROM (SELECT * FROM templates.templates t
            LIMIT p_max_nor + 1 
            ) tc;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    OPEN p_ref_templates FOR
    SELECT t.*
    FROM templates.templates t
    ORDER BY t.template_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_templates_ver_search (OID = 19662) : 
--
CREATE FUNCTION templates.f_templates_ver_search (
  p_template_ids integer[],
  p_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_templates refcursor
)
RETURNS record
AS 
$body$
BEGIN
  -- Проверка на параметрите.
  -- Тук според бизнес анализа може да се изредят всичките входящи параметри.
  IF p_start_index IS NULL OR p_page_size IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- Когато имаме много селективен параметър както в случая template_id (primary key на таблицата)
  -- Имаме възможност да съкратим писането като разпишем останалите параметри с OR в WHERE клаузата.
  IF p_template_ids IS NOT NULL
  THEN
    IF p_calculate_count
    THEN
      SELECT COUNT(*)
      INTO p_count
      FROM (SELECT * FROM templates.templates_ver t
            WHERE t.is_last = 1 :: BIT
              AND t.deactivation_ver_id IS NULL
              AND t.template_id = ANY(p_template_ids)
              AND (p_type IS NULL OR t.type = p_type)
            LIMIT p_max_nor + 1) tc;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    OPEN p_ref_templates FOR
    SELECT t.*
    FROM templates.templates_ver t
    WHERE t.is_last = 1 :: BIT
          AND t.deactivation_ver_id IS NULL
          AND t.template_id = ANY(p_template_ids)
          AND (p_type IS NULL OR t.type = p_type)
    ORDER BY t.template_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;
  ELSIF p_template_ids IS NULL AND p_type IS NOT NULL
    THEN
      IF p_calculate_count
      THEN
        SELECT COUNT(*)
        INTO p_count
        FROM (SELECT * FROM templates.templates_ver t
              WHERE t.is_last = 1 :: BIT
                    AND t.deactivation_ver_id IS NULL
                    AND t.type = p_type
              LIMIT p_max_nor + 1) tc;

        IF p_max_nor IS NOT NULL AND
            p_max_nor < p_count
        THEN
          PERFORM sys.f_raise_excp_max_nor_exceeded();
        END IF;
      END IF;

      OPEN p_ref_templates FOR
      SELECT t.*
      FROM templates.templates_ver t
      WHERE t.is_last = 1 :: BIT
            AND t.deactivation_ver_id IS NULL
            AND t.type = p_type
      ORDER BY t.template_id
      LIMIT p_page_size
      OFFSET p_start_index - 1;
  ELSE
    IF p_calculate_count
    THEN
      SELECT COUNT(*)
      INTO p_count
      FROM (SELECT * FROM templates.templates_ver t
            WHERE t.is_last = 1 :: BIT
                 AND t.deactivation_ver_id IS NULL
            LIMIT p_max_nor + 1) tc;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    OPEN p_ref_templates FOR
    SELECT t.*
    FROM templates.templates_ver t
    WHERE t.is_last = 1 :: BIT
         AND t.deactivation_ver_id IS NULL
    ORDER BY t.template_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_templates_ver_search_dynamic (OID = 19663) : 
--
CREATE FUNCTION templates.f_templates_ver_search_dynamic (
  p_template_ids integer[],
  p_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_templates refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_start_index IS NULL OR p_page_size IS NULL OR
      (p_template_ids IS NULL AND p_type IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  v_stmt := 'SELECT
               template_id,
               template_ver_id,
               name,
               document_text,
               is_boolean,
               file_content,
               type,
               status
             FROM templates.templates_ver t
             WHERE t.is_last = 1::bit
               AND t.deactivation_ver_id IS NULL ';

  IF p_template_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.template_id = ANY($1) ';
  END IF;

  IF p_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.type = $2 ';
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
    USING p_template_ids, p_type, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;

  v_stmt := v_stmt || ' ORDER BY t.template_id LIMIT $3 OFFSET $4 - 1 ';

  OPEN p_ref_templates FOR EXECUTE v_stmt
  USING p_template_ids, p_type, p_page_size, p_start_index;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_templates_ver_search_dynamic_multy_cursor (OID = 19671) : 
--
CREATE FUNCTION templates.f_templates_ver_search_dynamic_multy_cursor (
  p_template_ids integer[],
  p_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  p_load_sub_templates boolean,
  out p_count integer,
  out p_ref_templates refcursor,
  out p_ref_sub_templates refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
  v_templates  templates.TEMPLATES_VER [];
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_start_index IS NULL OR p_page_size IS NULL OR
      (p_template_ids IS NULL AND p_type IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  --
  v_stmt := 'SELECT *
             FROM templates.templates_ver t
             WHERE t.is_last = 1::bit
               AND t.deactivation_ver_id IS NULL ';

  IF p_template_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.template_id = ANY($1) ';
  END IF;

  IF p_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.type = $2 ';
  END IF;

  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF p_max_nor IS NOT NULL
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $3 + 1';

    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING p_template_ids, p_type, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;

  v_stmt := v_stmt || ' ORDER BY t.template_id LIMIT $3 OFFSET $4 - 1 ';

  v_stmt := 'SELECT array_agg(t.*) FROM ( ' || v_stmt || ' )t ';

  EXECUTE v_stmt
  INTO v_templates
  USING p_template_ids, p_type, p_page_size, p_start_index;

  OPEN p_ref_templates FOR
  SELECT
    template_id,
    template_ver_id,
    name,
    document_text,
    is_boolean,
    file_content,
    type,
    status
  FROM unnest(v_templates);

  IF p_load_sub_templates
  THEN
  
    OPEN p_ref_sub_templates FOR
    SELECT *
    FROM templates.sub_templates_ver st
    WHERE st.is_last = 1 :: BIT
          AND st.deactivation_ver_id IS NULL
          AND st.template_id IN (SELECT t.template_id
                                 FROM unnest(v_templates) t);
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_templates_search_dynamic (OID = 19674) : 
--
CREATE FUNCTION templates.f_templates_search_dynamic (
  p_template_ids integer[],
  p_name character varying,
  p_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_templates refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_start_index IS NULL OR p_page_size IS NULL OR
      (p_template_ids IS NULL AND p_name IS NULL AND p_type IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := ' SELECT
                t.template_id,
                t.name,
                t.document_text,
                t.is_boolean,
                t.file_content,
                t.type,
                t.status
              FROM templates.templates t
              WHERE 1 = 1
             ';

  IF p_template_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.template_id = ANY($1)
	';
  END IF;

  IF p_name IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.name LIKE concat($2, ''%'')
	';
  END IF;

  IF p_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.type = $3
	';
  END IF;

  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ';

    IF p_max_nor IS NOT NULL
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $4 + 1';

    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING p_template_ids, p_name, p_type, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;

  END IF;

  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt
             ORDER BY tt.template_id LIMIT $4 OFFSET $5 - 1';

  OPEN p_ref_templates FOR EXECUTE v_stmt USING p_template_ids, p_name, p_type, p_page_size, p_start_index;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_templates_search_dynamic_multy_cursor (OID = 19675) : 
--
CREATE FUNCTION templates.f_templates_search_dynamic_multy_cursor (
  p_template_ids integer[],
  p_name character varying,
  p_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  p_load_sub_templates boolean,
  out p_count integer,
  out p_ref_templates refcursor,
  out p_ref_sub_templates refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
  tt_templates templates.TEMPLATES [];
BEGIN
  -- Проверка на параметрите.
  -- Тук според бизнес анализа може да се изредят всичките входящи параметри.
  IF p_start_index IS NULL OR p_page_size IS NULL OR
      (p_template_ids IS NULL AND p_name IS NULL AND p_type IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := '
   SELECT
    t.template_id,
    t.name,
    t.document_text,
    t.is_boolean,
    t.file_content,
    t.type,
    t.created_by,
    t.created_on,
    t.updated_by,
    t.updated_on,
    t.status
   FROM templates.templates t
   WHERE 1 = 1
   ';

  IF p_template_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.template_id = ANY($1)
	  ';
  END IF;

  IF p_name IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.name LIKE concat($2, ''%'')
      ';
  END IF;

  IF p_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.type = $3
      ';
  END IF;

  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM ( ' || v_stmt || ' ) tt';

    IF p_max_nor IS NOT NULL
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $4 + 1';

    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING p_template_ids, p_name, p_type, p_max_nor + 1;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;

  END IF;

  v_stmt := v_stmt || ' ORDER BY t.template_id LIMIT $4 OFFSET $5 - 1
	';
  v_stmt := 'SELECT array_agg(tt.*) FROM (' || v_stmt || ') tt';

  EXECUTE v_stmt
  INTO tt_templates
  USING p_template_ids, p_name, p_type, p_page_size, p_start_index;

  OPEN p_ref_templates FOR
  SELECT
    t.template_id,
    t.name,
    t.document_text,
    t.is_boolean,
    t.type,
    t.status
  FROM unnest(tt_templates) t;

  IF p_load_sub_templates
  THEN
    OPEN p_ref_sub_templates FOR
    SELECT st.*
    FROM templates.sub_templates st
    WHERE st.template_id IN (SELECT template_id FROM unnest(tt_templates));
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_template_contents_upload_chunks (OID = 19679) : 
--
CREATE FUNCTION templates.f_template_contents_upload_chunks (
  p_content_id integer,
  p_content bytea,
  p_offset integer,
  p_length integer
)
RETURNS void
AS 
$body$
DECLARE
	v_userid int;
	v_OldContent BYTEA;
BEGIN
  IF (p_content_id IS NULL)
  	THEN
		RAISE EXCEPTION 'PARAMETER ERROR --> %', 'p_content_id';
  END IF;

  SELECT CONTENT INTO v_OldContent FROM templates.template_contents where content_id = p_content_id;
  
  IF (v_OldContent IS NULL OR p_content IS NULL)
  		THEN
			UPDATE templates.template_contents
			SET
				"content"	= p_content
			WHERE content_id = p_content_id;
  ELSE
  		UPDATE templates.template_contents
			SET
				"content"	= overlay(content placing p_content from p_offset for p_length)
			WHERE content_id = p_content_id;
  END IF;
  END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_templates_ver_delete (OID = 19685) : 
--
CREATE FUNCTION templates.f_templates_ver_delete (
  p_template_id integer,
  out p_template_ver_id integer
)
RETURNS integer
AS 
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_template_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- определяне на версия
  p_template_ver_id := f_get_next_version_id();
  
  -- деактивиране на последна версия
  UPDATE templates.templates_ver v
  SET
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp(),
    deactivation_ver_id = p_template_ver_id
  WHERE template_id = p_template_id
    AND is_last = 1::bit -- последна версия
    AND deactivation_ver_id IS NULL; -- версията не е деактивирана

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
-- Comments
--
COMMENT ON FUNCTION templates.f_templates_delete (p_template_id integer) IS 'Функция за изтриване на шаблон.';
COMMENT ON FUNCTION templates.f_templates_search (p_template_ids integer[], p_type smallint, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_templates refcursor) IS 'Функция за търсене на шаблони.';
COMMENT ON FUNCTION templates.f_templates_ver_search (p_template_ids integer[], p_type smallint, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_templates refcursor) IS 'Функция за търсене на шаблони с версии.';
COMMENT ON FUNCTION templates.f_templates_ver_search_dynamic (p_template_ids integer[], p_type smallint, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_templates refcursor) IS 'Функция за търсене на шаблони с версии, динамична.';
COMMENT ON FUNCTION templates.f_templates_ver_search_dynamic_multy_cursor (p_template_ids integer[], p_type smallint, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, p_load_sub_templates boolean, out p_count integer, out p_ref_templates refcursor, out p_ref_sub_templates refcursor) IS 'Функция за търсене на шаблони с версии, динамична с повече от един курсора.';
COMMENT ON FUNCTION templates.f_templates_search_dynamic (p_template_ids integer[], p_name varchar, p_type smallint, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_templates refcursor) IS 'Функция за търсене на шаблони, динамична.';
COMMENT ON FUNCTION templates.f_templates_search_dynamic_multy_cursor (p_template_ids integer[], p_name varchar, p_type smallint, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, p_load_sub_templates boolean, out p_count integer, out p_ref_templates refcursor, out p_ref_sub_templates refcursor) IS 'Функция за търсене на шаблони, динамична с повече от един курсора.';
COMMENT ON FUNCTION templates.f_templates_ver_delete (p_template_id integer, out p_template_ver_id integer) IS 'Функция за изтриване на шаблони с версии.';
