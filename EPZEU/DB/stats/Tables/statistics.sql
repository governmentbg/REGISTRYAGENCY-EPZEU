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
IS '����������';

COMMENT ON COLUMN stats.statistics.register_id
IS '������������� �� ��������: 1 - ��������� �������� (CR), 2 - ������ �������� (PR)';

COMMENT ON COLUMN stats.statistics.name
IS '������������ �� ����������';

COMMENT ON COLUMN stats.statistics.type_genarate
IS '������ �� ���������� �� �����: 0-�����������, 1-�����';

COMMENT ON COLUMN stats.statistics.url
IS '����� �� ��������';

COMMENT ON COLUMN stats.statistics.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN stats.statistics.created_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN stats.statistics.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN stats.statistics.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN stats.statistics.order_num
IS '������� �����';
