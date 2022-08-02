CREATE TABLE nom.s_registers (
  register_id SMALLINT NOT NULL,
  code VARCHAR(200),
  name VARCHAR,
  abbreviation VARCHAR(10),
  CONSTRAINT s_registers_pkey PRIMARY KEY(register_id)
) 
WITH (oids = false);

ALTER TABLE nom.s_registers
  ALTER COLUMN register_id SET STATISTICS 0;

COMMENT ON TABLE nom.s_registers
IS 'Регистри';

COMMENT ON COLUMN nom.s_registers.register_id
IS 'Идентификатор на регистър';

COMMENT ON COLUMN nom.s_registers.code
IS 'Код на регистър за превод';

COMMENT ON COLUMN nom.s_registers.name
IS 'Наименование на регистър';

COMMENT ON COLUMN nom.s_registers.abbreviation
IS 'Абривиатура';
