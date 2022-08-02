using EPZEU.Web.DataProtection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.Web.DataProtection
{
    public static class DataProtectorServiceExtensions
    {
        private static readonly char _identsSeparator = '&';
        private static readonly string _empty = "e";

        public static string CombineDocGuidWithCtx(this IDataProtectorService dataProtectorService, string docGuid, string incomingNumbers, string uic)
        {
            return CombineIdentifiers(dataProtectorService, uic, incomingNumbers, docGuid);
        }

        public static string CombineIncomingNumberWithCtx(this IDataProtectorService dataProtectorService, string incomingNumber, string uic, string companyName)
        {
            return CombineIdentifiers(dataProtectorService, uic, incomingNumber, companyName);
        }

        private static string CombineIdentifiers(IDataProtectorService dataProtectorService, string item1, string item2, string item3)
        {
            return dataProtectorService.Protect(string.Join(_identsSeparator,
                string.IsNullOrEmpty(item1) ? _empty : item1,
                string.IsNullOrEmpty(item2) ? _empty : item2,
                string.IsNullOrEmpty(item3) ? _empty : item3));
        }
    }
}
