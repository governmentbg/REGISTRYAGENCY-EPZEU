CREATE OR REPLACE FUNCTION cms.f_pages_create (
  p_register_id integer,
  p_tittle varchar,
  p_content text,
  p_type integer,
  p_service_id integer,
  p_application_id integer,
  p_parent_id integer,
  p_is_group boolean,
  p_file_name varchar,
  p_file_size integer,
  p_content_type varchar,
  p_file_content bytea,
  out p_page_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id   INTEGER;
  v_count     INTEGER;
  v_order_num INTEGER;
  
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_register_id IS NULL OR p_tittle IS NULL OR p_type IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  SELECT COALESCE(max(p.order_num),0)
    INTO v_order_num
    FROM cms.pages p
   where p.parent_id = p_parent_id
     AND p.is_group = p_is_group;
      
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
  -- създаване на запис
  INSERT INTO cms.pages(register_id,
                        title,
                        content,
                        type,
                        service_id,
                        application_id,
                        parent_id,
                        order_num,
                        is_group,
                        file_name,
                        file_size,
                        content_type,
                        file_content,
                        created_by,
                        created_on,
                        updated_by,
                        updated_on)
  VALUES
  ( p_register_id,
    p_tittle,
    p_content,
    p_type,
    p_service_id,
    p_application_id,
    p_parent_id,
    v_order_num + 1,
    p_is_group,
    p_file_name,
    p_file_size,
    p_content_type,
    p_file_content,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING page_id
    INTO p_page_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
