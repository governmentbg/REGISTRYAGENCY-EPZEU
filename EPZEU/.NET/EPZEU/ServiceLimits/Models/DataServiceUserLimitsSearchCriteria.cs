using EPZEU.Common.Models;

namespace EPZEU.ServiceLimits.Models
{
    public class DataServiceUserLimitsSearchCriteria 
    {
        public int[] UserLimitIDs { get; set; }
        public int? ServiceLimitID { get; set; }
        public int? UserID { get; set; }
        public DataServiceLimitStatus? Status { get; set; }
    }
}
