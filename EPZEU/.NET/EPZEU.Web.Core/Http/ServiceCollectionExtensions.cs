using EPZEU.Common;
using EPZEU.Net.Http.Authentication;
using EPZEU.Security;
using EPZEU.Web.Http;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHttpContextEPZEUUserAccessor(this IServiceCollection services)
        {
            services.TryAddSingleton<HttpContextEPZEUUserAccessor>();
            services.TryAddSingleton<IEPZEUUserAccessor>((sp) => { return sp.GetRequiredService<HttpContextEPZEUUserAccessor>(); });
            services.TryAddSingleton<IClaimsPrincipalAccessor>((sp) => { return sp.GetRequiredService<HttpContextEPZEUUserAccessor>(); });
            services.TryAddSingleton<IEPZEUUserImpersonation>((sp) => { return sp.GetRequiredService<HttpContextEPZEUUserAccessor>(); });

            return services;
        }

        public static IServiceCollection AddEPZEUPrincipalTransformation(this IServiceCollection services)
        {
            services.AddScoped(typeof(IClaimsTransformation), typeof(EPZEUPrincipalTranformation));

            return services;
        }

        public static AuthenticationBuilder AddEPZEUAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddEPZEUAuthentication(null, configuration);
        }
        public static AuthenticationBuilder AddEPZEUAuthentication(this IServiceCollection services, Action<IdentityServerAuthenticationOptions> configureOptions, IConfiguration configuration)
        {
            var ret = services.AddEPZEUAuthentication((options) =>
            {
                configuration.GetEPZEUSection().GetSection("Authentication").Bind(options);

                options.Authority = configuration.GetEPZEUSection().Get<GlobalOptions>().GL_IDSRV_URL;

                options.TokenRetriever = EPZEUTokenRetrieval.DefaultTokenRetrieval();

                configureOptions?.Invoke(options);
            });

            services.AddEPZEUPrincipalTransformation();

            return ret;
        }        
    }    
}
