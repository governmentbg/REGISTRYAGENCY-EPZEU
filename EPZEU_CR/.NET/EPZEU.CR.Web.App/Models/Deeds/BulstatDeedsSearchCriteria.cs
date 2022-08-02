using EPZEU.Common.Models;
using EPZEU.Web.Models;
using Integration.EPZEU.Models;
using System;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    public class BulstatDeedsSearchCriteria : BasePagedSearchCriteria
    {
        /// <summary>
        /// От дата.
        /// </summary>
        public DateTime? FromDate { get; set; }

        /// <summary>
        /// До Дата.
        /// </summary>
        public DateTime? ToDate { get; set; }

        /// <summary>
        /// Код на съд.
        /// </summary>
        public int? CourtNumber { get; set; }
    }
}
