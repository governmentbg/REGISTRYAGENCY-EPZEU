using EPZEU.ServiceLimits.Cache;
using EPZEU.ServiceLimits.Repositories;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceColletionsLimitsExtensions
    {
        public static IServiceCollection AddServiceLimits(this IServiceCollection services)
        {
            services.TryAddSingleton<IDataServiceLimitRepository, DataServiceLimitRepository>();
            services.TryAddSingleton<IDataServiceUserLimitRepository, DataServiceUserLimitRepository>();

            services.TryAddSingleton<IServiceLimitsCache, ServiceLimitsDbCache>();

            return services;
        }
    }
}
