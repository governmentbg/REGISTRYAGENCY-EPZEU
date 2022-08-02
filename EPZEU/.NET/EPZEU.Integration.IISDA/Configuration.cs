using EPZEU.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Integration.IISDA
{
    public class IntegrationIISDAOptions
    {
        /// <summary>
        /// Адрес на услуга за достъп до административните услуги в ИИСДА. Използва се за извличане на информация относно услуги.
        /// </summary>
        public string EP_INTGR_IISDA_ADM_SERVICES_API { get; set; }

        /// <summary>
        /// Период от време, през който се синхронизират данни за услуги от ИИСДА.
        /// </summary>
        public TimeSpan EP_INTGR_IISDA_ADM_SERVICES_INTERVAL { get; set; }

        /// <summary>
        /// Номер на партида на Агенция по вписванията от административен регистър в ИИСДА. Използва се за извличане на информация относно услуги.
        /// </summary>
        public string EP_INTGR_IISDA_RA_BATCH_NUMBER { get; set; }
    }

    /// <summary>
    /// Екстеншън клас за конфигурацияна IntegrationIISDA
    /// </summary>
    public static class IntegrationIISDAConfigurationExtensions
    {
        /// <summary>
        /// Конфигуриране IISDA
        /// </summary>
        /// <param name="services">услуги с DependencyInjection</param>
        /// <param name="config">услуги с DependencyInjection</param>
        /// <returns></returns>
        public static IServiceCollection ConfigureIISDAOptions(this IServiceCollection services, IConfiguration config)
        {
            return services.ConfigureEPZEU<IntegrationIISDAOptions>(config);
        }
    }
}
