using EPZEU.Web.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EPZEU.Web
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class RequestLocalizationRedirectFilterAttribute : Attribute, IAsyncResourceFilter
    {
        private readonly static Lazy<Regex> _urlLangRegex = new Lazy<Regex>(() => new Regex("/([a-zA-Z]{2})/"), true);

        public async Task OnResourceExecutionAsync(ResourceExecutingContext context, ResourceExecutionDelegate next)
        {
            string lang = context.HttpContext.GetLanguage();
            string urlLang = GetURLLang(context.HttpContext.Request.Path.Value);
            string redirectUrl = context.HttpContext.Request.Path.Value;

            if (context.HttpContext.Request.QueryString.HasValue)
            {
                redirectUrl = string.Format("{0}{1}", redirectUrl, context.HttpContext.Request.QueryString.Value);
            }

            if ((string.IsNullOrEmpty(urlLang) && lang != "bg") ||
               (!string.IsNullOrEmpty(urlLang) && urlLang != lang) ||
               (urlLang == "bg" && lang == "bg"))
            {
                if (string.IsNullOrEmpty(urlLang))
                {
                    redirectUrl = UrlHelpers.PrepareUrl(string.Format("{0}/{1}/{2}", context.HttpContext.Request.PathBase, lang, redirectUrl));
                }
                else
                {
                    redirectUrl = context.HttpContext.Request.PathBase + "/" + redirectUrl;

                    if (lang == "bg")
                    {
                        if (string.IsNullOrEmpty(context.HttpContext.Request.Cookies["currentLang"]) || context.HttpContext.Request.Cookies["currentLang"].Substring(0, 2) != lang)
                        {
                            context.HttpContext.Response.Cookies.Append("currentLang", lang,
                                new CookieOptions()
                                {
                                    Path = "/",
                                    Expires = new DateTimeOffset(new DateTime(2033, 12, 1)),
                                    Domain = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>().GetEPZEUSection().GetValue<string>("GL_COMMON_COOKIE_DOMAIN")
                                });
                        }

                        redirectUrl = UrlHelpers.PrepareUrl(redirectUrl.Replace(string.Format("/{0}/", urlLang), "/"));
                    }
                    else
                    {
                        redirectUrl = UrlHelpers.PrepareUrl(redirectUrl.Replace(string.Format("/{0}/", urlLang), string.Format("/{0}/", lang)));
                    }
                }

                context.HttpContext.Response.Redirect(redirectUrl);
            }
            else
            {
                var ret = await next();
                return;
            }
        }

        #region Helpers

        private string GetURLLang(string urlPathWithoutDomain)
        {
            string urlLang = null;

            var match = _urlLangRegex.Value.Match(urlPathWithoutDomain);

            if (match != null
                && match.Success
                && urlPathWithoutDomain.StartsWith(match.Value))
            {
                urlLang = match.Groups[1].Value;
            }

            return urlLang;
        }

        #endregion
    }
}
