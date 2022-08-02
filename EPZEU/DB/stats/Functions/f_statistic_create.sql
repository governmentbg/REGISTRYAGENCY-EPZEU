CREATE OR REPLACE FUNCTION stats.f_statistic_create (
  p_register_id smallint,
  p_name varchar,
  p_type_genarate smallint,
  p_url varchar,
  out p_statistic_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id   INTEGER;
  v_order_num INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_register_id IS NULL  OR p_name IS NULL OR p_type_genarate IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
   SELECT COALESCE(max(s.order_num),0)
    INTO v_order_num
    FROM stats.statistics s
   where s.register_id = p_register_id;
      
  -- създаване на запис
  INSERT INTO stats.statistics( 
        register_id,
		name,
		type_genarate,
		url,
		created_by,
		created_on,
		updated_by,
		updated_on, 
        order_num
  )
  VALUES
  (
    p_register_id,
    p_name,
    p_type_genarate,
    p_url,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    v_order_num + 1
  )
  RETURNING statistic_id
    INTO p_statistic_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
