CREATE TABLE usr.user_permissions (
  user_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT user_permissions_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_permissions_permission_id_fk FOREIGN KEY (permission_id)
    REFERENCES usr.n_s_permissions(permission_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_permissions_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
)
WITH (oids = false);

COMMENT ON TABLE usr.user_permissions
IS 'Права на потребителски профил';

COMMENT ON COLUMN usr.user_permissions.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN usr.user_permissions.permission_id
IS 'Уникален идентификатор на право';

COMMENT ON COLUMN usr.user_permissions.is_active
IS 'Флаг, указващ дали правото е активно';

COMMENT ON COLUMN usr.user_permissions.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.user_permissions.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.user_permissions.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.user_permissions.updated_on
IS 'TIMESTAMP на последна промяна на записа';

CREATE INDEX user_permissions_user_id_idx ON usr.user_permissions
  USING btree (user_id);

CREATE UNIQUE INDEX user_permissions_user_id_permission_id_idx ON usr.user_permissions
  USING btree (user_id, permission_id)
  WHERE (is_active = true);
