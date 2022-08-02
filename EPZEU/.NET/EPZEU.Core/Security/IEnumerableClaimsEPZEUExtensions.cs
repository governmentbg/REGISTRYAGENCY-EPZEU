using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace EPZEU.Security
{
    public static class IEnumerableClaimsEPZEUExtensions
    {
        public static string GetSubject(this IEnumerable<Claim> claims)
        {
            return claims.GetClaim("sub")?.Value;
        }

        public static string[] GetSubjectDecoded(this IEnumerable<Claim> claims)
        {
            return claims.GetSubject()?.Split(':');
        }

        public static string GetName(this IEnumerable<Claim> claims)
        {
            return claims.GetClaim("name")?.Value;
        }

        public static int? GetCIN(this IEnumerable<Claim> claims)
        {
            if (int.TryParse(claims.GetClaim(EPZEUClaimTypes.CIN)?.Value, out int ret))
                return ret;
            else
                return null;
        }

        public static Guid? GetLoginSessionID(this IEnumerable<Claim> claims)
        {
            var loginSessionID = claims.GetClaim(EPZEUClaimTypes.LoginSessionID)?.Value;

            if (!string.IsNullOrEmpty(loginSessionID))
                return Guid.Parse(loginSessionID);
            else
                return null;
        }

        public static Claim GetClaim(this IEnumerable<Claim> claims, string type)
        {
            return claims?.Where((item) => { return item.Type == type; }).SingleOrDefault();
        }

        public static bool? GetIsUserIdentifiable(this IEnumerable<Claim> claims)
        {
            var isserIdentifiable = claims.GetClaim(EPZEUClaimTypes.UserIdentifiable)?.Value;
            bool isserIdentifiableRes = false;

            if (bool.TryParse(isserIdentifiable, out isserIdentifiableRes))
            {
                return isserIdentifiableRes;
            }
            else
                return null;
        }
    }
}
