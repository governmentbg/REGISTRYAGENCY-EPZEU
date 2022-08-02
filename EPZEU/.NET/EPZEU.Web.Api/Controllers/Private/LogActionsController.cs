using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуга за работа с одит.
    /// </summary>
    [Produces("application/json")]
    [StatusCodeResultExceptionFilter(StatusCode = StatusCodes.Status500InternalServerError)]
    [Authorize]
    public class LogActionsController : BaseApiController
    {
        private IAuditService _auditService = null;

        public LogActionsController(IAuditService auditService)
        {
            _auditService = auditService;
        }

        /// <summary>
        /// Операция за създаване на запис в одит журнала.
        /// </summary>
        /// <param name="request">Заявка за одит запис.</param>
        /// <param name="cancellationToken">Токен за отказване</param>
        /// <returns>Отговор на събитие за одит.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(LogActionResponse), StatusCodes.Status200OK)] 
        public async Task<IActionResult> Create([FromBody]LogActionRequest request, CancellationToken cancellationToken)
        {
            if (request.UserID.HasValue)
                throw new ArgumentException("Не може да се подава userID, трябва да се подава userCIN", "UserID");

            var result = await _auditService.CreateLogActionAsync(request, cancellationToken);

            return OperationResult(result);
        }
    }
}
