using EPZEU.Common;
using EPZEU.Common.Cache;
using EPZEU.Common.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Microsoft.Extensions.Configuration
{
    public static class ConfigurationEPZEUExtensions
    {
        public const string EPZEUSectionName = ConfigurationEPZEUNetExtensions.EPZEUSectionName;

        public static IOptions<TOptions> GetEPZEUOptions<TOptions>(this IServiceProvider serviceProvider) where TOptions : class, new()
        {
            return serviceProvider.GetRequiredService<IOptions<TOptions>>();
        }

        public static IConfigurationBuilder AddEPZEUConfigurationRemote(this IConfigurationBuilder builder, Action<ILoggingBuilder> configureLogging = null)
        {
            var configuration = builder.Build();

            var services = new ServiceCollection();

            if (configureLogging != null)
                services.AddLogging(configureLogging);

            services.AddEPZEUHttpClients(configuration);

            services.AddEPZEUServiceClients();

            services
                .ConfigureEPZEUGlobalOptions(configuration)
                .ConfigureEPZEUHttpClientOptions(configuration)
                .ConfigureEPZEUHttpAuthenticationClientsOptions(configuration);

            services.AddEPZEUAppParametersRemote(configuration);

            using (var serviceProvider = services.BuildServiceProvider())
            {
                var serviceClient = serviceProvider.GetRequiredService<IAppParametersServiceClient>();

                var appParameters = serviceClient.LoadAppParametersAsync(null, CancellationToken.None).GetAwaiter().GetResult();

                builder.AddEPZEUConfiguration(appParameters.Data);
            }
            return builder;
        }

        /// <summary>
        /// Добавяне на конфигурация за ЕПЗЕУ.
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IConfigurationBuilder AddEPZEUConfiguration(
            this IConfigurationBuilder builder, IEnumerable<AppParameter> appParameters)
        {
            builder.Sources.Insert(0, new EPZEUConfigurationSource(appParameters));
            return builder;
        }

        public static IConfigurationRoot RegisterAppParametersSourceInEPZEUConfiguration(this IConfigurationRoot configurationRoot, IAppParameters appParameters)
        {
            var provider = configurationRoot.Providers.Single((item) => item is EPZEUConfigurationProvider) as EPZEUConfigurationProvider;

            provider.RegisterAppParametersSource(appParameters);

            return configurationRoot;
        }
    }
}
