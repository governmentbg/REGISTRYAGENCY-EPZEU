using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.Common;
using EPZEU.CR.Applications;
using EPZEU.CR.Web.Models;
using EPZEU.Security;
using EPZEU.ServiceLimits.AspNetCore;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Web.DataProtection;
using Integration.EPZEU;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Localization;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление на документи.
    /// </summary>
    [NoopServiceLimiter]
    public class DocumentsController : BaseApiController
    {
        private readonly string[] documentLimits = { "CR_DOWNLOAD_DOCUMENT_LIMIT", "BASE_DATA_SERVICE_LIMIT" };

        private IFileServiceClient _integrationFileService = null;
        private readonly IAuditServiceClient _auditServiceClient = null;
        private readonly IEPZEUUserAccessor _EPZEUUserAccessor;
        private readonly IApplicationService _applicationService;

        #region Constructors

        public DocumentsController(IFileServiceClient integrationFileService,
            IAuditServiceClient auditServiceClient,
            IEPZEUUserAccessor EPZEUUserAccessor,
            IStringLocalizer stringLocalizer,
            IApplicationService applicationService)
        {
            _integrationFileService = integrationFileService;
            _auditServiceClient = auditServiceClient;
            _EPZEUUserAccessor = EPZEUUserAccessor;
            _applicationService = applicationService;
        }

        #endregion

        /// <summary>
        /// Операция за изчитане на данни за документ за неподадено заявление.
        /// </summary>
        /// <param name="docGuid">>Уникален идентификатор на документ.</param>
        /// <param name="cancellationToken">Токен за отказване</param>
        /// <param name="protectorService">Интерфейс за защита на чувствителни данни</param>
        /// <param name="limiter">Интерфейс за ограничаване на брой заявки за единица ввреме</param>
        /// <param name="userAccessor">Интерфейс, чрез който се достъпват данни за текущия потребител.</param>
        /// <returns></returns>
        [Route("Draft/{docGuid}", Name = "DownloadDocumentDraft")]
        [HttpGet]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocumentDraft(string docGuid, CancellationToken cancellationToken, [FromServices]IDataProtectorService protectorService, [FromServices]IServiceLimiter limiter, [FromServices]IEPZEUUserAccessor userAccessor)
        {
            if (await limiter.ShouldRateLimitAsync(documentLimits, userAccessor.User?.CIN.HasValue == true ? userAccessor.User.CIN : null, userAccessor.RemoteIpAddress))
            {
                return Redirect($"~/{LinkRoutes.DOCUMENT_LIMIT_UI_URL}");
            }

            if (string.IsNullOrEmpty(docGuid))
                return NotFound();

            string incomingNumber = null;
            string uic = null;
            string extractedDocGuid = protectorService.ExtractDocGuidWithCtx(docGuid, ref incomingNumber, ref uic);

            if (_EPZEUUserAccessor.User?.CIN == null || !(await _applicationService.HasUserDocumentDraftAccessAsync(docGuid, _EPZEUUserAccessor.User.CIN.Value, _EPZEUUserAccessor.User?.IsUserIdentifiable == true, cancellationToken)))
            {
                return Redirect($"~/{LinkRoutes.DOCUMENT_DRAFT_ACCESS_UI_URL}/{docGuid}?accessDenied=true");
            }

            var fileContentResult = await _integrationFileService.GeFileContentAsync(extractedDocGuid, _EPZEUUserAccessor.User?.IsUserIdentifiable == true, false);

            var document = fileContentResult?.FileContentStream;

            if (document != null)
            {
                //REQ_D04_EPZU_00695 Сваляне на документи
                var auditRequest = new LogActionRequest()
                {
                    ObjectType = ObjectTypes.FileContent,
                    ActionType = ActionTypes.Downlaod,
                    Module = Modules.EPZEU_CR,
                    Functionality = Functionalities.Applications,
                    Key = extractedDocGuid,
                    UserSessionID = _EPZEUUserAccessor.UserSessionID,
                    IpAddress = _EPZEUUserAccessor.RemoteIpAddress.ToString(),
                    UserCIN = _EPZEUUserAccessor.User?.CIN,
                    LoginSessionID = _EPZEUUserAccessor.User?.LoginSessionID,
                    AdditionalData = new
                    {
                        uIC = uic,
                        incomingNumber = incomingNumber,
                        fileName = document.FileName,
                        contentType = document.ContentType,
                        docGuid = extractedDocGuid,
                    },
                    OperationID = Guid.NewGuid().ToString()
                };

                await _auditServiceClient.CreateLogActionAsync(auditRequest);

                return File(document.Content, document.ContentType, document.FileName);
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Операция за изчитане на данни за документ.
        /// </summary>
        /// <param name="docGuid">Уникален идентификатор на документ.</param>
        /// <param name="protectorService">Интерфейс за защита на чувствителни данни</param>
        /// <param name="limiter">Интерфейс за ограничаване на брой заявки за единица ввреме</param>
        /// <param name="userAccessor">Интерфейс, чрез който се достъпват данни за текущия потребител.</param>
        /// <returns>Данни за документ.</returns>        
        [Route("{docGuid}", Name = "DownloadDocument")]
        [HttpGet]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocuments(string docGuid, [FromServices]IDataProtectorService protectorService, [FromServices]IServiceLimiter limiter, [FromServices]IEPZEUUserAccessor userAccessor)
        {
            if (await limiter.ShouldRateLimitAsync(documentLimits, userAccessor.User?.CIN.HasValue == true ? userAccessor.User.CIN : null, userAccessor.RemoteIpAddress))
            {
                return Redirect($"~/{LinkRoutes.DOCUMENT_LIMIT_UI_URL}");
            }

            if (string.IsNullOrEmpty(docGuid))
                return NotFound();

            string incomingNumber = null;
            string uic = null;
            string extractedDocGuid = protectorService.ExtractDocGuidWithCtx(docGuid, ref incomingNumber, ref uic);

            var fileContentResult = await _integrationFileService.GeFileContentAsync(extractedDocGuid, _EPZEUUserAccessor.User?.IsUserIdentifiable == true, true);

            if (fileContentResult?.HasAccess == false)
            {
                return Redirect($"~/{LinkRoutes.DOCUMENT_ACCESS_UI_URL}/{docGuid}?accessDenied=true");
            }

            var document = fileContentResult?.HasAccess == true ? fileContentResult.FileContentStream : null;

            if (document != null)
            {
                //REQ_D04_EPZU_00695 Сваляне на документи
                var auditRequest = new LogActionRequest()
                {
                    ObjectType = ObjectTypes.FileContent,
                    ActionType = ActionTypes.Downlaod,
                    Module = Modules.EPZEU_CR,
                    Functionality = Functionalities.Applications,
                    Key = extractedDocGuid,
                    UserSessionID = _EPZEUUserAccessor.UserSessionID,
                    IpAddress = _EPZEUUserAccessor.RemoteIpAddress.ToString(),
                    UserCIN = _EPZEUUserAccessor.User?.CIN,
                    LoginSessionID = _EPZEUUserAccessor.User?.LoginSessionID,
                    AdditionalData = new
                    {
                        uIC = uic,
                        incomingNumber = incomingNumber,
                        fileName = document.FileName,
                        contentType = document.ContentType,
                        docGuid = extractedDocGuid,
                    },
                    OperationID = Guid.NewGuid().ToString()
                };

                await _auditServiceClient.CreateLogActionAsync(auditRequest);

                return File(document.Content, document.ContentType, document.FileName);
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Операция за изчитане на данни за документ към дело.
        /// </summary>
        /// <param name="uic">ЕИК</param>
        /// <param name="docGuid">Уникален идентификатор на документ.</param>
        /// <param name="protectorService">Интерфейс за защита на чувствителни данни</param>
        /// <param name="limiter">Интерфейс за ограничаване на брой заявки за единица ввреме</param>
        /// <param name="userAccessor">Интерфейс, чрез който се достъпват данни за текущия потребител.</param>
        /// <returns>Данни за документ към дело.</returns>
        [Route("{uic}/{docGuid}", Name = "DownloadCompanyCaseFileDocument")]
        [HttpGet]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCompanyCaseFileDocuments(string uic, string docGuid, [FromServices]IDataProtectorService protectorService, [FromServices]IServiceLimiter limiter, [FromServices]IEPZEUUserAccessor userAccessor)
        {
            if (await limiter.ShouldRateLimitAsync(documentLimits, userAccessor.User?.CIN.HasValue == true ? userAccessor.User.CIN : null, userAccessor.RemoteIpAddress))
            {
                return Redirect($"~/{LinkRoutes.DOCUMENT_LIMIT_UI_URL}");
            }

            if (string.IsNullOrEmpty(docGuid))
                return NotFound();

            string companyCase = null;
            string extractedDocGuid = protectorService.ExtractCompCaseDocGuidWithCtx(docGuid, ref companyCase);

            if (_EPZEUUserAccessor.User?.IsUserIdentifiable != true)
            {
                return Redirect($"~/{LinkRoutes.DOCUMENT_ACCESS_UI_URL}/{uic}/{docGuid}?accessDenied=true");
            }

            var fileContentResult = await _integrationFileService.GeCompanyCaseFileContentAsync(uic, extractedDocGuid);

            var document = fileContentResult?.FileContentStream;

            if (document != null)
            {
                //REQ_D04_EPZU_00695 Сваляне на документи
                var auditRequest = new LogActionRequest()
                {
                    ObjectType = ObjectTypes.FileContent,
                    ActionType = ActionTypes.Downlaod,
                    Module = Modules.EPZEU_CR,
                    Functionality = Functionalities.Applications,
                    Key = extractedDocGuid,
                    UserSessionID = _EPZEUUserAccessor.UserSessionID,
                    IpAddress = _EPZEUUserAccessor.RemoteIpAddress.ToString(),
                    UserCIN = _EPZEUUserAccessor.User?.CIN,
                    LoginSessionID = _EPZEUUserAccessor.User?.LoginSessionID,
                    AdditionalData = new
                    {
                        uIC = uic,
                        companyCase = companyCase,
                        fileName = document.FileName,
                        contentType = document.ContentType,
                        docGuid = extractedDocGuid,
                    },
                    OperationID = Guid.NewGuid().ToString()
                };

                await _auditServiceClient.CreateLogActionAsync(auditRequest);

                return File(document.Content, document.ContentType, document.FileName);
            }
            else
            {
                return NotFound();
            }
        }
    }
}