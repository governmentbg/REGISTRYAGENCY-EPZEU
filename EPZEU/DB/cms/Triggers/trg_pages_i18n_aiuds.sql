CREATE TRIGGER trg_pages_i18n_aiuds
  AFTER INSERT OR UPDATE OR DELETE
  ON cms.pages_i18n

FOR EACH STATEMENT
  EXECUTE PROCEDURE cms.f_pages_i18n_trg();
