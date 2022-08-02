CREATE OR REPLACE FUNCTION audit.f_log_actions_create (
  p_log_action_date timestamp,
  p_object_type_id smallint,
  p_action_type_id smallint,
  p_module_id smallint,
  p_functionality_id smallint,
  p_key varchar,
  p_user_session_id uuid,
  p_login_session_id uuid,
  p_user_id integer,
  p_user_cin integer,
  p_ip_address inet,
  p_additional_data jsonb,
  p_operation_id varchar,
  out p_log_action_id bigint
)
RETURNS bigint AS
$body$
DECLARE
  v_user_id       INTEGER;
  v_audit_user_id INTEGER;
  v_data_access_level  INTEGER;
BEGIN

  IF  p_log_action_date  IS NULL OR
      p_object_type_id   IS NULL OR
      p_action_type_id   IS NULL OR 
      p_module_id        IS NULL OR  
      p_functionality_id IS NULL OR
      (p_user_id         IS NULL AND p_user_cin IS NULL) OR
      (p_user_id         IS NOT NULL AND p_user_cin IS NOT NULL) OR
      p_ip_address       IS NULL 
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- определяне на потребител за одитиране
  v_audit_user_id :=  COALESCE(p_user_id, (SELECT user_id FROM usr.users u WHERE u.cin = p_user_cin));
  
  -- определяне на ниво на достъп до записа
  v_data_access_level = usr.f_user_access_level_get(v_audit_user_id);
  
  -- създаване на запис
  INSERT INTO audit.log_actions(
    log_action_date,
    object_type_id,
    action_type_id,
    module_id,
    functionality_id,
    key,
    user_session_id,
    login_session_id,
    user_id,
    ip_address,
    additional_data,
    created_by,
    created_on,
    updated_by,
    updated_on,
    operation_id,
    data_access_level
  )
  VALUES (
    p_log_action_date,
    p_object_type_id,
    p_action_type_id,
    p_module_id,
    p_functionality_id,
    p_key,
    p_user_session_id,
    p_login_session_id,
    v_audit_user_id,
    p_ip_address,
    p_additional_data,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    p_operation_id,
    v_data_access_level
  )
  ON CONFLICT (operation_id) DO NOTHING
  RETURNING log_action_id INTO p_log_action_id;
    
  IF p_log_action_id IS NULL
  THEN
     SELECT la.log_action_id INTO p_log_action_id
     FROM audit.log_actions la
     WHERE la.operation_id = p_operation_id;
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

