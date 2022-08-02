CREATE TABLE stats.statistics (
  statistic_id INTEGER DEFAULT nextval('stats.seq_statistic'::regclass) NOT NULL,
  register_id SMALLINT NOT NULL,
  name VARCHAR(200) NOT NULL,
  type_genarate SMALLINT DEFAULT 1 NOT NULL,
  url TEXT,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  order_num INTEGER,
  CONSTRAINT statistic_pkey PRIMARY KEY(statistic_id),
  CONSTRAINT statistic_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT statistic_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE stats.statistics
IS 'Статистики';

COMMENT ON COLUMN stats.statistics.register_id
IS 'Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR)';

COMMENT ON COLUMN stats.statistics.name
IS 'Наименование на статистика';

COMMENT ON COLUMN stats.statistics.type_genarate
IS 'Начина на генериране на отчет: 0-автоматично, 1-ръчно';

COMMENT ON COLUMN stats.statistics.url
IS 'Адрес на услугата';

COMMENT ON COLUMN stats.statistics.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN stats.statistics.created_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN stats.statistics.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN stats.statistics.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN stats.statistics.order_num
IS 'Пореден номер';
