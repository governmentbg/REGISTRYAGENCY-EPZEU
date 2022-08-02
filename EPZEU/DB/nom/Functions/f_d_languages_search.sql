CREATE OR REPLACE FUNCTION nom.f_d_languages_search (
  p_language_id integer,
  p_code varchar,
  p_name varchar,
  p_is_active boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_last_updated_on timestamptz,
  out p_ref_languages refcursor
)
RETURNS record AS
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

  SELECT last_updated_on INTO p_last_updated_on
  FROM nom.nomenclature_changes
  WHERE tablename = 'd_languages';
  
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
             ORDER BY tt.is_active desc, tt.code LIMIT $5 OFFSET $6 - 1';

  OPEN p_ref_languages FOR EXECUTE v_stmt USING p_language_id, p_code, p_name, p_is_active, p_page_size, p_start_index;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;