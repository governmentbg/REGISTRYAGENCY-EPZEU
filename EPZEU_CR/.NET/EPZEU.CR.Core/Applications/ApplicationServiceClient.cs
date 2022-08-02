using EPZEU.Applications.Models;
using EPZEU.CR.Applications.Models;
using EPZEU.Utilities;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Applications
{
    /// <summary>
    /// Интерфейс на http клиент за работа с заявления.
    /// </summary>
    public interface IApplicationServiceClient
    { 
        /// <summary>
        /// Връща текущите черновите на заявления за даден заявител.
        /// </summary>
        /// <param name="applicantCIN">CIN на заявител</param>
        /// <returns></returns>
        Task<IEnumerable<Application>> GetApplicantDraftsAsync(int applicantCIN);
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationsServiceClient за работа с заявления.
    /// </summary>
    internal class ApplicationServiceClient : IApplicationServiceClient
    {
        private readonly HttpClient _client;

        public ApplicationServiceClient(HttpClient client) =>
           _client = client ?? throw new ArgumentNullException("client");

        #region IApplicationServiceClient

        public Task<IEnumerable<Application>> GetApplicantDraftsAsync(int applicantCIN)
        {
            return _client.GetAsync<IEnumerable<Application>>("applications/drafts", new { applicantCIN = applicantCIN }, CancellationToken.None);
        }

        #endregion
    }
}
