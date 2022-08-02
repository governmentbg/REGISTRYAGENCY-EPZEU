using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Users.Models
{
    /// <summary>
    /// Данни за сертификата.
    /// </summary>
    public class CertificateInfo
    {
        /// <summary>
        /// Уникален идентификатор на сертификата.
        /// </summary>
        public int CertificateID { get; set; }

        /// <summary>
        /// Идентификатор на собственика на сертификата
        /// </summary>
        public string Identifier { get; set; }

        /// <summary>
        /// Идентификатор на юридическо лице, с което физическото лице е асоциирано
        /// </summary>
        public string OrganizationIdentifier { get; set; }

        /// <summary>
        /// Имена на собственика на сертификата
        /// </summary>
        public string Names { get; set; }

        /// <summary>
        /// Сериен номер.
        /// </summary>
        public string SerialNumber { get; set; }

        /// <summary>
        /// Хеш на сертификата.
        /// </summary>
        public string CertHash { get; set; }

        /// <summary>
        /// Издател.
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// Съдържание.
        /// </summary>
        public string Content { get; set; }
    }
}
