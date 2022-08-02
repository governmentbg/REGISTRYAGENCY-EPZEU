using EPZEU.Applications;
using EPZEU.Audit;
using EPZEU.CMS;
using EPZEU.Common;
using EPZEU.DocumentTemplates;
using EPZEU.Emails;
using EPZEU.Nomenclatures;
using EPZEU.Signing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionEPZEUServiceClientsExtensions
    {
        /// <summary>
        /// Helper за регистриране на service clients към EPZEU.API към HttpClient с име {httpClientName}.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <param name="httpClientName"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUServiceClients(this IServiceCollection serviceCollection, string httpClientName = EPZEUHttpClientNames.EPZEUApi)
        {
            serviceCollection.AddTransientWithHttpClient<ICMSServiceClient, CMSServiceClient>(httpClientName);
            serviceCollection.AddTransientWithHttpClient<IAppParametersServiceClient, AppParametersServiceClient>(httpClientName);
            serviceCollection.AddTransientWithHttpClient<INomenclaturesServiceClient, NomenclaturesServiceClient>(httpClientName);
            serviceCollection.AddScopedWithHttpClient<IDocumentTemplatesServiceClient, DocumentTemplatesServiceClient>(httpClientName);

            serviceCollection.AddScopedWithHttpClient<IAuditServiceClient, AuditServiceClient>(httpClientName);
            serviceCollection.AddScopedWithHttpClient<IEmailNotificationServiceClient, EmailNotificationServiceClient>(httpClientName);
            serviceCollection.AddScopedWithHttpClient<ISigningServiceClient, SigningServiceClient>(httpClientName);
            serviceCollection.AddScopedWithHttpClient<IApplicationServiceClient, ApplicationServiceClient>(httpClientName);

            return serviceCollection;
        }

        /// <summary>
        /// Helper за регистриране на service clients към EPZEU.UI към HttpClient с име {httpClientName}.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <param name="httpClientName"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUUIServiceClients(this IServiceCollection serviceCollection, string httpClientName = EPZEUHttpClientNames.EPZEUUI)
        {
            serviceCollection.AddHttpClient<IEPZEUUIServiceClient, EPZEUUIServiceClient>(httpClientName).AddEPZEUTimeoutHandler();

            return serviceCollection;
        }

        /// <summary>
        /// Регистрира HttpClient-и за EPZEU.API и за token API спрямо текущата конфигурация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUHttpClients(this IServiceCollection serviceCollection, IConfiguration configuration, Func<IServiceCollection, IConfiguration, IServiceCollection> configureTokenHttpClient = null)
        {
            serviceCollection
                .AddHttpClient(EPZEUHttpClientNames.EPZEUApi)
                .ConfigureEPZEUHttpClientWithOptions()
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(sp.GetRequiredService<IOptionsMonitor<GlobalOptions>>().CurrentValue.GL_EPZEU_API);
                })
                .AddEPZEUAuthenticationHandler()
                .AddEPZEUTimeoutHandler();

            var configureTokenHttpClientAction = configureTokenHttpClient ?? DefaultIdentityTokenHttpClientConfiguration();

            serviceCollection = configureTokenHttpClientAction(serviceCollection, configuration);

            return serviceCollection;
        }

        /// <summary>
        /// Регистрира HttpClient-и за CR.API и за token API спрямо текущата конфигурация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddTRRULNCHttpClients(this IServiceCollection serviceCollection, IConfiguration configuration, Func<IServiceCollection, IConfiguration, IServiceCollection> configureTokenHttpClient = null)
        {
            serviceCollection
                .AddHttpClient(EPZEUHttpClientNames.TRRULNCApi)
                .ConfigureEPZEUHttpClientWithOptions()
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(configuration.GetEPZEUSection().GetValue<string>("CR_REGISTER_API"));
                })
                .AddEPZEUAuthenticationHandler()
                .AddEPZEUTimeoutHandler();

            var configureTokenHttpClientAction = configureTokenHttpClient ?? DefaultIdentityTokenHttpClientConfiguration();

            serviceCollection = configureTokenHttpClientAction(serviceCollection, configuration);

            return serviceCollection;
        }

        /// <summary>
        /// Регистрира HttpClient-и за CR.API и за token API спрямо текущата конфигурация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddPRRegisterHttpClients(this IServiceCollection serviceCollection, IConfiguration configuration, Func<IServiceCollection, IConfiguration, IServiceCollection> configureTokenHttpClient = null)
        {
            serviceCollection
                .AddHttpClient(EPZEUHttpClientNames.PRRegisterApi)              
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(configuration.GetEPZEUSection().GetValue<string>("PR_REGISTER_API"));
                })
                .AddEPZEUTimeoutHandler();

            var configureTokenHttpClientAction = configureTokenHttpClient ?? DefaultIdentityTokenHttpClientConfiguration();

            serviceCollection = configureTokenHttpClientAction(serviceCollection, configuration);

            return serviceCollection;
        }

        /// <summary>
        /// Регистрира HttpClient-и за epzeu.cr.api спрямо текущата конфигурация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUCRHttpClients(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection
                .AddHttpClient(EPZEUHttpClientNames.EPZEUCRApi)
                .ConfigureEPZEUHttpClientWithOptions()
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(configuration.GetEPZEUSection().GetValue<string>("GL_CR_API"));
                })
                .AddEPZEUAuthenticationHandler()
                .AddEPZEUTimeoutHandler();

            return serviceCollection;
        }

        /// <summary>
        /// Регистрира HttpClient-и за epzeu.pr.api спрямо текущата конфигурация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUPRHttpClients(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection
                .AddHttpClient(EPZEUHttpClientNames.EPZEUPRApi)
                .ConfigureEPZEUHttpClientWithOptions()
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(configuration.GetEPZEUSection().GetValue<string>("GL_PR_API"));
                })
                .AddEPZEUAuthenticationHandler()
                .AddEPZEUTimeoutHandler();

            return serviceCollection;
        }

        /// <summary>
        /// Регистрира HttpClient-и за payments.api спрямо текущата конфигурация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddPaymentsHttpClients(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection
                .AddHttpClient(EPZEUHttpClientNames.PaymentsApi)
                .ConfigureEPZEUHttpClientWithOptions()
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(configuration.GetEPZEUSection().GetValue<string>("GL_PAYMENTS_API"));
                })
                .AddEPZEUAuthenticationHandler()
                .AddEPZEUTimeoutHandler();

            return serviceCollection;
        }

        /// <summary>
        /// Регистрира HttpClient-и за EPZEU.UI спрямо текущата конфигурация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUUIHttpClients(this IServiceCollection serviceCollection)
        {
            serviceCollection
                .AddHttpClient(EPZEUHttpClientNames.EPZEUUI)
                .ConfigureEPZEUHttpClientWithOptions()
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(sp.GetRequiredService<IOptionsMonitor<GlobalOptions>>().CurrentValue.GL_EPZEU_PUBLIC_UI_URL);
                })
                .AddEPZEUTimeoutHandler();

            return serviceCollection;
        }

        public static IServiceCollection AddScopedWithHttpClient<TClient, TImplementation>(this IServiceCollection services, string name)
            where TClient : class
            where TImplementation : class, TClient
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            services.AddScoped<TClient>(s =>
            {
                var httpClientFactory = s.GetRequiredService<IHttpClientFactory>();
                var httpClient = httpClientFactory.CreateClient(name);

                var typedClientFactory = s.GetRequiredService<ITypedHttpClientFactory<TImplementation>>();
                return typedClientFactory.CreateClient(httpClient);
            });

            return services;
        }

        public static IServiceCollection AddTransientWithHttpClient<TClient, TImplementation>(this IServiceCollection services, string name)
            where TClient : class
            where TImplementation : class, TClient
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            services.AddTransient<TClient>(s =>
            {
                var httpClientFactory = s.GetRequiredService<IHttpClientFactory>();
                var httpClient = httpClientFactory.CreateClient(name);

                var typedClientFactory = s.GetRequiredService<ITypedHttpClientFactory<TImplementation>>();
                return typedClientFactory.CreateClient(httpClient);
            });

            return services;
        }


        private static Func<IServiceCollection, IConfiguration, IServiceCollection> DefaultIdentityTokenHttpClientConfiguration()
        {
            return (serviceCollection, configuration) =>
            {
                return serviceCollection.AddDefaultIdentityTokenHttpClientConfiguration(configuration);
            };
        }
    }
}