using EPZEU.CR.Web.Common;
using EPZEU.Security;
using EPZEU.Web.DataProtection;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за работа с комуникации
    /// </summary>
    public class CommunicationsController : BaseApiController
    {
        private readonly IApplicationServiceClient _integrationAppServiceClient = null;
        private readonly IDataProtectorService _dataProtectorService = null;
        private readonly Integration.EPZEU.IApplicationServiceClient _integrationAppService = null;
        private readonly IApplicationConverter _applicationConverter = null;
        private IEPZEUUserAccessor _EPZEUUserAccessor = null;

        public CommunicationsController(IApplicationServiceClient integrationAppServiceClient, IApplicationConverter applicationConverter, IEPZEUUserAccessor EPZEUUserAccessor, IDataProtectorService dataProtectorService, Integration.EPZEU.IApplicationServiceClient integrationAppService)
        {
            _integrationAppServiceClient = integrationAppServiceClient;
            _dataProtectorService = dataProtectorService;
            _integrationAppService = integrationAppService;
            _applicationConverter = applicationConverter;
            _EPZEUUserAccessor = EPZEUUserAccessor;
        }

        /// <summary>
        /// Операция за приемане на комуникация.
        /// </summary>
        /// <param name="requestForCorrectionForScanning">Искане за изправяне на грешка при сканиране.</param>
        /// <returns></returns>
        [Route("Accept")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AcceptCommunication([FromBody]Integration.EPZEU.Models.RequestForCorrectionForScanning requestForCorrectionForScanning)
        {
            if (_EPZEUUserAccessor?.User?.IsUserIdentifiable != true)
                return BadRequest("CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E", "CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E");

            var guid = Guid.NewGuid();           
           
            var result = await _integrationAppServiceClient.AcceptCommunicationAsync(requestForCorrectionForScanning, guid.ToString(), (long)_EPZEUUserAccessor?.User?.CIN);

            if (result.IsApplicationAccept.GetValueOrDefault())
                return Ok();
            else
                return BadRequest(result.ErrorMessage, result.ErrorMessage);
        }

        /// <summary>
        /// Операция за търсене на комуникации.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <returns></returns>
        [Route("Search/{incomingNumber}/Communication")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<RequestForCorrectionForScanning>), StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchCommunication(string incomingNumber)
        {
            if (_EPZEUUserAccessor?.User?.IsUserIdentifiable != true)
                return BadRequest("CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E", "CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E");

            var communication = await _integrationAppService.SearchCommunicationAsync(incomingNumber);

            if (communication == null)
                return BadRequest("CR_GL_INVALID_INCOMING_NUMBER_E", "CR_GL_INVALID_INCOMING_NUMBER_E"); //Невалиден входящ номер.

            return Ok(communication);
        }

        /// <summary>
        /// Операция за зареждане на данни за заявление.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <returns></returns>
        [Route("Load/{incomingNumber}/ApplicationInfo")]
        [HttpGet]
        [ProducesResponseType(typeof(EPZEU.CR.Web.Models.ApplicationInfo), StatusCodes.Status200OK)]// 
        public async Task<IActionResult> LoadApplicationInfo(string incomingNumber)
        {
            if (_EPZEUUserAccessor?.User?.IsUserIdentifiable != true)
                return BadRequest("CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E", "CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E");

            string uic = null;
            string companyName = null;

            if (!string.IsNullOrEmpty(incomingNumber))
                incomingNumber = _dataProtectorService.ExtractIncomingNumberWithCtx(incomingNumber, ref uic, ref companyName);

            var appInfosResult = await _integrationAppService.SearchApplicationInfoAsync(new ApplicationInfoSearchCriteria()
            {
                IncomingNumber = incomingNumber,
                EntryNumber = null,
                Mode = ApplicationInfoSearchMode.IncomingNumberOrEntryNumber
            });

            if (appInfosResult.Count == 0)
                return BadRequest("CR_GL_INVALID_INCOMING_NUMBER_E", "CR_GL_INVALID_INCOMING_NUMBER_E"); //Невалиден входящ номер!

            var appInfo = appInfosResult.Data.SingleOrDefault();

            if (appInfo.HasRequestsForCorrectionForScanning.HasValue && appInfo.HasRequestsForCorrectionForScanning.Value)
                return BadRequest("CR_APP_00259_E", "CR_APP_00259_E"); //По избраната регистрация има активна комуникация.

            var applicationInfo = _applicationConverter.ConvertToUIApplication(appInfosResult.Data.SingleOrDefault(), uic, companyName);

            if (applicationInfo.PassedFrom != Integration.EPZEU.Models.PassedFrom.Internal)
                return BadRequest("CR_APP_00257_E", "CR_APP_00257_E"); //Търсената регистрация е подадена по Интернет. Моля, използвайте формата "Искане за изправяне на грешки и непълноти"

            if (applicationInfo.ApplicationStatus != Integration.EPZEU.Models.ApplicationStatuses.Processing && applicationInfo.ApplicationStatus != Integration.EPZEU.Models.ApplicationStatuses.Instruction)
                return BadRequest("CR_APP_00258_E", "CR_APP_00258_E"); //Търсената регистрация вече е обработена. Моля, използвайте формата "Искане за изправяне на грешки и непълноти"

            return Ok(applicationInfo);
        }
    }
}