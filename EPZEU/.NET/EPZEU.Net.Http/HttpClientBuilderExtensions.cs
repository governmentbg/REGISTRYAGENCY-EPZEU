using EPZEU.Net.Http;
using EPZEU.Net.Http.Authentication;
using Microsoft.Extensions.Options;
using System;
using System.Linq;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class HttpClientBuilderExtentsions
    {
        /// <summary>
        /// Конфигурира HttpClient спрямо секцията в EPZEU.
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IHttpClientBuilder ConfigureEPZEUHttpClientWithOptions(this IHttpClientBuilder builder)
        {
            builder.ConfigureHttpClient((sp, client) =>
            {
                var clientsOptions = sp.GetRequiredService<IOptions<EPZEUHttpClientsOptions>>().Value;

                if (clientsOptions != null &&
                    clientsOptions.HttpClients != null)
                {
                    if (clientsOptions.HttpClients.TryGetValue(builder.Name, out HttpClientOptions clientOptions))
                    {
                        if (clientOptions.TimeOut != null && clientOptions.TimeOut != TimeSpan.Zero)
                            client.Timeout = clientOptions.TimeOut;
                    }
                }
            });
            return builder;
        }

        /// <summary>
        /// Добавя автентикация на httpClient.
        /// </summary>
        /// <param name="httpClientBuilder"></param>
        /// <returns></returns>
        public static IHttpClientBuilder AddEPZEUAuthenticationHandler(this IHttpClientBuilder httpClientBuilder)
        {
            httpClientBuilder.ConfigureHttpMessageHandlerBuilder((builder) =>
            {
                if (!builder.AdditionalHandlers.Any((handler) => handler is AuthenticationMessageHandler))
                {
                    var sp = builder.Services;
                    
                    var clientsOptions = sp.GetRequiredService<IOptions<EPZEUHttpClientsOptions>>().Value;

                    var clientOptions = clientsOptions.HttpClients[httpClientBuilder.Name];

                    var authClientOptions = sp.GetRequiredService<IOptions<HttpAuthenticationClients>>().Value.Clients[clientOptions.Auth.AuthenticationClientID];

                    builder.AdditionalHandlers.Add(new AuthenticationMessageHandler(sp.GetRequiredService<IIndentityServiceTokenRequestClient>(), 
                                                                                    authClientOptions, 
                                                                                    clientOptions.Auth));
                }
            });
            return httpClientBuilder;
        }

        /// <summary>
        /// Добавя типизирана Timeout грешка на httpClient.
        /// </summary>
        /// <param name="httpClientBuilder"></param>
        /// <returns></returns>
        public static IHttpClientBuilder AddEPZEUTimeoutHandler(this IHttpClientBuilder httpClientBuilder, double timeoutSeconds = 99)
        {
            httpClientBuilder.ConfigureHttpMessageHandlerBuilder((builder) =>
            {
                if (!builder.AdditionalHandlers.Any((handler) => handler is TimeoutHandler))
                {
                    builder.AdditionalHandlers.Add(new TimeoutHandler(timeoutSeconds));
                }
            });
            return httpClientBuilder;
        }
    }
}