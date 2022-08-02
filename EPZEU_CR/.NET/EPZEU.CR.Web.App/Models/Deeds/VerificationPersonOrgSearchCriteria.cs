using EPZEU.Common.Models;
using EPZEU.Web.Models;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    public class VerificationPersonOrgSearchCriteria : BasePagedSearchCriteria
    {
        public string Name {get; set; }

        public string Ident { get; set; }

        public bool? IncludeHistory { get; set; }
    }
}
