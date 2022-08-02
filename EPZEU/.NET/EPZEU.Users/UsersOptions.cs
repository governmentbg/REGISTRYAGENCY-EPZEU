using EPZEU.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace EPZEU.Users
{
    /// <summary>
    /// Extensions на IServiceCollection за конфигуриране на UsersOptions.
    /// </summary>
    public static class UsersExtensions
    {
        /// <summary>
        /// Конфигуриране на UsersOptions.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureEPZEUUsersOptions(this IServiceCollection services, IConfiguration config)
        {
            return services.ConfigureEPZEU<UsersOptions>(config);
        }
    }

    /// <summary>
    /// Конфигурационни параметри по потребителите.
    /// </summary>
    public class UsersOptions
    {
        /// <summary>
        /// Период от време за изчакване преди да бъде автоматично отключен потребителския профил след определен брой неуспешни опити за автентикация.
        /// </summary>
        public TimeSpan EP_USR_LOCK_FOR_PERIOD { get; set; }

        /// <summary>
        /// Максимален брой неуспешни опити за автентикация на потребител.
        /// </summary>
        public int EP_USR_MAX_LOGIN_ATTEMPT_COUNT { get; set; }

        /// <summary>
        /// Период от време за изчакване на потвърждение от потребител при регистрация на профил на нов външен потребител.
        /// </summary>
        public TimeSpan EP_USR_REGISTRATION_CONFIRM_PERIOD { get; set; }
    }
}