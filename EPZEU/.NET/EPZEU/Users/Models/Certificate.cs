using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Users.Models
{
    /// <summary>
    /// Сертификат.
    /// </summary>
    public class Certificate
    {
        /// <summary>
        /// Уникален идентификатор на сертификата.
        /// </summary>
        [DapperColumn("certificate_id")]
        public int? CertificateID { get; set; }

        /// <summary>
        /// Сериен номер.
        /// </summary>
        [DapperColumn("serial_number")]
        public string SerialNumber { get; set; }

        /// <summary>
        /// Издател.
        /// </summary>
        [DapperColumn("issuer")]
        public string Issuer { get; set; }

        /// <summary>
        /// Субект.
        /// </summary>
        [DapperColumn("subject")]
        public string Subject { get; set; }

        /// <summary>
        /// Хеш на сертификата.
        /// </summary>
        [DapperColumn("cert_hash")]
        public string CertHash { get; set; }

        /// <summary>
        /// Съдържание.
        /// </summary>
        [DapperColumn("content")]
        public byte[] Content { get; set; }
    }
}
