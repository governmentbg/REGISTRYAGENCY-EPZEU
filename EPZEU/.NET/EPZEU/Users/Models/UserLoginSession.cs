using EPZEU.Utilities;
using System;
using System.Net;

namespace EPZEU.Users.Models
{

    /// <summary>
    /// Данни за потребителска сесия.
    /// </summary>
    public class UserLoginSession
    {
        /// <summary>
        /// Брой неуспешни опити за вход.
        /// </summary>
        [DapperColumn("login_session_id")]
        public Guid? LoginSessionID { get; set; }

        /// <summary>
        /// Уникален идентификатор на потребителска сесия.
        /// </summary>
        [DapperColumn("user_session_id")]
        public Guid? UserSessionID { get; set; }

        /// <summary>
        /// Уникален идентификатор на потребителски профил.
        /// </summary>
        [DapperColumn("user_id")]
        public int? UserID { get; set; }

        /// <summary>
        /// Дата, на която потребителят е влязъл в системата.
        /// </summary>
        [DapperColumn("login_date")]
        public DateTime? LoginDate { get; set; }

        /// <summary>
        /// Дата, на която потребителят е излязъл от системата.
        /// </summary>
        [DapperColumn("logout_date")]
        public DateTime? LogoutDate { get; set; }

        /// <summary>
        /// IP адрес.
        /// </summary>
        [DapperColumn("ip_address")]
        public IPAddress IpAddress { get; set; }

        /// <summary>
        /// Вид автентикация: 1 - потребителско име и парола, 2 - активна директория, 3 - електронен сертификат.
        /// </summary>
        [DapperColumn("authentication_type")]
        public AuthenticationTypes? AuthenticationType { get; set; }

        /// <summary>
        /// Уникален идентификатор на сертификат.
        /// </summary>
        [DapperColumn("certificate_id")]
        public int? CertificateID { get; set; }

        /// <summary>
        /// Уникален идентификатор на операцията.
        /// </summary>
        [DapperColumn("operation_id")]
        public Guid? OperationID { get; set; }

        /// <summary>
        /// Данни за сертификата.
        /// </summary>
        public CertificateInfo CertificateInfo { get; set; }

        /// <summary>
        /// Идентификатор на потребителя, когато е логнат с ПИК на НАП.
        /// </summary>
        public string UserIdentifier { get; set; }
    }
}
