CREATE OR REPLACE FUNCTION stats.f_statistic_update (
  p_statistic_id integer,
  p_register_id smallint,
  p_name varchar,
  p_type_genarate smallint,
  p_url varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
  
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_statistic_id IS NULL OR p_register_id IS NULL  OR p_name IS NULL OR p_type_genarate IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();
    -- update-ва
  UPDATE stats.statistics 
     SET register_id   = p_register_id,
         name          = p_name,
         type_genarate = p_type_genarate,
         url           = p_url,
         updated_by    = v_user_id,
         updated_on    = sys.f_current_timestamp()
   WHERE statistic_id = p_statistic_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- ѕроверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
