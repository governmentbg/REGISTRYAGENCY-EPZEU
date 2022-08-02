using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using EPZEU.Emails.Models;
using EPZEU.Emails;
using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using CNSys;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуга за работа с имейл нотификации.
    /// </summary>
    [Produces("application/json")]
    [StatusCodeResultExceptionFilter(StatusCode = StatusCodes.Status500InternalServerError)]
    [Authorize]
    public class EmailNotificationsController : BaseApiController
    {
        private IEmailNotificationService _emailNotificationService = null;

        public EmailNotificationsController(IEmailNotificationService emailNotificationService)
        {
            _emailNotificationService = emailNotificationService;
        }

        /// <summary>
        /// Операция за създаване на имейл нотификация.
        /// </summary>
        /// <param name="request">Заявка за имейл нотификация.</param>
        /// <returns>Обект за отговор от работа с операция за създаване на имейл нотификация.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(EmailNotificationResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateAsync([FromBody]EmailNotificationRequest request)
        {
            var result = await _emailNotificationService.CreateEmailNotificationAsync(request);
            return OperationResult<EmailNotificationResponse>(result);
        }
    }
}
