using EPZEU.Common;
using EPZEU.Common.Models;

namespace EPZEU.ServiceLimits.Models
{
    public class DataServiceLimitsSearchCriteria 
    {
        public int[] ServiceLimitIDs { get; set; }
        public string ServiceCode { get; set; }
        public string ServiceName { get; set; }
        public Modules? Module { get; set; }
        public DataServiceLimitStatus? Status { get; set; }
    }
}
