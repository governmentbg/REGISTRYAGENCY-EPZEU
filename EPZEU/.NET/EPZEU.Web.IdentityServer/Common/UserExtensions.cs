
using EPZEU.Nomenclatures;
using EPZEU.Security;
using IdentityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace EPZEU.Users.Models
{
    public static class UserExtensions
    {
        public static IEnumerable<Claim> GetClaims(this User user)
        {
            string name = string.Join(" ", user.FirstName, user.MiddleName, user.FamilyName);

            if (string.IsNullOrEmpty(name))
                name = user.Email;

            yield return new Claim(EPZEUClaimTypes.CIN, user.CIN.ToString());
            yield return new Claim(JwtClaimTypes.Name, name);
            yield return new Claim(JwtClaimTypes.Email, user.Email);

            if (!string.IsNullOrEmpty(user.FirstName))
                yield return new Claim(JwtClaimTypes.GivenName, user.FirstName);

            if (!string.IsNullOrEmpty(user.MiddleName))
                yield return new Claim(JwtClaimTypes.MiddleName, user.MiddleName);

            if (!string.IsNullOrEmpty(user.FamilyName))
                yield return new Claim(JwtClaimTypes.FamilyName, user.FamilyName);

            if (!string.IsNullOrEmpty(user.Organization))
                yield return new Claim(EPZEUClaimTypes.Organization, user.Organization);

            if (user.SpecialAccessUserType != null)
            {
                yield return new Claim(EPZEUClaimTypes.SpecialAccessUserType, ((int)user.SpecialAccessUserType).ToString());
            }

            if (user.UserPermissions != null && user.UserPermissions.Any())
            {
                foreach (var up in user.UserPermissions)
                {
                    yield return new Claim(JwtClaimTypes.Role, up.Permission?.ToString());
                }
            }
        }
    }
}
