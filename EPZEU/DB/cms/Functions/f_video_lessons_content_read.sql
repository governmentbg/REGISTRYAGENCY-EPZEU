CREATE OR REPLACE FUNCTION cms.f_video_lessons_content_read (
  p_lesson_id integer,
  p_lang_id integer
)
RETURNS bytea AS
$body$
DECLARE
--	ref refcursor;
BEGIN
-- 	OPEN ref FOR 
	return (SELECT (CASE WHEN (l_i18n.content IS NOT null) THEN l_i18n.content
                         ELSE l.content
                     END) as content
              FROM cms.video_lessons l
         LEFT JOIN cms.video_lessons_i18n l_i18n ON (l.lesson_id = l_i18n.lesson_id AND l_i18n.language_id = p_lang_id)
             WHERE l.lesson_id = p_lesson_id);
	
-- 	return ref;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
