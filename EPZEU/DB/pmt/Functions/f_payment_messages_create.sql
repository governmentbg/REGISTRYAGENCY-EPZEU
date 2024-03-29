CREATE OR REPLACE FUNCTION pmt.f_payment_messages_create (
  p_register_id smallint,
  p_payment_system_type smallint,
  p_obligation_number bigint,
  p_obligation_date timestamptz,
  p_user_id integer,
  p_user_cin integer,
  p_obliged_person varchar,
  p_merchant_cin varchar,
  p_merchant_name varchar,
  p_merchant_bic varchar,
  p_merchant_iban varchar,
  p_amount numeric,
  p_expiration_time timestamptz,
  p_application_identifier varchar,
  p_payment_type smallint,
  out p_message_id integer,
  out p_reason varchar
)
RETURNS record AS
$body$
DECLARE
  v_user_id INTEGER;
  
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_register_id	       IS NULL OR
     p_payment_system_type IS NULL OR
     p_user_id             IS NULL OR
     p_user_cin            IS NULL OR
     p_obliged_person	   IS NULL OR
     p_merchant_name	   IS NULL OR
     p_merchant_bic	       IS NULL OR
     p_merchant_iban	   IS NULL OR
     p_amount	           IS NULL OR
     p_expiration_time	   IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  p_message_id := nextval('pmt.seq_payment_messages'::regclass);
  p_reason :=  CASE WHEN p_payment_type = 1 THEN 'Плащане-'||p_message_id||','||p_application_identifier 
                    WHEN p_payment_type = 2 THEN 'Захранване на ЛС-'||p_message_id||','||p_user_cin
                    ELSE NULL
               END;
  
  -- създаване на запис
  INSERT INTO pmt.payment_messages (
    message_id,
    register_id,
    payment_system_type,
    obligation_number,
    obligation_date,
    user_id,
    user_cin,
    obliged_person,
    merchant_cin,
    merchant_name,
    merchant_bic,
    merchant_iban,
    amount,
    reason,
    expiration_time,
    transaction_number,
    authorization_code,
    status,
    status_description,
    status_date,
    created_by,
    created_on,
    updated_by,
    updated_on)
  VALUES (
    p_message_id,
    p_register_id,
    p_payment_system_type,
    p_obligation_number,
    p_obligation_date,
    p_user_id,
    p_user_cin, 
    p_obliged_person,
    p_merchant_cin,
    p_merchant_name,
    p_merchant_bic,
    p_merchant_iban,
    p_amount,
    p_reason,
    p_expiration_time,
    NULL,
    NULL,
    0,
    NULL, 
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp());
    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

