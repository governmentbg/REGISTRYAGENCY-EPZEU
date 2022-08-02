CREATE OR REPLACE FUNCTION usr.f_n_s_special_access_user_types_search (
  p_special_access_user_types_ids integer [],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_special_access_user_types refcursor
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
  IF (p_special_access_user_types_ids IS NOT NULL)
  THEN
    IF (p_calculate_count)
    THEN
      
      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_special_access_user_types t
      WHERE t.user_type_id = ANY (p_special_access_user_types_ids);
        
              
    END IF;

    OPEN p_ref_special_access_user_types FOR
    SELECT t.*
    FROM usr.n_s_special_access_user_types t
    WHERE t.user_type_id = ANY (p_special_access_user_types_ids)
    ORDER BY t.user_type_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;  
    

  ELSE -- p_permission_ids IS NULL 
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_special_access_user_types t;

    END IF;

    OPEN p_ref_special_access_user_types FOR
    SELECT t.*
    FROM usr.n_s_special_access_user_types t
    ORDER BY t.user_type_id
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

COMMENT ON FUNCTION usr.f_n_s_special_access_user_types_search(p_special_access_user_types_ids integer [], p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_special_access_user_types refcursor)
IS 'Функцията връща курсор с видовете външен потребител със специален достъп, отговарящи на подадените критерии. Списъкът с права може да се страницира.
Има следните входни параметри: 
 - p_special_access_user_types_ids integer [] - масив от уникални идентификатори на видове външен потребител със специален достъп, ако стойността на параметъра е NULL не се прилага филтър 
 - p_start_index integer - индекс на първия елемент от страницата, ако има странициране, в противен случай стойността трябва да е NULL
 - p_page_size integer - брой записи за страница, ако има странициране, в противен случай стойността трябва да е NULL
 - p_calculate_count boolean - флаг дали да се изчислява общия брой на записите
Функцията връща record от: 
 - out p_count integer - общ брой записи, отговарящи на критериите, независимо от параметрите за странициране 
 - out p_ref_special_access_user_types refcursor - курсор с данни отговарящи на критериите и параметрите за странициране';
