using EPZEU.Security;
using Rebus.Handlers;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationProcesses.MessageHandlers
{
    public class ApplicationSendMessage
    {
        public long ApplicationProcessID { get; set; }

        public string OperationID { get; set; }
    }

    public class ApplicationSendMessageHandler : IHandleMessages<ApplicationSendMessage>
    {
        private readonly IApplicationProcessService ProcessService;
        private readonly IEPZEUUserImpersonation UserImpersonation;

        public ApplicationSendMessageHandler(IApplicationProcessService processService, IEPZEUUserImpersonation userImpersonation)
        {
            ProcessService = processService;
            UserImpersonation = userImpersonation;
        }

        public async Task Handle(ApplicationSendMessage message)
        {
            using (UserImpersonation.Impersonate(EPZEUSystemUserAccessor.SystemUser))
            {
                await ProcessService.SendAsync(message.OperationID, message.ApplicationProcessID);
            }
        }
    }
}
