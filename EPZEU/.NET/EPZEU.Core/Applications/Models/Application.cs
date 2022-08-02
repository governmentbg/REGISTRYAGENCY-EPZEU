using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;
using System;

namespace EPZEU.Applications.Models
{
    /// <summary>
    /// Модел на подаденo заявлениe.
    /// </summary>
    public class Application
    {
        /// <summary>
        /// Уникален идентификатор на заявление.
        /// </summary>
        [DapperColumn("application_id")]
        public long? ApplicationID { get; set; }

        /// <summary>
        /// Клиентски идентификационене номер на потребителя подал заявление.
        /// </summary>
        [DapperColumn("applicant_cin")]
        public int? ApplicantCIN { get; set; }

        /// <summary>
        /// Регистър на заявление.
        /// </summary>
        [DapperColumn("register_id")]
        public Registers? Register { get; set; }

        /// <summary>
        /// Тип на заявление.
        /// </summary>
        [DapperColumn("application_type_id")]
        public short? ApplicationTypeID { get; set; }

        /// <summary>
        /// Входящ номер на заявление.
        /// </summary>
        [DapperColumn("incoming_number")]
        public string IncomingNumber { get; set; }

        /// <summary>
        /// Дата на входиране на заявление.
        /// </summary>
        [DapperColumn("registration_date")]
        public DateTime? RegistrationDate { get; set; }

        /// <summary>
        /// URL адрес за преглед на заявление.
        /// </summary>
        [DapperColumn("application_display_url")]
        public string ApplicationDisplayUrl { get; set; }

        /// <summary>
        /// HTML резилтат от изпълнението на заявлението.
        /// </summary>
        [DapperColumn("result_html")]
        public string ResultHTML { get; set; }

        /// <summary>
        /// Дата на черновата
        /// </summary>
        public DateTime? DraftDate { get; set; }

        /// <summary>
        /// Тип на заявление
        /// </summary>
        public string ApplicationType { get; set; }
    }

    /// <summary>
    /// Заявка за промяна на заявление
    /// </summary>
    public class ApplicationUpdateRequest
    {
        /// <summary>
        /// Входящ номер.
        /// </summary>
        public string incomingNumber { get; set; }

        /// <summary>
        /// HTML резултат.
        /// </summary>
        public string resultHtml { get; set; }
    }
}
