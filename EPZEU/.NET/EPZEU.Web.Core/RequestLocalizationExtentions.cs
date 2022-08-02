﻿using EPZEU.Nomenclatures;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using System;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class RequestCultureMiddlewareExtensions
    {
        /// <summary>
        ///  CNSYS Локализация
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseEPZEURequestLocalization(this IApplicationBuilder builder)
        {
            var languages = builder.ApplicationServices.GetService<ILanguages>();
            var labels = builder.ApplicationServices.GetService<ILabels>();

            var supportedCultures = languages.GetLanguages().Select(l => new CultureInfo(l.Code)).ToArray();
            var localizationOptions = new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(languages.GetDefaultLanguage()?.Code ?? "bg-BG"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            };

            // By default, RequestLocalizationOptions sets its RequestCultureProviders property to a list with the following providers, in this order:
            //     1.QueryStringRequestCultureProvider
            //     2.CookieRequestCultureProvider
            //     3.AcceptLanguageHeaderRequestCultureProvider
            //RequestLocalizationMiddleware calls the providers in this order, and the first provider that returns culture information will have its results used.

            localizationOptions.RequestCultureProviders.Clear();
            localizationOptions.RequestCultureProviders.Add(new CustomUrlRequestCultureProvider(languages));
            localizationOptions.RequestCultureProviders.Add(new CustomCookieRequestCultureProvider(languages));
            localizationOptions.RequestCultureProviders.Add(new CustomAcceptLanguageHeaderRequestCultureProvider(languages));
            localizationOptions.RequestCultureProviders.Add(new CustomRequestCultureProvider((context) =>
            {
                return Task.FromResult<ProviderCultureResult>(new ProviderCultureResult("bg-BG", "bg-BG"));
            }));

            builder.UseRequestLocalization(localizationOptions);

            builder.Use(async (context, next) =>
            {
                string lang = context.GetLanguage();

                if (string.IsNullOrEmpty(context.Request.Cookies["currentLang"]) || context.Request.Cookies["currentLang"].Substring(0, 2) != lang)
                {
                    context.Response.Cookies.Append("currentLang", lang,
                        new CookieOptions()
                        {
                            Path = "/",
                            Expires = new DateTimeOffset(new DateTime(2033, 12, 1)),
                            Domain = context.RequestServices.GetRequiredService<IConfiguration>().GetEPZEUSection().GetValue<string>("GL_COMMON_COOKIE_DOMAIN")
                        });
                }
                /*зареждаме етикетите за съотвятния език*/
                await labels.EnsureLoadedAsync(lang);
                await next.Invoke();
            });

            return builder;
        }
    }

    public class CustomUrlRequestCultureProvider : CustomRequestCultureProvider
    {
        private readonly static Regex _langRegex = new Regex("/([a-zA-Z]{2})/");

        public CustomUrlRequestCultureProvider(ILanguages languages) : base(context => DetermineProviderCultureResult(context, languages))
        { }

        private static Task<ProviderCultureResult> DetermineProviderCultureResult(HttpContext context, ILanguages languages)
        {
            ProviderCultureResult result = null;
            if (TryExtractLanguageFromUrl(context.Request.Path, languages, out string urlLang)
                && !string.IsNullOrEmpty(urlLang))
            {
                result = new ProviderCultureResult(urlLang, urlLang);
            }

            return Task.FromResult(result);
        }

        private static bool TryExtractLanguageFromUrl(string urlPathWithoutDomain, ILanguages languages, out string lang)
        {
            lang = null;
            bool success = false;
            var match = _langRegex.Match(urlPathWithoutDomain);

            if (match != null
                && match.Success
                && urlPathWithoutDomain.StartsWith(match.Value))
            {
                //Има подаден език
                success = true;

                var language = languages.GetLanguage(match.Groups[1].Value);
                if (language != null)
                {
                    //Има превод за езика
                    lang = language.Code;
                }
            }

            return success;
        }
    }

    public class CustomCookieRequestCultureProvider : CookieRequestCultureProvider
    {
        ILanguages _languages;

        public CustomCookieRequestCultureProvider(ILanguages languages)
        {
            _languages = languages;
        }

        public override Task<ProviderCultureResult> DetermineProviderCultureResult(HttpContext httpContext)
        {
            ProviderCultureResult result = null;
            var langCookieValue = httpContext.Request.Cookies["currentLang"];

            if (!string.IsNullOrEmpty(langCookieValue))
            {
                var lang = _languages.GetLanguage(langCookieValue.Substring(0, 2));
                if (lang != null)
                {
                    //Има превод за езика
                    result = new ProviderCultureResult(lang.Code, lang.Code);
                }
            }

            return Task.FromResult(result);
        }
    }

    public class CustomAcceptLanguageHeaderRequestCultureProvider : AcceptLanguageHeaderRequestCultureProvider
    {
        ILanguages _languages;

        public CustomAcceptLanguageHeaderRequestCultureProvider(ILanguages languages)
        {
            _languages = languages;
        }

        public override Task<ProviderCultureResult> DetermineProviderCultureResult(HttpContext httpContext)
        {
            ProviderCultureResult result = null;
            var langHeaderValue = httpContext.Request.Headers["Accept-Language"];

            if (!string.IsNullOrEmpty(langHeaderValue))
            {
                var lang = _languages.GetLanguage(((string)langHeaderValue).Substring(0, 2));
                if (lang != null)
                {
                    //Има превод за езика
                    result = new ProviderCultureResult(lang.Code, lang.Code);
                }
            }

            return Task.FromResult(result);
        }
    }
}
