using EPZEU.Net.Http;
using EPZEU.Web.IdentityServer;
using EPZEU.Web.IdentityServer.Common;
using EPZEU.Web.IdentityServer.Extensions;
using EPZEU.Web.IdentityServer.Security;
using IdentityServer4.Extensions;
using IdentityServer4.ResponseHandling;
using IdentityServer4.Validation;
using IdModel = IdentityModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Cryptography.X509Certificates;
using IdentityServer4.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using IdentityServer4.Stores;
using EPZEU.Applications.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// Екстеншън клас за DependencyInjection на Identity сървъра.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Конфигуриране на DependencyInjection на Identity сървъра.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <param name="environment"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureIdentityServer(this IServiceCollection serviceCollection, IWebHostEnvironment environment, IConfiguration configuration)
        {
            string connectionStringCfg = configuration.GetEPZEUSection().GetValue<string>("EP_IDSRV_CONFIG_DB_CONNECTION_STRING");
            var identityServerConfiguration = configuration.GetSection("IdentityServer");

            var idsrvBuilder = serviceCollection.AddIdentityServer(options =>
            {                
                identityServerConfiguration.Bind(options);

                options.IssuerUri = configuration.GetEPZEUSection().GetValue<string>("GL_IDSRV_URL").ToLower();
                options.Discovery.CustomEntries.Add("register_authentication_endpoint", $"~{EndpointOptions.RegisterAuthenticationEndpointAddress}");
            })
            .AddConfigurationStore(options =>
            {
                configuration.GetSection("ConfigurationStoreOptions").Bind(options);
                options.ConfigureDbContext = b => b.UseNpgsql(connectionStringCfg);
            })
            .AddOperationalStore(options => {

                configuration.GetSection("OperationalStoreOptions").Bind(options);
                options.ConfigureDbContext = b => b.UseNpgsql(connectionStringCfg);
            })
            .AddExtensionGrantValidator<DelegationGrantValidator>()
            .AddExtensionGrantValidator<WeakDelegationGrantValidator>();
            
            serviceCollection.Configure<IdentityServer4.Configuration.AuthenticationOptions>(identityServerConfiguration);
            serviceCollection.Configure<EPZEU.Web.IdentityServer.AuthenticationOptions>(identityServerConfiguration);

            // някои от методите за вход се определят от комбинацията параметър в EP_ + локалната конфигурация на самия идентити сървър;
            serviceCollection.Configure<EPZEU.Web.IdentityServer.AuthenticationOptions>(options =>
            {
                var epzeuSection = configuration.GetEPZEUSection();

                options.EnableKEPAuth = options.EnableKEPAuth && epzeuSection.GetValue<int>("EP_CERT_AUTH_ENABLED") == 1;
                options.EnableNRAAuth = options.EnableNRAAuth && epzeuSection.GetValue<int>("EP_NRA_AUTH_ENABLED") == 1;
            });

            var thumbPrint = configuration.GetEPZEUSection().GetValue<string>("EP_IDSRV_SIGN_CERT_THUMBPRINT").NormalizeThumbprint();

            if (!string.IsNullOrEmpty(thumbPrint))
                idsrvBuilder.AddSigningCredential(thumbPrint, StoreLocation.LocalMachine, NameType.Thumbprint);
            else
                idsrvBuilder.AddDeveloperSigningCredential(true, identityServerConfiguration.GetValue<string>("DeveloperSingingCredentialFileName"));

            idsrvBuilder.AddEndpoint<RegisterAuthenticationEndpoint>("RegisterAuthenticationEndpoint", EndpointOptions.RegisterAuthenticationEndpointAddress);
            
            serviceCollection.AddSingleton<IRedirectUriValidator, RedirectUriValidator>();

            // clients + resources caching
            idsrvBuilder.AddConfigurationStoreCache();

            return serviceCollection;
        }

        /// <summary>
        /// Добавя http clients за EPZEU апи-тата, и конфигурира автентификацията за тях - оптимизирана за IdentityServer-a
        /// </summary>
        public static IServiceCollection AddEPZEUHttpClientsForIdentityServer(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            return serviceCollection
                .AddEPZEUHttpClients(configuration, (services, config) => {

                    services.AddSingleton<IIndentityServiceTokenRequestClient, IndentityServicerTokenRequestClient>();

                    services.AddHttpClient(EPZEU.Net.Http.HttpClientNames.IdentityTokenApi, (sp, client) =>
                    {
                        var baseUrl = configuration.GetEPZEUSection().GetValue<string>("GL_IDSRV_URL");
                        var issuerUri = sp.GetRequiredService<IdentityServer4.Configuration.IdentityServerOptions>().IssuerUri;

                        var tokenEndpointAddressFromConfig = configuration.GetSection("IdentityServer").GetValue<string>("TokenEndpointUrl");

                        // за да не се чете Discovery документа, правим token httpclient-a с дефолтния адрес (/connect/token) или от конфига IdentityServer/TokenEndpointUrl

                        var tokenEndpointUri = string.IsNullOrEmpty(tokenEndpointAddressFromConfig) ?
                            new Uri($"{baseUrl.EnsureTrailingSlash()}connect/token") : new Uri(tokenEndpointAddressFromConfig);

                        client.BaseAddress = tokenEndpointUri;

                    }).ConfigureEPZEUHttpClientWithOptions();

                    return services;
                });
        }
    }
}
