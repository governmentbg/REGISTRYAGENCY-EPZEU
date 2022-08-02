using EPZEU.Security;
using Rebus.Handlers;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing.ReMessageHandlers
{
    public class EvrotrustProcessCallbackNotificationMessage
    {
        public string TransactionID { get; set; }

        public int? Status { get; set; }
    }

    public class EvrotrustProcessCallbackNotificationHandler : IHandleMessages<EvrotrustProcessCallbackNotificationMessage>
    {
        private readonly IEPZEUUserImpersonation _userImpersonation;
        private readonly IEvrotrustProcessorService _evrotrustProcessorService;

        public EvrotrustProcessCallbackNotificationHandler(IEPZEUUserImpersonation userImpersonation, IEvrotrustProcessorService evrotrustProcessorService)
        {
            _userImpersonation = userImpersonation;
            _evrotrustProcessorService = evrotrustProcessorService;
        }

        public async Task Handle(EvrotrustProcessCallbackNotificationMessage message)
        {
            using (_userImpersonation.Impersonate(EPZEUSystemUserAccessor.SystemUser))
            {
                await _evrotrustProcessorService.ProcessRemoteCallbackNotificationAsync(message.TransactionID, message.Status, CancellationToken.None);
            }
        }
    }
}
