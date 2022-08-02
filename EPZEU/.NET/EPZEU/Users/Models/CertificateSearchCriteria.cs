using System;
using System.Collections.Generic;
using System.Net;

namespace EPZEU.Users.Models
{
    /// <summary>
    /// Критерии за търсене на сертификати.
    /// </summary>
    public class CertificateSearchCriteria
    {
        /// <summary>
        /// Идентификатори на сертификатори.
        /// </summary>
        public List<int> CertificateIDs { get; set; }

        /// <summary>
        /// Хеш на сертификата.
        /// </summary>
        public string CertHash { get; set; }

        /// <summary>
        /// Сериен номер на сертификата.
        /// </summary>
        public string CertSerialNumber { get; set; }

        /// <summary>
        /// Флаг, указващ дали да се зареди съдържанието на сертификата.
        /// </summary>
        public bool LoadContent { get; set; }
    }
}
