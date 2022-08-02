-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



--
-- Definition for function f_n_s_special_access_user_types_search (OID = 90290) :
--
SET search_path = usr, pg_catalog;
SET check_function_bodies = false;
CREATE FUNCTION usr.f_n_s_special_access_user_types_search (
  p_special_access_user_types_ids integer[],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_special_access_user_types refcursor
)
RETURNS record
AS
$body$
BEGIN
  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR (p_start_index IS NOT NULL AND p_page_size IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  --
  IF (p_special_access_user_types_ids IS NOT NULL)
  THEN
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_special_access_user_types t
      WHERE t.user_type_id = ANY (p_special_access_user_types_ids);


    END IF;

    OPEN p_ref_special_access_user_types FOR
    SELECT t.*
    FROM usr.n_s_special_access_user_types t
    WHERE t.user_type_id = ANY (p_special_access_user_types_ids)
    ORDER BY t.user_type_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;


  ELSE -- p_permission_ids IS NULL
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_special_access_user_types t;

    END IF;

    OPEN p_ref_special_access_user_types FOR
    SELECT t.*
    FROM usr.n_s_special_access_user_types t
    ORDER BY t.user_type_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;

  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_users_update (OID = 90361) :
--
CREATE FUNCTION usr.f_users_update (
  p_user_id integer,
  p_first_name character varying,
  p_middle_name character varying,
  p_family_name character varying,
  p_contact_data character varying,
  p_organization character varying,
  p_special_user_access_type integer,
  p_cr_bulletin_acceptance boolean,
  p_pr_bulletin_acceptance boolean,
  p_status integer
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE usr.users u
  SET
    first_name = p_first_name,
    middle_name = p_middle_name,
    family_name = p_family_name,
    contact_data = p_contact_data,
    organization = p_organization,
    special_access_user_type = p_special_user_access_type,
    cr_bulletin_acceptance = p_cr_bulletin_acceptance,
    pr_bulletin_acceptance = p_pr_bulletin_acceptance,
    status = p_status,
    updated_by    = v_user_id,
    updated_on    = sys.f_current_timestamp()
  WHERE u.user_id  = p_user_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_users_delete (OID = 90487) :
--
CREATE FUNCTION usr.f_users_delete (
  p_user_id integer
)
RETURNS void
AS
$body$
DECLARE
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива
  DELETE
    FROM usr.users u
   WHERE u.user_id = p_user_id
     AND u.is_system = FALSE;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е изтрит точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_permissions_search (OID = 90552) :
--
CREATE FUNCTION usr.f_user_permissions_search (
  p_users_ids integer[],
  out p_users_permission_ids refcursor
)
RETURNS refcursor
AS
$body$
DECLARE

BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_users_ids IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;


  OPEN p_users_permission_ids FOR
  SELECT u.*
    FROM usr.user_permissions u
   WHERE u.user_id = ANY (p_users_ids)
     AND u.is_active = TRUE
  ORDER BY u.user_id, u.permission_id;


END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_access_request_docs_delete (OID = 90572) :
--
CREATE FUNCTION usr.f_user_access_request_docs_delete (
  p_doc_id integer
)
RETURNS void
AS
$body$
DECLARE
  v_count NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_doc_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтриване на запис
  DELETE
  FROM usr.user_access_request_docs
  WHERE doc_id = p_doc_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е изтрит точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_access_request_docs_content_read (OID = 90575) :
--
CREATE FUNCTION usr.f_user_access_request_docs_content_read (
  p_doc_id integer,
  out p_content bytea
)
RETURNS bytea
AS
$body$
BEGIN
  -- проверка на параметрите
  IF (p_doc_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  SELECT t.content
  INTO p_content
  FROM usr.user_access_request_docs t
  WHERE t.doc_id = p_doc_id;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_access_requests_create (OID = 90576) :
--
CREATE FUNCTION usr.f_user_access_requests_create (
  p_user_id integer,
  out p_request_id integer
)
RETURNS integer
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO usr.user_access_requests(
       user_id,
       access_status,
       processing_date,
       created_by,
       created_on,
       updated_by,
       updated_on
  )
  VALUES
  (
    p_user_id,
    0,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING request_id
    INTO p_request_id;



END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_access_requests_update (OID = 90579) :
--
CREATE FUNCTION usr.f_user_access_requests_update (
  p_request_id integer,
  p_access_status smallint
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_request_id IS NULL OR p_access_status IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE usr.user_access_requests u
     SET access_status  = p_access_status,
         processing_date = sys.f_current_timestamp(),
         updated_by    = v_user_id,
         updated_on    = sys.f_current_timestamp()
   WHERE request_id  = p_request_id
     AND access_status = 0;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_authentications_delete (OID = 90625) :
--
CREATE FUNCTION usr.f_user_authentications_delete (
  p_authentication_id integer
)
RETURNS void
AS
$body$
DECLARE
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_authentication_id IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтриване
  DELETE
  FROM usr.user_authentications
  WHERE authentication_id = p_authentication_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е изтрит точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_access_request_docs_create (OID = 90645) :
--
CREATE FUNCTION usr.f_user_access_request_docs_create (
  p_request_id integer,
  p_name character varying,
  p_file_size integer,
  p_content_type character varying,
  p_content bytea,
  out p_doc_id integer
)
RETURNS integer
AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_request_id IS NULL OR p_name IS NULL OR p_file_size IS NULL OR p_content_type IS NULL OR p_content IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO usr.user_access_request_docs(
    request_id,
    name,
    file_size,
    content_type,
    content,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_request_id,
    p_name,
    p_file_size,
    p_content_type,
    p_content,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING doc_id into p_doc_id;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_authentications_search (OID = 90647) :
--
CREATE FUNCTION usr.f_user_authentications_search (
  p_authentication_id integer[],
  p_user_id integer,
  p_authentication_type smallint,
  p_username varchar,
  out p_user_authentications refcursor
)
RETURNS refcursor
AS
$body$
BEGIN
  -- Проверка за невалидни входящи параметри
  IF (( p_authentication_id IS NOT NULL AND p_user_id IS NOT NULL) OR
      ( p_authentication_id IS NULL AND p_user_id IS NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_authentication_id IS NOT NULL
  THEN
  
    OPEN p_user_authentications FOR
    SELECT t.*
    FROM usr.user_authentications t
    WHERE t.authentication_id = ANY (p_authentication_id);

  ELSEIF p_user_id IS NOT NULL
  THEN
  
    OPEN p_user_authentications FOR
    SELECT t.*
    FROM usr.user_authentications t
    WHERE t.user_id = p_user_id
      AND ( p_authentication_type IS NULL OR t.authentication_type = p_authentication_type);
      
  ELSEIF p_username IS NOT NULL
  THEN
  	
    OPEN p_user_authentications FOR
    SELECT t.*
    FROM usr.user_authentications t
    WHERE t.username = p_username
      AND ( p_authentication_type IS NULL OR t.authentication_type = p_authentication_type);
 
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_users_delete_all (OID = 90650) :
--
CREATE FUNCTION usr.f_users_delete_all (
  p_user_id integer
)
RETURNS void
AS
$body$
DECLARE
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- Одит
  PERFORM usr.f_users_audit_create(p_user_id);

  -- Изтриване на всички данни
  DELETE
    FROM usr.user_access_request_docs uard
   WHERE uard.request_id in ( SELECT uar.request_id
                                FROM usr.user_access_requests uar
                               WHERE uar.user_id = p_user_id);

  DELETE
    FROM usr.user_access_requests uar
   WHERE uar.user_id = p_user_id;


  DELETE
    FROM usr.user_authentications ua
   WHERE ua.user_id = p_user_id;

  DELETE
    FROM usr.user_permissions up
   WHERE up.user_id = p_user_id;

  DELETE
    FROM usr.users u
   WHERE u.user_id = p_user_id
     AND u.is_system = FALSE;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е изтрит точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_access_request_docs_search (OID = 90687) :
--
CREATE FUNCTION usr.f_user_access_request_docs_search (
  p_doc_ids integer[],
  p_request_ids integer[],
  out p_access_request_docs refcursor
)
RETURNS refcursor
AS
$body$
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  ( p_doc_ids IS NULL AND p_request_ids IS NULL) OR ( p_doc_ids IS NOT NULL AND p_request_ids IS NOT NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_doc_ids IS NOT NULL
  THEN
    OPEN p_access_request_docs FOR
    SELECT doc_id,
           request_id,
           name,
           file_size,
           content_type,
           updated_by,
           updated_on
      FROM usr.user_access_request_docs t
      WHERE t.doc_id = ANY (p_doc_ids);

  ELSE -- p_doc_ids IS NULL AND p_request_id IS NOT NULL
    OPEN p_access_request_docs FOR
    SELECT doc_id,
           request_id,
           name,
           file_size,
           content_type,
           updated_by,
           updated_on
      FROM usr.user_access_request_docs t
      WHERE t.request_id = ANY (p_request_ids);
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_n_s_permissions_search (OID = 90753) :
--
CREATE FUNCTION usr.f_n_s_permissions_search (
  p_permission_ids integer[],
  p_permission_keys character varying[],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_permissions refcursor
)
RETURNS record
AS
$body$
BEGIN
  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR
     ( p_start_index IS NOT NULL AND p_page_size IS NULL ) OR
     ( p_permission_ids IS NOT NULL AND p_permission_keys IS NOT NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  --
  IF (p_permission_ids IS NOT NULL)
  THEN
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_permissions t
      WHERE t.permission_id = ANY (p_permission_ids);


    END IF;

    OPEN p_ref_permissions FOR
    SELECT t.*
    FROM usr.n_s_permissions t
    WHERE t.permission_id = ANY (p_permission_ids)
    ORDER BY t.order, t.permission_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;

  ELSIF (p_permission_keys IS NOT NULL) -- p_permission_ids IS NULL
  THEN
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_permissions t
      WHERE t.permission_key = ANY (p_permission_keys);


    END IF;

    OPEN p_ref_permissions FOR
    SELECT t.*
    FROM usr.n_s_permissions t
    WHERE t.permission_key = ANY (p_permission_keys)
    ORDER BY t.order, t.permission_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;

  ELSE -- p_permission_ids IS NULL AND p_permission_keys IS NULL
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_permissions t;

    END IF;

    OPEN p_ref_permissions FOR
    SELECT t.*
    FROM usr.n_s_permissions t
    ORDER BY t.order, t.permission_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;

  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_authentications_create (OID = 90760) :
--
CREATE FUNCTION usr.f_user_authentications_create (
  p_user_id integer,
  p_authentication_type smallint,
  p_password_hash character varying,
  p_username character varying,
  out p_authentication_id integer
)
RETURNS integer
AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_user_id IS NULL ) OR
     ( p_authentication_type NOT IN (1, 2, 3) ) OR
     ( p_authentication_type = 1 AND ( p_password_hash IS NULL     OR p_username IS NOT NULL )) OR
     ( p_authentication_type = 2 AND ( p_password_hash IS NOT NULL OR p_username IS NULL)) OR
     ( p_authentication_type = 3 AND ( p_password_hash IS NOT NULL OR p_username IS NOT NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO usr.user_authentications(
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
    p_user_id,
    p_authentication_type,
    p_password_hash,
    p_username,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    false,
    NULL
  )
  RETURNING authentication_id INTO p_authentication_id;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_processes_create (OID = 90850) :
--
CREATE FUNCTION usr.f_user_processes_create (
  p_process_guid character varying,
  p_process_type integer,
  p_user_id integer,
  p_invalid_after timestamp with time zone,
  out p_process_id integer
)
RETURNS integer
AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_process_guid IS NULL OR p_process_type IS NULL OR p_user_id IS NULL OR p_invalid_after IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- деактивиране на неприключили процеси за потребителя от същия тип
  UPDATE usr.user_processes p
  SET status     = 2, -- Отказан
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
  WHERE p.user_id = p_user_id
    AND p.process_type = p_process_type
    AND p.status = 0;

  -- създаване на запис
  INSERT INTO usr.user_processes(
    process_guid,
    process_type,
    user_id,
    invalid_after,
    status,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_process_guid,
    p_process_type,
    p_user_id,
    p_invalid_after,
    0, -- Неприключил
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING process_id INTO p_process_id;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_users_create (OID = 90851) :
--
CREATE FUNCTION usr.f_users_create (
  p_email character varying,
  p_first_name character varying,
  p_middle_name character varying,
  p_family_name character varying,
  p_contact_data character varying,
  p_organization character varying,
  p_special_user_access_type integer,
  p_cr_bulletin_acceptance boolean,
  p_pr_bulletin_acceptance boolean,
  p_status integer = 0,
  out p_user_id integer,
  out p_cin integer
)
RETURNS record
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_email IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  SELECT COUNT(1)
    INTO v_count
    FROM usr.users u
   where u.email =  p_email;

  -- Проверка дали е вече съществува потребител с такава електронна поща
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(4);
  END IF;

  -- създаване на запис
  INSERT INTO usr.users(
        email,
        first_name,
        middle_name,
        family_name,
        contact_data,
        organization,
        special_access_user_type,
        cr_bulletin_acceptance,
        pr_bulletin_acceptance,
        status,
        created_by,
        created_on,
        updated_by,
        updated_on,
        is_system
  )
  VALUES
  (
    p_email,
    p_first_name,
    p_middle_name,
    p_family_name,
    p_contact_data,
    p_organization,
    p_special_user_access_type,
    p_cr_bulletin_acceptance,
    p_pr_bulletin_acceptance,
    p_status,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    FALSE
  )
  RETURNING user_id, cin
    INTO p_user_id, p_cin;



END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_users_audit_create (OID = 90865) :
--
CREATE FUNCTION usr.f_users_audit_create (
  p_user_id integer
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;

BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO usr.users_audit (
    user_id,
    user_data,
    created_by,
    created_on)
  SELECT x.user_id, to_jsonb(x.*), v_user_id, sys.f_current_timestamp()
  FROM ( SELECT   u.*  AS user,
                 (SELECT json_agg(auth.*) FROM usr.user_authentications auth WHERE auth.user_id = u.user_id)  AS authentications,
                 (SELECT json_agg(perm.*) FROM usr.user_permissions perm     WHERE perm.user_id = u.user_id) AS permissions,
                 (SELECT json_agg(ar.*)   FROM usr.user_access_requests ar   WHERE ar.user_id = u.user_id) AS access_requests
         FROM usr.users u
         WHERE u.user_id = p_user_id) x ;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_processes_search (OID = 90877) :
--
CREATE FUNCTION usr.f_user_processes_search (
  p_process_ids integer[],
  p_process_guids character varying[],
  p_process_type integer,
  p_user_ids integer[],
  p_invalid_after_from timestamp with time zone,
  p_invalid_after_to timestamp with time zone,
  p_status integer,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_user_processes refcursor
)
RETURNS record
AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF  ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR
      ( p_start_index IS NOT NULL AND p_page_size IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- Сглобяване на заявката за търсене
  v_stmt := ' SELECT
                process_id,
                process_guid,
                process_type,
                user_id,
                invalid_after,
                status,
                updated_by,
                updated_on
              FROM usr.user_processes p
              WHERE 1 = 1
              ';

  IF p_process_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.process_id = ANY($1)
	';
  END IF;

  IF p_process_guids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.process_guid = ANY($2)
	';
  END IF;

  IF p_process_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.process_type = $3
	';
  END IF;

  IF p_user_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.user_id = ANY($4)
	';
  END IF;

  IF p_invalid_after_from IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.invalid_after >= $5
	';
  END IF;

  IF p_invalid_after_to IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.invalid_after >= $6
	';
  END IF;

  IF p_status IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.status = $7
	';
  END IF;

  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF (p_max_nor IS NOT NULL)
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $8 + 1';

    END IF;

    v_count_stmt := v_count_stmt || ' ) tc ';

    EXECUTE v_count_stmt
       INTO p_count
      USING p_process_ids, p_process_guids, p_process_type, p_user_ids, p_invalid_after_from, p_invalid_after_to, p_status, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;

  v_stmt := v_stmt || ' ORDER BY p.user_id LIMIT $8 OFFSET $9 - 1 ';

  OPEN p_ref_user_processes FOR EXECUTE v_stmt
  USING p_process_ids, p_process_guids, p_process_type, p_user_ids, p_invalid_after_from, p_invalid_after_to, p_status, p_page_size, p_start_index;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_access_requests_search (OID = 90878) :
--
CREATE FUNCTION usr.f_user_access_requests_search (
  p_request_ids integer[],
  p_users_ids integer[],
  p_date_from timestamp with time zone,
  p_date_to timestamp with time zone,
  p_access_status_ids integer[],
  p_email character varying,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_user_access_requests refcursor
)
RETURNS record
AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_request_ids IS NULL AND
      p_users_ids IS NULL AND
      p_date_from  IS NULL AND
      p_date_to  IS NULL AND
      p_access_status_ids IS NULL AND
      p_email  IS NULL AND
      p_start_index  IS NULL AND
      p_page_size  IS NULL AND
      p_max_nor  IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  v_stmt := 'SELECT uar.*, u.cin, u.email, u.first_name, u.middle_name, u.family_name
               FROM usr.user_access_requests uar,
                    usr.users u
              WHERE uar.user_id = u.user_id';

  IF p_request_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.request_id = ANY($1) ';
  END IF;

  IF p_users_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.user_id = ANY($2) ';
  END IF;



  IF p_date_from IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.created_on >= $3 ';
  END IF;

  IF p_date_to IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.created_on  <=  $4 ';
  END IF;

  IF p_access_status_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.access_status = ANY($5) ';
  END IF;

  IF p_email IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND u.email = $6 ';
  END IF;


  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF (p_max_nor IS NOT NULL)
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $7 + 1';

    END IF;

    v_count_stmt := v_count_stmt || ' ) tc ';

    EXECUTE v_count_stmt
       INTO p_count
      USING p_request_ids, p_users_ids, p_date_from, p_date_to, p_access_status_ids, p_email, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;

  v_stmt := v_stmt || ' ORDER BY u.user_id LIMIT $7 OFFSET $8 - 1 ';

  OPEN p_ref_user_access_requests FOR EXECUTE v_stmt
  USING p_request_ids, p_users_ids, p_date_from, p_date_to, p_access_status_ids, p_email, p_page_size, p_start_index;


END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_permissions_delete (OID = 90892) :
--
CREATE FUNCTION usr.f_user_permissions_delete (
  p_user_id integer,
  p_permission_id integer[]
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL OR p_permission_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;


 -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();


 -- update-ва
  UPDATE usr.user_permissions u
     SET is_active   = FALSE ,
         updated_by  = v_user_id,
         updated_on  = sys.f_current_timestamp()
   WHERE u.user_id = p_user_id
     AND u.permission_id =  ANY( p_permission_id )
     AND u.is_active = TRUE;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е променен точно един запис
  IF v_count != array_length(p_permission_id::INTEGER[], 1)
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_permissions_create (OID = 90893) :
--
CREATE FUNCTION usr.f_user_permissions_create (
  p_user_id integer,
  p_permission_id integer[]
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL OR p_permission_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO usr.user_permissions(
      user_id,
      permission_id,
      is_active,
      created_by,
      created_on,
      updated_by,
      updated_on
  )
  SELECT
    p_user_id,
    p.permission_id,
    TRUE,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  FROM ( SELECT UNNEST(p_permission_id) AS permission_id) p;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_failed_login_attempts_create (OID = 91266) :
--
CREATE FUNCTION usr.f_user_failed_login_attempts_create (
  p_authentication_type smallint,
  p_login_name character varying,
  p_additional_data character varying,
  p_failed_login_attempts integer,
  out p_attempt_id integer
)
RETURNS integer
AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_authentication_type IS NULL OR p_failed_login_attempts IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO usr.user_failed_login_attempts(
    authentication_type,
    login_name,
    additional_data,
    failed_login_attempts,
    is_active,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_authentication_type,
    p_login_name,
    p_additional_data,
    p_failed_login_attempts,
    true,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING attempt_id INTO p_attempt_id;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_failed_login_attempts_update (OID = 91270) :
--
CREATE FUNCTION usr.f_user_failed_login_attempts_update (
  p_attempt_id integer,
  p_authentication_type smallint,
  p_login_name character varying,
  p_additional_data character varying,
  p_failed_login_attempts integer
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_attempt_id IS NULL OR p_authentication_type IS NULL OR p_failed_login_attempts IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- промяна на данните
  UPDATE usr.user_failed_login_attempts
  SET authentication_type = p_authentication_type,
      login_name = p_login_name,
      additional_data = p_additional_data,
      failed_login_attempts = p_failed_login_attempts,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
  WHERE attempt_id = p_attempt_id
    AND is_active = true;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_failed_login_attempts_delete (OID = 91272) :
--
CREATE FUNCTION usr.f_user_failed_login_attempts_delete (
  p_attempt_id integer
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_attempt_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- деактивиране на запис
  UPDATE usr.user_failed_login_attempts
  SET is_active = false,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
  WHERE attempt_id = p_attempt_id
    AND is_active = true;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_failed_login_attempts_search (OID = 91276) :
--
CREATE FUNCTION usr.f_user_failed_login_attempts_search (
  p_attempt_id integer[],
  p_login_name character varying,
  out p_failed_login_attempts refcursor
)
RETURNS refcursor
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF (( p_attempt_id IS NOT NULL AND p_login_name IS NOT NULL) OR
      ( p_attempt_id IS NULL AND p_login_name IS NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_attempt_id IS NOT NULL
  THEN

    OPEN p_failed_login_attempts FOR
    SELECT t.*
    FROM usr.user_failed_login_attempts t
    WHERE t.attempt_id = ANY (p_attempt_id);

  ELSE -- p_attempt_id IS NULL AND p_login_name IS NOT NULL

    OPEN p_failed_login_attempts FOR
    SELECT t.*
    FROM usr.user_failed_login_attempts t
    WHERE t.login_name = p_login_name
      AND t.is_active = true;

  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_user_authentications_update (OID = 91281) :
--
CREATE FUNCTION usr.f_user_authentications_update (
  p_authentication_id integer,
  p_authentication_type smallint,
  p_password_hash character varying,
  p_username character varying,
  p_is_locked boolean,
  p_locked_until timestamp with time zone
)
RETURNS void
AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_authentication_id IS NULL ) OR
     ( p_authentication_type NOT IN (1, 2, 3) ) OR
     ( p_authentication_type = 1 AND ( p_password_hash IS NULL     OR p_username IS NOT NULL )) OR
     ( p_authentication_type = 2 AND ( p_password_hash IS NOT NULL OR p_username IS NULL)) OR
     ( p_authentication_type = 3 AND ( p_password_hash IS NOT NULL OR p_username IS NOT NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- промяна на данните
  UPDATE usr.user_authentications
     SET password_hash = p_password_hash,
         username      = p_username,
         is_locked     = p_is_locked,
         locked_until  = p_locked_until,
         updated_by    = v_user_id,
         updated_on    = sys.f_current_timestamp()
  WHERE authentication_id = p_authentication_id
    AND authentication_type = p_authentication_type;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_users_search (OID = 91290) :
--
CREATE FUNCTION usr.f_users_search (
  p_users_ids integer[],
  p_cin integer,
  p_email character varying,
  p_username character varying,
  p_first_name character varying,
  p_middle_name character varying,
  p_family_name character varying,
  p_special_access_user_type integer[],
  p_status integer[],
  p_date_from date,
  p_date_to date,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_users refcursor
)
RETURNS record
AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_users_ids IS NULL AND
      p_cin  IS NULL AND
      p_email  IS NULL AND
      p_username  IS NULL AND
      p_first_name  IS NULL AND
      p_middle_name  IS NULL AND
      p_family_name  IS NULL AND
      p_special_access_user_type  IS NULL AND
      p_status  IS NULL AND
      p_date_from  IS NULL AND
      p_date_to  IS NULL AND
      p_start_index  IS NULL AND
      p_page_size  IS NULL AND
      p_max_nor  IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --


  IF (p_users_ids is not null ) then

     IF (p_calculate_count = TRUE)
      THEN

        SELECT COUNT(*)
        INTO p_count
        FROM usr.users u
        WHERE u.user_id = ANY (p_users_ids);

      END IF;

      OPEN p_ref_users FOR
      SELECT u.user_id,
             u.cin,
             u.contact_data,
             u.email,
             u.first_name,
             u.family_name,
             u.middle_name,
             u.organization,
             u.status,
             u.created_by,
             u.created_on,
             u.updated_by,
             u.updated_on,
             (SELECT ua.username
                FROM usr.user_authentications ua
               WHERE ua.user_id = u.user_id
                 AND ua.authentication_type = 2)
        FROM usr.users u
       WHERE u.user_id = ANY (p_users_ids)
         AND u.is_system = FALSE
      ORDER BY u.user_id
      LIMIT p_page_size
      OFFSET p_start_index - 1;

    ELSE
  /*
    v_stmt := 'SELECT u.*, ua.username
                 FROM usr.users u,
                      usr.user_authentications ua
                WHERE u.is_system = FALSE
                  AND ua.user_id = u.user_id';
*/
        v_stmt := 'SELECT u.user_id,
                          u.cin,
                          u.contact_data,
                          u.email,
                          u.first_name,
                          u.family_name,
                          u.middle_name,
                          u.organization,
                          u.status,
                          u.created_by,
                          u.created_on,
                          u.updated_by,
                          u.updated_on,
                          ( SELECT ua.username
                              FROM usr.user_authentications ua
                             WHERE ua.user_id = u.user_id
                               AND ua.authentication_type = 2)
                     FROM usr.users u
                    WHERE u.is_system = FALSE ';


    IF p_cin IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.cin = $1 ';
    END IF;

    IF p_email IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.email = $2 ';
    END IF;

     IF p_username IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND EXISTS (SELECT 1 FROM usr.user_authentications ua WHERE ua.user_id = u.user_id AND  ua.username LIKE concat($3, ''%'')  AND ua.authentication_type = 2) ';
    END IF;

    IF p_first_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.first_name  LIKE concat($4, ''%'')   ';
    END IF;

    IF p_middle_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.middle_name  LIKE concat($5, ''%'')   ';
    END IF;

    IF p_family_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.family_name  LIKE concat($6, ''%'')    ';
    END IF;

    IF p_special_access_user_type IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.special_access_user_type = ANY($7) ';
    END IF;

    IF p_status IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.status = ANY($8) ';
    END IF;


    IF p_date_from IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.updated_on >= $9 ';
    END IF;

    IF p_date_to IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.updated_on <= $10 ';
    END IF;


    IF p_calculate_count
    THEN
      v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

      IF (p_max_nor IS NOT NULL)
      THEN
        v_count_stmt := v_count_stmt || '
                                LIMIT $11 + 1';

      END IF;

      v_count_stmt := v_count_stmt || ' ) tc ';

      EXECUTE v_count_stmt
      INTO p_count
      USING p_cin, p_email, p_username, p_first_name, p_middle_name, p_family_name, p_special_access_user_type, p_status, p_date_from, p_date_to, p_max_nor;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    v_stmt := v_stmt || ' ORDER BY u.user_id LIMIT $11 OFFSET $12 - 1 ';

    OPEN p_ref_users FOR EXECUTE v_stmt
    USING p_cin, p_email, p_username, p_first_name, p_middle_name, p_family_name, p_special_access_user_type, p_status, p_date_from, p_date_to, p_page_size, p_start_index;
 END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Comments
--
COMMENT ON FUNCTION usr.f_n_s_special_access_user_types_search (p_special_access_user_types_ids integer[], p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_special_access_user_types refcursor) IS 'Функцията връща курсор с видовете външен потребител със специален достъп, отговарящи на подадените критерии. Списъкът с права може да се страницира.
Има следните входни параметри:
 - p_special_access_user_types_ids integer [] - масив от уникални идентификатори на видове външен потребител със специален достъп, ако стойността на параметъра е NULL не се прилага филтър
 - p_start_index integer - индекс на първия елемент от страницата, ако има странициране, в противен случай стойността трябва да е NULL
 - p_page_size integer - брой записи за страница, ако има странициране, в противен случай стойността трябва да е NULL
 - p_calculate_count boolean - флаг дали да се изчислява общия брой на записите
Функцията връща record от:
 - out p_count integer - общ брой записи, отговарящи на критериите, независимо от параметрите за странициране
 - out p_ref_special_access_user_types refcursor - курсор с данни отговарящи на критериите и параметрите за странициране';
COMMENT ON FUNCTION usr.f_users_update (p_user_id integer, p_first_name varchar, p_middle_name varchar, p_family_name varchar, p_contact_data varchar, p_organization varchar, p_special_user_access_type integer, p_cr_bulletin_acceptance boolean, p_pr_bulletin_acceptance boolean, p_status integer) IS 'Редакция на потребители.';
COMMENT ON FUNCTION usr.f_users_delete (p_user_id integer) IS 'Изтрива зададен потребител.';
COMMENT ON FUNCTION usr.f_user_permissions_search (p_users_ids integer[], out p_users_permission_ids refcursor) IS 'Връща всички активни права за даден потребител/списък от потребители.';
COMMENT ON FUNCTION usr.f_user_access_request_docs_delete (p_doc_id integer) IS 'Функция за изтриване на запис за документ за специален достъп';
COMMENT ON FUNCTION usr.f_user_access_request_docs_content_read (p_doc_id integer, out p_content bytea) IS 'Функция за извличане на съдържание на документ за специален достъп';
COMMENT ON FUNCTION usr.f_user_access_requests_create (p_user_id integer, out p_request_id integer) IS 'Създаване на искане за достъп.';
COMMENT ON FUNCTION usr.f_user_access_requests_update (p_request_id integer, p_access_status smallint) IS 'Променя стратуса на искане за достъп.';
COMMENT ON FUNCTION usr.f_user_authentications_delete (p_authentication_id integer) IS 'Функция за изтриване на запис за автентикация на потребителски профил';
COMMENT ON FUNCTION usr.f_user_access_request_docs_create (p_request_id integer, p_name varchar, p_file_size integer, p_content_type varchar, p_content bytea, out p_doc_id integer) IS 'Функция за създаване на запис за документ за специален достъп';
COMMENT ON FUNCTION usr.f_user_authentications_search (p_authentication_id integer[], p_user_id integer, p_authentication_type smallint, out p_user_authentications refcursor) IS 'Функция за търсене на запис(и) за автентикация на потребителски профил';
COMMENT ON FUNCTION usr.f_users_delete_all (p_user_id integer) IS 'Функция за изтриване на всички данни за неактивен потребителски профил. Функцията прави audit запис';
COMMENT ON FUNCTION usr.f_user_access_request_docs_search (p_doc_ids integer[], p_request_ids integer[], out p_access_request_docs refcursor) IS 'Функция за търсене на запис(и) за документ(и) за специален достъп. Функцията не връща съдържанието на документа';
COMMENT ON FUNCTION usr.f_n_s_permissions_search (p_permission_ids integer[], p_permission_keys varchar[], p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_permissions refcursor) IS 'Функцията връща курсор с видовете права, отговарящи на подадените критерии. Списъкът с права може да се страницира.
Има следните входни параметри:
 - p_permission_ids integer [] - масив от уникални идентификатори на видове права, ако стойността на параметъра е NULL не се прилага филтър
 - p_start_index integer - индекс на първия елемент от страницата, ако има странициране, в противен случай стойността трябва да е NULL
 - p_page_size integer - брой записи за страница, ако има странициране, в противен случай стойността трябва да е NULL
 - p_calculate_count boolean - флаг дали да се изчислява общия брой на записите
Функцията връща record от:
 - out p_count integer - общ брой записи, отговарящи на критериите, независимо от параметрите за странициране
 - out p_ref_permissions refcursor - курсор с данни отговарящи на критериите и параметрите за странициране';
COMMENT ON FUNCTION usr.f_user_authentications_create (p_user_id integer, p_authentication_type smallint, p_password_hash varchar, p_username varchar, out p_authentication_id integer) IS 'Функция за създаване на запис за автентикация на потребителски профил';
COMMENT ON FUNCTION usr.f_users_create (p_email varchar, p_first_name varchar, p_middle_name varchar, p_family_name varchar, p_contact_data varchar, p_organization varchar, p_special_user_access_type integer, p_cr_bulletin_acceptance boolean, p_pr_bulletin_acceptance boolean, p_status integer, out p_user_id integer, out p_cin integer) IS 'Функция за създаване на потребител.';
COMMENT ON FUNCTION usr.f_users_audit_create (p_user_id integer) IS 'Функция за създаване на одит за потребителски профил. Данните за документите за специален достъп не се взимат';
COMMENT ON FUNCTION usr.f_user_access_requests_search (p_request_ids integer[], p_users_ids integer[], p_date_from timestamp with time zone, p_date_to timestamp with time zone, p_access_status_ids integer[], p_email varchar, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_user_access_requests refcursor) IS 'Търсене в исканията за достъп.';
COMMENT ON FUNCTION usr.f_user_permissions_delete (p_user_id integer, p_permission_id integer[]) IS 'Деактивиране на дадено право на потребител.';
COMMENT ON FUNCTION usr.f_user_permissions_create (p_user_id integer, p_permission_id integer[]) IS 'Добавяне на право към потребител.';
COMMENT ON FUNCTION usr.f_user_failed_login_attempts_create (p_authentication_type smallint, p_login_name varchar, p_additional_data varchar, p_failed_login_attempts integer, out p_attempt_id integer) IS 'Функция за създаване на запис за неуспешен опит за вход в системата';
COMMENT ON FUNCTION usr.f_user_failed_login_attempts_update (p_attempt_id integer, p_authentication_type smallint, p_login_name varchar, p_additional_data varchar, p_failed_login_attempts integer) IS 'Функция за промяна на запис за неуспешен опит за вход в системата';
COMMENT ON FUNCTION usr.f_user_failed_login_attempts_delete (p_attempt_id integer) IS 'Функция за деактивиране на запис за неуспешен опит за вход в системата';
COMMENT ON FUNCTION usr.f_user_failed_login_attempts_search (p_attempt_id integer[], p_login_name varchar, out p_failed_login_attempts refcursor) IS 'Функция за търсене на запис(и) за неуспешен опит за вход в системата';
COMMENT ON FUNCTION usr.f_user_authentications_update (p_authentication_id integer, p_authentication_type smallint, p_password_hash varchar, p_username varchar, p_is_locked boolean, p_locked_until timestamp with time zone) IS 'Функция за промяна на запис за автентикация на потребителски профил';
COMMENT ON FUNCTION usr.f_users_search (p_users_ids integer[], p_cin integer, p_email varchar, p_username varchar, p_first_name varchar, p_middle_name varchar, p_family_name varchar, p_special_access_user_type integer[], p_status integer[], p_date_from date, p_date_to date, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_users refcursor) IS 'Търсене в потребителите по зададени критерий.';
