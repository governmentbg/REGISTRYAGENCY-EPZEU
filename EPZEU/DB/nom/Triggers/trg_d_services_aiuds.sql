CREATE TRIGGER trg_d_services_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_services
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_services_trg();
