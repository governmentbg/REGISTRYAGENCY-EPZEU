CREATE TABLE pmt.ra_registration_data (
  type INTEGER NOT NULL,
  cin VARCHAR(100) NOT NULL,
  email VARCHAR(200),
  secret_word VARCHAR(200) NOT NULL,
  validity_period TIME(0) WITHOUT TIME ZONE NOT NULL,
  url VARCHAR(1000),
  url_response VARCHAR(1000),
  url_services VARCHAR(1000),
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT ra_registration_data_type_key UNIQUE(type),
  CONSTRAINT ra_registration_data_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT ra_registration_data_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE pmt.ra_registration_data
IS 'Регистрационни данни на АВ в системата на платежен оператор ePay';

COMMENT ON COLUMN pmt.ra_registration_data.type
IS 'Тип на регистрационните данни: 1 - ePay, 2 - ПЕП на ДАЕУ';

COMMENT ON COLUMN pmt.ra_registration_data.cin
IS 'КИН на АВ - клиентски номер в личните данни на търговеца';

COMMENT ON COLUMN pmt.ra_registration_data.email
IS 'E-mail на АВ по регистрация';

COMMENT ON COLUMN pmt.ra_registration_data.secret_word
IS 'Буквено цифрова секретна дума генерирана от ePay';

COMMENT ON COLUMN pmt.ra_registration_data.validity_period
IS 'Период на валидност на плащане - необходим за определяне на крайната дата и час на валидността на плащането през оператора';

COMMENT ON COLUMN pmt.ra_registration_data.url
IS 'Адрес за достъп';

COMMENT ON COLUMN pmt.ra_registration_data.url_response
IS 'Електронен адрес за уведомяване - електронен адрес, на който се изпраща съобщение за променен статус на заявка за плащане';

COMMENT ON COLUMN pmt.ra_registration_data.url_services
IS 'URL за достъп до услугите на ПЕП на ДАЕУ';

COMMENT ON COLUMN pmt.ra_registration_data.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN pmt.ra_registration_data.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN pmt.ra_registration_data.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN pmt.ra_registration_data.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON CONSTRAINT ra_registration_data_created_by_fk ON pmt.ra_registration_data
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT ra_registration_data_updated_by_fk ON pmt.ra_registration_data
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

