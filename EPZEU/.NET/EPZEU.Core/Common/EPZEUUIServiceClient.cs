using System;
using System.Net.Http;
using EPZEU.Utilities;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Common
{
    /// <summary>
    /// Интерфейс  на http клиент за работа с UI на портала.
    /// </summary>
    public interface IEPZEUUIServiceClient
    {
        /// <summary>
        /// Изчита html на layout на портала.
        /// </summary>      
        /// <returns>Html на layout на портала.</returns>
        Task<string> GetIntegrationContainerHtmlAsync(string lang, CancellationToken cancellationToken);
    }

    internal class EPZEUUIServiceClient : IEPZEUUIServiceClient
    {
        private readonly HttpClient _client;

        public EPZEUUIServiceClient(HttpClient client) =>
            _client = client ?? throw new ArgumentNullException("client");

        public async Task<string> GetIntegrationContainerHtmlAsync(string lang, CancellationToken cancellationToken)
        {
            string html = null;
            string url = string.IsNullOrEmpty(lang) ? "integration-container" : lang + "/integration-container";

            using (var result = await _client.GetAsync(url))
            {
                result.EnsureSuccessStatusCode2();

                html = await result.Content.ReadAsStringAsync();
            }

            return html;
        }
    }
}
