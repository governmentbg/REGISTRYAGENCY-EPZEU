using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.Users.Migrations.Models
{
    public class OSSApplication
    {
        /// <summary>
        /// Уникален идентификатор на заявление.
        /// </summary>
        [DapperColumn("application_id")]
        public long? ApplicationID { get; set; }

        /// <summary>
        /// връзка към заявена услуга
        /// </summary>
        [DapperColumn("serviceinstance_id")]
        public long? ServiceInstanceID { get; set; }

        /// <summary>
        /// Входящ номер на заявление.
        /// </summary>
        [DapperColumn("application_identifier")]
        public string IncomingNumber { get; set; }

        /// <summary>
        /// Идентификатор на вида на заявлението от номенклатурата на ИС на ИР
        /// </summary>
        [DapperColumn("app_type")]
        public string ApplicationType { get; set; }

        /// <summary>
        /// Актуален Статус
        /// </summary>
        [DapperColumn("status")]
        public int? Status { get; set; }

        /// <summary>
        /// Дата на статус (Денормализация?).
        /// </summary>
        [DapperColumn("statustime")]
        public DateTime? StatusTime { get; set; }

        /// <summary>
        /// дата на регистрация на заявлението в РЕАУ.
        /// </summary>
        [DapperColumn("registrationtime")]
        public DateTime? RegistrationTime { get; set; }

        [DapperColumn("result_number")]
        public long? ResultNumber { get; set; } 

        [DapperColumn("result_date")]
        public DateTime? ResultDate { get; set; }

        [DapperColumn("result_doc_guid")]
        public string ResultDocumentGuid { get; set; }
    }
}
