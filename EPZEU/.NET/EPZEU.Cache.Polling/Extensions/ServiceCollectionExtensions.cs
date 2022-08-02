using CNSys.Caching;
using EPZEU.Utilities.Caching;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCachePollingBackgroundService(this IServiceCollection services, Action<CachePollingOptions> configureOptions)
        {
            services.AddOptions<CachePollingOptions>();
            services.Configure(configureOptions);

            services.TryAddSingleton<CachePollingBackgroundService>();
            services.AddSingleton<IHostedService>((sp) => sp.GetRequiredService<CachePollingBackgroundService>());
            services.AddSingleton<IPollingCacheInfrastructure>((sp) => sp.GetRequiredService<CachePollingBackgroundService>());

            return services;
        }
    }
}
