using EPZEU.Utilities;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Тип на приложението.
    /// </summary>
    public class ApplicationType
    {
        /// <summary>
        /// Идентификатор на типа на приложението.
        /// </summary>
        [DapperColumn("id")]
        public short? ApplicationTypeID { get; set; }

        /// <summary>
        /// Тип на приложението.
        /// </summary>
        [DapperColumn("app_type")]
        public string AppType { get; set; }

        /// <summary>
        /// Име на типа на приложението.
        /// </summary>
        [DapperColumn("name")]
        public string Name { get; set; }

        /// <summary>
        /// Идентификатор на регистъра.
        /// </summary>
        [DapperColumn("register_id")]
        public Registers? RegisterID { get; set; }

        /// <summary>
        /// Код - абревиатура на заявлението на кирилица.
        /// </summary>
        [DapperColumn("app_code")]
        public string AppCode { get; set; }

        /// <summary>
        /// Път - url-адрес на заявлението.
        /// </summary>
        [DapperColumn("url")]
        public string Url { get; set; }
    }
}