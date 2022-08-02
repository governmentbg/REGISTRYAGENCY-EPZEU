CREATE OR REPLACE FUNCTION nom.f_s_document_template_fields_search (
  p_keys varchar [],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_template_fields refcursor
)
RETURNS record AS
$body$
BEGIN
  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR (p_start_index IS NOT NULL AND p_page_size IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  --
  IF (p_keys IS NOT NULL)
  THEN
      IF p_calculate_count
      THEN

        SELECT COUNT(*)
        INTO p_count
        FROM nom.s_document_template_fields t
        WHERE t.key = ANY (p_keys);

      END IF;

      OPEN p_ref_template_fields FOR
      SELECT t.*
      FROM nom.s_document_template_fields t
      WHERE t.key = ANY (p_keys)
      ORDER BY t.key
      LIMIT p_page_size
      OFFSET p_start_index - 1;  

  ELSE
    IF p_calculate_count
      THEN
        SELECT COUNT(*)
        INTO p_count
        FROM nom.s_document_template_fields t;

      END IF;

      OPEN p_ref_template_fields FOR
      SELECT t.*
      FROM nom.s_document_template_fields t
      ORDER BY t.key
      LIMIT p_page_size
      OFFSET p_start_index - 1;  
  
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION nom.f_s_document_template_fields_search(p_keys varchar [], p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_template_fields refcursor)
IS 'Функцията връща курсор с активните полета за шаблони на документи, отговарящи на подадените критерии. Списъкът може да се страницира.
Има следните входни параметри: 
 - p_keys varchar [] - масив от ключове на активни полета, ако стойността на параметъра е NULL не се прилага филтър 
 - p_start_index integer - индекс на първия елемент от страницата, ако има странициране, в противен случай стойността трябва да е NULL
 - p_page_size integer - брой записи за страница, ако има странициране, в противен случай стойността трябва да е NULL
 - p_calculate_count boolean - флаг дали да се изчислява общия брой на записите

Функцията връща record от: 
 - out p_count integer - общ брой записи, отговарящи на критериите, независимо от параметрите за странициране 
 - out p_ref_template_fields refcursor - курсор с данни отговарящи на критериите и параметрите за странициране';
