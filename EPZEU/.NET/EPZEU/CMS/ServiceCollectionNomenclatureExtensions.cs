using EPZEU.CMS;
using EPZEU.CMS.Cache;
using EPZEU.CMS.Repositories;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionCMSExtensions
    {
        /// <summary>
        /// Регистрира услуги за достъп до CMS към базата данни.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUCMS(this IServiceCollection services)
        {
            services.TryAddSingleton(typeof(IPageRepository), typeof(PageRepository));
            services.TryAddSingleton(typeof(IStaticPageRepository), typeof(StaticPageRepository));

            return services;
        }

        /// <summary>
        /// Добавя базовите интерфейси с кеширане за работа с CMS в EPZEU с имплементация за достъп през базата данни.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUCMSDBCaching(this IServiceCollection services)
        {
            services.TryAddSingleton<IPagesDataCache, PagesDbCache>();
            services.TryAddSingleton<IPages, Pages>();

            services.TryAddSingleton<IStaticPagesDataCache, StaticPagesDbCache>();
            services.TryAddSingleton<IStaticPages, StaticPages>();

            return services;
        }
    }
}
