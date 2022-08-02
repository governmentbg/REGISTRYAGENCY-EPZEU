using EPZEU.Web.IdentityServer.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace EPZEU.Web.IdentityServer.Extensions
{
    public static class AuthenticationBuilderExtensions
    {
        /// <summary>
        /// Добавя автентификация чрез ПИК на НАП.
        /// </summary>
        public static AuthenticationBuilder AddNRAAuthentication(this AuthenticationBuilder builder, IConfiguration configuration)
        {            
            var nraConfig = configuration.GetSection("NRA");

            string tokenEndpointUrl = configuration.GetEPZEUSection().GetValue<string>("EP_INTGR_NRA_API");
            string signingKey = nraConfig.GetValue<string>("SigningKey");
            string issuerName = nraConfig.GetValue<string>("IssuerName") ?? "NRA";
            string epzeuParticipantId = nraConfig.GetValue<string>("EpzeuParticipantId") ?? "epzeu";

            TimeSpan nraSessionDuration = (bool)nraConfig.GetSection("SessionDuration")?.Exists() ? 
                nraConfig.GetValue<TimeSpan>("SessionDuration") : new TimeSpan(0, 5, 0);
           
            return builder.AddScheme<NRAAUthOptions, NRAAuthenticationHandler>(AuthenticationOptions.NRASchemeName, options =>
            {
                options.IssueTokenEndpoint = tokenEndpointUrl;
                options.EPZEUParticipantId = epzeuParticipantId;
                options.AuthenticationPropertiesCookie = new CookieBuilder()
                {
                    Name = "nra.session",
                    Expiration = nraSessionDuration,
                    HttpOnly = true
                };
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = issuerName,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey))
                };
            });
        }
    }
}
