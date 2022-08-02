using EPZEU.Common.Models;

namespace EPZEU.Web.IdentityServer.Models
{
    public class PersistedGrantsSearchCriteria : BasePagedSearchCriteria
    {
        public string Key { get; set; }
        public string SubjectId { get; set; }
    }
}
