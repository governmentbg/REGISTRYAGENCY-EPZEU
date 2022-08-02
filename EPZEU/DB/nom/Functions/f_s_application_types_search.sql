CREATE OR REPLACE FUNCTION nom.f_s_application_types_search (
  p_ids smallint [],
  p_language_id smallint,
  p_app_type varchar,
  p_name varchar,
  p_load_separate_value_i18n boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_register_id smallint,
  out p_count integer,
  out p_ref_application_types refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
  
  BEGIN
  IF p_ids IS NULL AND
     p_language_id IS NULL AND
     p_start_index IS NULL AND
  	 p_page_size IS NULL AND
     p_load_separate_value_i18n IS NULL AND
     p_register_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  v_stmt := ' SELECT t.id, 
                     (CASE WHEN i18n.id IS NULL THEN 0 ELSE 1 END) as is_translated,
                     t.app_type,
                     t.app_code,
                     t.url,
                     (CASE WHEN ($1 = FALSE) THEN sys.f_search_coalesce_i18n(i18n.name, t.name) ELSE t.name END) as name,
                     (CASE WHEN ($1) THEN i18n.name END) as name_i18n,
                     register_id
                FROM nom.s_application_types t
           LEFT JOIN nom.s_application_types_i18n i18n 
                 ON (t.id = i18n.id AND
                     i18n.language_id = $2) 
             WHERE 1 = 1         '; 
                  
  IF p_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and t.id = ANY($3)';
  END IF;
           
  IF p_app_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and t.app_type LIKE concat(''%'',$4, ''%'')';
  END IF;
  
  IF p_name IS NOT NULL
  THEN
	/*първо изпълняваме QUERY-то както е до момента и после филтрираме по VALUE, 
    защото в някои случаи във value са merge-нати стойности от "default"-ия език и друг
    и трябва да правим проверки, за да знаем дали да филтрираме LABEL.value или label_i18n.value*/
    v_stmt := ' SELECT * FROM (' || v_stmt || ') vt where lower(vt.name) LIKE concat(''%'',lower($5), ''%'')';
  END IF;
  
  IF p_register_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and t.register_id = $6 ';
  END IF;
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ) tc ';

    EXECUTE v_count_stmt
       INTO p_count
      USING p_load_separate_value_i18n, p_language_id, p_ids, p_app_type, p_name, p_register_id;

  END IF;


  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt 
             ORDER BY regexp_replace(regexp_replace(tt.app_code,''\d+'',repeat(''0'',9) || ''\&'', ''g''),''\d*(\d{9})'',''\1'', ''g'') NULLS LAST, 
                      tt.name, 
                      tt.id 
             LIMIT $7 OFFSET $8 - 1';
             
  
  OPEN p_ref_application_types FOR EXECUTE v_stmt USING p_load_separate_value_i18n, 
                                             p_language_id, 
                                             p_ids,
                                             p_app_type, 
                                             p_name, 
                                             p_register_id,
                                             p_page_size, 
                                             p_start_index;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;