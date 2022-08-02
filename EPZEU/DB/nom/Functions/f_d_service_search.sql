CREATE OR REPLACE FUNCTION nom.f_d_service_search (
  p_services_ids integer [],
  p_register_ids smallint [],
  p_statuses integer [],
  p_name varchar,
  p_app_type_ids smallint [],
  p_lang_id integer,
  p_load_description boolean,
  p_load_short_description boolean,
  p_load_separate_value_i18n boolean,
  p_load_only_untranslated boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_last_updated_on timestamptz,
  out p_ref_services refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_services_ids IS NULL AND
      p_register_ids IS NULL AND 
      p_statuses     IS NULL AND  
      p_name         IS NULL AND  
      p_app_type_ids IS NULL AND
      p_start_index  IS NULL AND
      p_page_size    IS NULL       
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  
  SELECT MAX(last_updated_on) 
    INTO p_last_updated_on
    FROM nom.nomenclature_changes
   WHERE tablename = 'd_services' OR tablename = 'd_services_i18n' OR tablename = 'd_iisda_services';
    
  IF (p_services_ids is not null ) then
   
     IF (p_calculate_count = TRUE)
      THEN
        
        SELECT COUNT(*)
          INTO p_count
          FROM nom.d_services s
         WHERE s.service_id = ANY (p_services_ids);
          
      END IF;
      
      OPEN p_ref_services FOR
      SELECT ds.service_id,
             (CASE WHEN ds_i18n.service_id IS NULL THEN 0 ELSE 1 END) as is_translated,
             ds.register_id,
             ds.app_type_id,
             ds.service_type_ids,
             ds.payment_type_ids,
             ds.status_date,
             ds.status,
             ds.pending_status_date,
             ds.pending_status,
             ds.created_by,
             ds.created_on,
             ds.updated_by,
             ds.updated_on,
             ds.is_adm,
             iisdas.iisda_service_id, 
             (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n(ds_i18n.name, iisdas.name, ds.name) ELSE sys.f_search_coalesce_i18n(iisdas.name, ds.name) END) as name,
             (CASE WHEN (p_load_separate_value_i18n ) THEN ds_i18n.name END) as name_i18n,
             (CASE WHEN (p_load_description) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE ) THEN sys.f_search_coalesce_i18n(ds_i18n.description, iisdas.description, ds.description) ELSE sys.f_search_coalesce_i18n(iisdas.description, ds.description) END) END) as description,
             (CASE WHEN (p_load_description AND p_load_separate_value_i18n ) THEN ds_i18n.description END) as description_i18n,
             (CASE WHEN (p_load_short_description) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n(ds_i18n.short_description,iisdas.short_description, ds.short_description) 
                   ELSE sys.f_search_coalesce_i18n(iisdas.short_description, ds.short_description) END) END) as short_description,
             (CASE WHEN ( p_load_short_description AND p_load_separate_value_i18n ) THEN ds_i18n.short_description END) as short_description_i18n,
             iisdas.service_number,
             iisdas.read_date,
             iisdas.is_discontinued,
             iisdas.has_epayment
        FROM nom.d_services ds
      LEFT JOIN nom.d_iisda_services iisdas ON (ds.iisda_service_id = iisdas.iisda_service_id )
      LEFT JOIN nom.d_services_i18n ds_i18n ON (ds.service_id = ds_i18n.service_id AND ds_i18n.language_id = p_lang_id)
      WHERE ds.service_id = ANY (p_services_ids)
      ORDER BY ds.register_id, iisdas.name, ds.name
       LIMIT p_page_size
      OFFSET p_start_index - 1;      
      
 ELSE
            v_stmt := ' SELECT ds.service_id,
                       (CASE WHEN ds_i18n.service_id IS NULL THEN 0 ELSE 1 END) as is_translated,   
                       ds.register_id,
                       ds.app_type_id,
                       ds.service_type_ids,
                       ds.payment_type_ids,
                       ds.status_date,
                       ds.status,
                       ds.pending_status_date,
                       ds.pending_status,
                       ds.created_by,
                       ds.created_on,
                       ds.updated_by,
                       ds.updated_on,
                       ds.is_adm,
                       iisdas.iisda_service_id, 
                       (CASE WHEN ($2 = FALSE) THEN sys.f_search_coalesce_i18n(ds_i18n.name, iisdas.name, ds.name) ELSE sys.f_search_coalesce_i18n(iisdas.name, ds.name) END) as name,
                       (CASE WHEN ($2 ) THEN ds_i18n.name END) as name_i18n,
                       (CASE WHEN ($1) THEN (CASE WHEN ($2 = FALSE) THEN sys.f_search_coalesce_i18n(ds_i18n.description,iisdas.description, ds.description)
                             ELSE sys.f_search_coalesce_i18n(iisdas.description, ds.description) END) END)  as description,
                       (CASE WHEN ($1 AND $2 ) THEN ds_i18n.description END) as description_i18n,
                       (CASE WHEN ($3) THEN (CASE WHEN ($2 = FALSE) THEN sys.f_search_coalesce_i18n(ds_i18n.short_description,iisdas.short_description, ds.short_description)
                             ELSE sys.f_search_coalesce_i18n(iisdas.short_description, ds.short_description) END) END) as short_description,
                       (CASE WHEN ($3 AND $2 ) THEN ds_i18n.short_description END) as short_description_i18n,                                              
                       iisdas.service_number,
                       iisdas.read_date,
                       iisdas.is_discontinued,
                       iisdas.has_epayment
                  FROM nom.d_services ds
                LEFT JOIN nom.d_iisda_services iisdas ON (ds.iisda_service_id = iisdas.iisda_service_id )
                LEFT JOIN nom.d_services_i18n ds_i18n ON (ds.service_id = ds_i18n.service_id AND ds_i18n.language_id = $4)
                WHERE 1 = 1 ';
      
      
    IF p_register_ids IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND ds.register_id = ANY($5) ';
    END IF;

    IF p_statuses IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND ds.status = ANY($6) ';
    END IF;
    
    IF p_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(coalesce(iisdas.name, ds.name)) LIKE concat(''%'',lower($7), ''%'')';
    END IF;
    
    IF p_app_type_ids IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND ds.app_type_id = ANY($8) ';
    END IF;
    
    IF p_load_only_untranslated = TRUE
    THEN
       v_stmt := v_stmt || ' and not exists (select 1 from nom.d_services_i18n where service_id = ds.service_id and language_id = $4) ';
    END IF;
  
    IF p_calculate_count
    THEN
      v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

      v_count_stmt := v_count_stmt || ' ) tc ';
      
      EXECUTE v_count_stmt
         INTO p_count
        USING p_load_description, p_load_separate_value_i18n, p_load_short_description, p_lang_id, p_register_ids, p_statuses, p_name, p_app_type_ids;

    END IF;

    v_stmt := v_stmt || ' ORDER BY ds.register_id, iisdas.name, ds.name LIMIT $9 OFFSET $10 - 1 ';

    OPEN p_ref_services FOR EXECUTE v_stmt
    USING p_load_description, p_load_separate_value_i18n, p_load_short_description, p_lang_id, p_register_ids, p_statuses, p_name, p_app_type_ids, p_page_size, p_start_index;
 END IF;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
