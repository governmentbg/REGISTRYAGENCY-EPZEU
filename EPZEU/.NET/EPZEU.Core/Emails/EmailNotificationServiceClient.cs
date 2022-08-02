using EPZEU.Emails.Models;
using EPZEU.Utilities;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;

namespace EPZEU.Emails
{
    /// <summary>
    /// Интерфейс на http клиент за работа с имейл нотификации
    /// </summary>
    public interface IEmailNotificationServiceClient
    {
        /// <summary>
        /// Операция за създаване на имейли.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<EmailNotificationResponse> CreateEmailNotificationAsync(EmailNotificationRequest request);

    }

    /// <summary>
    /// Реализация на интерфейс IEmailNotificationServiceClient за работа с имейл нотификации
    /// </summary>
    public class EmailNotificationServiceClient : IEmailNotificationServiceClient
    {
        private readonly HttpClient _client;

        #region Constructors

        public EmailNotificationServiceClient(HttpClient client) =>
            _client = client ?? throw new ArgumentNullException("client");

        #endregion

        #region Public Interface

        public Task<EmailNotificationResponse> CreateEmailNotificationAsync(EmailNotificationRequest request)
        {
            return _client.PostAsync<EmailNotificationResponse>("EmailNotifications", request, CancellationToken.None);
        }

        #endregion
    }
}
