using EPZEU.Applications.Models;
using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.Common;
using EPZEU.CR.Applications;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Web.App.Code;
using EPZEU.CR.Web.App.Models.Applications;
using EPZEU.CR.Web.Common;
using EPZEU.Nomenclatures;
using EPZEU.Security;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Web.DataProtection;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление на заявления.
    /// </summary>
    public class ApplicationsController : BaseApiController
    {
        private Integration.EPZEU.IApplicationServiceClient _integrationAppService = null;
        private IApplicationConverter _applicationConverter = null;
        private IDataProtectorService _dataProtectorService = null;
        private IEPZEUUserAccessor _EPZEUUserAccessor = null;
        private IApplicationTypes _applicationTypes = null;
        private IAuditServiceClient _auditServiceClient = null;

        public ApplicationsController(Integration.EPZEU.IApplicationServiceClient integrationAppService, IApplicationConverter applicationConverter, IDataProtectorService dataProtectorService, IEPZEUUserAccessor EPZEUUserAccessor, IApplicationTypes applicationTypes, IAuditServiceClient auditServiceClient)
        {
            _integrationAppService = integrationAppService;
            _applicationConverter = applicationConverter;
            _dataProtectorService = dataProtectorService;
            _EPZEUUserAccessor = EPZEUUserAccessor;
            _applicationTypes = applicationTypes;
            _auditServiceClient = auditServiceClient;
        }

        #region Reports From CR

        /// <summary>
        /// Операция за изчитане на заявления.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <param name="entryNumber">Номер на вписване.</param>
        /// <returns>Заявления</returns>
        [Route("{incomingNumber?}")]
        [HttpGet]
        [ServiceLimiter(ServiceCode = "CR_APPLICATION_PREVIEW_LIMIT")]
        [ProducesResponseType(typeof(EPZEU.CR.Web.Models.ApplicationInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationAsync(string incomingNumber = null, [FromQuery]string entryNumber = null)
        {
            string uic = null;
            string companyName = null;
            if (!string.IsNullOrEmpty(incomingNumber))
            {
                incomingNumber = _dataProtectorService.ExtractIncomingNumberWithCtx(incomingNumber, ref uic, ref companyName);
            }

            var appInfosResult = await _integrationAppService.SearchApplicationInfoAsync(new ApplicationInfoSearchCriteria()
            {
                IncomingNumber = incomingNumber,
                EntryNumber = entryNumber,
                Mode = ApplicationInfoSearchMode.IncomingNumberOrEntryNumber
            });

            if (appInfosResult.Count > 0)
            {
                return Ok(_applicationConverter.ConvertToUIApplication(appInfosResult.Data.SingleOrDefault(), uic, companyName));
            }

            return NotFound();
        }

        /// <summary>
        /// Операция за изчитане на данни за заявление.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <param name="appService">Интерфейс за работа със заявления.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <param name="appClient">Интерфейс на http клиент за работа с подадени заявления.</param>
        /// <returns></returns>
        [Route("{incomingNumber}/Form")]
        [HttpGet]
        [ServiceLimiter(ServiceCode = "CR_APPLICATION_PREVIEW_LIMIT")]
        [ProducesResponseType(typeof(ApplicationFormBase), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationFormAsync(string incomingNumber, [FromServices]IApplicationService appService, [FromServices]IDataProtectorService protectorService, [FromServices] EPZEU.Applications.IApplicationServiceClient appClient)
        {
            if (_EPZEUUserAccessor?.User?.IsUserIdentifiable != true)
            {
                return BadRequest("CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E", "CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E");
            }

            string uic = null;
            string companyName = null;
            incomingNumber = _dataProtectorService.ExtractIncomingNumberWithCtx(incomingNumber, ref uic, ref companyName);

            var appForm = await appService.GetApplicationFormAsync(incomingNumber);

            if (appForm != null)
            {
                //REQ_D04_EPZU_00694 Преглед на заявление
                DateTime? lastModifed = null;
                var auditRequest = new LogActionRequest()
                {
                    ObjectType = ObjectTypes.EAUApplication,
                    ActionType = ActionTypes.Preview,
                    Module = Modules.EPZEU_CR,
                    Functionality = Functionalities.Applications,
                    Key = incomingNumber,
                    UserSessionID = _EPZEUUserAccessor.UserSessionID,
                    IpAddress = _EPZEUUserAccessor.RemoteIpAddress.ToString(),
                    UserCIN = _EPZEUUserAccessor.User?.CIN,
                    LoginSessionID = _EPZEUUserAccessor.User?.LoginSessionID,
                    AdditionalData = new
                    {
                        uIC = uic,
                        companyName = companyName,
                        incomingNumber = incomingNumber,
                        applicationTypeName = this._applicationTypes.GetApplicationTypes("bg", null, out lastModifed).SingleOrDefault(at => at.AppType == ((int?)appForm.AppType)?.ToString())?.Name
                    },
                    OperationID = Guid.NewGuid().ToString()
                };

                await _auditServiceClient.CreateLogActionAsync(auditRequest);

                if (appForm.Documents != null && appForm.Documents.Count > 0)
                {
                    //Ако има прикачени актове не ги изтриваме от документа
                    appForm.Documents = appForm.Documents.Where(d => d.DocumentTypeID.StartsWith("5.")).ToList();

                    if (appForm.Documents.Count == 0)
                    {
                        appForm.Documents = null;
                    }
                }

                if (appForm is ApplicationWithFieldsForm && ((ApplicationWithFieldsForm)appForm).Applications != null)
                {
                    foreach (var app in ((ApplicationWithFieldsForm)appForm).Applications)
                    {
                        if (app.Documents != null && app.Documents.Count > 0)
                        {
                            //Ако има прикачени актове не ги изтриваме от документа
                            app.Documents = app.Documents.Where(d => d.DocumentTypeID.StartsWith("5.")).ToList();

                            if (app.Documents.Count == 0)
                            {
                                app.Documents = null;
                            }
                        }
                    }
                }

                if (appForm.ApplicantInfo != null
                    && appForm.ApplicantInfo.Applicants != null
                    && appForm.ApplicantInfo.Applicants.ApplicantsList != null
                    && appForm.ApplicantInfo.Applicants.ApplicantsList.Count > 0)
                {
                    foreach (var applicant in appForm.ApplicantInfo.Applicants.ApplicantsList)
                    {
                        if (applicant.Person != null)
                            applicant.Person.Indent = null;

                        applicant.Address = null;
                        applicant.BirthPlace = null;
                        applicant.Deputy = null;
                        applicant.Passport = null;
                    }
                }

                return Result(appForm);
            }
            else
            {
                return NotFound();
            }

        }

        /// <summary>
        /// Операция за изчитане на данни за приложени документи.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <param name="entryDate">Дата на входиране.</param>
        /// <returns>Данни за документи</returns>
        [Route("{incomingNumber}/Documents")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ApplicationDocumentInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationDocumentsAsync(string incomingNumber, [FromQuery] DateTime? entryDate = null)
        {
            string uic = null;
            string companyName = null;
            incomingNumber = _dataProtectorService.ExtractIncomingNumberWithCtx(incomingNumber, ref uic, ref companyName);

            var documents = await _integrationAppService.SearchApplicationDocumentsAsync(incomingNumber, entryDate);

            return Result(documents == null ? null :
                documents.Select(t =>
                {
                    var domainDocument = Mapper.Map<ApplicationDocumentInfo>(t);
                    domainDocument.GuidWithCtx = _dataProtectorService.CombineDocGuidWithCtx(t.FileMetadata.Guid, incomingNumber, uic);
                    return domainDocument;
                }));
        }

        /// <summary>
        /// Операцияза изчитане на изходящ документ към заявление.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <param name="outgoingGuid">Изходящ гуид.</param>
        /// <returns>Изходящ документ към заявление.</returns>
        [Route("{incomingNumber}/OutgoingDocuments")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OutgoingDocument>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationOutgoingDocumentsAsync(string incomingNumber, [FromQuery]string outgoingGuid)
        {
            var outgoingDocs = await _integrationAppService.SearchOutgoingDocumentsAsync(incomingNumber, outgoingGuid);

            if (outgoingDocs != null)
            {
                IEnumerable<Integration.EPZEU.Models.OutgoingDocument> res = outgoingDocs.Select(t =>
                {
                    var domainDocument = Mapper.Map<OutgoingDocument>(t);

                    domainDocument.GuidWithCtx = _dataProtectorService.CombineDocGuidWithCtx(t.FileMetadata.Guid, incomingNumber, null);
                    return domainDocument;
                });
                return Ok(res);
            }

            return NotFound();
        }

        /// <summary>
        /// Операция за изчитане на заявления - преобразувания.
        /// </summary>
        /// <param name="searchCriteria">Критерии за търсене.</param>
        /// <returns>Заявления - преобразувания</returns>
        [Route("Transformations")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "Applications_Transformations")]
        [ProducesResponseType(typeof(IEnumerable<EPZEU.CR.Web.Models.ApplicationInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationTransformationAsync([FromQuery]ApplicationTransformationsSearchCriteria searchCriteria = null)
        {
            var domainCriteria = Mapper.Map<ApplicationInfoSearchCriteria>(searchCriteria);
            domainCriteria.Mode = ApplicationInfoSearchMode.Transformations;
            var appInfosResult = await _integrationAppService.SearchApplicationInfoAsync(domainCriteria);

            if (appInfosResult.Count > 0)
            {
                return PagedResult(appInfosResult.Data == null ? null : appInfosResult.Data.Select(app => _applicationConverter.ConvertToUIApplication(app)), appInfosResult.Count);
            }

            return NotFound();
        }

        /// <summary>
        /// Операция за изчитане на документи без партида.
        /// </summary>
        /// <param name="searchCriteria">Критерии за търсене.</param>
        /// <returns></returns>
        [Route("DocumentsWithoutDeed")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "Applications_DocumentsWithoutDeed")]
        [ProducesResponseType(typeof(IEnumerable<EPZEU.CR.Web.Models.ApplicationInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocumentsWithoutDeedAsync([FromQuery]DocumentsWithoutDeedSearchCriteria searchCriteria = null)
        {
            var domainCriteria = Mapper.Map<ApplicationInfoSearchCriteria>(searchCriteria);
            domainCriteria.Mode = ApplicationInfoSearchMode.DocumentsWithoutDeed;
            var appInfosResult = await _integrationAppService.SearchApplicationInfoAsync(domainCriteria);

            if (appInfosResult.Count > 0)
            {
                return PagedResult(appInfosResult.Data == null ? null : appInfosResult.Data.Select(app => _applicationConverter.ConvertToUIApplication(app)), appInfosResult.Count);
            }

            return NotFound();
        }

        /// <summary>
        /// Справка 'Вписвания, заличавания и обявявания'
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <returns>Списък с 'Вписвания, заличавания и обявявания'.</returns>
        [Route("Entries")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "Applications_Entries")]
        [ProducesResponseType(typeof(IEnumerable<Models.Applications.Entry>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEntrySummary(
            [FromQuery]Integration.EPZEU.Models.SearchCriteria.EntrySearchCriteria criteria)
        {
            var pResult = await _integrationAppService.SearchEntriesAsync(criteria);
            var resVM = (pResult.Data != null && pResult.Data.Any()) ? pResult.Data.Select(el => new Models.Applications.Entry()
            {
                UIC = el.Deed.UIC,
                Date = el.Date,
                CompanyFullName = el.Deed.CompanyFullName
            }) : null;

            return PagedResult(resVM, pResult.Count);
        }

        /// <summary>
        /// Справка 'Справка несъстоятелност'
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <returns>Списък с 'Справка несъстоятелност'.</returns>
        [Route("Entries/Bankruptcies")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "Applications_Entries_Bankruptcies")]
        [ProducesResponseType(typeof(IEnumerable<Models.Applications.Entry>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetBankruptcySummary(
            [FromQuery]Integration.EPZEU.Models.SearchCriteria.BankruptcyEntrySearchCriteria criteria)
        {
            var pResult = await _integrationAppService.SearchBankruptciesEntriesAsync(criteria);

            if (pResult.Data != null && pResult.Data.Any())
            {
                var resVM = pResult.Data.Select(el => new Models.Applications.Entry()
                {
                    UIC = el.Deed.UIC,
                    Date = el.Date,
                    CompanyFullName = el.Deed.CompanyFullName
                });

                return PagedResult(resVM, pResult.Count);
            }

            return NotFound();
        }

        /// <summary>
        /// Справка 'Търговци/ЮЛНЦ в ликвидация'
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <returns>Списък с 'Търговци/ЮЛНЦ в ликвидация'.</returns>
        [Route("Entries/Liquidations")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "Applications_Entries_Liquidations")]
        [ProducesResponseType(typeof(IEnumerable<Models.Applications.Entry>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLiquidationSummary(
            [FromQuery]Integration.EPZEU.Models.SearchCriteria.LiquidationEntrySearchCriteria criteria)
        {
            var pResult = await _integrationAppService.SearchLiquidationsEntriesAsync(criteria);

            if (pResult.Data != null && pResult.Data.Any())
            {
                var resVM = pResult.Data.Select(el => new Models.Applications.Entry()
                {
                    UIC = el.Deed.UIC,
                    Date = el.Date,
                    CompanyFullName = el.Deed.CompanyFullName
                });

                return PagedResult(resVM, pResult.Count);
            }

            return NotFound();
        }

        #endregion        
    }
}