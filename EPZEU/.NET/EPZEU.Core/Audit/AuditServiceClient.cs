using EPZEU.Audit.Models;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using EPZEU.Utilities;

namespace EPZEU.Audit
{
    //class AuditServiceClient

    /// <summary>
    /// Интерфейс за работа с одит
    /// </summary>
    public interface IAuditServiceClient
    {
        /// <summary>
        /// Операция за създаване на запис в одита.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<LogActionResponse> CreateLogActionAsync(LogActionRequest request);

    }

    /// <summary>
    /// Реализация на интерфейс за работа с одит
    /// </summary>
    public class AuditServiceClient : IAuditServiceClient
    {
        private readonly HttpClient _client;

        #region Constructors

        public AuditServiceClient(HttpClient client) =>
            _client = client ?? throw new ArgumentNullException("client");        

        #endregion

        #region Public Interface

        public Task<LogActionResponse> CreateLogActionAsync(LogActionRequest request)
        {
            return _client.PostAsync<LogActionResponse>("LogActions", request, CancellationToken.None);
        }

        #endregion
    }

}
