CREATE OR REPLACE FUNCTION nom.f_d_labels_search (
  p_label_ids integer [],
  p_lang_id integer,
  p_code varchar,
  p_value varchar,
  p_load_description boolean,
  p_load_separate_value_i18n boolean,
  p_load_only_untranslated boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_last_updated_on timestamptz,
  out p_ref_labels refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
  
  BEGIN
  IF p_start_index IS NULL 
  	OR p_page_size IS NULL 
    OR p_load_description IS NULL
    OR p_load_separate_value_i18n IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  SELECT MAX(last_updated_on) INTO p_last_updated_on
  FROM nom.nomenclature_changes
  WHERE tablename = 'd_labels' OR tablename = 'd_labels_i18n';
    
  v_stmt := ' SELECT label.label_id,
  					 (CASE WHEN label_i18n.label_id IS NULL THEN 0 ELSE 1 END) as is_translated,
  					 label.code,
                  	 (CASE WHEN $1 THEN label.description END) as description,
                  	 (CASE WHEN ($2 = FALSE) THEN sys.f_search_coalesce_i18n(label_i18n.value, label.value) ELSE label.value	END) as value,
                  	 (CASE WHEN ($2) THEN label_i18n.value END) as value_i18n
                FROM nom.d_labels label
           LEFT JOIN nom.d_labels_i18n label_i18n 
                  ON (label.label_id = label_i18n.label_id 
                 AND label_i18n.language_id = $3) 
               WHERE label.is_last = 1::bit 
                 AND label.deactivation_ver_id IS NULL'; 
                  
  IF p_label_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and label.label_id = ANY($4)
	';
  END IF;  
           
  IF p_code IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and lower(label.code) LIKE concat(''%'',lower($5), ''%'')
	';
  END IF;
  
  IF p_load_only_untranslated = TRUE
  THEN
    v_stmt := v_stmt || ' and exists(select label_id from nom.d_labels_i18n i18n where i18n.label_id = label.label_id and i18n.value != ''''  and i18n.language_id = $3) = false
	';
  END IF;
  
  IF p_value IS NOT NULL
  THEN
	/*първо изпълняваме QUERY-то както е до момента и после филтрираме по VALUE, 
    защото в някои случаи във value са merge-нати стойности от "default"-ия език и друг
    и трябва да правим проверки, за да знаем дали да филтрираме LABEL.value или label_i18n.value*/
    v_stmt := ' SELECT * FROM (' || v_stmt || ') vt where lower(vt.value) LIKE concat(''%'',lower($6), ''%'')
	';
  END IF;
  
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ) tc ';

    EXECUTE v_count_stmt
    INTO p_count
    USING p_load_description, p_load_separate_value_i18n, p_lang_id, p_label_ids, p_code, p_value;

  END IF;
  
  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt 
             ORDER BY tt.value LIMIT $7 OFFSET $8 - 1';

  OPEN p_ref_labels FOR EXECUTE v_stmt USING p_load_description, 
                                             p_load_separate_value_i18n, 
                                             p_lang_id,
                                             p_label_ids,
                                             p_code, 
                                             p_value, 
                                             p_page_size, 
                                             p_start_index;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;