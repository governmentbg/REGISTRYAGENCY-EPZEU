using EPZEU.Common;
using EPZEU.Utilities;
using System;

namespace EPZEU.ServiceLimits.Models
{
    public enum DataServiceLimitStatus
    {
        Inactive = 0,
        Active = 1
    }

    public class DataServiceLimit
    {
        /// <summary>
        /// Идентификатор на лимит
        /// </summary>
        [DapperColumn("service_limit_id")]
        public int? ServiceLimitID { get; set; }

        /// <summary>
        /// Код на услуга за предоставяне на данни
        /// </summary>
        [DapperColumn("service_code")]
        public string ServiceCode { get; set; }

        /// <summary>
        /// Наименование на услуга за предоставяне на данни
        /// </summary>
        [DapperColumn("service_name")]
        public string ServiceName { get; set; }

        /// <summary>
        /// Уникален идентификатор на портал/система
        /// </summary>
        [DapperColumn("module_id")]
        public Modules Module { get; set; }

        /// <summary>
        /// Период от време
        /// </summary>
        [DapperColumn("requests_interval")]
        public TimeSpan RequestsInterval { get; set; }

        /// <summary>
        /// Максимален брой заявки за периода от време
        /// </summary>
        [DapperColumn("requests_number")]
        public int RequestsNumber { get; set;}

        /// <summary>
        /// Статус на лимит
        /// </summary>
        [DapperColumn("status")]
        public DataServiceLimitStatus Status { get; set; }
    }
}
