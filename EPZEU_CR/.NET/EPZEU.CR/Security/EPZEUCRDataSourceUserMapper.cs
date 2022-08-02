using EPZEU.CR.ApplicationUsers;
using EPZEU.CR.ApplicationUsers.Repositotories;
using EPZEU.Security;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Security
{
    internal class EPZEUCRDataSourceUserMapper : IDataSourceUserMapper
    {
        private readonly IAppUserRepository _appUserRepository;

        public EPZEUCRDataSourceUserMapper(IAppUserRepository appUserRepository)
        {
            _appUserRepository = appUserRepository;
        }

        public IEnumerable<Claim> GetInterestedClaims(ClaimsPrincipal principal)
        {
            Claim ret = null;

            ret = principal.Claims.GetClaim("name");

            if (ret != null)
                yield return ret;
        }

        public async Task<string> MapAndSyncEPZEUUserToLocalUserAsync(ClaimsPrincipal principal, CancellationToken cansellationToken)
        {
            var user = new AppUser()
            {
                CIN = principal.Claims.GetCIN().Value,
                DisplayName = principal.Claims.GetClaim("name")?.Value,
                IsSystem = false
            };

            await _appUserRepository.EnsureAppUserAsync(user, cansellationToken);

            return user.UserID.ToString();
        }
    }
}
