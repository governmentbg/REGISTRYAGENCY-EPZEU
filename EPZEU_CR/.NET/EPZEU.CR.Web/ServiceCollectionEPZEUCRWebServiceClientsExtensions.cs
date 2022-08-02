using EPZEU.CR.Web.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionEPZEUCRWebServiceClientsExtensions
    {
        /// <summary>
        /// Helper за регистриране на service clients към Eepzeu.cr.api към HttpClient с име {httpClientName}.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <param name="httpClientName"></param>
        /// <returns></returns>
        public static IServiceCollection AddApplicationConverter(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IApplicationConverter, ApplicationConverter>();

            return serviceCollection;
        }
    }
}