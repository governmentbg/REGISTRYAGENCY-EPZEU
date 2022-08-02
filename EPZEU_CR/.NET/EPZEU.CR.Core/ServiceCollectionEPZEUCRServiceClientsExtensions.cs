using EPZEU.Common;
using EPZEU.CR.Applications;
using IdentityModel.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionEPZEUCRServiceClientsExtensions
    {
        /// <summary>
        /// Helper за регистриране на service clients към Eepzeu.cr.api към HttpClient с име {httpClientName}.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <param name="httpClientName"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUCRServiceClients(this IServiceCollection serviceCollection, string httpClientName = EPZEUHttpClientNames.EPZEUCRApi)
        {
            serviceCollection.AddScopedWithHttpClient<IApplicationServiceClient, ApplicationServiceClient>(httpClientName);

            return serviceCollection;
        }
    }
}