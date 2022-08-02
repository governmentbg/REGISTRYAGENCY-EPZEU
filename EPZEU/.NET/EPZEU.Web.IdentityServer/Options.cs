using System;

namespace EPZEU.Web.IdentityServer
{
    /// <summary>
    /// Параметри на конфигурация за потребителски профили.
    /// </summary>
    public class AccountOptions
    {
        public static TimeSpan RememberMeLoginDuration = TimeSpan.FromDays(30);

        public static bool ShowLogoutPrompt = true;

        // specify the Windows authentication scheme being used
        public static readonly string WindowsAuthenticationSchemeName = Microsoft.AspNetCore.Server.IISIntegration.IISDefaults.AuthenticationScheme;
    }

    /// <summary>
    /// Параметри на конфигурация за автентификация.
    /// </summary>
    public class AuthenticationOptions
    {
        public static readonly string UserSessionCookieName = "idsrv.user.session";
        public static readonly string EPZEUIsLoggedCookieName = "EPZEU_ISLOGGED";
        public static readonly string NRASchemeName = "nra";

        public bool EnableWindowsAuth { get; set; }

        public bool EnableUsrNamePwdAuth { get; set; }

        public bool EnableKEPAuth { get; set; }

        public bool EnableNRAAuth { get; set; }
    }

    public class EndpointOptions
    {
        public static readonly string RegisterAuthenticationEndpointAddress = "/connect/registerauthentication";
        public static readonly string AuthorizeCallbackEndpointAddress = "/connect/authorize/callback";
    }

    /// <summary>
    /// Констатни за ClaimTypes.
    /// </summary>
    public class ClaimTypesConstants
    {
        /// <summary>
        /// amr claim type for certificate
        /// </summary>
        public static readonly string AmrCertificate = "cert";
    }

    public class HeaderNamesConstants
    {
        public static readonly string ForwardedSiteBasePath = "X-Forwarded-SiteBasePath";
    }

    public class CustomGrantTypes
    {
        public const string Delegation = "delegation";
        public const string WeakDelegation = "weak_delegation";
    }
}
