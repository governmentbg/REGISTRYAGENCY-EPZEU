using EPZEU.Security;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Users;
using EPZEU.Users.Models;
using EPZEU.Web.IdentityServer.Common;
using EPZEU.Web.IdentityServer.Models;
using EPZEU.Web.IdentityServer.Security;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Configuration;
using IdentityServer4.Events;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace EPZEU.Web.IdentityServer.Controllers
{
    /// <summary>
    /// Контролер за работа с външни за системата нотификации.
    /// </summary>
    [SecurityHeaders]
    [AllowAnonymous]
    public class ExternalController : Controller
    {
        private readonly IIdentityServerInteractionService Interaction;
        private readonly IEventService Events;
        private readonly IUsersLoginService UsersLoginService;
        private readonly IHttpContextAccessor HttpContextAccessor;
        private readonly IStringLocalizer Localizer;
        private readonly ICookieManager CookieManager;
        private readonly ILogger Logger;
        private readonly IMessageStore<ErrorMessage> ErrorMessageStore;
        private readonly IdentityServerOptions IdsrvOptions;

        public ExternalController(
            IIdentityServerInteractionService interaction,
            IEventService events,
            IUsersLoginService usersService,
            IHttpContextAccessor httpContextAccessor,
            IStringLocalizer localizer,
            ICookieManager cookieManager,
            ILogger<ExternalController> logger,
            IMessageStore<ErrorMessage> errorMessageStore,
            IdentityServerOptions options)
        {
            Interaction = interaction;
            Events = events;
            UsersLoginService = usersService;
            HttpContextAccessor = httpContextAccessor;
            Localizer = localizer;
            CookieManager = cookieManager;
            Logger = logger;
            ErrorMessageStore = errorMessageStore;
            IdsrvOptions = options;
        }

        /// <summary>
        /// Операция за създаване на екран за съответния вид автентикация на потребителя.
        /// </summary>
        /// <param name="provider">Доставчик.</param>
        /// <param name="returnUrl">URL, на който да се върне потребителя.</param>
        [HttpGet]
        [ServiceLimiter(ServiceCode = "EP_LOGIN_LIMIT", DoNotStopRequestProcessing = true)]
        public async Task<IActionResult> Challenge(bool isLimited, string provider, string returnUrl, [FromServices] IOptions<AuthenticationOptions> providersOptions)
        {
            if(!isLimited)
            {
                if (string.IsNullOrEmpty(returnUrl)) returnUrl = "~/";

                if (Url.IsLocalUrl(returnUrl) == false && Interaction.IsValidReturnUrl(returnUrl) == false) throw new Exception("invalid return URL");

                // от external auth обработваме изрично само win auth
                if (AccountOptions.WindowsAuthenticationSchemeName == provider)
                {
                    if (!providersOptions.Value.EnableWindowsAuth)
                        throw new Exception("invalid authentication method");

                    return await ProcessWindowsLoginAsync(returnUrl);
                }
                else
                {
                    var props = new AuthenticationProperties
                    {
                        RedirectUri = Url.Action(nameof(Callback)),
                        Items =
                    {
                        { "returnUrl", returnUrl },
                        { "scheme", provider },
                    }
                    };

                    return Challenge(props, provider);
                }
            }
            else
            {
                ErrorViewModel model = new ErrorViewModel() { IsWarning = true, Error = new ErrorMessage() { Error = Localizer["GL_TOO_MANY_REQUESTS_E"], RedirectUri = returnUrl } };
                return View("Error", model);
            }
        }

        /// <summary>
        /// Операция за автентикация и пренасочване към адреса, подаден при заявката за автентикация.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Callback()
        {
            (string returnUrl, IActionResult actionResult) = await ExternalCallback(IdentityServerConstants.ExternalCookieAuthenticationScheme, WinAuthentication, null, WinAuthenticationPostSignin);

            return actionResult ?? Redirect(returnUrl);
        }

        [HttpGet]
        public async Task<IActionResult> NRACallback([FromServices] IOptions<AuthenticationOptions> providersOptions)
        {
            if (!providersOptions.Value.EnableNRAAuth)
                throw new Exception("invalid authentication method");

            (string returnUrl, IActionResult actionResult) = await ExternalCallback(AuthenticationOptions.NRASchemeName, NRAAuthentication, NRAProvisionAuthentication, null);

            return actionResult ?? Redirect(returnUrl);
        }

        /// <summary>
        /// Helper метод за унификация на callback от различни провайдъри.
        /// Връща конкретен returnUrl за пренасочване или actionResult, който да бъде изпълнен от контролера.
        /// </summary>
        private async Task<(string, IActionResult)> ExternalCallback(
            string externalScheme,
            Func<AuthenticateResult, Task<(AuthenticationResult, string, IActionResult)>> concreteAuth,
            Func<AuthenticateResult, Task<(string, IActionResult)>> provisionUserAuthentication = null,
            Func<AuthenticateResult, Task> postSigninAction = null)
        {
            var result = await HttpContext.AuthenticateAsync(externalScheme);

            #region Hanlde protocol athentication error
            if (result?.Succeeded != true)
            {
                string failureMessage = result.Failure?.Message;

                if (!string.IsNullOrEmpty(failureMessage))
                {
                    var errorId = await CreateErrorAsync(failureMessage, null);
                    return (null, RedirectToAction("Login", "Account", new { errorId }));
                }
                throw new Exception("External authentication error");
            }
            #endregion

            string returnUrl = null;

            var (authRes, providerUserId, customActionResult) = await concreteAuth(result);

            if (authRes.IsSuccess)
            {
                // зареждане на допълнителни claims
                var additionalLocalClaims = new List<Claim>();
                var localSignInProps = new AuthenticationProperties();
                ProcessLoginCallbackForOidc(result, additionalLocalClaims, localSignInProps);

                additionalLocalClaims.AddRange(authRes.User.GetClaims());

                if (!string.IsNullOrEmpty(authRes.LoginSessionID))
                    additionalLocalClaims.Add(new Claim(EPZEUClaimTypes.LoginSessionID, authRes.LoginSessionID));

                additionalLocalClaims.Add(new Claim(EPZEUClaimTypes.UserIdentifiable, bool.TrueString));

                string name = additionalLocalClaims.GetName();
                string subject = ClaimsHelper.BuildSubClaimValueForCIN(additionalLocalClaims.GetCIN().Value);
                string provider = result.Properties.Items["scheme"];

                await Events.RaiseAsync(new UserLoginSuccessEvent(provider, providerUserId, subject, name));

                // издаване на authentication cookie                               
                await HttpContext.SignInAsync(subject, name, provider, localSignInProps, additionalLocalClaims.ToArray());

                // издаваме is_logged cookie
                CookieManager.EnsureIsLoggedCookie();

                if (postSigninAction != null)
                {
                    await postSigninAction(result);
                }
            }
            else
            {
                if (result.IsRegisteringAuthentication())
                {
                    if (provisionUserAuthentication != null)
                    {
                        (returnUrl, customActionResult) = await provisionUserAuthentication(result);
                    }
                }
                else
                {
                    Logger.LogInformation($"Unsuccesfull external login attempt for {externalScheme} scheme. Userlocked: {authRes.UserLocked}, InvalidUsernamePassword: {authRes.InvalidUsernamePassword}.");
                }
            }

            returnUrl = returnUrl ?? result.Properties.Items["returnUrl"] ?? "~/";

            return (returnUrl, customActionResult);
        }

        /// <summary>
        /// Операция за windows-ка автентикация.
        /// </summary>
        /// <param name="returnUrl">URL, на който да се върне потребителя.</param>
        private async Task<IActionResult> ProcessWindowsLoginAsync(string returnUrl)
        {
            // проверка дали вече потребителя не е направил win auth
            var result = await HttpContext.AuthenticateAsync(AccountOptions.WindowsAuthenticationSchemeName);
            if (result?.Principal?.Identity is WindowsIdentity wi)
            {
                // издаване на временно ExternalCookie за да може да продължим процеса по вход с win auth на Callback адрес-а
                var props = new AuthenticationProperties()
                {
                    RedirectUri = Url.Action("Callback"),
                    Items =
                    {
                        { "returnUrl", returnUrl },
                        { "scheme", AccountOptions.WindowsAuthenticationSchemeName },
                    }
                };

                var id = new ClaimsIdentity(AccountOptions.WindowsAuthenticationSchemeName);
                id.AddClaim(new Claim(JwtClaimTypes.Subject, wi.Name));
                id.AddClaim(new Claim(JwtClaimTypes.Name, wi.Name));

                await HttpContext.SignInAsync(
                    IdentityServer4.IdentityServerConstants.ExternalCookieAuthenticationScheme,
                    new ClaimsPrincipal(id),
                    props);
                return Redirect(props.RedirectUri);
            }
            else
            {
                ViewData["returnUrl"] = returnUrl;

                // задействане на win auth!
                return new ChallengeResultWithHtmlContent(AccountOptions.WindowsAuthenticationSchemeName, this, "Unauthorized");
            }
        }

        /// <summary>
        /// изчитане на данни за потребител за Windows Auth
        /// </summary>
        private async Task<(AuthenticationResult, string, IActionResult)> WinAuthentication(AuthenticateResult authenticateResult)
        {
            var userIdClaim = authenticateResult.Principal?.FindFirst(JwtClaimTypes.Subject) ??
                              authenticateResult.Principal?.FindFirst(ClaimTypes.NameIdentifier) ??
                              throw new Exception("Unknown userid");

            var userExternalIdentifier = userIdClaim.Value;

            var authRes = await UsersLoginService.AuthenticateWindowsAsync(userExternalIdentifier, HttpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString());
            
            IActionResult customActionResult = null;
            if (!authRes.IsSuccess)
            {
                var errorId = await CreateErrorAsync(Localizer["EP_USR_00012_I"], null);
                customActionResult = RedirectToAction("Login", "Account", new { errorId, returnUrl = authenticateResult.Properties.Items["returnUrl"] });
            }

            return (authRes, userExternalIdentifier, customActionResult);
        }

        private Task WinAuthenticationPostSignin(AuthenticateResult authenticateResult) =>
            HttpContext.SignOutAsync(IdentityServer4.IdentityServerConstants.ExternalCookieAuthenticationScheme);

        /// <summary>
        /// изчитане на данни за потребител за НАП Auth
        /// </summary>
        private async Task<(AuthenticationResult, string, IActionResult)> NRAAuthentication(AuthenticateResult authenticateResult)
        {
            var userIdClaim = authenticateResult.Principal?.FindFirst(JwtClaimTypes.Id) ?? throw new Exception("Unknown userid");

            var userExternalIdentifier = userIdClaim.Value;

            var authRes = await UsersLoginService.AuthenticateNRAAsync(userExternalIdentifier, HttpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString());

            IActionResult customActionResult = null;
            if (!authRes.IsSuccess)
            {
                bool skipError = authenticateResult.IsRegisteringAuthentication();

                if (!skipError)
                {
                    var errorId = await CreateErrorAsync(Localizer["EP_USR_000011_E"], null);
                    customActionResult = RedirectToAction("Login", "Account", new { errorId, returnUrl = authenticateResult.Properties.Items["returnUrl"] });
                }                
            }

            return (authRes, userExternalIdentifier, customActionResult);
        }

        private async Task<(string, IActionResult)> NRAProvisionAuthentication(AuthenticateResult authenticateResult)
        {
            var identifierClaim = authenticateResult.Principal.FindFirst(c => c.Type == JwtClaimTypes.Id);
            var currentUserId = int.Parse(HttpContext.EPZEUUser().ClientID);

            if (identifierClaim == null)
                throw new InvalidOperationException();

            var userAuthentication = new UserAuthentication
            {
                AuthenticationType = Users.Models.AuthenticationTypes.NRA,
                UserID = currentUserId,
                Username = identifierClaim.Value
            };

            var res = await UsersLoginService.RegisterUserAuthentication(userAuthentication);

            string returnUrl = null;
            if (!res.IsSuccessfullyCompleted)
            {
                returnUrl = await CreateErrorAndGetErrorUrl(Localizer["EP_USR_000012_E"], authenticateResult.Properties.Items["returnUrl"]);
            }

            return (returnUrl, null);
        }

        /// <summary>
        /// Допълнителна обработка на Резултат от автентикацията на потребител в външен доставчик
        /// </summary>
        /// <param name="externalResult">Резултат от автентикацията на потребител в външен доставчик.</param>
        /// <param name="localClaims">Локални права.</param>
        /// <param name="localSignInProps">Данни за автентикацията.</param>
        private void ProcessLoginCallbackForOidc(AuthenticateResult externalResult, List<Claim> localClaims, AuthenticationProperties localSignInProps)
        {
            // персистване на значими външни claims, ако са налични
            var sid = externalResult.Principal.Claims.FirstOrDefault(x => x.Type == JwtClaimTypes.SessionId);
            if (sid != null)
            {
                localClaims.Add(new Claim(JwtClaimTypes.SessionId, sid.Value));
            }

            // ако има външен id_token, се запазва
            var id_token = externalResult.Properties.GetTokenValue("id_token");
            if (id_token != null)
            {
                localSignInProps.StoreTokens(new[] { new AuthenticationToken { Name = "id_token", Value = id_token } });
            }
        }

        private async Task<string> CreateErrorAndGetErrorUrl(string errorMessage, string redirectUri)
        {
            var id = await CreateErrorAsync(errorMessage, redirectUri);

            return $"~{IdsrvOptions.UserInteraction.ErrorUrl}?{IdsrvOptions.UserInteraction.ErrorIdParameter}={id}";
        }

        private async Task<string> CreateErrorAsync(string errorMessage, string redirectUri)
        {
            var errorModel = new ErrorMessage
            {
                Error = errorMessage,
                RedirectUri = redirectUri
            };

            var message = new Message<ErrorMessage>(errorModel, DateTime.UtcNow);
            return await ErrorMessageStore.WriteAsync(message);
        }
    }      
}
