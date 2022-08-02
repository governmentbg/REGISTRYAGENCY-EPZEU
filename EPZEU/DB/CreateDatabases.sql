CREATE ROLE epzeu_dev NOINHERIT NOREPLICATION LOGIN PASSWORD 'epzeu_dev';
CREATE ROLE epzeu_qa NOINHERIT NOREPLICATION LOGIN PASSWORD 'epzeu_qa';
CREATE ROLE epzeu_test NOINHERIT NOREPLICATION LOGIN PASSWORD 'epzeu_test';
CREATE ROLE epzeu_prod NOINHERIT NOREPLICATION LOGIN PASSWORD 'epzeu_prod';




CREATE DATABASE epzeu_dev
  WITH OWNER = epzeu_dev
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;


CREATE DATABASE epzeu_cr_dev
  WITH OWNER = epzeu_dev
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;


CREATE DATABASE epzeu_pr_dev
  WITH OWNER = epzeu_dev
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;




CREATE DATABASE epzeu_qa
  WITH OWNER = epzeu_qa
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;


CREATE DATABASE epzeu_cr_qa
  WITH OWNER = epzeu_qa
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;

CREATE DATABASE epzeu_pr_qa
  WITH OWNER = epzeu_qa
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;




CREATE DATABASE epzeu_test
  WITH OWNER = epzeu_test
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;


CREATE DATABASE epzeu_cr_test
  WITH OWNER = epzeu_test
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;

CREATE DATABASE epzeu_pr_test
  WITH OWNER = epzeu_test
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;







CREATE DATABASE epzeu_prod
  WITH OWNER = epzeu_prod
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;


CREATE DATABASE epzeu_cr_prod
  WITH OWNER = epzeu_prod
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;

CREATE DATABASE epzeu_pr_prod
  WITH OWNER = epzeu_prod
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    TEMPLATE = template1;

