using EPZEU.Utilities;
using System;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddNpgCacheInvalidationDispatcher(this IServiceCollection services, Action<NpgCacheInvalidationDispatcherOptions, IServiceProvider> configureOptions)
        {
            services.TryAddSingleton(typeof(NpgCacheInvalidationDispatcherOptions), (sp) =>
            {
                NpgCacheInvalidationDispatcherOptions options = new NpgCacheInvalidationDispatcherOptions();

                configureOptions?.Invoke(options, sp);

                return options;
            });

            services.TryAddSingleton<NpgCacheInvalidationDispatcher>();
            services.AddSingleton<IHostedService>((sp) => sp.GetRequiredService<NpgCacheInvalidationDispatcher>());
            services.TryAddSingleton<IDbCacheInvalidationDispatcher>((sp) => sp.GetRequiredService<NpgCacheInvalidationDispatcher>());

            return services;
        }
    }
}
