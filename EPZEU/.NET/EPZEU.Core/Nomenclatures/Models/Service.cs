using EPZEU.Utilities;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Услуга
    /// </summary>.
    public class Service
    {
        /// <summary>
        /// Идентификатор на услуга.
        /// </summary>
        [DapperColumn("service_id")]
        public int ServiceID { get; set; }

        /// <summary>
        /// Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR).
        /// </summary>
        [DapperColumn("register_id")]
        public Registers RegisterID { get; set; }

        /// <summary>
        /// Номер на услуга от ИИСДА.
        /// </summary>
        [DapperColumn("iisda_service_id")]
        public int? IISDAServiceID { get; set; }

        /// <summary>
        /// Заявление.
        /// </summary>
        [DapperColumn("app_type_id")]
        public short AppTypeID { get; set; }

        /// <summary>
        /// Вид на услуга.
        /// </summary>
        [DapperColumn("service_type_ids")]
        public short[] ServiceTypeIDs { get; set; }

        /// <summary>
        /// Видове плащане по електронен път
        /// </summary>
        [DapperColumn("payment_type_ids")]
        public short[] PaymentTypeIDs { get; set; }

        /// <summary>
        /// Статус: 0- Предоставя се от ЕПЗЕУ; 1 - Прекратено предоставяне от ЕПЗЕУ;
        /// </summary>
        [DapperColumn("status")]
        public int Status { get; set; }

        /// <summary>
        /// Наименование на услугата
        /// </summary>
        [DapperColumn("name")]
        public string Name { get; set; }

        /// <summary>
        /// HTML описание на услугата
        /// </summary>
        [DapperColumn("description")]
        public string Description { get; set; }

        /// <summary>
        /// Флаг, указващ дали услугата е административна или не.
        /// </summary>
        [DapperColumn("is_adm")]
        public bool? IsAdm { get; set; }

        /// <summary>
        /// Кратко описание на услугата
        /// </summary>
        [DapperColumn("short_description")]
        public string ShortDescription { get; set; }

        /// <summary>
        /// Номер на услугата в ИИСДА.
        /// </summary>
        [DapperColumn("service_number")]
        public int? ServiceNumber { get; set; }
    }
}