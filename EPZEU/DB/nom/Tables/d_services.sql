CREATE TABLE nom.d_services (
  service_id INTEGER DEFAULT nextval('nom.seq_d_services'::regclass) NOT NULL,
  register_id SMALLINT NOT NULL,
  iisda_service_id INTEGER,
  app_type_id SMALLINT NOT NULL,
  service_type_ids SMALLINT [] NOT NULL,
  payment_type_ids SMALLINT [],
  status_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status INTEGER NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  name VARCHAR(1000),
  description TEXT,
  is_adm BOOLEAN NOT NULL,
  short_description VARCHAR(2000),
  pending_status_date TIMESTAMP WITH TIME ZONE,
  pending_status INTEGER,
  CONSTRAINT d_services_app_type_id_idx UNIQUE(app_type_id),
  CONSTRAINT d_services_pkey PRIMARY KEY(service_id),
  CONSTRAINT d_services_is_adm_chk CHECK (((is_adm = true) AND (iisda_service_id IS NOT NULL) AND (name IS NULL) AND (description IS NULL)) OR ((is_adm = false) AND (iisda_service_id IS NULL) AND (name IS NOT NULL) AND (description IS NOT NULL))),
  CONSTRAINT d_services_fk_app_type FOREIGN KEY (app_type_id)
    REFERENCES nom.s_application_types(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_services_fk_cb FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_services_fk_iisda_service_id FOREIGN KEY (iisda_service_id)
    REFERENCES nom.d_iisda_services(iisda_service_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_services_fk_ub FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE nom.d_services
  ALTER COLUMN service_id SET STATISTICS 0;

COMMENT ON TABLE nom.d_services
IS '������';

COMMENT ON COLUMN nom.d_services.service_id
IS '������������� �� ������';

COMMENT ON COLUMN nom.d_services.register_id
IS '������������� �� ��������: 1 - ��������� �������� (CR), 2 - ������ �������� (PR)';

COMMENT ON COLUMN nom.d_services.iisda_service_id
IS '����� �� ������ �� �����';

COMMENT ON COLUMN nom.d_services.app_type_id
IS '���������';

COMMENT ON COLUMN nom.d_services.service_type_ids
IS '��� �� ��������';

COMMENT ON COLUMN nom.d_services.payment_type_ids
IS '������ ������� �� ���������� ���';

COMMENT ON COLUMN nom.d_services.status_date
IS '���� �� ������� �� �������';

COMMENT ON COLUMN nom.d_services.status
IS '������: -1 - ���������� ������������, 0- ���������� �� �� �����, 1 - ���������� ������������ �� �����.';

COMMENT ON COLUMN nom.d_services.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN nom.d_services.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN nom.d_services.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN nom.d_services.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN nom.d_services.name
IS '������������ �� ��������';

COMMENT ON COLUMN nom.d_services.description
IS 'HTML �������� �� ��������';

COMMENT ON COLUMN nom.d_services.is_adm
IS '����, ������� ���� �������� � ��������������� ��� ��';

COMMENT ON COLUMN nom.d_services.short_description
IS '������ �������� �� ��������';

COMMENT ON COLUMN nom.d_services.pending_status_date
IS '���������� ����, �� ����� �������� �� ��������  �� �������. ������� �� ���� ��� ������� �� ������� � ������ ����.';

COMMENT ON COLUMN nom.d_services.pending_status
IS '��������� ������: 0 - ���������� �� �� �����, 1 - ���������� ������������ �� �����. ������� �� ���� ��� ������� �� ������� � ������ ����.';

CREATE INDEX d_services_pending_status_date_idx ON nom.d_services
  USING btree (pending_status_date)
  WHERE (pending_status_date IS NOT NULL);

CREATE TRIGGER trg_d_services_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_services
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_services_trg();

