using EPZEU.Security;
using Rebus.Handlers;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing.ReMessageHandlers
{
    public class SigningProcessRejectMessage
    {
        public Guid? ProcessID { get; set; }
    }

    public class SigningProcessRejectMessageHandler : IHandleMessages<SigningProcessRejectMessage>
    {
        private readonly ISigningProcessesService ProcessingService;
        private readonly IEPZEUUserImpersonation UserImpersonation;

        public SigningProcessRejectMessageHandler(ISigningProcessesService processingService, IEPZEUUserImpersonation userImpersonation)
        {
            ProcessingService = processingService;
            UserImpersonation = userImpersonation;
        }

        public async Task Handle(SigningProcessRejectMessage message)
        {
            using (UserImpersonation.Impersonate(EPZEUSystemUserAccessor.SystemUser))
            {
                await ProcessingService.RejectSigningProcessAsync(message.ProcessID.Value, CancellationToken.None);
            }   
        }
    }
}
