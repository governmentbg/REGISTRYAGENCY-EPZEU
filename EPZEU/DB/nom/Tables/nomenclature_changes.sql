CREATE TABLE nom.nomenclature_changes (
  tablename VARCHAR(200) NOT NULL,
  last_updated_on TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT nomenclature_changes_pkey PRIMARY KEY(tablename)
) 
WITH (oids = false);