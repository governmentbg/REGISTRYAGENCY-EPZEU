using EPZEU.CMS;
using EPZEU.Common;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Web;
using EPZEU.Web.FileUploadProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление началната страница.
    /// </summary>
    [RequestLocalizationRedirectFilter]
    [NoopServiceLimiter]
    public class HomeController : Controller
    {
        private readonly static Lazy<Regex> _pageTitleRegex = new Lazy<Regex>(() => new Regex("<title>.*</title>"), true);
        private readonly static Lazy<Regex> _pageFaviconRegex = new Lazy<Regex>(() => new Regex("<link .* type=\"image/vnd.microsoft.icon\">"), true);
        private readonly static Lazy<Regex> _pageBodyRegex = new Lazy<Regex>(() => new Regex("<body>.*</body>", RegexOptions.Singleline), true);       
        private readonly static Lazy<Regex> _pageMetasRegex = new Lazy<Regex>(() => new Regex("<meta .*>"), true);
        private readonly static Lazy<Regex> _pageScriptsRegex = new Lazy<Regex>(() => new Regex("<script type=\"text/javascript\" .*</script>"), true);

        private readonly IEPZEUUIServiceClient _epzeuServiceClient;
        private readonly IMemoryCache _memoryCache;
        private readonly IOptionsMonitor<GlobalOptions> _globalOptionsAccessor;
        private readonly IWebHostEnvironment _enviroment;

        public HomeController(IEPZEUUIServiceClient epzeuServiceClient, IMemoryCache memoryCache, IOptionsMonitor<GlobalOptions> globalOptionsAccessor, IWebHostEnvironment enviroment)
        {
            _epzeuServiceClient = epzeuServiceClient;
            _memoryCache = memoryCache;
            _globalOptionsAccessor = globalOptionsAccessor;
            _enviroment = enviroment;
        }

        /// <summary>
        /// Операция за зареждане на началната страница.
        /// </summary>
        /// <param name="Configuration">Интерфейс за конфигурационни параметри.</param>
        /// <param name="appParameters">Интерфейс за параметри на системата.</param>
        /// <param name="staticPages">Интерфейс за работа със статични страници.</param>
        /// <returns>Начална страница.</returns>
        public async Task<IActionResult> Index([FromServices]IConfiguration Configuration, [FromServices]EPZEU.Common.Cache.IAppParameters appParameters, [FromServices]IStaticPages staticPages)
        {
            string lang = HttpContext.GetLanguage();

            ViewData["Requested_Client_Lang"] = lang;

            await InitLayoutViewDataAsync(lang, Configuration, appParameters, staticPages);

            return View();
        }

        /// <summary>
        /// Операция за зареждане на страницата за "Грешка".
        /// </summary>
        /// <param name="errMsg">Съобщение на грешката.</param>
        /// <returns>Страница за "Грешка".</returns>
        public IActionResult Error(string errMsg)
        {
            var RequestId = Activity.Current?.Id ?? this.HttpContext.TraceIdentifier;

            ViewData["RequestId"] = RequestId;
            if (!string.IsNullOrEmpty(errMsg))
            {
                ViewData["ErrorMsg"] = errMsg;
            }

            return View("Error");
        }

        #region Helpers

        private async Task InitLayoutViewDataAsync(string lang, IConfiguration Configuration, EPZEU.Common.Cache.IAppParameters appParameters, IStaticPages staticPages)
        {
            var viewDataParams = await _memoryCache.GetOrCreateAsync("IntegrationContainer_" + lang, async (entry) =>
            {
                //1. Зарежда html от PHP
                var htmlContent = await _epzeuServiceClient.GetIntegrationContainerHtmlAsync(lang, CancellationToken.None);

                //2. Зарежда staticPages
                var crServicesPath = staticPages.GetStaticPage("CR_SERVICES")?.Url ?? null;
                var crServicePath = staticPages.GetStaticPage("CR_SERVICE")?.Url?.Replace("{EP_SERVICE_ID}", ":serviceID") ?? null;
                var crApplicationsPath = staticPages.GetStaticPage("CR_APPLICATIONS")?.Url ?? null;

                var vdPrams = (Title: ExtractTitle(htmlContent),
                               Metas: ExtractMeta(htmlContent),
                               Favicon: ExtractFavicon(htmlContent),
                               Scripts: ExtractScripts(htmlContent),
                               Body: ExtractBody(htmlContent),
                               CrServicesPath: crServicesPath,
                               CrServicePath: crServicePath,
                               CrApplicationsPath: crApplicationsPath);

                entry.AddExpirationToken(staticPages.GetChangeToken());
                entry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddSeconds(30);

                return vdPrams;
            });


            ViewData["Title"]              = viewDataParams.Title;
            ViewData["Metas"]              = viewDataParams.Metas;
            ViewData["Favicon"]            = viewDataParams.Favicon;
            ViewData["Scripts"]            = viewDataParams.Scripts;
            ViewData["Body"]               = viewDataParams.Body;
            
            ViewData["CrServicesPath"]     = viewDataParams.CrServicesPath;
            ViewData["CrServicePath"]      = viewDataParams.CrServicePath;
            ViewData["CrApplicationsPath"] = viewDataParams.CrApplicationsPath;
        }

        private string ExtractBody(string htmlContent)
        {
            List<string> bodies = ExtractByRegex(htmlContent, _pageBodyRegex.Value);

            return bodies[0].Replace("<body>", "").Replace("</body>", "");
        }

        private List<string> ExtractScripts(string htmlContent)
        {
            List<string> scripts = ExtractByRegex(htmlContent, _pageScriptsRegex.Value);

            return scripts;
        }

        private List<string> ExtractMeta(string htmlContent)
        {
            List<string> metas = ExtractByRegex(htmlContent, _pageMetasRegex.Value);

            return metas;
        }

        private string ExtractTitle(string htmlContent)
        {
            List<string> titles = ExtractByRegex(htmlContent, _pageTitleRegex.Value);

            return titles[0];
        }

        private string ExtractFavicon(string htmlContent)
        {
            List<string> icons = ExtractByRegex(htmlContent, _pageFaviconRegex.Value);

            return icons[0];
        }

        private List<string> ExtractByRegex(string htmlContent, Regex regex)
        {
            var results = new List<string>();

            var match = regex.Match(htmlContent);

            while (match != null && match.Success)
            {
                results.Add(match.Groups[0].Value);

                match = match.NextMatch();
            }

            if (_enviroment.IsDevelopment() || _enviroment.IsDevelopmentLocal())
            {
                for (var i = 0; i < results.Count; i++)
                {
                    results[i] = results[i].Replace("src=\"/", string.Format("src =\"{0}", _globalOptionsAccessor.CurrentValue.GL_EPZEU_PUBLIC_UI_URL));
                    results[i] = results[i].Replace("href=\"/", string.Format("href =\"{0}", _globalOptionsAccessor.CurrentValue.GL_EPZEU_PUBLIC_UI_URL));
                }
            }

            return results;
        }

        #endregion
    }
}
