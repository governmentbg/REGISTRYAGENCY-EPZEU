using EPZEU.Users;
using EPZEU.Users.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Интерфейс за работа с Дани за потребител
    /// </summary>
    [Authorize]
    public class UsersInfoController : BaseApiController
    {
        /// <summary>
        /// Операция за изчитане данни на потребител.
        /// </summary>
        /// <param name="usersService">Интерфейс за работа с потребители.</param>
        /// <param name="cin">КИН на  потребител.</param>
        /// <param name="cancellationToken">Токен за отказване.</param>
        /// <returns>Данни за потребител.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(UserInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromServices]IUsersService usersService, int cin, CancellationToken cancellationToken)
        {
            var user = (await usersService.SearchUsersAsync(new UserSearchCriteria() { CIN = cin, LoadUserPermissions = true }, cancellationToken)).FirstOrDefault();

            UserInfo userInfo = null;
            if (user != null)
            {
                userInfo = new UserInfo()
                {
                    CIN = user.CIN,
                    FirstName = user.FirstName,
                    MiddleName = user.MiddleName,
                    FamilyName = user.FamilyName,
                    Email = user.Email,
                    UpdatedOn = user.UpdatedOn,
                    Permissions = user.UserPermissions?.Select(up => up.Permission.ToString()).ToArray(),
                    SpecialAccessUserType = user.SpecialAccessUserType.HasValue ? (int?)user.SpecialAccessUserType.Value : null
                };
            }

            return Ok(userInfo);
        }
    }
}
