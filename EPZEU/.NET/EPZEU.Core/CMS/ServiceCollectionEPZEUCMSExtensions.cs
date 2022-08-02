using EPZEU.CMS;
using EPZEU.CMS.Cache;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionEPZEUCMSExtensions
    {
        /// <summary>
        /// Добавя базовите услуги за работа  номенклатури в EPZEU с имплементация за достъп през услуга.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUCMSRemoteCachingServices(this IServiceCollection services)
        {
            services.TryAddSingleton<IStaticPagesDataCache, StaticPagesPollingCache>();
            services.TryAddSingleton<IStaticPages, StaticPages>();

            services.TryAddSingleton<IPagesDataCache, PagesPollingCache>();
            services.TryAddSingleton<IPages, Pages>();

            return services;
        }
    }
}
