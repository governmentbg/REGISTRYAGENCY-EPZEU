using EPZEU.CR.ApplicationProcesses;
using EPZEU.CR.Applications.Models;
using EPZEU.CR.ApplicationUsers.Repositotories;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomModels = EPZEU.CR.ApplicationProcesses.Models;
using EPZEU.CR.Web.Common;
using System.Threading;

namespace EPZEU.CR.Web.Api.Private.Controllers
{
    /// <summary>
    /// Контролер за работа с процес на заявление.
    /// </summary>
    [Authorize]
    public class ApplicationProcessesController : EPZEU.Web.Mvc.BaseApiController
    {
        private IApplicationProcessService _applicationProcessService = null;

        public ApplicationProcessesController(IApplicationProcessService applicationProcessService)
        {
            _applicationProcessService = applicationProcessService;
        }

        /// <summary>
        /// Операция за регистриране на процес на заявление.
        /// </summary>
        /// <param name="operationID">Идентификатор на операция.</param>
        /// <param name="appRegRequests">Заявки за регистрирани заявления.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <param name="applicationConverter">Конвертор за заявление</param>
        /// <param name="epzeuAppServiceClient"> Интерфейс на http клиент за работа с подадени заявления.</param>
        /// <param name="appUserRepository">Интерфейс за поддържане и съхранение на обекти от тип AppUser.</param>
        /// <returns></returns>
        [Route("Registered")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ApplicationsRegisteredAsync([FromQuery]string operationID, [FromBody] List<ApplicationRegisteredRequest> appRegRequests, CancellationToken cancellationToken, [FromServices] IApplicationConverter applicationConverter, [FromServices] EPZEU.Applications.IApplicationServiceClient epzeuAppServiceClient, [FromServices] IAppUserRepository appUserRepository)
        {
            var mainProcess = (await _applicationProcessService.SearchAsync(new DomModels.ApplicationProcessSearchCriteria()
            {
                ApplicationProcessID = Convert.ToInt64(appRegRequests[0].ApplicationKey)
            }, cancellationToken)).SingleOrDefault();

            if (mainProcess != null)
            {
                var userCIN = (await appUserRepository.SearchAsync(new AppUserSearchCriteria()
                {
                    UserID = mainProcess.ApplicantID.GetValueOrDefault()
                }, cancellationToken)).SingleOrDefault().CIN;

                foreach (var appRegRequest in appRegRequests)
                {
                    var application = applicationConverter.ConvertToEPZEUApplication(appRegRequest.Application);
                    application.ApplicantCIN = userCIN;

                    await epzeuAppServiceClient.CreateApplicationAsync(application);
                }
            }

            await _applicationProcessService.ApplicationsRegisteredAsync(operationID, appRegRequests, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Операция за отказване процес по подписване на заявление
        /// </summary>
        /// <param name="signingGiud">Идентификатор на процес по подписване.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>       
        [Route("SigningRejected")]
        [HttpPost]
        [NoopServiceLimiter] /*Служебен интерфейс - само вътрешен*/
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> SigningRejectedAsync([FromQuery]Guid signingGiud, CancellationToken cancellationToken)
        {
            await _applicationProcessService.SigningRejectedAsync(signingGiud, cancellationToken);

            return Ok();
        }

        /// <summary>
        /// Операция за приключва процеса по изпращане.
        /// </summary>
        /// <param name="signingGiud">Гуид за подписване.</param>
        /// <param name="userSessionID">Идентификатор на потребителска сесия.</param>
        /// <param name="loginSessionID">Идентификатор на логин сесия.</param>
        /// <param name="ipAddress">IP адрес</param>
        /// <param name="userCIN">КИН на потребител.</param>
        /// <param name="file">Файл.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <returns></returns>
        [Route("SigningCompleted")]
        [HttpPost]
        [NoopServiceLimiter] /*Служебен интерфейс - само вътрешен*/
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> SigningCompletedAsync([FromQuery]Guid signingGiud, [FromQuery]Guid? userSessionID, [FromQuery]Guid? loginSessionID, [FromQuery]string ipAddress, [FromQuery]int? userCIN, IFormFile file, CancellationToken cancellationToken)
        {
            using (var fileContent = file.OpenReadStream())
            {
                await _applicationProcessService.SigningCompletedAsync(signingGiud, fileContent, userSessionID, loginSessionID, ipAddress, userCIN, cancellationToken);
            }

            return Ok();
        }

        /// <summary>
        /// Операция за приклячване на процес по подписване на документ прикачен към заявление.
        /// </summary>
        /// <param name="signingGiud">Гуид за подписване.</param>
        /// <param name="file">Файл</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <returns></returns>
        [Route("SigningApplicationDocumentCompleted")]
        [HttpPost]
        [NoopServiceLimiter] /*Служебен интерфейс - само вътрешен*/
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> SigningApplicationDocumentCompletedAsync([FromQuery]Guid signingGiud, IFormFile file, CancellationToken cancellationToken)
        {
            using (var fileContent = file.OpenReadStream())
            {
                await _applicationProcessService.SigningApplicationDocumentCompletedAsync(signingGiud, fileContent, cancellationToken);
            }

            return Ok();
        }

        /// <summary>
        /// Операция за отказ на процес по подписване на документ прикачен към заявление.
        /// </summary>
        /// <param name="signingGiud">Гуид за подписване.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <returns></returns>
        [Route("SigningApplicationDocumentRejected")]
        [HttpPost]
        [NoopServiceLimiter] /*Служебен интерфейс - само вътрешен*/
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult RejectSigningApplicationDocument([FromQuery]Guid signingGiud, CancellationToken cancellationToken)
        {
            _applicationProcessService.SigningApplicationDocumentRejectedAsync(signingGiud, cancellationToken);

            return Ok();
        }
    }
}
