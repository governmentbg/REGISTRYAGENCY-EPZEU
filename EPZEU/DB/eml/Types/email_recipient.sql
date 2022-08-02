CREATE TYPE eml.email_recipient AS (
  address VARCHAR(200),
  display_name VARCHAR(200),
  type SMALLINT
);

COMMENT ON TYPE eml.email_recipient
IS 'Обект за представяне на двойка адрес / име';