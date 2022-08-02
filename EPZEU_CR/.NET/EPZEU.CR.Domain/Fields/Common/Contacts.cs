using System;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Контакти.
    /// </summary>
    public partial class Contacts
    {
        /// <summary>
        /// Телефон.
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// Факс.
        /// </summary>
        public string Fax { get; set; }

        /// <summary>
        /// Имейл.
        /// </summary>
        public string EMail { get; set; }

        /// <summary>
        /// УРЛ.
        /// </summary>
        public string URL { get; set; }
    }
}