using EPZEU.Net.Http;
using IdentityModel.Client;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Конфигурира EPZEUHttpClientsOptions секцията от EPZEU
        /// </summary>
        public static IServiceCollection ConfigureEPZEUHttpClientOptions(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<EPZEUHttpClientsOptions>(config.GetSection("EPZEU"));

            return services;
        }

        /// <summary>
        /// Конфигурира автентикацията на клиентите в EPZEU.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureEPZEUHttpAuthenticationClientsOptions(this IServiceCollection services, IConfiguration config)
        {
            return services
                .Configure<HttpAuthenticationClients>(config.GetSection("EPZEU").GetSection("httpAuthenticationClients"));
        }

        public static IServiceCollection AddDefaultIdentityTokenHttpClientConfiguration(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            var idsrvUrl = configuration.GetEPZEUSection().GetValue<string>("GL_IDSRV_URL");
            var disco = new DiscoveryCache(idsrvUrl.ToLower(), () => { return new HttpClient(); });
            var discoRes = disco.GetAsync().ConfigureAwait(false).GetAwaiter().GetResult();

            if (discoRes.IsError)
                throw new Exception($"Unable to get IDSRV configuration: {discoRes.Error}");

            serviceCollection.AddSingleton<IIndentityServiceTokenRequestClient, IndentityServicerTokenRequestClient>();

            serviceCollection.AddHttpClient(EPZEU.Net.Http.HttpClientNames.IdentityTokenApi, (sp, client) =>
            {
                client.BaseAddress = new Uri(discoRes.TokenEndpoint);
            }).ConfigureEPZEUHttpClientWithOptions()
            .AddEPZEUTimeoutHandler();

            return serviceCollection;
        }
    }
}
