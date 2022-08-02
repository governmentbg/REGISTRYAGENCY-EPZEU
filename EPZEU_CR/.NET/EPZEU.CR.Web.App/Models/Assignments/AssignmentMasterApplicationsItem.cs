using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Assignments
{
    /// <summary>
    /// Главно заявление със свъразни заявления.
    /// </summary>
    public class AssignmentMasterApplicationsItem
    {
        /// <summary>
        /// Главно заявление.
        /// </summary>
        public EPZEU.CR.Web.Models.ApplicationInfo MasterApplication { get; set; }

        /// <summary>
        /// Свързани заявления.
        /// </summary>
        public IEnumerable<EPZEU.CR.Web.Models.ApplicationInfo> RelatedApplication { get; set; }
    }
}
