CREATE TABLE pmt.payment_messages (
  message_id INTEGER DEFAULT nextval('pmt.seq_payment_messages'::regclass) NOT NULL,
  register_id SMALLINT NOT NULL,
  payment_system_type SMALLINT NOT NULL,
  obligation_number BIGINT,
  obligation_date TIMESTAMP WITH TIME ZONE,
  user_id INTEGER,
  user_cin INTEGER NOT NULL,
  obliged_person VARCHAR(150) NOT NULL,
  merchant_cin VARCHAR(100),
  merchant_name VARCHAR(500) NOT NULL,
  merchant_bic VARCHAR(50) NOT NULL,
  merchant_iban VARCHAR(50) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  reason VARCHAR(500) NOT NULL,
  expiration_time TIMESTAMP WITH TIME ZONE NOT NULL,
  transaction_number VARCHAR(10),
  authorization_code VARCHAR(50),
  status INTEGER DEFAULT 0 NOT NULL,
  status_description VARCHAR(100),
  status_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT payment_messages_pkey PRIMARY KEY(message_id),
  CONSTRAINT payment_messages_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT payment_messages_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT payment_messages_user_id_fk FOREIGN KEY (user_id)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
)
WITH (oids = false);

COMMENT ON TABLE pmt.payment_messages
IS 'Данни за изходящите съобщения към разплащателни системи';

COMMENT ON COLUMN pmt.payment_messages.message_id
IS 'Уникален идентификатор на запис';

COMMENT ON COLUMN pmt.payment_messages.register_id
IS 'Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR)';

COMMENT ON COLUMN pmt.payment_messages.payment_system_type
IS 'Система за електронни разплащания: 1 - ePay, 2 - ПЕП на ДАЕУ';

COMMENT ON COLUMN pmt.payment_messages.obligation_number
IS 'Идентификатор на задължение, NULL при захранване на ЛС';

COMMENT ON COLUMN pmt.payment_messages.obligation_date
IS 'Дата на задължение';

COMMENT ON COLUMN pmt.payment_messages.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN pmt.payment_messages.user_cin
IS 'Клиентски идентификационен номер';

COMMENT ON COLUMN pmt.payment_messages.obliged_person
IS 'Име на задължено лице';

COMMENT ON COLUMN pmt.payment_messages.merchant_cin
IS 'Клиентски номер на търговеца - КИН на АВ';

COMMENT ON COLUMN pmt.payment_messages.merchant_name
IS 'Наименование на търговец получател на нареждането';

COMMENT ON COLUMN pmt.payment_messages.merchant_bic
IS 'IBAN на получателя - IBAN на АВ';

COMMENT ON COLUMN pmt.payment_messages.merchant_iban
IS 'BIC на банката получател - BIC на банката на АВ';

COMMENT ON COLUMN pmt.payment_messages.amount
IS 'Стойност за плащане';

COMMENT ON COLUMN pmt.payment_messages.reason
IS 'Основание за плащане - Формиран текст от вида: <"Плащане">/<"Захранване на ЛС">, <Номер на фактура>,[<Номер на заявление>/<КИН>]  с разделител точка и запетая';

COMMENT ON COLUMN pmt.payment_messages.expiration_time
IS 'Крайна дата/час за плащане';

COMMENT ON COLUMN pmt.payment_messages.transaction_number
IS 'Номер на транзакция, върнат от съответната система';

COMMENT ON COLUMN pmt.payment_messages.authorization_code
IS 'Авторизационен код (ePay)/ Код за достъп до заявка за плащане (ПЕП на ДАЕУ)';

COMMENT ON COLUMN pmt.payment_messages.status
IS 'Статус на плащане в ЕПЗЕУ: 0-Необработено, 1-PAID, 2- DENIED, 3- EXPIRED';

COMMENT ON COLUMN pmt.payment_messages.status_description
IS 'Статус на плащане, върнат от съответната система';

COMMENT ON COLUMN pmt.payment_messages.status_date
IS 'Дата на промяна на статуса, върнат от съответната система';

COMMENT ON COLUMN pmt.payment_messages.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN pmt.payment_messages.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN pmt.payment_messages.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN pmt.payment_messages.updated_on
IS 'TIMESTAMP на последна промяна на записа';

CREATE UNIQUE INDEX payment_messages_obligation_num_pmt_system_idx ON pmt.payment_messages
  USING btree (obligation_number, payment_system_type)
  WHERE (status = 0);

