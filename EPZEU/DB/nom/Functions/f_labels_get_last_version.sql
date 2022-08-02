CREATE OR REPLACE FUNCTION nom.f_labels_get_last_version (
  p_label_id integer
)
RETURNS integer AS
$body$
DECLARE 
	v_version_id INTEGER;
  
BEGIN
  SELECT label.label_ver_id 
  FROM nom.d_labels label
  WHERE label.label_id = p_label_id
      AND is_last = 1::bit -- последна версия
      AND deactivation_ver_id IS NULL -- версията не е деактивирана
  INTO v_version_id;
  RETURN v_version_id;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
