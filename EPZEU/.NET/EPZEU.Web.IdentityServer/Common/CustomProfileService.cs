using EPZEU.Nomenclatures;
using EPZEU.Security;
using EPZEU.Users;
using EPZEU.Users.Models;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.IdentityServer.Common
{
    /// <summary>
    /// Имплементация на IProfileService.
    /// </summary>
    public class CustomProfileService : IProfileService
    {
        private readonly IUsersService UsersService;

        public CustomProfileService(IUsersService usersService)
        {
            UsersService = usersService;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            // load all predefined claims
            var userClaims = (await SearchClaimsAsync(
            new UserSearchCriteria()
            {
                CIN = GetCINFromSubClaim(context.Subject)
            })).ToList();

            // add 'login session' claim, it is available only when issuing access token                
            var loginSessionIDClaim = context.Subject.Claims.Where(c => c.Type == EPZEUClaimTypes.LoginSessionID).SingleOrDefault();
            if (loginSessionIDClaim != null)
                userClaims.Add(loginSessionIDClaim);

            var userIdentifiableClaim = context.Subject.Claims.Where(c => c.Type == EPZEUClaimTypes.UserIdentifiable).SingleOrDefault();
            if (userIdentifiableClaim != null)
                userClaims.Add(userIdentifiableClaim);

            context.AddRequestedClaims(userClaims);
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
            return Task.CompletedTask;
        }

        private async Task<IEnumerable<Claim>> SearchClaimsAsync(UserSearchCriteria criteria)
        {
            criteria.UserStatuses = new List<UserStatuses>() { UserStatuses.Active };
            criteria.LoadUserPermissions = true;

            var user = (await UsersService.SearchUsersAsync(criteria, CancellationToken.None)).SingleOrDefault();

            if (user == null)
                throw new InvalidOperationException($"User with cin = {criteria.CIN} not found!");

            return user.GetClaims();
        }

        private int GetCINFromSubClaim(ClaimsPrincipal subject)
        {
            var subParts = subject.Claims.GetSubjectDecoded();

            if (subParts.Length == 1 && int.TryParse(subParts[0], out int cinParsed))
            {
                return cinParsed;
            }
            else if (subParts.Length == 2 && subParts[0] == "cin" && int.TryParse(subParts[1], out cinParsed))
            {
                return cinParsed;
            }
            else
                throw new InvalidOperationException($"Cannot parse cin from sub value {subject.Claims.GetSubject()}!");
        }
    }
}
