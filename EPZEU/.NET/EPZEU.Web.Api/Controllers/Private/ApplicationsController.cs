using EPZEU.Applications;
using EPZEU.Applications.Models;
using EPZEU.Common;
using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;
using EPZEU.Web.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за работа с подадени заявявления
    /// </summary>
    [Authorize]
    public class ApplicationsController : BaseApiController
    {
        private readonly static Lazy<Regex> _regex = new Lazy<Regex>(() => new Regex("{[A-Za-z0-9_]*}"), true);

        private IApplicationService _applicationService = null;
        private IConfiguration _configuration = null;

        #region Constructors

        public ApplicationsController(IApplicationService applicationService, IConfiguration configuration)
        {
            _applicationService = applicationService;
            _configuration = configuration;
        }

        #endregion

        /// <summary>
        /// Операция за създаване на процес по заявяване.
        /// </summary>
        /// <param name="application">Заявка за създаване на процес по заявяване.</param>
        /// <param name="cancellationToken">билет за отказване на операция.</param>
        /// <returns>Процес по заявяване.</returns>
        [Route("")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateAsync([FromBody]Application application, CancellationToken cancellationToken)
        {
            await _applicationService.CreateApplicationAsync(application, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Операция за променя резултата на заявлението.
        /// </summary>
        /// <param name="requests">Заявка за промяна на резулта</param>
        /// <param name="register">Тип на регистъра - Стойности: 1 = Търговски Регистър; 2 = Имотен Регистър</param>
        /// <param name="cancellationToken">билет за отказване на операция.</param>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateResultAsync([FromBody]List<ApplicationUpdateRequest> requests, [FromQuery]Registers register, CancellationToken cancellationToken)
        {
            await _applicationService.UpdateApplicationResultAsync(requests, register, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Операция за търсене на заявления.
        /// </summary>
        /// <param name="criteria">Критерии за търсене</param>
        /// <param name="stringLocalizer">Интерфейс за локализиране на стрингове</param>
        /// <param name="globalOptionsAccessor">Интерфейс за достъп до глабални опции</param>
        /// <param name="httpContextAccessor">Интерфейс за достъпване на HttpContext</param>
        /// <param name="cancellationToken">билет за отказване на операция.</param>       
        /// <returns>Заявления</returns>
        [Route("")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Application>), StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchAsync([FromQuery]ApplicationSearchCriteria criteria, [FromServices] IStringLocalizer stringLocalizer, [FromServices] IOptionsMonitor<GlobalOptions> globalOptionsAccessor, [FromServices] IHttpContextAccessor httpContextAccessor, CancellationToken cancellationToken)
        {
            var applications = await _applicationService.SearchApplicationsAsync(criteria, cancellationToken);

            foreach (var application in applications)
            {
                PrepareApplication(application, stringLocalizer, globalOptionsAccessor, httpContextAccessor.HttpContext.GetLanguage());
            }

            return PagedResult(applications, criteria.ExtractState());
        }

        /// <summary>
        /// Операция за търсене на чернови.
        /// </summary>
        /// <param name="criteria">Критерии за търсене</param>
        /// <param name="crApplicationServiceClient">Клиент за услуга за заявления</param>
        /// <param name="stringLocalizer">Локализатор за стрингове</param>
        /// <param name="globalOptionsAccessor">Интерфейс за достъп до глабални опции</param>
        /// <param name="httpContextAccessor">Интерфейс за достъпване на HttpContext</param>
        /// <param name="httpClientFactory">Factory за Http клиенти</param>
        /// <param name="appTypesNomes">Интерфейс за работа с типове на приложението.</param>
        /// <returns>Чернови на заявления</returns>
        [Route("Drafts")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Application>), StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchDrafts([FromQuery]ApplicationDraftSearchCriteria criteria, [FromServices]EPZEU.CR.Applications.IApplicationServiceClient crApplicationServiceClient, [FromServices] IStringLocalizer stringLocalizer, [FromServices] IOptionsMonitor<GlobalOptions> globalOptionsAccessor, [FromServices] IHttpContextAccessor httpContextAccessor, [FromServices] IHttpClientFactory httpClientFactory, [FromServices] Nomenclatures.IApplicationTypes appTypesNomes)
        {
            var applications = new List<Application>();

            var crApplications = await crApplicationServiceClient.GetApplicantDraftsAsync(criteria.ApplicantCIN.Value);

            if (crApplications != null)
            {
                applications.AddRange(crApplications.Select(app =>
                {
                    app.ApplicationDisplayUrl = InitHtmlURLs(app.ApplicationDisplayUrl, httpContextAccessor.HttpContext.GetLanguage(), Registers.CR, globalOptionsAccessor.CurrentValue);
                    return app;
                }));
            }

            var prUrl = (_configuration.GetEPZEUSection().GetValue<string>("GL_PR_API") + "/Applications/Drafts").Replace("//Applications", "/Applications");

            using (var prClient = httpClientFactory.CreateClient(EPZEUHttpClientNames.EPZEUPRApi))
            {
                var prApplications = await prClient.GetAsync<IEnumerable<Application>>(prUrl, new { cin = criteria.ApplicantCIN.Value }, CancellationToken.None);
                DateTime? lastModifiedDate;
                var appTypes = appTypesNomes.GetApplicationTypes("bg", Registers.PR, out lastModifiedDate);

                if (prApplications != null)
                {
                    applications.AddRange(prApplications.Select(app =>
                    {
                        app.ApplicationDisplayUrl = InitHtmlURLs(app.ApplicationDisplayUrl, httpContextAccessor.HttpContext.GetLanguage(), Registers.PR, globalOptionsAccessor.CurrentValue);

                        if (!app.ApplicationTypeID.HasValue && !string.IsNullOrEmpty(app.ApplicationType))
                        {
                            app.ApplicationTypeID = appTypes.Where(at => at.AppType == app.ApplicationType).Single().ApplicationTypeID;
                        }

                        return app;
                    }));
                }
            }

            applications = applications.OrderByDescending(app => app.DraftDate).ToList();

            foreach (var application in applications)
            {
                PrepareApplication(application, stringLocalizer, globalOptionsAccessor, httpContextAccessor.HttpContext.GetLanguage());
            }

            var state = criteria.ExtractState();
            var count = applications.Count();
            applications = applications.Count >= state.StartIndex ? applications.Skip(state.StartIndex - 1).Take(state.PageSize).ToList() : null;

            return PagedResult(applications, count);
        }


        #region Helpers

        private void PrepareApplication(Application application, IStringLocalizer stringLocalizer, [FromServices] IOptionsMonitor<GlobalOptions> globalOptionsAccessor, string lang)
        {
            application.ResultHTML = LocalizeResultHtmlResources(application.ResultHTML, stringLocalizer);
            application.ResultHTML = InitHtmlURLs(application.ResultHTML, lang, application.Register.Value, globalOptionsAccessor.CurrentValue);

            application.ApplicationDisplayUrl = InitHtmlURLs(application.ApplicationDisplayUrl, lang, application.Register.Value, globalOptionsAccessor.CurrentValue);
        }

        private string LocalizeResultHtmlResources(string resultHtml, IStringLocalizer stringLocalizer)
        {
            IEnumerable<string> resourceKeys = ExtractByRegex(resultHtml).Select(res => res.Replace("{", "").Replace("}", ""));

            foreach (var key in resourceKeys)
            {
                resultHtml = resultHtml.Replace("{" + key + "}", stringLocalizer[key]);
            }

            return resultHtml;
        }

        private string InitHtmlURLs(string resultHtml, string lang, Registers register, GlobalOptions globalOptions)
        {
            if (!string.IsNullOrEmpty(resultHtml))
            {
                string registerUiUrl;

                if (register == Registers.CR)
                {
                    registerUiUrl = globalOptions.GL_CR_PUBLIC_UI_URL;
                }
                else
                {
                    registerUiUrl = globalOptions.GL_PR_PUBLIC_UI_URL;
                }

                if (resultHtml.Contains("baseApplicationURL"))
                {
                    if (lang == "bg")
                    {
                        resultHtml = UrlHelpers.PrepareUrl(resultHtml.Replace("baseApplicationURL", registerUiUrl));
                    }
                    else
                    {
                        resultHtml = UrlHelpers.PrepareUrl(resultHtml.Replace("baseApplicationURL", string.Format("{0}/{1}/", registerUiUrl, lang)));
                    }
                }

                if (resultHtml.Contains("baseNoLangApplicationURL"))
                {
                    resultHtml = UrlHelpers.PrepareUrl(resultHtml.Replace("baseNoLangApplicationURL", registerUiUrl));
                }
            }

            return resultHtml;
        }

        private List<string> ExtractByRegex(string value)
        {
            var results = new List<string>();

            var match = _regex.Value.Match(value);

            while (match != null && match.Success)
            {
                results.Add(match.Groups[0].Value);

                match = match.NextMatch();
            }

            return results;
        }

        #endregion
    }
}