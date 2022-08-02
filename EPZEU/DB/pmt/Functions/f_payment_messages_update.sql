CREATE OR REPLACE FUNCTION pmt.f_payment_messages_update (
  p_message_id integer,
  p_transaction_number varchar,
  p_authorization_code varchar,
  p_status integer,
  p_status_description varchar,
  p_status_date timestamptz,
  p_obligation_date timestamptz
)
RETURNS void AS
$body$
DECLARE
  v_user_id  INTEGER;
  v_count    INTEGER;
BEGIN

  IF  p_message_id IS NULL OR p_status IS NULL OR p_status_date IS NULL OR
      ( p_status = 0 AND p_obligation_date IS NULL ) OR
      ( p_status != 0 AND p_obligation_date IS NOT NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- промяна на запис
  UPDATE pmt.payment_messages
  SET
    obligation_date = CASE WHEN p_status = 0 THEN p_obligation_date ELSE obligation_date END,
    transaction_number = p_transaction_number,
    authorization_code = p_authorization_code,
    status	           = p_status,
    status_description = p_status_description,
    status_date        = p_status_date,
    updated_by         = v_user_id,
    updated_on         = sys.f_current_timestamp()
  WHERE message_id = p_message_id
    AND status = 0;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
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

