using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Security
{
    public interface IDataSourceUserMapper
    {
        IEnumerable<Claim> GetInterestedClaims(ClaimsPrincipal principal);
        Task<string> MapAndSyncEPZEUUserToLocalUserAsync(ClaimsPrincipal principal, CancellationToken cansellationToken);
    }
}
