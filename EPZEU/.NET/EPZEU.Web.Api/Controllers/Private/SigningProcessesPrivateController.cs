using CNSys;
using EPZEU.Signing;
using EPZEU.Signing.BSecureDSSL;
using EPZEU.Signing.Models;
using EPZEU.Web.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуга за работа с процеси за подписване.
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    public class SigningProcessesPrivateController : SigningProcessesController
    {
        public SigningProcessesPrivateController(ISigningProcessesService signingProcessesService, ILogger<SigningProcessesController> logger) : base(signingProcessesService, logger)
        {
        }

        /// <summary>
        ///  Операция за създаване на  процес за подписване.
        /// </summary>
        /// <param name="obj">Заявка за създаване на процес за подписване.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <returns>Идентификатор на процес за подписване.</returns>
        [HttpPost]
        [Route("")]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)] 
        public async Task<IActionResult> CreateSigningProcess(SigningRequestVM obj, CancellationToken cancellationToken)
        {
            SigningRequest signingRequest = obj.SigningRequest;
            using (signingRequest.Content = obj.DocumentToSign.OpenReadStream())
            {
                var result = await _signingProcessesService.CreateSigningProcessAsync(signingRequest, cancellationToken);

                return OperationResult(result);
            }
        }

        /// <summary>
        /// Валидира подписан документ.
        /// </summary>
        /// <param name="file">Файл.</param>
        /// <param name="documentSigningtUtilityService">Интерфейс за работа с подписване на документи.</param>
        /// <returns>ValidateDocumentResponseDto - обект на услугата BSecureDSSL.</returns>
        [HttpPost]
        [Route("verifySignedContent")]
        [ProducesResponseType(typeof(ValidateDocumentResponseDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> VerifySignedContent(IFormFile file, [FromServices]IDocumentSigningtUtilityService documentSigningtUtilityService)
        {
            var result = await documentSigningtUtilityService.SignaturesVerificationAsync(file.OpenReadStream(), file.FileName);

            return Ok(result);
        }
        
        /// <summary>
        /// Операция за изтриване на процес по подписване.
        /// </summary>
        /// <param name="guids">Списък от идентификатори на подписване.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("DeleteSigningProcesses")]
        [ProducesResponseType(StatusCodes.Status200OK)] 
        public async Task<IActionResult> DeleteSigningProcesses([FromBody]Guid[] guids, CancellationToken cancellationToken)
        {
            var result = await _signingProcessesService.DeleteSigningProcessesAsync(guids, cancellationToken);

            return OperationResult(result);
        }
    }
}
