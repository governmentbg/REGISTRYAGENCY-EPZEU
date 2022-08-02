using EPZEU.Applications.Models;
using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Applications
{
    /// <summary>
    /// Интерфейс на http клиент за работа с подадени заявления.
    /// </summary>
    public interface IApplicationServiceClient
    {
        /// <summary>
        /// Създава запис за подадено заявление.
        /// </summary>
        /// <param name="application">Подадено заявлени</param>   
        Task CreateApplicationAsync(Application application);

        /// <summary>
        /// Променя резултата на заявлението.
        /// </summary>
        /// <param name="requests">Заявка за промяна на резулта</param>
        Task UpdateApplicationResultAsync(List<ApplicationUpdateRequest> requests, Registers register);

        /// <summary>
        /// Търси подадени заявления.
        /// </summary>
        /// <param name="state"></param>
        /// <param name="searchCriteria">Критерии за търсене.</param>
        /// <returns></returns>
        Task<PagedResult<IEnumerable<Application>>> SerachApplicationsAsync(ApplicationSearchCriteria searchCriteria);
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationsServiceClient за работа с подадени заявления.
    /// </summary>
    internal class ApplicationServiceClient : IApplicationServiceClient
    {
        private readonly HttpClient _client;

        public ApplicationServiceClient(HttpClient client) =>
           _client = client ?? throw new ArgumentNullException("client");

        #region IApplicationsServiceClient

        public Task CreateApplicationAsync(Application application)
        {
            return _client.PostAsync("applications", application, CancellationToken.None);
        }

        public async Task UpdateApplicationResultAsync(List<ApplicationUpdateRequest> requests, Registers register)
        {
            var result = await _client.PutAsync("applications?register="+ ((int)register).ToString(), requests, CancellationToken.None);

            result.EnsureSuccessStatusCode2();
        }

        public Task<PagedResult<IEnumerable<Application>>> SerachApplicationsAsync(ApplicationSearchCriteria searchCriteria)
        {
            return _client.GetPagedAsync<IEnumerable<Application>>("applications", searchCriteria, CancellationToken.None);
        }



        #endregion
    }
}
