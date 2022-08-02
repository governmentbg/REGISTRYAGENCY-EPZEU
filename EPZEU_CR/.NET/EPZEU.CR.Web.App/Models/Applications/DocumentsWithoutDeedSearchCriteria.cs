using EPZEU.Applications.Models;
using EPZEU.Common.Models;
using EPZEU.Nomenclatures;
using Integration.EPZEU.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Applications
{
    public class DocumentsWithoutDeedSearchCriteria : BasePagedSearchCriteria
    {
        /// <summary>
        /// От дата.
        /// </summary>
        public DateTime? DateFrom { get; set; }

        /// <summary>
        /// До дата.
        /// </summary>       
        public DateTime? DateTo { get; set; }

        /// <summary>
        /// Фирма/Наименование.
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Входящ номер.
        /// </summary>
        public string IncomingNumber { get; set; }

        /// <summary>
        /// Ресултат.
        /// </summary>
        public ApplicationStatuses? Status { get; set; }
    }
}
