using EPZEU.Security;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Users;
using EPZEU.Users.Models;
using EPZEU.Web.IdentityServer.Common;
using EPZEU.Web.IdentityServer.Extensions;
using EPZEU.Web.IdentityServer.Models;
using EPZEU.Web.IdentityServer.Security;
using IdentityModel;
using IdentityServer4.Configuration;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.IdentityServer.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление на акаунти.
    /// </summary>
    [SecurityHeaders]
    public class AccountController : Controller
    {
        private readonly IIdentityServerInteractionService Interaction;
        private readonly IAuthenticationSchemeProvider SchemeProvider;
        private readonly IEventService Events;
        private readonly IUsersLoginService UsersLoginService;
        private readonly IHttpContextAccessor HttpContextAccessor;
        private readonly IStringLocalizer Localizer;
        private readonly ICookieManager CookieManager;
        private readonly IdentityServerOptions Options;
        private readonly UsersOptions UserOptions;
        private readonly IMessageStore<ErrorMessage> ErrorMessageStore;
        private readonly IOptions<AuthenticationOptions> ProvidersOptions;

        public AccountController(
            IIdentityServerInteractionService interaction,
            IAuthenticationSchemeProvider schemeProvider,
            IEventService events,
            IUsersLoginService usersLoginService,
            IHttpContextAccessor httpContextAccessor,
            IStringLocalizer localizer,
            ICookieManager cookieManager,
            IdentityServerOptions options,
            IOptionsMonitor<UsersOptions> userOptions,
            IMessageStore<ErrorMessage> errorMessageStore,
            IOptions<AuthenticationOptions> providersOptions)
        {
            UsersLoginService = usersLoginService;
            Interaction = interaction;
            SchemeProvider = schemeProvider;
            Events = events;
            HttpContextAccessor = httpContextAccessor;
            Localizer = localizer;
            CookieManager = cookieManager;
            Options = options;
            UserOptions = userOptions.CurrentValue;
            ErrorMessageStore = errorMessageStore;
            ProvidersOptions = providersOptions;
        }

        /// <summary>
        /// Операция за влизане в системата.
        /// </summary>
        /// <param name="returnUrl">Url, на който да се върне потребителят.</param>
        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl, string errorID)
        {
            // ако idsrv е конфигурариран само за Windows Auth пренасочваме директно към Challenge
            // но само ако няма грешка преди това
            if (ProvidersOptions.Value.EnableWindowsAuth
                && string.IsNullOrEmpty(errorID)
                && !ProvidersOptions.Value.EnableUsrNamePwdAuth
                && !ProvidersOptions.Value.EnableKEPAuth
                && !ProvidersOptions.Value.EnableNRAAuth)
            {
                var winScheme = await GetWindowsAuthSchemeIfEnabled();

                if (winScheme == null)
                    throw new InvalidProgramException("Windows authentication scheme not enabled!");

                return RedirectToAction("Challenge", "External", new { returnUrl, provider = winScheme.Name });
            }

            var vm = await BuildLoginViewModelAsync(returnUrl);

            if (!string.IsNullOrEmpty(errorID))
            {
                var error = await Interaction.GetErrorContextAsync(errorID);
                if (!string.IsNullOrEmpty(error.Error))
                {
                    ModelState.AddModelError("", error.Error);
                }
            }

            ViewData["Title"] = Localizer["GL_ENTRANCE_L"];
            return View(vm);
        }

        /// <summary>
        /// Операция за влизане в системата с КЕП.
        /// </summary>
        /// <param name="returnUrl">Url, на който да се върне потребителят.</param>
        [HttpGet]
        [ServiceLimiter(ServiceCode = "EP_LOGIN_LIMIT", DoNotStopRequestProcessing = true)]
        public async Task<IActionResult> LoginKEP(bool isLimited, string returnUrl, [FromServices] IStringLocalizer localizer, CancellationToken cancellationToken)
        {
            if (!ProvidersOptions.Value.EnableKEPAuth)
                throw new Exception("invalid authentication method");

            bool allowResendProfileRegistrationMail = false;

            if (!isLimited)
            {
                var clientCertificate = HttpContext.Connection.ClientCertificate;

                if (clientCertificate == null)
                {
                    ViewData["showNotFoundKepInformation"] = true;
                    ViewData["returnUrl"] = returnUrl;
                    ViewData["message"] = string.Join(" ", Localizer["EP_USR_00015_E"].Value, Localizer["EP_USR_LOGIN_OTHER_KEP_I"].Value);
                    //return View("Information");
                    //ModelState.AddModelError("", string.Join(" ", Localizer["EP_USR_00015_E"].Value, Localizer["EP_USR_LOGIN_OTHER_KEP_I"].Value));
                }
                else
                {
                    var authResult = await UsersLoginService.AuthenticateCertificateAsync(clientCertificate, HttpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString(), cancellationToken);

                    if (authResult.IsSuccess)
                    {
                        List<Claim> claims = new List<Claim>();
                        claims.AddRange(authResult.User.GetClaims());
                        claims.Add(new Claim(JwtClaimTypes.AuthenticationMethod, ClaimTypesConstants.AmrCertificate));
                        claims.Add(new Claim(EPZEUClaimTypes.UserIdentifiable, bool.TrueString));

                        if (!string.IsNullOrEmpty(authResult.LoginSessionID))
                        {
                            claims.Add(new Claim(EPZEUClaimTypes.LoginSessionID, authResult.LoginSessionID));
                        }

                        string name = claims.GetName();
                        string subject = ClaimsHelper.BuildSubClaimValueForCIN(claims.GetCIN().Value);

                        await HttpContext.SignInAsync(subject, name, properties: null, claims: claims.ToArray());

                        CookieManager.EnsureIsLoggedCookie();

                        await Events.RaiseAsync(new UserLoginSuccessEvent(name, subject, name));

                        if (Interaction.IsValidReturnUrl(returnUrl) || Url.IsLocalUrl(returnUrl))
                        {
                            return Redirect(returnUrl);
                        }

                        return Redirect("~/");
                    }

                    if (authResult.User != null)
                        await Events.RaiseAsync(new UserLoginFailureEvent(authResult.User.GetClaims().GetName(), "invalid credentials"));

                    if (authResult.UserLocked)
                        ModelState.AddModelError("", Localizer["EP_USR_00013_E"]);
                    else if (authResult.CertificateNotEnabled)
                        ModelState.AddModelError("", localizer["EP_USR_00009_E"]);
                    else if (authResult.CertificateWasRenewed)
                        ModelState.AddModelError("", localizer["EP_USR_00014_E"]);
                    else if (authResult.UserDeactivated)
                        ModelState.AddModelError("", localizer["EP_USR_00016_E"]);
                    else if (authResult.NotConfirmedAccount)
                        allowResendProfileRegistrationMail = true;
                }
            }
            else
            {
                ModelState.AddModelError("", Localizer["GL_TOO_MANY_REQUESTS_E"]);
            }

            var vm = await BuildLoginViewModelAsync(returnUrl, allowResendProfileRegistrationMail);
            return View("Login", vm);
        }

        /// <summary>
        /// Операция за влизане в системата.
        /// </summary>
        /// <param name="model">Модел с данни за вход.</param>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ServiceLimiter(ServiceCode = "EP_LOGIN_LIMIT", DoNotStopRequestProcessing = true)]
        public async Task<IActionResult> Login(bool isLimited, LoginInputModel model, [FromServices] IStringLocalizer localizer)
        {
            if (!ProvidersOptions.Value.EnableUsrNamePwdAuth)
                throw new Exception("invalid authentication method");

            bool allowResendProfileRegistrationMail = false;

            if(!isLimited)
            {
                if (ModelState.IsValid)
                {
                    var usernamePrepared = model.Username.Trim();

                    var authResult = await UsersLoginService.AuthenticateAsync(usernamePrepared, model.Password, HttpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString());

                    if (authResult.IsSuccess)
                    {
                        #region Authentication Success

                        var user = authResult.User;

                        List<Claim> claims = new List<Claim>();
                        claims.AddRange(user.GetClaims());

                        if (!string.IsNullOrEmpty(authResult.LoginSessionID))
                        {
                            claims.Add(new Claim(EPZEUClaimTypes.LoginSessionID, authResult.LoginSessionID));
                        }

                        string name = claims.GetName();
                        string subject = ClaimsHelper.BuildSubClaimValueForCIN(claims.GetCIN().Value);

                        if (claims.Any())
                        {
                            await HttpContext.SignInAsync(subject, name, properties: null, claims: claims.ToArray());
                        }
                        else
                        {
                            await HttpContext.SignInAsync(subject, name, properties: null);
                        }

                        CookieManager.EnsureIsLoggedCookie();

                        await Events.RaiseAsync(new UserLoginSuccessEvent(model.Username, subject, name));

                        // само ако е валиден returnUrl пренасочва към authorize endpoint
                        if (Interaction.IsValidReturnUrl(model.ReturnUrl) || Url.IsLocalUrl(model.ReturnUrl))
                        {
                            return Redirect(model.ReturnUrl);
                        }

                        return Redirect("~/");

                        #endregion
                    }

                    await Events.RaiseAsync(new UserLoginFailureEvent(model.Username, "invalid credentials"));

                    if (authResult.InvalidUsernamePassword)
                    {
                        string textPrepared = null;

                        if (authResult.UserWasLocked)
                        {
                            textPrepared = System.Text.RegularExpressions.Regex.Replace(Localizer["EP_USR_00019_I"], "<(.*)>", UserOptions.EP_USR_LOCK_FOR_PERIOD.GetTimeTextPresentation());
                        }
                        else
                        {
                            textPrepared = Localizer["GL_INVALID_EMAIL_PASS_E"];
                        }

                        ModelState.AddModelError("", textPrepared);
                    }
                    else if (authResult.UserLocked)
                        ModelState.AddModelError("", Localizer["EP_USR_00013_E"]);
                    else if (authResult.UserDeactivated)
                        ModelState.AddModelError("", localizer["EP_USR_00016_E"]);
                    else if (authResult.NotConfirmedAccount)
                        allowResendProfileRegistrationMail = true;
                }
                else
                {
                    if (string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
                    {
                        ModelState.ClearValidationState("Username");
                        ModelState.ClearValidationState("Password");
                        ModelState.AddModelError("", Localizer["GL_INVALID_EMAIL_PASS_E"]);
                    }
                }
            }
            else
            {
                ModelState.AddModelError("", Localizer["GL_TOO_MANY_REQUESTS_E"]);
            }

            var vm = await BuildLoginViewModelAsync(model, allowResendProfileRegistrationMail);
            return View(vm);
        }

        /// <summary>
        /// Отказ от вход в системата.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CancelLogin(LoginInputModel model)
        {
            if (!ProvidersOptions.Value.EnableUsrNamePwdAuth)
                throw new Exception("invalid authentication method");

            var context = await Interaction.GetAuthorizationContextAsync(model.ReturnUrl);
            if (context != null)
            {
                await Interaction.GrantConsentAsync(context, ConsentResponse.Denied);

                return Redirect(model.ReturnUrl);
            }
            else
            {
                return Redirect("~/");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResendRegMail(LoginInputModel model, [FromServices] IStringLocalizer localizer)
        {
            if (!ProvidersOptions.Value.EnableUsrNamePwdAuth)
                throw new Exception("invalid authentication method");

            var resendResult = await UsersLoginService.ResendConfirmationEmailAsync(model.Username);
            ModelState.Clear();

            var vmresend = await BuildLoginViewModelAsync(model);

            if (!resendResult.IsSuccessfullyCompleted)
            {
                ModelState.AddModelError("", localizer["EP_USR_00016_I"]);
            }
            else
            {
                vmresend.SuccessMessage = localizer["GL_SEND_OK_I"];
            }

            return View("Login", vmresend);
        }

        /// <summary>
        /// Операция за излизане от системата.
        /// </summary>
        /// <param name="logoutId">Идентификатор за излизане от системата.</param>
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            var vm = await BuildLogoutViewModelAsync(logoutId);

            if (vm.ShowLogoutPrompt == false)
            {
                return await Logout(vm);
            }

            return View(vm);
        }

        /// <summary>
        /// Операция за излизане от системата.
        /// </summary>
        /// <param name="model">Модел, съдържащ данни за излизане от системата.</param>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(LogoutInputModel model)
        {
            var vm = await BuildLoggedOutViewModelAsync(model.LogoutId);

            if (User?.Identity.IsAuthenticated == true)
            {
                // изтриваме локалното cookie
                await HttpContext.SignOutAsync();

                // изтриваме is_logged cookie
                CookieManager.RemoveIsLoggedCookie();

                // приключваме локалната логин сесия
                await UsersLoginService.LogoutCurrentLoginSessionAsync();

                // raise event
                await Events.RaiseAsync(new UserLogoutSuccessEvent(User.Claims.GetSubject(), User.Claims.GetName()));
            }

            // проверка за external signout
            if (vm.TriggerExternalSignout)
            {
                string url = Url.Action("Logout", new { logoutId = vm.LogoutId });

                return SignOut(new AuthenticationProperties { RedirectUri = url }, vm.ExternalAuthenticationScheme);
            }

            return View("Logout", vm);
        }

        private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl, bool allowResendProfileRegistrationMail = false)
        {
            var context = await Interaction.GetAuthorizationContextAsync(returnUrl);
            if (context?.IdP != null)
            {
                // показване на external IdP
                return new LoginViewModel
                {
                    ReturnUrl = returnUrl,
                    Username = context?.LoginHint,
                    ExternalProviders = new ExternalProvider[] { new ExternalProvider { AuthenticationScheme = context.IdP } },
                    EnableWindowsAuth = ProvidersOptions.Value.EnableWindowsAuth,
                    EnableUsrNamePwdAuth = ProvidersOptions.Value.EnableUsrNamePwdAuth,
                    EnableKEPAuth = ProvidersOptions.Value.EnableKEPAuth,
                    EnableNRAAuth = ProvidersOptions.Value.EnableNRAAuth
                };
            }

            var schemes = await SchemeProvider.GetAllSchemesAsync();
            var winScheme = schemes.SingleOrDefault(s => s.Name.Equals(AccountOptions.WindowsAuthenticationSchemeName, StringComparison.OrdinalIgnoreCase));
            var nraScheme = schemes.SingleOrDefault(s => s.Name.Equals(AuthenticationOptions.NRASchemeName, StringComparison.OrdinalIgnoreCase));

            ExternalProvider winProvider = null, nraProvider = null;

            if (winScheme != null)
            {
                winProvider = new ExternalProvider
                {
                    DisplayName = winScheme.DisplayName,
                    AuthenticationScheme = winScheme.Name
                };
            }

            if (nraScheme != null)
            {
                nraProvider = new ExternalProvider
                {
                    DisplayName = nraScheme.DisplayName,
                    AuthenticationScheme = nraScheme.Name
                };
            }

            return new LoginViewModel
            {
                ReturnUrl = returnUrl,
                Username = context?.LoginHint,
                WindowsProvider = winProvider,
                NRAProvider = nraProvider,
                AllowResendProfileRegistrationMail = allowResendProfileRegistrationMail,
                EnableWindowsAuth = ProvidersOptions.Value.EnableWindowsAuth,
                EnableUsrNamePwdAuth = ProvidersOptions.Value.EnableUsrNamePwdAuth,
                EnableKEPAuth = ProvidersOptions.Value.EnableKEPAuth,
                EnableNRAAuth = ProvidersOptions.Value.EnableNRAAuth
            };
        }

        private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginInputModel model, bool allowResendProfileRegistrationMail = false)
        {
            var vm = await BuildLoginViewModelAsync(model.ReturnUrl, allowResendProfileRegistrationMail);
            vm.Username = model.Username;
            return vm;
        }

        private async Task<LogoutViewModel> BuildLogoutViewModelAsync(string logoutId)
        {
            var vm = new LogoutViewModel { LogoutId = logoutId, ShowLogoutPrompt = AccountOptions.ShowLogoutPrompt };

            if (User?.Identity.IsAuthenticated != true)
            {
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            var context = await Interaction.GetLogoutContextAsync(logoutId);
            if (context?.ShowSignoutPrompt == false)
            {
                // automatically sign-out
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            // show the logout prompt
            return vm;
        }

        private async Task<LoggedOutViewModel> BuildLoggedOutViewModelAsync(string logoutId)
        {
            // get context information
            var logout = await Interaction.GetLogoutContextAsync(logoutId);
            string gotoLoginUrl = GetLoginRequestForPostLogoutRedirect(logout);

            var vm = new LoggedOutViewModel
            {
                PostLogoutRedirectUri = gotoLoginUrl ?? logout?.PostLogoutRedirectUri,
                ClientName = string.IsNullOrEmpty(logout?.ClientName) ? logout?.ClientId : logout?.ClientName,
                SignOutIframeUrl = logout?.SignOutIFrameUrl,
                LogoutId = logoutId,
                PostLogoutAutoRedirect = ShoulAutoPostlogoutRedirectFromRequest(logout)
            };

            if (User?.Identity.GetAuthenticationMethods().SingleOrDefault(c => c.Type == JwtClaimTypes.AuthenticationMethod && c.Value == ClaimTypesConstants.AmrCertificate) != null)
            {
                vm.NotifyUserForWindowCloseText = Localizer["EP_USR_LOGIN_OTHER_KEP_I"];
            }
            else if (User?.Identity.GetAuthenticationMethods().SingleOrDefault(c => c.Type == JwtClaimTypes.AuthenticationMethod && c.Value == "external") != null &&
                User?.Identity.GetIdentityProvider() == "Windows")
            {
                vm.NotifyUserForWindowCloseText = Localizer["EP_USR_LOGIN_INFO_I"];
            }

            if (User?.Identity.IsAuthenticated == true)
            {
                var idp = User.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;
                if (idp != null && idp != IdentityServer4.IdentityServerConstants.LocalIdentityProvider)
                {
                    var providerSupportsSignout = await HttpContext.GetSchemeSupportsSignOutAsync(idp);
                    if (providerSupportsSignout)
                    {
                        if (vm.LogoutId == null)
                        {
                            // ако няма, създаваме logout context за external IdP
                            vm.LogoutId = await Interaction.CreateLogoutContextAsync();
                        }

                        vm.ExternalAuthenticationScheme = idp;
                    }
                }
            }
            return vm;
        }

        private async Task<AuthenticationScheme> GetWindowsAuthSchemeIfEnabled() =>
            (await SchemeProvider.GetAllSchemesAsync()).Where(s => s.Name.Equals(AccountOptions.WindowsAuthenticationSchemeName, StringComparison.OrdinalIgnoreCase)).SingleOrDefault();

        /// <summary>
        /// Ако в заявката за logout има параметри за автоматичен вход след това, се конструира адрес за редирект към логин-а
        /// </summary>
        private string GetLoginRequestForPostLogoutRedirect(LogoutRequest logout)
        {
            string clientId = logout.Parameters?["signinstate_client_id"];
            string redirect_uri = logout.Parameters?["signinstate_redirect_uri"];
            string state = logout.Parameters?["signinstate_state"];
            string nonce = logout.Parameters?["signinstate_nonce"];
            string response_type = logout.Parameters?["signinstate_response_type"];
            string scope = logout.Parameters?["signinstate_scope"];

            // all parameters are required to build post login redirect
            if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(redirect_uri) || string.IsNullOrEmpty(state) || string.IsNullOrEmpty(nonce) ||
                string.IsNullOrEmpty(response_type) || string.IsNullOrEmpty(scope))
                return null;

            // build callback url
            string returnUrlParam = HttpContext.GetIdentityServerBasePath() + EndpointOptions.AuthorizeCallbackEndpointAddress;

            returnUrlParam = returnUrlParam
                .AddQueryString("client_id", clientId)
                .AddQueryString("redirect_uri", redirect_uri)
                .AddQueryString("response_type", response_type)
                .AddQueryString("scope", scope)
                .AddQueryString("state", state)
                .AddQueryString("nonce", nonce);

            return $"{Url.Action("Login")}?{Options.UserInteraction.LoginReturnUrlParameter}={UrlEncoder.Default.Encode(returnUrlParam)}";
        }

        private bool ShoulAutoPostlogoutRedirectFromRequest(LogoutRequest logout)
        {
            var postlogoutredirectParam = logout.Parameters?["postlogoutregirect"];

            return !string.IsNullOrEmpty(postlogoutredirectParam) && string.Compare(postlogoutredirectParam, bool.TrueString, true) == 0;
        }

        private async Task<string> CreateErrorAsync(string errorMessage)
        {
            var errorModel = new ErrorMessage
            {
                Error = errorMessage
            };

            var message = new Message<ErrorMessage>(errorModel, DateTime.UtcNow);
            return await ErrorMessageStore.WriteAsync(message);
        }
    }
}
