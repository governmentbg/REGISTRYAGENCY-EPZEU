CREATE TABLE stats.statistic_reports (
  statistic_report_id SERIAL,
  statistic_id INTEGER NOT NULL,
  date_from TIMESTAMP WITH TIME ZONE NOT NULL,
  date_to TIMESTAMP WITH TIME ZONE NOT NULL,
  status INTEGER DEFAULT 1 NOT NULL,
  date_change_status TIMESTAMP WITH TIME ZONE NOT NULL,
  date_upload TIMESTAMP WITH TIME ZONE,
  file_name VARCHAR(200) NOT NULL,
  file_size INTEGER NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  content BYTEA,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT statistic_report_pkey PRIMARY KEY(statistic_report_id),
  CONSTRAINT statistic_report_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT statistic_report_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT statistic_reports_fk FOREIGN KEY (statistic_id)
    REFERENCES stats.statistics(statistic_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE stats.statistic_reports
IS '������������� ������';

COMMENT ON COLUMN stats.statistic_reports.statistic_report_id
IS '������������� �� ������������� ������.';

COMMENT ON COLUMN stats.statistic_reports.statistic_id
IS '������������� ����������';

COMMENT ON COLUMN stats.statistic_reports.date_from
IS '������� ���� �� �������';

COMMENT ON COLUMN stats.statistic_reports.date_to
IS '������ ���� �� �������';

COMMENT ON COLUMN stats.statistic_reports.status
IS '������ �� �����: 1-�������; 2-����������; 3-�������������';

COMMENT ON COLUMN stats.statistic_reports.date_change_status
IS '���� �� ������� �� ������';

COMMENT ON COLUMN stats.statistic_reports.date_upload
IS '���� �� ���������(����������) �� ������';

COMMENT ON COLUMN stats.statistic_reports.file_name
IS '������������ �� ��������';

COMMENT ON COLUMN stats.statistic_reports.file_size
IS '������ �� �����';

COMMENT ON COLUMN stats.statistic_reports.content_type
IS '��� �� ���������';

COMMENT ON COLUMN stats.statistic_reports.content
IS '���������� �� ��������';

COMMENT ON COLUMN stats.statistic_reports.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN stats.statistic_reports.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN stats.statistic_reports.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN stats.statistic_reports.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';
