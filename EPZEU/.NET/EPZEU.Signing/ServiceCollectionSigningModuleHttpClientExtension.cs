using Microsoft.Extensions.Configuration;
using System;
using EPZEU.Signing;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using EPZEU.Signing.Evrotrust;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionSigningModuleHttpClientExtension
    {
        /// <summary>
        /// Регистрира HttpClient за BSecureDssl.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddSignModuleHttpClient(this IServiceCollection serviceCollection)
        {
            serviceCollection
                .AddHttpClient(SignModuleConstants.BSecureDsslHttpClientName)
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(sp.GetRequiredService<IConfiguration>().GetEPZEUSection().GetValue<string>("EP_SIGN_BSECURE_DSSL_API"));
                })
                .AddEPZEUTimeoutHandler();

            serviceCollection.AddHttpClient(SignModuleConstants.BTrustRemoteHttpClientName)
                .ConfigurePrimaryHttpMessageHandler((sp) =>
                {
                    var handler = new HttpClientHandler();

                    X509Store store = null;
                    try
                    {
                        store = new X509Store(StoreLocation.LocalMachine);
                        store.Open(OpenFlags.ReadOnly);

                        var certThumbPrint = sp.GetRequiredService<IConfiguration>().GetEPZEUSection().GetValue<string>("EP_SIGN_BTRUST_REMOTE_CLIENT_CERT");
                        var certCollection = store.Certificates.Find(X509FindType.FindByThumbprint, certThumbPrint, true);

                        if (certCollection.Count != 1)
                            throw new Exception("Unable to locate the correct SSL certificate for Btrust.");

                        handler.ClientCertificates.Add(certCollection[0]);
                    }
                    catch
                    {
                        throw;
                    }
                    finally
                    {
                        if (store != null)
                            store.Close();
                    }

                    return handler;
                })
                .ConfigureHttpClient((sp, client) =>
                {
                    client.BaseAddress = new Uri(sp.GetRequiredService<IConfiguration>().GetEPZEUSection().GetValue<string>("EP_SIGN_BTRUST_REMOTE_CLIENT_API"));
                })
                .AddEPZEUTimeoutHandler();

            serviceCollection.AddHttpClient(SignModuleConstants.EvrotrustRemoteHttpClientName).ConfigureHttpClient((sp, client) => {
                client.BaseAddress = new Uri(sp.GetRequiredService<IConfiguration>().GetEPZEUSection().GetValue<string>("EP_SIGN_EVROTRUST_CLIENT_API"));
            })

                .AddEPZEUTimeoutHandler();

            serviceCollection.AddHttpClient(SignModuleConstants.EvrotrustRemoteCallbackHttpClientName).ConfigureHttpClient((sp, client) => {
                client.BaseAddress = new Uri(sp.GetRequiredService<IConfiguration>().GetEPZEUSection().GetValue<string>("EP_SIGN_EVROTRUST_CALLBACK_API"));
            })
                .AddEPZEUTimeoutHandler();

            return serviceCollection;
        }

        /// <summary>
        /// Helper за регистриране на EPZEU.Signing.BSecureDSSL.Client към HttpClient с име {httpClientName}.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <param name="httpClientName"></param>
        /// <returns></returns>
        public static IServiceCollection AddBSecureDsslServiceClient(this IServiceCollection serviceCollection, string httpClientName = SignModuleConstants.BSecureDsslHttpClientName)
        {
            serviceCollection.AddScopedWithHttpClient<EPZEU.Signing.BSecureDSSL.IBSecureDsslClient, EPZEU.Signing.BSecureDSSL.BSecureDsslClient>(httpClientName);

            return serviceCollection;
        }

        public static IServiceCollection AddBTrustRemoteServiceClient(this IServiceCollection serviceCollection, string httpClientName = SignModuleConstants.BTrustRemoteHttpClientName)
        {
            serviceCollection.AddScopedWithHttpClient<EPZEU.Signing.BtrustRemoteClient.IBtrustRemoteClient, EPZEU.Signing.BtrustRemoteClient.BtrustRemoteClient>(httpClientName);

            return serviceCollection;
        }

        public static IServiceCollection AddEvrotrustRemoteServiceClient(this IServiceCollection serviceCollection, string httpClientName = SignModuleConstants.EvrotrustRemoteHttpClientName)
        {
            serviceCollection.AddScopedWithHttpClient<IEvrotrustClient, EvrotrustClient>(httpClientName);

            return serviceCollection;
        }
    }
}
