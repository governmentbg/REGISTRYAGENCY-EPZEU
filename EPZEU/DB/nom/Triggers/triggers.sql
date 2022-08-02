--
-- Definition for trigger trg_d_languages_aiuds : 
--
CREATE TRIGGER trg_d_languages_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_languages
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_languages_trg();
--
-- Definition for trigger trg_d_labels_aiuds : 
--
CREATE TRIGGER trg_d_labels_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_labels
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_labels_trg();
--
-- Definition for trigger trg_d_labels_i18n_aiuds : 
--
CREATE TRIGGER trg_d_labels_i18n_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_labels_i18n
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_labels_i18n_trg();
--
-- Definition for trigger trg_d_iisda_services_ais : 
--
CREATE TRIGGER trg_d_iisda_services_ais
    AFTER INSERT ON d_iisda_services
    FOR EACH STATEMENT
    EXECUTE PROCEDURE f_d_iisda_services_trg ();
--
-- Definition for trigger trg_d_iisda_services_aur : 
--
CREATE TRIGGER trg_d_iisda_services_aur
  AFTER UPDATE 
  ON nom.d_iisda_services
  
FOR EACH ROW 
  WHEN (old.name::text IS DISTINCT FROM new.name::text OR old.description IS DISTINCT FROM new.description OR old.is_discontinued IS DISTINCT FROM new.is_discontinued OR old.has_epayment IS DISTINCT FROM new.has_epayment OR old.short_description::text IS DISTINCT FROM new.short_description::text)
EXECUTE PROCEDURE nom.f_d_iisda_services_trg();


CREATE TRIGGER trg_s_application_types_i18n_nom_changes
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.s_application_types_i18n
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_s_application_types_i18n_trg();

CREATE TRIGGER trg_s_application_types_nom_changes
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.s_application_types
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_s_application_types_trg();