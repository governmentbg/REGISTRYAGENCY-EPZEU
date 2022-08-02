CREATE TRIGGER trg_data_service_limits_aiud
  AFTER INSERT OR UPDATE OR DELETE 
  ON public.data_service_limits
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE public.f_data_service_limits_trg();


CREATE TRIGGER trg_data_service_user_limits_aiud
  AFTER INSERT OR UPDATE OR DELETE 
  ON public.data_service_user_limits
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE public.f_data_service_user_limits_trg();