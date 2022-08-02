CREATE OR REPLACE FUNCTION public.f_get_next_version_id (
)
RETURNS integer AS
$body$
DECLARE
  v_version_id INTEGER;
  v_user_id    INTEGER;
BEGIN
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис за версия
  INSERT INTO versions
  (
    created_on,
    created_by
  )
  VALUES (
    sys.f_current_timestamp(),
    v_user_id
  )
  RETURNING version_id INTO v_version_id;

  RETURN v_version_id;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
