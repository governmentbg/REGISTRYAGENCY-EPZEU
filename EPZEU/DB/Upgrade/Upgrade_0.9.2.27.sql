/* update script TRIR-5243 */

-- 01 add column
alter table eml.email_messages add column operation_id character varying(64);

COMMENT ON COLUMN eml.email_messages.operation_id
IS 'Идентификатор на операция от sys.service_operations.';

-- 02 update data
begin;

with mapp as ( 
	select emailids.value::text::int as emailid, so.*
	from sys.service_operations so
	CROSS JOIN LATERAL json_array_elements (so.result::json->'EmailIDs') emailids
	where operation_type_id = 1 and result is not null
)
update eml.email_messages e set 
operation_id = mapp.operation_id
from mapp 
where mapp.emailid = email_id;

-- ъпдейт и на записите, които са без операция (ако има)
-- select uuid_generate_v4();
update eml.email_messages 
set operation_id = '9f9153e5-cd6e-4908-be8c-69443211e1ad'
where operation_id is null

commit;

-- 03 alter column
alter table eml.email_messages alter column operation_id SET not null;

/* update script TRIR-5243 */