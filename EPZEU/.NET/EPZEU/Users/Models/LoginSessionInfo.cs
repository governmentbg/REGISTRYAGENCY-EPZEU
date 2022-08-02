using System;
using System.Net;

namespace EPZEU.Users.Models
{
    /// <summary>
    /// Данни за логин сесията.
    /// </summary>
    public class LoginSessionInfo
    {
        /// <summary>
        /// Идентификатор на логин сесията
        /// </summary>
        public Guid LoginSessionID { get; set; }

        /// <summary>
        /// Идентификатор на потребителската сесия.
        /// </summary>
        public Guid UserSessionID { get; set; }

        /// <summary>
        /// IP адрес.
        /// </summary>
        public string IPAddress { get; set; }

        /// <summary>
        /// Тип автентикация.
        /// </summary>
        public AuthenticationTypes AuthenticationType { get; set; }

        // TODO discuss name
        /// <summary>
        /// Идентификатор от ПИК.
        /// </summary>
        public string UserIdentifier { get; set; }

        /// <summary>
        /// Данни за сертификата.
        /// </summary>
        public CertificateInfo CertificateInfo { get; set; }

        /// <summary>
        /// Данни от профила на потребителя.
        /// </summary>
        public UserInfo UserProfileData { get; set; }
    }
}
