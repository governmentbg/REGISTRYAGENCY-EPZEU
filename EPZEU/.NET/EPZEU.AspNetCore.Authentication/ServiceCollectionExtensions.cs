using EPZEU.AspNetCore.Authentication;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Добавя автентификация по схема Bearer, закача IdentityServer authentication handler и конфигурира JwtBearerOptions.
        /// </summary>
        /// <param name="configureOptions">Опции на IdentityServer authentication</param>
        public static AuthenticationBuilder AddEPZEUAuthentication(this IServiceCollection services, Action<IdentityServerAuthenticationOptions> configureOptions)
        {
            var ret = services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
               .AddIdentityServerAuthentication((options) =>
               {
                   configureOptions?.Invoke(options);
               });

            return ret;
        }

        /// <summary>
        /// Конфигурира подадените опции. Делегата се вика за всяко отделно име !
        /// </summary>
        /// <typeparam name="TOptions"></typeparam>
        /// <param name="services"></param>
        /// <param name="action"></param>
        /// <returns></returns>
        public static IServiceCollection Configure<TOptions>(this IServiceCollection services, Action<string, TOptions> action) where TOptions : class
        {
            services.AddSingleton<IConfigureOptions<TOptions>>((sp) => { return new CommonOptionsConfiguration<TOptions>(action); });
            services.AddSingleton<IConfigureNamedOptions<TOptions>>((sp) => { return new CommonOptionsConfiguration<TOptions>(action); });

            return services;
        }
    }
}
