using EPZEU.Security;
using Rebus.Handlers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Users.Migrations.MessageHandlers
{
    public class ProcessAccountMgrProcessesMessage
    {
        public int? MigrationProcessID { get; set; }
    }

    public class ProcessAccountMgrProcessesMessageHandler : IHandleMessages<ProcessAccountMgrProcessesMessage>
    {
        private readonly IAccountMigrationProcessService MigrationService;
        private readonly IEPZEUUserImpersonation UserImpersonation;

        public ProcessAccountMgrProcessesMessageHandler(IAccountMigrationProcessService migrationService, IEPZEUUserImpersonation userImpersonation)
        {
            MigrationService = migrationService;
            UserImpersonation = userImpersonation;
        }

        public async Task Handle(ProcessAccountMgrProcessesMessage message)
        {
            using (UserImpersonation.Impersonate(EPZEUSystemUserAccessor.SystemUser))
            {
                await MigrationService.ProcessAccountMigrationProcessesAsync(message.MigrationProcessID.Value);
            }
        }
    }
}
