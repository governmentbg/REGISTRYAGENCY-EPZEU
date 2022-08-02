using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace EPZEU.Users
{
    /// <summary>
    /// Extensions клас за IServiceCollection по функционалности по потребителите.
    /// </summary>
    public static class EPZEUUsersServiceCollectionExtensions
    {
        /// <summary>
        /// Регистриране на функционалности по потребителите за автентикация и валидация.
        /// </summary>
        /// <param name="serviceCollection"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUUsersLogin(this IServiceCollection services)
        {
            services.TryAddScoped<IUsersLoginService, UsersLoginService>();
            services.TryAddSingleton<IPasswordValidationService, PasswordValidationService>();

            return services;
        }
    }
}
