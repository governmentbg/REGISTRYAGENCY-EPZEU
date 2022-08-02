using EPZEU.Users.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.ServiceLimits.Models
{
    public class DataServiceUserLimit
    {
        /// <summary>
        /// Идентификатор на лимит на потребител
        /// </summary>
        [DapperColumn("user_limit_id")]
        public int UserLimitID { get; set; }

        /// <summary>
        /// Идентификатор на лимит
        /// </summary>
        [DapperColumn("service_limit_id")]
        public int? ServiceLimitID { get; set; }

        public DataServiceLimit ServiceLimit { get; set; }

        /// <summary>
        /// Идентификатор на потребителски профил
        /// </summary>
        [DapperColumn("user_id")]
        public int? UserID { get; set; }

        public User User { get; set; }

        /// <summary>
        /// Период от време
        /// </summary>
        [DapperColumn("requests_interval")]
        public TimeSpan RequestsInterval { get; set; }

        /// <summary>
        /// Максимален брой заявки за периода от време
        /// </summary>
        [DapperColumn("requests_number")]
        public int RequestsNumber { get; set; }

        /// <summary>
        /// Статус на лимит
        /// </summary>
        [DapperColumn("status")]
        public DataServiceLimitStatus Status { get; set; }
    }
}
