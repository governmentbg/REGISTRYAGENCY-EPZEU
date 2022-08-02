using EPZEU.Security;
using EPZEU.Users;
using EPZEU.Users.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер за работа с логин сесии.
    /// </summary>
    [Authorize]
    public class LoginSessionsController : BaseApiController
    {
        /// <summary>
        /// Операция за изчитане на логин сесия.
        /// </summary>
        /// <param name="usersService">Интерфейс за работа с потребители.</param>
        /// <param name="accessor">Интерфейс за работа с EPZEU потребител.</param>
        /// <param name="loginSessionsService">>Интерфейс за работа с логин сесии.</param>
        /// <param name="loadOrganizationIdentifier">Флаг указващ дали да се зареди Идентификатор на организацията.</param>
        /// <param name="loadUserProfileData">Флаг указващ дали да се заредят данни за профила на потребител.</param>
        /// <param name="logger">Итерфейс за правене на лог</param>
        /// <param name="cancellationToken">Токен за отказване</param>
        /// <returns>Данни за логин сесията.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(LoginSessionInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromServices]IUsersService usersService, [FromServices]IEPZEUUserAccessor accessor, [FromServices]ILoginSessionsService loginSessionsService,
            bool? loadOrganizationIdentifier, bool? loadUserProfileData,
            [FromServices] ILogger<LoginSessionsController> logger, CancellationToken cancellationToken)
        {
            var sessionId = accessor.User.LoginSessionID;
            if (!sessionId.HasValue)
            {
                logger.LogWarning("LoginSessionID is not supplied");
                return BadRequest("", "LoginSessionID is not supplied");
            }

            var loginSession = await loginSessionsService.GetLoginSessionByIdAsync(sessionId.Value, true, loadOrganizationIdentifier.HasValue ? loadOrganizationIdentifier.Value : false, cancellationToken);

            if (loginSession == null)
            {
                logger.LogWarning("Cannot find login session with id {sessionId}", sessionId);
                return NotFound();
            }

            if (loginSession.LogoutDate != null)
            {
                logger.LogWarning("Found login session with id {sessionId} that was logged-out!", sessionId);
            }

            var loginSessionInfo = new LoginSessionInfo()
            {
                LoginSessionID = loginSession.LoginSessionID.Value,
                UserSessionID = loginSession.UserSessionID.Value,
                IPAddress = loginSession.IpAddress.ToString(),
                AuthenticationType = loginSession.AuthenticationType.Value,
                UserIdentifier = loginSession.UserIdentifier,
                CertificateInfo = loginSession.CertificateInfo
            };

            if (loadUserProfileData.HasValue && loadUserProfileData.Value)
            {
                var user = (await usersService.SearchUsersAsync(new UserSearchCriteria() { CIN = accessor.User.CIN }, cancellationToken)).FirstOrDefault();

                UserInfo userInfo = new UserInfo()
                {
                    CIN = user.CIN,
                    FirstName = user.FirstName,
                    MiddleName = user.MiddleName,
                    FamilyName = user.FamilyName,
                    Email = user.Email,
                    UpdatedOn = user.UpdatedOn
                };

                loginSessionInfo.UserProfileData = userInfo;
            }

            return Ok(loginSessionInfo);
        }
    }
}
