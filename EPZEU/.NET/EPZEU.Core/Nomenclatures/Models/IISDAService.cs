using EPZEU.Utilities;
using System;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Данни на услуги, синхронизирани от ИИСДА.
    /// </summary>
    public class IISDAService
    {
        /// <summary>
        /// Номер на описанието на услугата в ИИСДА.
        /// </summary>
        [DapperColumn("iisda_service_id")]
        public int IIISDAServiceID { get; set; }

        /// <summary>
        /// Номер на услугата в ИИСДА.
        /// </summary>
        [DapperColumn("service_number")]
        public int ServiceNumber { get; set; }

        /// <summary>
        /// Наименование на услугата.
        /// </summary>
        [DapperColumn("name")]
        public string Name { get; set; }

        /// <summary>
        /// Кратко описание на услуга.
        /// </summary>
        [DapperColumn("short_description")]
        public string ShortDescription { get; set; }

        /// <summary>
        /// HTML описание на услугата.
        /// </summary>
        [DapperColumn("description")]
        public string Description { get; set; }

        /// <summary>
        /// Дата на прочитане на услугата от ИИСДА.
        /// </summary>
        [DapperColumn("read_date")]
        public DateTime? ReadDate { get; set; }

        /// <summary>
        /// Флаг, дали услугата вече не се предоставя от администрацията.
        /// </summary>
        [DapperColumn("is_discontinued")]
        public bool IsDiscontinued { get; set; }

        /// <summary>
        /// Флаг, дали услугата се плаща по елекронен път.
        /// </summary>
        [DapperColumn("has_epayment")]
        public bool HasEPayment { get; set; }
    }
}
