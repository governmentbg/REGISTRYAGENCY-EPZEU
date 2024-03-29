-- SQL Manager for PostgreSQL 5.9.4.51539
-- ---------------------------------------
-- Host      : vm-av-epzeu-db2.dev.local
-- Database  : epzeu_dev
-- Version   : PostgreSQL 11.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-36), 64-bit



--
-- Definition for function buffer_notify_n_s_email_templates (OID = 31652) : 
--
SET search_path = eml, pg_catalog;
SET check_function_bodies = false;
CREATE FUNCTION eml.buffer_notify_n_s_email_templates (
)
RETURNS trigger
AS 
$body$
DECLARE
notification json;

BEGIN

notification = json_build_object(
                          'tableName','eml.n_s_email_templates');
						
PERFORM pg_notify('cache_invalidation',  notification::text);
RETURN NULL;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_emails_search (OID = 31654) : 
--
CREATE OR REPLACE FUNCTION eml.f_emails_search(
	p_priority smallint,
	p_status smallint,
	p_is_do_not_process_before_expired boolean,
	p_start_index integer,
	p_page_size integer,
	p_calculate_count boolean,
	p_operation_id character varying,
	OUT p_count integer,
	OUT ref_emails refcursor)
    RETURNS record
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_start_index IS NULL OR p_page_size IS NULL OR
      (p_priority IS NULL AND p_status IS NULL AND p_is_do_not_process_before_expired IS NULL AND p_operation_id)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := ' SELECT
                t.email_id,
                t.priority,
                t.status,
                t.try_count,
                t.send_date,
                t.subject,
                t.body,
                t.is_body_html,
                t.sending_provider_name,
                t.recipients
              FROM eml.email_messages t
              WHERE 1 = 1
             ';

  IF p_priority IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.priority = $1
	';
  END IF;

  IF p_status IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.status = $2
	';
  END IF;
  
  IF p_is_do_not_process_before_expired IS NOT NULL
  THEN
		IF p_is_do_not_process_before_expired
        THEN
          v_stmt := v_stmt || ' AND (t.do_not_process_before IS NULL
                              OR do_not_process_before <= sys.f_current_timestamp())
			';
            ELSE
                v_stmt := v_stmt || ' AND (t.do_not_process_before IS NOT NULL
                              AND do_not_process_before > sys.f_current_timestamp())
			';
            END IF;
  END IF;
  
  IF p_operation_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.operation_id = $4
	';
  END IF;

  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ';

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING p_priority, p_status, p_is_do_not_process_before_expired, p_operation_id;

  END IF;

  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt
             ORDER BY tt.email_id LIMIT $5 OFFSET $6 - 1';

  OPEN ref_emails FOR EXECUTE v_stmt USING p_priority, p_status, p_is_do_not_process_before_expired, p_operation_id, p_page_size, p_start_index;

END;
$BODY$;
LANGUAGE plpgsql;
--
-- Definition for function f_emails_send_attempt (OID = 31655) : 
--
CREATE FUNCTION eml.f_emails_send_attempt (
  p_email_id integer,
  p_is_send boolean,
  out p_is_failed boolean
)
RETURNS boolean
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_email_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  		UPDATE eml.email_messages 
		SET
			status				= CASE WHEN p_is_send THEN 2 
										WHEN NOT p_is_send AND try_count = 1 THEN 3 
										ELSE 1 END,
			try_count				= CASE WHEN p_is_send THEN try_count ELSE try_count - 1 END,
            send_date				= CASE WHEN p_is_send THEN sys.f_current_timestamp() ELSE NULL END,
            do_not_process_before	= CASE WHEN p_is_send 
										THEN do_not_process_before 
										ELSE sys.f_current_timestamp() + '10 minute'::INTERVAL END,
			UPDATED_BY = v_user_id,
			UPDATED_ON = sys.f_current_timestamp()
		WHERE 
			email_id = p_email_id
		AND status = 1;
        
      SELECT (CASE WHEN STATUS = 3 THEN TRUE ELSE FALSE END)
      FROM eml.EMAIL_MESSAGES
      WHERE email_id = p_email_id
      INTO p_is_failed;
      
      
      
  
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_n_s_email_templates_search (OID = 31656) : 
--
CREATE FUNCTION eml.f_n_s_email_templates_search (
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_templates refcursor
)
RETURNS record
AS 
$body$
BEGIN
  -- Проверка на параметрите.
  IF p_start_index IS NULL OR p_page_size IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_calculate_count
  THEN
    SELECT COUNT(*)
    INTO p_count
    FROM eml.n_s_email_templates t;

  END IF;

  OPEN p_ref_templates FOR
  SELECT t.*
  FROM eml.n_s_email_templates t
  ORDER BY t.template_id
  LIMIT p_page_size
  OFFSET p_start_index - 1;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_emails_get_pending (OID = 87968) : 
--
CREATE FUNCTION eml.f_emails_get_pending (
  "p_MaxFetched" integer
)
RETURNS SETOF email_messages
AS 
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  
  RETURN QUERY SELECT 
  * 
  FROM eml.email_messages e
  WHERE 
  		(e.do_not_process_before IS NULL OR 
    	e.do_not_process_before <= sys.f_current_timestamp())
    AND	STATUS = 1
  ORDER BY e.priority DESC, e.email_id ASC
  FOR UPDATE SKIP LOCKED 
  LIMIT $1;

END;
$body$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION eml.f_emails_create(
	p_priority smallint,
	p_try_count integer,
	p_subject character varying,
	p_body text,
	p_is_body_html boolean,
	p_sending_provider_name character varying,
	p_recipients eml.email_recipient[],
	p_operation_id character varying,
	OUT p_email_id integer)
    RETURNS integer
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_priority IS NULL  
	 OR	p_subject IS NULL 
	 OR	p_body IS NULL  
	 OR	p_is_body_html IS NULL  
	 OR	p_sending_provider_name IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO eml.email_messages
 (
    priority,
    status,
	try_count,
    send_date,
    subject,
    body,
    is_body_html,
    do_not_process_before,
    sending_provider_name,
    recipients,
    created_by,
    created_on,
    updated_by,
    updated_on,
	operation_id
  )
  VALUES
  (
    p_priority,
    1::SMALLINT /*Pending*/,
    p_try_count,
    NULL,
	p_subject,
    p_body,
    p_is_body_html,
    sys.f_current_timestamp(),
    p_sending_provider_name,
    p_recipients,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
	p_operation_id
  )
  RETURNING email_id
    INTO p_email_id;

END;
$BODY$;

--
-- Comments
--
COMMENT ON FUNCTION eml.f_emails_search (p_priority smallint, p_status smallint, p_is_do_not_process_before_expired boolean, p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out ref_emails refcursor) IS 'Функция за търсене на имейло.';
COMMENT ON FUNCTION eml.f_emails_send_attempt (p_email_id integer, p_is_send boolean, out p_is_failed boolean) IS 'Функция за опит за изпращане на имейл.';
COMMENT ON FUNCTION eml.f_n_s_email_templates_search (p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_templates refcursor) IS 'Функция за търсене на шаблони.';
COMMENT ON FUNCTION eml.f_emails_get_pending ("p_MaxFetched" integer) IS 'Функция за търсене на имейло.';
