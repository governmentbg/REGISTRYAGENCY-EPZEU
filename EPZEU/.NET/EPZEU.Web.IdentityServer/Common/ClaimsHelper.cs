using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.Web.IdentityServer.Common
{
    internal static class ClaimsHelper
    {
        public static string BuildSubClaimValueForCIN(int cin) => $"cin:{cin}";
    }
}
