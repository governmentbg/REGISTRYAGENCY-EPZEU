using System;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Власт, съдилище.
    /// </summary>
    public class Authority
    {
        /// <summary>
        /// Идентификатор на власт.
        /// </summary>
        public int AuthorityID { get; set; }

        /// <summary>
        /// Име на власт.
        /// </summary>
        public string AuthorityName { get; set; }

        /// <summary>
        /// Тип на власт.
        /// </summary>
        public int? AuthorityType { get; set; }

        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int? ActionID { get; set; }

        /// <summary>
        /// Раздел на власт.
        /// </summary>
        public short? AuthoritySybtype { get; set; }

        /// <summary>
        /// Закриване на съдилище.
        /// </summary>
        public string BankruptcyCourt { get; set; }

        /// <summary>
        /// Идентифкатор Delfi
        /// </summary>
        public short? DelfiID { get; set; }

        /// <summary>
        /// Идентификатор на регион.
        /// </summary>
        public int? RegionID { get; set; }

        /// <summary>
        /// Име на съдилище.
        /// </summary>
        public string FirmCourt { get; set; }

        /// <summary>
        /// Идентификатор на власт.
        /// </summary>
        public Guid AuthorityGUID { get; set; }
    }
}
