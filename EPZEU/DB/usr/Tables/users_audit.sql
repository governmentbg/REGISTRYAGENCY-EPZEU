CREATE TABLE usr.users_audit (
  audit_id INTEGER DEFAULT nextval('usr.seq_users_audit'::regclass) NOT NULL,
  user_id INTEGER,
  user_data JSONB,
  created_by INTEGER,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp(),
  CONSTRAINT audit_users_pkey PRIMARY KEY(audit_id)
)
WITH (oids = false);

ALTER TABLE usr.users_audit
  ALTER COLUMN audit_id SET STATISTICS 0;

COMMENT ON TABLE usr.users_audit
IS 'Данни за изтрити потребителски профили';

COMMENT ON COLUMN usr.users_audit.audit_id
IS 'Уникален идентификатор на запис';

COMMENT ON COLUMN usr.users_audit.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN usr.users_audit.user_data
IS 'Данни за потребителски профил';

COMMENT ON COLUMN usr.users_audit.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.users_audit.created_on
IS 'TIMESTAMP на създаване на записа';
