using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Notifications.PR
{
    public interface IPRNotificationServiceClient
    {
        Task<EmailNotification> GetActiveEmailNotificationAsync(string email, System.Threading.CancellationToken cancellationToken);

        Task<EmailNotificationsResponse> CreateEmailNotificationAsync(EmailNotificationsRequest json, System.Threading.CancellationToken cancellationToken);

        Task<EmailNotificationsResponse> ModifyEmailNotificationAsync(EmailNotificationsRequest json, System.Threading.CancellationToken cancellationToken);

        Task<EmailNotificationsResponse> DeactivateEmailNotificationAsync(EmailNotificationsRequest json, System.Threading.CancellationToken cancellationToken);
    }


    internal class PRNotificationServiceClient : IPRNotificationServiceClient
    {
        private readonly HttpClient _httpClient;
        private readonly PRApiClient _prApiClient;

        public PRNotificationServiceClient(HttpClient client)
        {
            _httpClient = client ?? throw new ArgumentNullException("client");
            _prApiClient = new PRApiClient(_httpClient.BaseAddress.AbsoluteUri, _httpClient);
        }

        public Task<EmailNotificationsResponse> CreateEmailNotificationAsync(EmailNotificationsRequest json, CancellationToken cancellationToken)
        {
            return _prApiClient.CreateEmailNotificationAsync(json, cancellationToken);
        }

        public Task<EmailNotificationsResponse> DeactivateEmailNotificationAsync(EmailNotificationsRequest json, System.Threading.CancellationToken cancellationToken)
        {
            return _prApiClient.DeactivateEmailNotificationAsync(json, cancellationToken);
        }

        public async Task<EmailNotification> GetActiveEmailNotificationAsync(string email, CancellationToken cancellationToken)
        {
            try
            {
                return await _prApiClient.GetActiveEmailNotificationAsync(email, cancellationToken);
            }
            catch (SwaggerException<EmailNotificationsError> err)
            {
                if (err.Result.Code == 2004)
                {
                    return null;
                }

                throw err;
            }            
        }

        public Task<EmailNotificationsResponse> ModifyEmailNotificationAsync(EmailNotificationsRequest json, CancellationToken cancellationToken)
        {
            return _prApiClient.ModifyEmailNotificationAsync(json, cancellationToken);
        }
    }
}
