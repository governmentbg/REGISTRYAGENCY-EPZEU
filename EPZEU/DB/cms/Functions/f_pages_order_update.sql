CREATE OR REPLACE FUNCTION cms.f_pages_order_update (
  p_pages_ids integer [],
  p_parent_id integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER := array_length(p_pages_ids, 1);
  v_pages_id    INTEGER;
  
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_pages_ids IS NULL OR p_parent_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
    FOR i in 1..v_count LOOP
      v_pages_id := p_pages_ids[i];
      
       -- update-ва
      UPDATE cms.pages p
      SET 
        order_num     = i,
        updated_by    = v_user_id,
        updated_on    = sys.f_current_timestamp()
      WHERE p.page_id  = v_pages_id
        AND p.parent_id = p_parent_id;

    
  END LOOP;

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
