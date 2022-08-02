using EPZEU.CR.ApplicationProcesses;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Web.App.Models.ApplicationProcesses;
using EPZEU.Security;
using EPZEU.Web.FileUploadProtection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Payments.Obligations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using DomModels = EPZEU.CR.ApplicationProcesses.Models;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление на процес по заявяване на услуга
    /// </summary>

    [Authorize]
    public class ApplicationProcessesController : BaseApiController
    {
        private IApplicationProcessService _applicationProcessService = null;

        #region Constructors

        public ApplicationProcessesController(IApplicationProcessService applicationProcessService)
        {
            _applicationProcessService = applicationProcessService;
        }

        #endregion

        #region ApplicationProcesses

        /// <summary>
        /// Операция за изчитане на процес по заявяване.
        /// </summary>
        /// <param name="applType">Тип на заявление.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <returns>Процес по заявяване.</returns>
        [Route("")]
        [HttpGet]
        [ProducesResponseType(typeof(ApplicationProcess), StatusCodes.Status200OK)] 
        public async Task<IActionResult> GetByApplicationType(int applType, CancellationToken cancellationToken)
        {
            if (!await _applicationProcessService.IsApplicationActiveAsync((Integration.EPZEU.Models.ApplicationFormTypes)applType))
            {
                return BadRequest("GL_APPLICATION_CANNOT_SUBMITTED_E", "GL_APPLICATION_CANNOT_SUBMITTED_E");
            }

            var domProcessResult = await _applicationProcessService.LoadAsync((Integration.EPZEU.Models.ApplicationFormTypes)applType, cancellationToken);

            if (domProcessResult.IsSuccessfullyCompleted)
            {
                var result = Mapper.Map<ApplicationProcess>(domProcessResult.Result);

                if (result != null)
                {
                    result.HasChangesInApplicationsNomenclature = await _applicationProcessService.HasChangesInApplicationsNomenclatureAsync(domProcessResult.Result);
                    result.HasChangeInApplicationsInitialData = await _applicationProcessService.HasChangeInApplicationsInitialDataAsync(domProcessResult.Result);
                }

                return Ok(result);
            }
            else
            {
                return BadRequest(domProcessResult);
            }
        }

        /// <summary>
        /// Операция за изчитане на процес по заявяване.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="loadAllData">Флаг указващ дали да се заредят всички данни.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>   
        /// <returns>Процес по заявяване.</returns>
        [Route("{processID}")]
        [HttpGet]
        [ProducesResponseType(typeof(ApplicationProcess), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(long? processID, [FromQuery]bool? loadAllData, CancellationToken cancellationToken)
        {
            if (loadAllData.GetValueOrDefault())
            {
                var domProcessResult = await _applicationProcessService.LoadAsync(processID.Value, cancellationToken);

                return OperationResult<DomModels.ApplicationProcess, ApplicationProcess>(domProcessResult);
            }
            else
            {
                var domProcess = (await _applicationProcessService.SearchAsync(new DomModels.ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = processID,
                    LoadOption = new DomModels.ApplicationProcessLoadOption()
                    {
                        LoadChildApplicationProcesses = true
                    }
                }, cancellationToken)).SingleOrDefault();

                return Ok(Mapper.Map<ApplicationProcess>(domProcess));
            }
        }

        /// <summary>
        /// Операция за създаване на процес по заявяване.
        /// </summary>
        /// <param name="applicationProcessRequest">Заявка за създаване на процес по заявяване.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Процес по заявяване.</returns>
        [Route("")]
        [HttpPost]
        [ProducesResponseType(typeof(ApplicationProcess), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody]ApplicationRequest applicationProcessRequest, CancellationToken cancellationToken)
        {
            if (!await _applicationProcessService.IsApplicationActiveAsync(applicationProcessRequest.ApplicationType.Value))
            {
                return BadRequest("GL_APPLICATION_CANNOT_SUBMITTED_E", "GL_APPLICATION_CANNOT_SUBMITTED_E");
            }

            var result = await _applicationProcessService.StartAsync(applicationProcessRequest, cancellationToken);

            if (result.IsSuccessfullyCompleted)
            {
                result = await _applicationProcessService.LoadAsync(applicationProcessRequest.ApplicationType.Value, cancellationToken);
            }

            return OperationResult<DomModels.ApplicationProcess, ApplicationProcess>(result);
        }

        /// <summary>
        /// Операция за добавяне на подпроцес.
        /// </summary>
        /// <param name="processID">Идентификатор на процес.</param>
        /// <param name="applicationProcessRequest">Заявка за създаване на заявление</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns></returns>
        [Route("{processID}/AddChildProcess")]
        [HttpPost]
        [ProducesResponseType(typeof(ApplicationProcess), StatusCodes.Status200OK)]
        public async Task<IActionResult> AddChildProcess(long processID, [FromBody]ApplicationRequest applicationProcessRequest, CancellationToken cancellationToken)
        {
            var result = await _applicationProcessService.AddChildApplicationProcessAsync(processID, applicationProcessRequest, cancellationToken);

            if (result.IsSuccessfullyCompleted)
            {
                result = await _applicationProcessService.LoadAsync(result.Result.ApplicationProcessID.Value, cancellationToken);
            }

            return OperationResult<DomModels.ApplicationProcess, ApplicationProcess>(result);
        }

        /// <summary>
        /// Операция за изтриване на процес по заявяване.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>       
        [Route("{processID}")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(long processID, CancellationToken cancellationToken)
        {
            await _applicationProcessService.DeleteAsync(processID, cancellationToken);

            return Ok();
        }

        #endregion

        #region Applications

        /// <summary>
        /// Операция за изчитане на заявление
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Заявление.</returns>
        [Route("{processID}/Applications/{applID}")]
        [HttpGet]
        [ProducesResponseType(typeof(Application), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplication(long processID, long applID, CancellationToken cancellationToken)
        {
            var searchCriteria = new DomModels.ApplicationSearchCriteria()
            {
                ApplicationProcessID = processID,
                ApplicationIDs = new List<long>() { applID },
                LoadOption = new DomModels.ApplicationLoadOption()
                {
                    LoadApplicationContent = true
                }
            };

            var result = (await _applicationProcessService.SearchApplication(searchCriteria, cancellationToken)).Single();


            return Ok(Mapper.Map<DomModels.Application, Application>(result));
        }

        /// <summary>
        /// Операция за създаване на заявление.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applicationRequest">Заявка за създаване на заявление.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Заявление.</returns>
        [Route("{processID}/Applications")]
        [HttpPost]
        [ProducesResponseType(typeof(Application), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateApplication(long processID, [FromBody]ApplicationRequest applicationRequest, CancellationToken cancellationToken)
        {
            var result = await _applicationProcessService.AddApplicationAsync(processID, applicationRequest, cancellationToken);

            return OperationResult<DomModels.Application, Application>(result);
        }

        /// <summary>
        /// Операция за обновяване на съдържанието на заявление.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="applContent">Съдържание на заявление.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>        
        [Route("{processID}/Applications/{applID}")]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateApplicationContent(long processID, long applID, [FromBody]JsonElement applContent, CancellationToken cancellationToken)
        {
            using (var ms = new MemoryStream())
            {
                using (var writer = new Utf8JsonWriter(ms))
                {
                    applContent.WriteTo(writer);
                }

                ms.Position = 0;

                var result = await _applicationProcessService.UpdateApplicationContentAsync(processID, applID, ms, cancellationToken);

                return OperationResult(result);

            }
        }

        /// <summary>
        /// Операция за изтриване на заявление.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns></returns>
        [Route("{processID}/Applications/{applID}")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteApplication(long processID, long applID, CancellationToken cancellationToken)
        {
            await _applicationProcessService.DeleteApplicationAsync(processID, applID, cancellationToken);

            return Ok();
        }

        #endregion

        #region Application Attached Documents

        /// <summary>
        /// Връща всички прикачени документи за заявление
        /// </summary>
        /// <param name="processID">Идентификатор на процес.</param>
        /// <param name="applID">Идентификатори на заявления.</param>
        /// <param name="attachedDocument">Прикачен документ.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Прикачени документи.</returns>
        [Route("{processID}/Applications/{applID}/AttachedDocuments")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AttachedDocument>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationDocuments(long processID, long applID, [FromBody] AttachedDocument attachedDocument, CancellationToken cancellationToken)
        {
            var documents = await _applicationProcessService.SearchApplicationDocumentsAsync(new DomModels.ApplicationDocumentSearchCriteria()
            {
                ApplicationIDs = new List<long>() { applID }
            }, cancellationToken);

            var result = documents.Select(d => Mapper.Map<AttachedDocument>(d)).ToList();
            return Ok(result);
        }

        /// <summary>
        /// Операзия за добавяне на документ към заявление
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="attachedDocument">Документ.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Документ.</returns>
        [Route("{processID}/Applications/{applID}/AttachedDocuments")]
        [HttpPost]
        [ProducesResponseType(typeof(AttachedDocument), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateApplicationDocument(long processID, long applID, [FromBody] AttachedDocument attachedDocument, CancellationToken cancellationToken)
        {
            return await CreateApplicationDocumentWithContent(processID, applID, attachedDocument, null, cancellationToken);
        }

        /// <summary>
        /// Операзия за добавяне на документ към заявление
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="attachedDocument">Документ.</param>
        /// <param name="file">Файлово съдържание.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Документ.</returns>
        [Route("{processID}/Applications/{applID}/AttachedDocuments/WithContent")]
        [HttpPost]
        [UploadedFileContentValidationFilter()]
        [ProducesResponseType(typeof(AttachedDocument), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateApplicationDocumentWithContent(long processID, long applID, AttachedDocument attachedDocument, IFormFile file, CancellationToken cancellationToken)
        {
            var domAppDoc = Mapper.Map<DomModels.ApplicationDocument>(attachedDocument);
            domAppDoc.ApplicationID = applID;

            if (file != null)
            {
                domAppDoc.FileMetadata = new Integration.EPZEU.Models.FileMetadata()
                {
                    ContentType = file.ContentType,
                    FileName = file.FileName
                };

                domAppDoc.Content = file.OpenReadStream();

            }

            var result = await _applicationProcessService.AddApplicationDocumentAsync(applID, domAppDoc, cancellationToken);

            if (result.IsSuccessfullyCompleted)
            {
                var uiResult = Mapper.Map<DomModels.ApplicationDocument, AttachedDocument>(result.Result);

                uiResult.IsActWithErasedPersonalData = attachedDocument.IsActWithErasedPersonalData;

                return Ok(uiResult);
            }
            else
            {
                return BadRequest(result);
            }
        }

        /// <summary>
        /// Операзия за обновяване на данните за документ към заявление
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="applDocID">Идентификатор на документ към заявление.</param>
        /// <param name="attachedDocument">Документ.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns></returns>
        [Route("{processID}/Applications/{applID}/AttachedDocuments/{applDocID}")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateApplicationDocument(long processID, long applID, long applDocID, [FromBody] AttachedDocument attachedDocument, CancellationToken cancellationToken)
        {
            var domAppDoc = Mapper.Map<DomModels.ApplicationDocument>(attachedDocument);

            var result = await _applicationProcessService.UpdateApplicationDocumentAsync(applID, domAppDoc, cancellationToken);

            return OperationResult(result);
        }

        /// <summary>
        /// Операзия за изтриване на документ от заявление.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="applDocID">Идентификатор на документ към заявление.</param>
        /// <param name="cancellationToken">Токен по отказване.</param> 
        [Route("{processID}/Applications/{applID}/AttachedDocuments/{applDocID}")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteApplicationDocument(long processID, long applID, long applDocID, CancellationToken cancellationToken)
        {
            await _applicationProcessService.DeleteApplicationDocumentAsync(applID, applDocID, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Операция за стартиране на процес по подписване на документ прикачен към заявление.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="applDocID">Идентификатор на документ към заявление.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Идентификатор на процеса по подписване.</returns>
        [Route("{processID}/Applications/{applID}/AttachedDocuments/{applDocID}/StartSigning")]
        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        public async Task<IActionResult> StartSigningApplicationDocument(long processID, long applID, long applDocID, CancellationToken cancellationToken)
        {
            var result = await _applicationProcessService.StartSigningApplicationDocumentAsync(applID, applDocID, cancellationToken);

            return OperationResult(result);
        }

        #endregion

        #region Obligations

        /// <summary>
        /// Операция за извличане на плащания по заявление.
        /// </summary>
        /// <param name="processID">Идентификатор на процес.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <param name="obligationServiceClient">Клиент за работа с плащания по заявление.</param>
        /// <param name="epzeuUserAccessor">Интерфейс за достъп до EPZEU потребител.</param>
        /// <returns>Списък с плащания.</returns>
        [Route("{processID}/Obligations")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Payments.Obligations.Models.ObligationInfo>) , StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchObligations(long processID, CancellationToken cancellationToken, [FromServices]IObligationServiceClient obligationServiceClient, [FromServices] IEPZEUUserAccessor epzeuUserAccessor)
        {
            var appProcess = (await _applicationProcessService.SearchAsync(new DomModels.ApplicationProcessSearchCriteria()
            {
                ApplicationProcessID = processID,
                LoadOption = new DomModels.ApplicationProcessLoadOption()
                {
                    LoadChildApplicationProcesses = true
                }
            }, cancellationToken)).SingleOrDefault();

            if (appProcess == null)
            {
                return NotFound();
            }

            if (epzeuUserAccessor.User.LocalClientID != appProcess.ApplicantID)
            {
                return Unauthorized();
            }

            if (appProcess.Status == DomModels.ProcessStatuses.Completed)
            {

                var incomingNumbers = new List<string>() { appProcess.IncomingNumber };

                if (appProcess.ChildApplicationProcesses != null && appProcess.ChildApplicationProcesses.Count > 0)
                {
                    incomingNumbers.AddRange(appProcess.ChildApplicationProcesses.Select(p => p.IncomingNumber));
                }

                var obligations = (await obligationServiceClient.SearchAsync(new Payments.Obligations.Models.ObligationsReportSearchCriteria()
                {
                    ApplicationNumbers = incomingNumbers,
                    Register = Payments.Common.Models.Registers.CommercialRegister
                })).Data;

                return Ok(obligations);
            }

            return Ok();
        }

        #endregion

        #region Business operations

        /// <summary>
        /// Операция за стартиране на процес по подписаване на заявлението.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>      
        [Route("{processID}/StartSigning")]
        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        public async Task<IActionResult> StartSigningAsync(long processID, CancellationToken cancellationToken)
        {
            var result = await _applicationProcessService.StartSigningAsync(processID, cancellationToken);

            return OperationResult(result);
        }


        /// <summary>
        /// Операция за стартира порцеса по изпращане на заявлението.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>       
        [Route("{processID}/StartSending")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> StartSending(long processID, CancellationToken cancellationToken)
        {
            var result = await _applicationProcessService.StartSendingAsync(processID, cancellationToken);

            return OperationResult(result);
        }

        /// <summary>
        /// Операция за връщане към начален статус.
        /// </summary>
        /// <param name="processID">Идентификатор на процес.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns>Статус на процес.</returns>
        [Route("{processID}/ReturnToBeginningStatus")]
        [HttpPost]
        [ProducesResponseType(typeof(DomModels.ProcessStatuses), StatusCodes.Status200OK)] 
        public async Task<IActionResult> ReturnToBeginningStatus(long processID, CancellationToken cancellationToken)
        {
            var result = await _applicationProcessService.ReturnToBeginningStatusAsync(processID, cancellationToken);

            return Ok(result);
        }

        #endregion
    }
}