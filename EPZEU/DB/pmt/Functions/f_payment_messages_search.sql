CREATE OR REPLACE FUNCTION pmt.f_payment_messages_search (
  p_message_id integer,
  p_payment_system_type smallint,
  p_obligation_number bigint,
  p_transaction_number varchar,
  p_status integer,
  out p_messages refcursor
)
RETURNS refcursor AS
$body$
BEGIN
  -- търси се по или message_id, или payment_system_type, obligation_number и status, или payment_system_type, transaction_number и status
  IF  (p_message_id IS NOT NULL AND (p_payment_system_type IS NOT NULL OR p_obligation_number IS NOT NULL OR p_transaction_number IS NOT NULL OR p_status IS NOT NULL )) OR
      (p_message_id IS NULL AND p_payment_system_type IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_message_id IS NOT NULL THEN
    OPEN p_messages FOR
    SELECT
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
      updated_by,
      updated_on
    FROM pmt.payment_messages
    WHERE message_id = p_message_id;

  ELSE -- p_message_id IS NULL
    OPEN p_messages FOR
    SELECT
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
      updated_by,
      updated_on
    FROM pmt.payment_messages
    WHERE payment_system_type = p_payment_system_type
      AND (p_obligation_number IS NULL  OR obligation_number = p_obligation_number)
      AND (p_transaction_number IS NULL OR transaction_number = p_transaction_number)
      AND (p_status IS NULL OR status = p_status );
  END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

