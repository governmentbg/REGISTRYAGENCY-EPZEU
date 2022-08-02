using EPZEU.Applications.Models;
using EPZEU.CMS;
using EPZEU.CMS.Models;
using EPZEU.CR.ApplicationProcesses.Repositories;
using EPZEU.CR.Web.Common;
using EPZEU.Nomenclatures;
using EPZEU.Nomenclatures.Models;
using EPZEU.Notifications.Models;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.Api.Private.Controllers
{
    [Authorize]
    public class ApplicationsController : EPZEU.Web.Mvc.BaseApiController
    {
        /// <summary>
        /// Променя статуса на регистрирано заявление в EPZEU
        /// </summary>
        /// <param name="applications">Списък със променени заявления</param>        
        /// <returns></returns>

        /// <summary>
        ///  Променя статуса на регистрирано заявление в EPZEU
        /// </summary>
        /// <param name="eventMessage">Съобщение за събитие в ТР</param>
        /// <param name="_applicationConverter">Конвертор за приложение.</param>
        /// <param name="epzeuAppServiceClient">Интерфейс на http клиент за работа с подадени заявления.</param>
        /// <returns></returns>
        [Route("StatusChange")]
        [HttpPost]
        [NoopServiceLimiter]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateRegisteredApplicationAsync([FromBody]CREventMessage eventMessage,
           [FromServices] IApplicationConverter _applicationConverter, [FromServices] EPZEU.Applications.IApplicationServiceClient epzeuAppServiceClient)
        {
            if (eventMessage.Type == CREventTypes.ApplicationStatusChange)
            {
                var requests = new List<ApplicationUpdateRequest>();
                var application = eventMessage.GetData<Integration.EPZEU.Models.ApplicationInfo>();

                requests.Add(new ApplicationUpdateRequest()
                {
                    incomingNumber = application.IncomingNumber,
                    resultHtml = _applicationConverter.CalculateApplicationResultHtml(application, null, null, false, true)
                });

                await epzeuAppServiceClient.UpdateApplicationResultAsync(requests, EPZEU.Nomenclatures.Models.Registers.CR);
            }
            else
            {
                throw new ArgumentException("Wrong event type.");
            }

            return Ok();
        }

        /// <summary>
        /// Операция за търсене на чернови.
        /// </summary>
        /// <param name="applicantCIN">КИН на заявител.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <param name="applicationProcessService">Интерфейс за работа с процес по заявление.</param>
        /// <param name="httpContextAccessor"> Интерфейс за достъпване на httpContext</param>
        /// <param name="_appTypes">Интерфейс за работа с номенклатура на типове на заявление.</param>
        /// <param name="staticPages">Интерфейс за работа със статични страници.</param>
        /// <param name="pages">Интерфейс за работа със страници.</param>
        /// <param name="services">Интерфейс за работа с номенклатура на услуги.</param>
        /// <returns></returns>
        [Route("Drafts")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Application>), StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchDrafts([FromQuery]int applicantCIN
            , CancellationToken cancellationToken
            , [FromServices]IApplicationProcessRepository applicationProcessService
            , [FromServices]IHttpContextAccessor httpContextAccessor
            , [FromServices]IApplicationTypes _appTypes
            , [FromServices]IStaticPages staticPages
            , [FromServices]IPages pages
            , [FromServices]IServices services)
        {
            var applicationProcesses =(await applicationProcessService.SearchAsync(new ApplicationProcesses.Models.ApplicationProcessSearchCriteria()
            {
                ApplicantCIN = applicantCIN,
                IsParent = true
            }, cancellationToken)).ToList();

            if (applicationProcesses != null && applicationProcesses.Count > 0)
            {
                applicationProcesses = applicationProcesses.Where(ap => ap.Status != ApplicationProcesses.Models.ProcessStatuses.Completed).ToList();
            }

            if (applicationProcesses != null && applicationProcesses.Count > 0)
            {
                string lang = httpContextAccessor.HttpContext.GetLanguage();

                await staticPages.EnsureLoadedAsync(cancellationToken);
                await pages.EnsureLoadedAsync(lang);
                await services.EnsureLoadedAsync(lang);

                var drafts = new List<Application>();
                var appTypes = _appTypes.GetApplicationTypes(lang, EPZEU.Nomenclatures.Models.Registers.CR, out DateTime? lastModifiedDate);

                var crServicePath = staticPages.GetStaticPage("CR_SERVICE")?.Url ?? null;
                var crApplicationsPath = staticPages.GetStaticPage("CR_APPLICATIONS")?.Url ?? null;

                foreach (var applicationProcess in applicationProcesses)
                {
                    var appTypepID = appTypes.Where(at => at.AppType == ((int)applicationProcess.MainApplicationType).ToString()).Single().ApplicationTypeID;
                    DateTime? srvLastModifiedDate;

                    var service = services.GetServices(lang, out srvLastModifiedDate)
                        .Where(s => s.AppTypeID == appTypepID).SingleOrDefault();

                    DateTime? pgLastModifiedDate;
                    bool hasService = false;
                    if (service != null)
                    {
                        var pagesList = pages.GetPages(lang, out pgLastModifiedDate)
                            .Where(pg =>
                                pg.RegisterID == Registers.CR
                                && pg.Type == PageTypes.Service
                                && pg.ServiceID == service.ServiceID);

                        hasService = pagesList.Any();
                    }

                    string applicationProcessesURL = String.Format("baseApplicationURL{0}/{1}/{2}",
                                    hasService ? crServicePath?.Replace("{EP_SERVICE_ID}", service.ServiceID.ToString()) : crApplicationsPath,
                                    Models.PagesURLs.ApplicationProcessesURL,
                                    applicationProcess.MainApplicationType.ToString()).Replace("//", "/").Replace("//", "/");

                    var draft = new Application()
                    {
                        ApplicantCIN = applicantCIN,
                        Register = Registers.CR,
                        ApplicationTypeID = appTypepID,
                        ApplicationDisplayUrl = applicationProcessesURL,
                        ResultHTML = "{GL_DRAFT_APPLICATION_L}",//Чернова
                        DraftDate = applicationProcess.UpdatedOn
                    };

                    drafts.Add(draft);
                }

                return Ok(drafts);
            }

            return Ok();
        }
    }    
}
