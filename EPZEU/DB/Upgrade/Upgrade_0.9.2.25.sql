delete from public.data_service_user_limits where service_limit_id = (
	select service_limit_id from public.data_service_limits where is_last = 1::bit and service_code = 'EP_FAILED_LOGIN_LIMIT'
);

delete from public.data_service_limits where service_code = 'EP_FAILED_LOGIN_LIMIT';