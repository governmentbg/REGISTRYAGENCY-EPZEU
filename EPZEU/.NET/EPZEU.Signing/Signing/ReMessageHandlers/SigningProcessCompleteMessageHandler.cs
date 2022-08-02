using EPZEU.Security;
using Rebus.Handlers;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing.ReMessageHandlers
{
    public class SigningProcessCompleteMessage
    {
        public Guid? ProcessID { get; set; }
    }

    public class SigningProcessCompleteMessageHandler : IHandleMessages<SigningProcessCompleteMessage>
    {
        private readonly ISigningProcessesService ProcessingService;
        private readonly IEPZEUUserImpersonation UserImpersonation;

        public SigningProcessCompleteMessageHandler(ISigningProcessesService processingService, IEPZEUUserImpersonation userImpersonation)
        {
            ProcessingService = processingService;
            UserImpersonation = userImpersonation;
        }

        public async Task Handle(SigningProcessCompleteMessage message)
        {
            using (UserImpersonation.Impersonate(EPZEUSystemUserAccessor.SystemUser))
            {
                await ProcessingService.CompleteSigningProcessAsync(message.ProcessID.Value, CancellationToken.None);
            }
        }
    }
}
