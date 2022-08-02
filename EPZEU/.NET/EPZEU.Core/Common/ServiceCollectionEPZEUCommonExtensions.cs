using EPZEU.Common;
using EPZEU.Common.Cache;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionEPZEUCommonExtensions
    {
        /// <summary>
        /// Добавяне на IAppParameters с достъп през услуга
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUAppParametersRemote(this IServiceCollection services, IConfiguration configuration)
        {
            services.TryAddSingleton<IAppParametersDataCache, AppParametersRemoteCache>();
            services.TryAddSingleton<IAppParameters, AppParameters>();

            return services;
        }

        public static IServiceCollection ConfigureEPZEU<TOptions>(this IServiceCollection services, IConfiguration config) where TOptions : class
        {
            return services.Configure<TOptions>(config.GetEPZEUSection());
        }

        /// <summary>
        /// Конфигурира GlobalOptions от раздел с име 'EPZEU'.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureEPZEUGlobalOptions(this IServiceCollection services, IConfiguration config)
        {
            return services.ConfigureEPZEU<GlobalOptions>(config);
        }
    }
}
