using EPZEU.Common;
using EPZEU.Users;
using EPZEU.Users.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Text.Json;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionCertificatesExtensions
    {
        /// <summary>
        /// Добавяне на услуги за работа с x509 сертификати.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddLoginSessionsServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.TryAddSingleton<ILoginSessionsService, LoginSessionsService>();
            services.TryAddSingleton<ICertificateHelper, CertificateHelper>();
            services.ConfigureX509ConfigOptions(configuration);
            services.TryAddSingleton<IUsersAuthenticationRepository, UsersAuthenticationRepository>();

            return services;
        }

        private static IServiceCollection ConfigureX509ConfigOptions(this IServiceCollection services, IConfiguration config)
        {
            services.ConfigureEPZEU<X509ConfigOptions>(config);

            services.PostConfigure<X509ConfigOptions>(options =>
            {
                string jsonConfiguration = options.EP_USR_X509_CONFIG;

                options.X509Configuration = EPZEUJsonSerializer.Deserialize<X509Config>(jsonConfiguration);
            });

            return services;
        }
    }
}
