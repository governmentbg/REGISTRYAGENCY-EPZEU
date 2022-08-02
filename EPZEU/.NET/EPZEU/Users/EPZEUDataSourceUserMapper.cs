using EPZEU.Security;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users
{
    internal class EPZEUDataSourceUserMapper : IDataSourceUserMapper
    {
        private readonly IUsersService _usersService;
        public EPZEUDataSourceUserMapper(IUsersService usersService)
        {
            _usersService = usersService;
        }

        public IEnumerable<Claim> GetInterestedClaims(ClaimsPrincipal principal)
        {
            /*не се връщат клаимове, защото няма нужда се синхронизират данните*/
            return Enumerable.Empty<Claim>();
        }

        public async Task<string> MapAndSyncEPZEUUserToLocalUserAsync(ClaimsPrincipal principal, CancellationToken cancellationToken)
        {
            return (await _usersService.SearchUsersAsync(new Models.UserSearchCriteria() { CIN = principal.Claims.GetCIN().Value }, cancellationToken)).SingleOrDefault()?.UserID.ToString();
        }
    }
}
