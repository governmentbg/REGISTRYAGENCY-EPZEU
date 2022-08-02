
using EPZEU.Security;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Microsoft.AspNetCore.Http
{
    public static class HttpContextExtensions
    {
        public const string EPZEUUserSessionCookieName = "EPZEUSessionID";

        /// <summary>
        /// Взима или генерира уникален идентификатор на потребителска сесия
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        public static Guid GetUserSessionID(this HttpContext httpContext)
        {
            string sessionID = null;
            Guid sessionIDGuid;
            object sessionIDObj;

            if (httpContext.Items.TryGetValue(EPZEUUserSessionCookieName, out sessionIDObj))
                return (Guid)sessionIDObj;

            if (!httpContext.Request.Cookies.TryGetValue(EPZEUUserSessionCookieName, out sessionID) ||
                !Guid.TryParse(sessionID, out sessionIDGuid))
            {
                sessionIDGuid = Guid.NewGuid();

                var configuration = httpContext.RequestServices.GetRequiredService<IConfiguration>().GetEPZEUSection();

                httpContext.Response.Cookies.Append(EPZEUUserSessionCookieName, sessionIDGuid.ToString(),
                    new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Domain = configuration.GetValue<string>("GL_COMMON_COOKIE_DOMAIN")
                    });
            }

            httpContext.Items.Add(EPZEUUserSessionCookieName, sessionIDGuid);

            return sessionIDGuid;
        }

        /// <summary>
        /// Връща EPZEUPrincipal
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        public static EPZEUPrincipal EPZEUUser(this HttpContext httpContext)
        {
            return httpContext.User as EPZEUPrincipal;
        }

        public static string GetLanguage(this HttpContext httpContext)
        {
            return httpContext.Features.Get<IRequestCultureFeature>().RequestCulture.UICulture.Name.Substring(0, 2);
        }
    }
}
