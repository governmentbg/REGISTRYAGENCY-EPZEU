using EPZEU.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Emails
{
    /// <summary>
    /// Обект за конфигурация за изпращане на обекти.
    /// </summary>
    public class EmailOptions
    {
        /// <summary>
        /// Адрес на SMTP сървър за изпращане на емайл съобщения.
        /// </summary>
        public string EP_EML_SMTP_HOST { get; set; }

        /// <summary>
        /// Порт на SMTP сървър за изпращене на емайл съобщения.
        /// </summary>
        public int EP_EML_SMTP_PORT { get; set; }

        /// <summary>
        /// Потребител за достъп до SMTP сървър.
        /// </summary>
        public string EP_EML_SMTP_USER { get; set; }

        /// <summary>
        /// Парола на потребител за достъп до SMTP сървър.
        /// </summary>
        public string EP_EML_SMTP_PASSWORD { get; set; }

        /// <summary>
        /// Емайл адрес от който се пращат съобщенията.
        /// </summary>
        public string EP_EML_SEND_FROM { get; set; }

        /// <summary>
        /// Период от време, на който се изпращат неизпратените емайл съобщения.
        /// </summary>
        public TimeSpan EP_EML_POLLING_INTERVAL { get; set; }

        /// <summary>
        /// Максимален брой съобщения, които могат да бъдат взети при една итереция.
        /// </summary>
        public int EP_EML_MAX_EMAILS_FETCHED { get; set; }
    }

    /// <summary>
    /// Конфигурация на имейлите.
    /// </summary>
    public static class EmailsConfiguration
    {
        /// <summary>
        /// Конфигуриране на изпращането на имейли.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureEPZEUEmailOptions(this IServiceCollection services, IConfiguration config)
        {
            return services.ConfigureEPZEU<EmailOptions>(config);
        }
    }
}
