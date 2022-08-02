DO $$
/*
 създаване на служебен потребител и начин на вход в системата, с хеширана преди това парола - 
 писане по usr.users и usr.user_authentications.
*/
declare 
	v_user_id integer;
    v_username_and_email varchar;
    v_password_hash varchar;

BEGIN
	v_user_id := 102;
    v_username_and_email := 'epzeu.cr.api.client';
    v_password_hash := '$2a$11$lRiBgbQ2mzeaRskquuUCtes6Vo89gmAtuto18r5Qf7MIVyGX2uCtW';
    
	INSERT INTO usr.users 
    VALUES
    (
      v_user_id, 
      v_user_id,
      v_username_and_email,
      null,
      null,
      null,
      null,
      null,
      null,
      0::boolean,
      0::boolean,
      1,    
      1,
      sys.f_current_timestamp(),
      1,
      sys.f_current_timestamp(),
      FALSE,
      null,
      null,
      null);
    
    INSERT INTO usr.user_authentications (
      user_id,
      authentication_type,
      password_hash,
      username,
      created_by,
      created_on,
      updated_by,
      updated_on,
      is_locked,
      locked_until
    )
    VALUES (
      v_user_id,
      1,
      v_password_hash,
      v_username_and_email,
      1,
      sys.f_current_timestamp(),
      1,
      sys.f_current_timestamp(),
      false,
      null
    );

END$$;