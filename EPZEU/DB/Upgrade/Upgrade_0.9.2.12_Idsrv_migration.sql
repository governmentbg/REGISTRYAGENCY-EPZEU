
-- drop job
select * from pgagent.pga_job where jobname = 'epzeu_dev.persisted_grants_expired_delete';

begin transaction

delete from pgagent.pga_jobstep where jstjobid = (
	select jobid from pgagent.pga_job where jobname = 'epzeu_dev.persisted_grants_expired_delete'
);
delete from pgagent.pga_schedule where jscjobid = (
	select jobid from pgagent.pga_job where jobname = 'epzeu_dev.persisted_grants_expired_delete'
);

delete from pgagent.pga_job where jobname = 'epzeu_dev.persisted_grants_expired_delete';

commit;

drop function idsrv.f_persisted_grants_create;
drop function idsrv.f_persisted_grants_delete;
drop function idsrv.f_persisted_grants_search;
drop procedure idsrv.p_persisted_grants_expired_delete;

drop table idsrv.persisted_grants;
DROP SCHEMA idsrv;