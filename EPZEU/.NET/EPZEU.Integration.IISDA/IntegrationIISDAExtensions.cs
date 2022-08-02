using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace EPZEU.Integration.IISDA
{
    /// <summary>
    /// Статичен клас за екстеншъни свързани с интеграцията на IISDA.
    /// </summary>
    public static class IntegrationIISDAExtensions
    {
        /// <summary>
        /// Добавя услуги обработка на административни услуги от ИИСДА.
        /// </summary>
        /// <param name="services">услуги с DependencyInjection</param>
        /// <returns>услуги с DependencyInjection</returns>
        public static IServiceCollection AddIISDAProcessingServices(this IServiceCollection services)
        {
            services.AddSingleton(typeof(IIISDAServiceDescriptionBuilder), typeof(IISDAServiceDescriptionHtmlBuilder));

            services.AddScoped(typeof(IIISDAServicesProcessor), typeof(IISDAServicesProcessor));

            services.AddSingleton(typeof(IHostedService), typeof(SynchronizationEngine));

            return services;
        }
    }
}
