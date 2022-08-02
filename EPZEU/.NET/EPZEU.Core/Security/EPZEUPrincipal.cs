using CNSys.Security;
using System;
using System.Security.Claims;
using System.Security.Principal;

namespace EPZEU.Security
{
    /// <summary>
    /// Статичен клас, съдържащ константи за работа с потребители.
    /// </summary>
    public static class EPZEUClaimTypes
    {
        public const string CIN = "cin";
        public const string LoginSessionID = "login_session_id";
        public const string Subject = "sub";
        public const string UserIdentifiable = "user_identifiable";
        public const string Organization = "organization";
        public const string SpecialAccessUserType = "access_type";
        public const string HasElevatedRights = "has_elevated_rights";
    }

    /// <summary>
    /// Клас за работа с потребители.
    /// </summary>
    public class EPZEUPrincipal : ClaimsPrincipal, IDataSourceUser
    {
        public const int SystemLocalUserID = 1;
        public const int AnonymousLocalUserID = 2;

        private Guid? _LoginSessionID;
        private int? _CIN;
        private string _subject;
        private bool? _IsUserIdentifiable;

        public EPZEUPrincipal(
            IPrincipal principal,
            string clientID = null)
            : base(principal)
        {
            ClientID = clientID;
        }

        /// <summary>
        /// Идентификатор на потребителя от локалната база данни.
        /// </summary>
        public int? LocalClientID
        {
            get
            {
                if (int.TryParse(ClientID, out int ret))
                    return ret;
                else
                    return null;
            }
        }

        /// <summary>
        /// Уникален идентификатор на login сесията на потребителя.
        /// </summary>
        public Guid? LoginSessionID
        {
            get { return _LoginSessionID.HasValue ? _LoginSessionID : _LoginSessionID = Claims.GetLoginSessionID(); }
        }

        /// <summary>
        /// Клиентски идентификационен номер.
        /// </summary>
        public int? CIN
        {
            get { return _CIN.HasValue ? _CIN : _CIN = Claims.GetCIN(); }
        }

        public string Subject
        {
            get { return _subject != null ? _subject : _subject = Claims.GetSubject(); }
        }

        /// <summary>
        /// Флаг указващ дали потребителят се е логнал със сертификат.
        /// </summary>
        public bool? IsUserIdentifiable
        {
            get { return _IsUserIdentifiable.HasValue ? _IsUserIdentifiable : _IsUserIdentifiable = Claims.GetIsUserIdentifiable(); }
        }


        #region Public interface

        public string ClientID { get; private set; }

        public string ProxyUserID => null;

        #endregion
    }
}