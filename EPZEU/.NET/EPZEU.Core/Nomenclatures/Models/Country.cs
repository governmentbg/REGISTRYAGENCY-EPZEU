namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Държава.
    /// </summary>
    public class Country
    {
        /// <summary>
        /// Идентификатор на държава.
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Код на държава.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Име на държава.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Флаг, указващ дали държавата е от ЕС.
        /// </summary>
        public bool IsEUCountry { get; set; }

        /// <summary>
        /// Код на държавата по БРИС.
        /// </summary>
        public string BRISCountryCode { get; set; }

        /// <summary>
        /// ISO на държавата
        /// </summary>
        public int? Code_ISO3166 { get; set; }
    }
}
