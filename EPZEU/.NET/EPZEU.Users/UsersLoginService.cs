using CNSys;
using CNSys.Data;
using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.CMS;
using EPZEU.Common;
using EPZEU.Common.Cache;
using EPZEU.Emails;
using EPZEU.Emails.Models;
using EPZEU.Security;
using EPZEU.Users.Models;
using EPZEU.Users.Repositories;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users
{
    /// <summary>
    /// Интерфейс за вход/изход на потребител с различни методи.
    /// </summary>
    public interface IUsersLoginService
    {
        /// <summary>
        /// Автентикиране.
        /// </summary>
        /// <param name="email">Имейл.</param>
        /// <param name="password">Парола.</param>
        /// <param name="ipAddress">IP адрес.</param>
        /// <returns>Резултат от опит за автентификация на потребител.</returns>
        Task<AuthenticationResult> AuthenticateAsync(string email, string password, string ipAddress);

        /// <summary>
        /// Автентикиране, чрез windows-автентикация.
        /// </summary>
        /// <param name="username">Потребителско име.</param>
        /// <returns>Резултат от опит за автентификация на потребител.</returns>
        Task<AuthenticationResult> AuthenticateWindowsWeakAsync(string username);

        /// <summary>
        /// Автентикиране, чрез windows-автентикация.
        /// </summary>
        /// <param name="username">Потребителско име.</param>
        /// <param name="ipAddress">IP адрес.</param>
        /// <returns>Резултат от опит за автентификация на потребител.</returns>
        Task<AuthenticationResult> AuthenticateWindowsAsync(string username, string ipAddress);

        /// <summary>
        /// Автентикиране чрез КЕП.
        /// </summary>
        /// <param name="clientCertificate">Клиентски сертификат</param>
        /// <param name="ipAddress">IP адрес</param>
        /// <returns></returns>
        Task<AuthenticationResult> AuthenticateCertificateAsync(X509Certificate2 clientCertificate, string ipAddress, CancellationToken cancellationToken);

        /// <summary>
        /// Автентикиране чрез ПИК на НАП.
        /// </summary>
        /// <param name="identifier">идентификатор от НАП</param>
        /// <param name="ipAddress"></param>
        /// <returns></returns>
        Task<AuthenticationResult> AuthenticateNRAAsync(string identifier, string ipAddress);

        /// <summary>
        /// Разлогване на текущата логин сесия.
        /// </summary>
        /// <returns></returns>
        Task LogoutCurrentLoginSessionAsync();

        /// <summary>
        /// Автентикиране чрез начин ResouceOwner.
        /// </summary>
        /// <param name="username">Потребителско име.</param>
        /// <param name="password">Парола.</param>
        /// <param name="ipAddress">IP адрес.</param>
        /// <returns>Резултат от опит за автентификация на потребител.</returns>
        Task<AuthenticationResult> AuthenticateResouceOwnerAuthenticationAsync(string username, string password, string ipAddress);

        /// <summary>
        /// Повторно изпращане на съобщение за регистрация на електронна поща за непотвърдени профили.
        /// </summary>
        /// <param name="email"></param>
        Task<OperationResult> ResendConfirmationEmailAsync(string email);

        Task<OperationResult> RegisterUserAuthentication(UserAuthentication userAuthentication);
    };

    /// <summary>
    /// Съдържа константи за видове UserOperationActions.
    /// </summary>
    public static class UserOperationActions
    {
        public static readonly string Login = "Login";
    }

    /// <summary>
    /// Имплементация на IUsersLoginService за вход/изход на потребител с различни методи.
    /// </summary>
    public class UsersLoginService : IUsersLoginService
    {
        private readonly UsersOptions _usersOptions;

        public UsersLoginService(IUsersRepository usersRepository,
            IPasswordValidationService passwordValidationService,
            IAuditServiceClient auditServiceClient,
            IOptionsSnapshot<UsersOptions> usersOptionsAccessor,
            IEPZEUUserAccessor epzeuUserAccessor,
            IEmailNotificationServiceClient emailClient,
            IStaticPages staticPages,
            IAppParameters appParameters,
            IUsersAuthenticationRepository usersAuthenticationRepository,
            IUserLoginSessionRepository userLoginSessionRepository,
            IUsersProcessesRepository usersProcessesRepository,
            IUserLoginAttemptRepository userLoginAttemptRepository,
            IDbContextOperationExecutor dbContextOperationExecutor,
            IStringLocalizer localizer,
            ICertificateRepository certificateRepository,
            IIdempotentOperationExecutor idempotentOperationExecutor)
        {
            UsersRepository = usersRepository;
            PasswordValidationService = passwordValidationService;
            AuditServiceClient = auditServiceClient;
            EPZEUUserAccessor = epzeuUserAccessor;
            EmailClient = emailClient;
            StaticPages = staticPages;
            AppParameters = appParameters;

            _usersOptions = usersOptionsAccessor.Value;
            UsersAuthenticationRepository = usersAuthenticationRepository;
            UserLoginSessionRepository = userLoginSessionRepository;
            UsersProcessesRepository = usersProcessesRepository;
            UserLoginAttemptRepository = userLoginAttemptRepository;
            DbContextOperationExecutor = dbContextOperationExecutor;
            Localizer = localizer;
            CertificateRepository = certificateRepository;
            OperationExecutor = idempotentOperationExecutor;
        }

        #region Properties

        private IUsersRepository UsersRepository { get; set; }
        private IPasswordValidationService PasswordValidationService { get; set; }
        private IAuditServiceClient AuditServiceClient { get; set; }
        private IEPZEUUserAccessor EPZEUUserAccessor { get; set; }
        private IEmailNotificationServiceClient EmailClient { get; set; }
        private IStaticPages StaticPages { get; set; }
        private IAppParameters AppParameters { get; set; }
        private IUsersAuthenticationRepository UsersAuthenticationRepository { get; set; }

        private IUserLoginSessionRepository UserLoginSessionRepository { get; set; }
        private IUsersProcessesRepository UsersProcessesRepository { get; set; }
        private IUserLoginAttemptRepository UserLoginAttemptRepository { get; set; }
        private IDbContextOperationExecutor DbContextOperationExecutor { get; set; }
        private readonly IStringLocalizer Localizer;
        private readonly ICertificateRepository CertificateRepository;
        private readonly IIdempotentOperationExecutor OperationExecutor;

        #endregion

        public Task<AuthenticationResult> AuthenticateAsync(string email, string password, string ipAddress)
        {
            return AuthenticateWindowsInternal(email, password, ipAddress, AuthenticationTypes.UsernamePassword, AuthenticateUsernamePasswordInternal);
        }

        public async Task<AuthenticationResult> AuthenticateCertificateAsync(X509Certificate2 clientCertificate, string ipAddress, CancellationToken cancellationToken)
        {
            return await AuthenticateWindowsInternal(clientCertificate.SerialNumber, null, ipAddress, AuthenticationTypes.Certificate,
                async (id, pass) =>
                {
                    int? certificateID = null;
                    bool lockedCredentials = false, notConfirmedAccount = false, certificateNotEnabled = false, certificateWasRenewed = false;
                    string certHash = clientCertificate.Thumbprint.ToLower(); //ползваме хеш на целия сертификат със sha1
                    var userAuthentication = (await UsersAuthenticationRepository
                       .SearchAsync(new UserAuthenticationSearchCriteria()
                       {
                           CertificateHash = certHash
                       }, cancellationToken)).SingleOrDefault(ua => ua.IsActive);

                    User userFound = userAuthentication != null ? (await UsersRepository.SearchAsync(new UserSearchCriteria()
                    {
                        UserIDs = new List<int>() { userAuthentication.UserID.Value },
                        UserStatuses = new List<UserStatuses>() { UserStatuses.NotConfirmed, UserStatuses.Active, UserStatuses.Locked }
                    })).SingleOrDefault() : null;
                    
                    if (userAuthentication == null)
                    {
                        var certSerNumber = clientCertificate.SerialNumber.Trim().Replace(" ", "").ToLower();
                        var certBySerialNumber = (await CertificateRepository.SearchAsync(new CertificateSearchCriteria() { CertSerialNumber = certSerNumber })).FirstOrDefault();

                        // ако все пак сертификата е намерен по сериен номер, а не по хеш, значи вероятно е бил подновен.
                        if (certBySerialNumber != null)
                        {
                            certificateWasRenewed = true;
                        }
                        else
                        {
                            certificateNotEnabled = true;
                        }
                    }
                    else
                    {
                        if (userAuthentication.IsLocked)
                            lockedCredentials = true;

                        if (userFound?.Status == UserStatuses.NotConfirmed)
                            notConfirmedAccount = true;

                        if (userAuthentication.IsActive && !userAuthentication.IsLocked)
                            certificateID = userAuthentication.CertificateID;
                    }

                    return new AuthenticationResultInternal()
                    {
                        UserLocked = lockedCredentials,
                        NotConfirmedAccount = notConfirmedAccount,
                        User = userFound,
                        UserAuthentication = userAuthentication,
                        CertificateNotEnabled = certificateNotEnabled,
                        CertificateWasRenewed = certificateWasRenewed,
                        CertificateID = certificateID
                    };
                });
        }

        public async Task<AuthenticationResult> AuthenticateResouceOwnerAuthenticationAsync(string username, string password, string ipAddress)
        {
            var authResultInternal = await AuthenticateUsernamePasswordInternal(username, password);
            bool userWasLocked = false;

            if (authResultInternal.UserLocked || authResultInternal.InvalidUsernamePassword)
            {
                var failedAttempt = await SetFailedLoginAttempt(username, AuthenticationTypes.UsernamePassword);

                if (authResultInternal.UserAuthentication != null)
                    userWasLocked = await EnsureLockedUserAfterLoginAttempt(failedAttempt, authResultInternal.UserAuthentication);
            }

            var authResult = new AuthenticationResult()
            {
                LoginSessionID = null,
                User = authResultInternal.User,
                InvalidUsernamePassword = authResultInternal.InvalidUsernamePassword,
                UserLocked = authResultInternal.UserLocked,
                UserWasLocked = userWasLocked
            };

            return authResult;
        }

        public async Task<AuthenticationResult> AuthenticateWindowsWeakAsync(string username)
        {
            var authResult = await AuthenticateInternal(username);

            return new AuthenticationResult()
            {
                User = authResult.User,
                InvalidUsernamePassword = authResult.InvalidUsernamePassword,
                UserLocked = authResult.UserLocked,
                UserDeactivated = authResult.UserDeactivated,
                NotConfirmedAccount = authResult.NotConfirmedAccount,
                CertificateNotEnabled = authResult.CertificateNotEnabled,
                CertificateWasRenewed = authResult.CertificateWasRenewed
            };

        }

        public async Task<AuthenticationResult> AuthenticateWindowsAsync(string username, string ipAddress)
        {
            return await AuthenticateWindowsInternal(username, null, ipAddress, AuthenticationTypes.ActiveDirectory,
                (id, pass) =>
                {
                    return AuthenticateInternal(username);
                });
        }

        private async Task<AuthenticationResultInternal> AuthenticateInternal(string username)
        {
            bool invalidCredentials = false, lockedCredentials = false, notConfirmedAccount = false;

            var userAuthentication = (await UsersAuthenticationRepository.SearchAsync(new UserAuthenticationSearchCriteria()
            {
                Username = username,
                AuthenticationType = AuthenticationTypes.ActiveDirectory
            }, CancellationToken.None)).SingleOrDefault();

            User userFound = (await UsersRepository.SearchAsync(new UserSearchCriteria() { UserIDs = new List<int>() { userAuthentication.UserID.Value } })).SingleOrDefault();

            if (userAuthentication == null)
            {
                invalidCredentials = true;
            }
            else
            {
                if (userFound == null || userFound.Status != UserStatuses.Active)
                {
                    invalidCredentials = true;
                }
            }

            return new AuthenticationResultInternal()
            {
                InvalidUsernamePassword = invalidCredentials,
                UserLocked = lockedCredentials,
                NotConfirmedAccount = notConfirmedAccount,
                User = userFound,
                UserAuthentication = userAuthentication
            };
        }

        public async Task<AuthenticationResult> AuthenticateNRAAsync(string identifier, string ipAddress)
        {
            return await AuthenticateWindowsInternal(identifier, null, ipAddress, AuthenticationTypes.NRA,
                async (id, pass) =>
                {
                    bool invalidCredentials = false, lockedCredentials = false, notConfirmedAccount = false;
                    var userAuthentication = (await UsersAuthenticationRepository.SearchAsync(new UserAuthenticationSearchCriteria()
                    {
                        Username = identifier,
                        AuthenticationType = AuthenticationTypes.NRA
                    })).SingleOrDefault();

                    User userFound = null;

                    if (userAuthentication == null)
                    {
                        invalidCredentials = true;
                    }
                    else
                    {
                        userFound = (await UsersRepository.SearchAsync(new UserSearchCriteria() { UserIDs = new List<int>() { userAuthentication.UserID.Value } })).SingleOrDefault();

                        if (userAuthentication.IsLocked)
                            lockedCredentials = true;

                        int? currentUserId = null;
                        if (!string.IsNullOrEmpty(EPZEUUserAccessor.User?.ClientID) && int.TryParse(EPZEUUserAccessor.User?.ClientID, out int principalId))
                            currentUserId = principalId;

                        if (userFound == null || (currentUserId != null && userFound.UserID != currentUserId.Value) || userFound.Status != UserStatuses.Active)
                        {
                            invalidCredentials = true;
                        }
                    }

                    return new AuthenticationResultInternal()
                    {
                        InvalidUsernamePassword = invalidCredentials,
                        UserLocked = lockedCredentials,
                        NotConfirmedAccount = notConfirmedAccount,
                        User = userFound,
                        UserAuthentication = userAuthentication
                    };
                });
        }

        public async Task<OperationResult> RegisterUserAuthentication(UserAuthentication userAuthentication)
        {
            var operationResult = await OperationExecutor.ExecuteOrRestoreAsync<OperationResult>(Guid.NewGuid().ToString(), (int)Common.Models.ServiceOperationTypes.RegisterUserAuthentication, async (ctx) =>
            {
                var existingUserAuthentication = (await UsersAuthenticationRepository.SearchAsync(new UserAuthenticationSearchCriteria()
                {
                    Username = userAuthentication.Username,
                    AuthenticationType = userAuthentication.AuthenticationType
                })).SingleOrDefault();

                int? currentUserId = null;
                if (!string.IsNullOrEmpty(EPZEUUserAccessor.User?.ClientID) && int.TryParse(EPZEUUserAccessor.User?.ClientID, out int principalId))
                    currentUserId = principalId;

                if (existingUserAuthentication != null && (existingUserAuthentication.IsActive || existingUserAuthentication.UserID != currentUserId))
                {
                    ctx.Result = new OperationResult(OperationResultTypes.CompletedWithError);
                }
                else
                {
                    await UsersAuthenticationRepository.CreateAsync(userAuthentication);

                    var auditUserLogin = new LogActionRequest()
                    {
                        ObjectType = ObjectTypes.UserCertificate,
                        ActionType = ActionTypes.Add,
                        Module = Modules.EPZEU,
                        Functionality = Functionalities.Users,
                        Key = EPZEUUserAccessor.User.CIN.ToString(),
                        UserSessionID = EPZEUUserAccessor.UserSessionID,
                        LoginSessionID = EPZEUUserAccessor.User?.LoginSessionID,
                        UserCIN = EPZEUUserAccessor.User.CIN,
                        IpAddress = EPZEUUserAccessor.RemoteIpAddress.ToString(),
                        AdditionalData = new { authType = Localizer["EP_USR_PIK_NRA_L"].ToString() },
                        OperationID = Guid.NewGuid().ToString()
                    };
                    await AuditServiceClient.CreateLogActionAsync(auditUserLogin);

                    ctx.Result = new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                }
            });

            return operationResult.Result;
        }

        private async Task<AuthenticationResult> AuthenticateWindowsInternal(
            string loginIdentifier, string password, string ipAddress, AuthenticationTypes authenticationType,
            Func<string, string, Task<AuthenticationResultInternal>> userFunction)
        {
            Guid loginSessionID = Guid.NewGuid();
            bool userWasLocked = false;

            var res = await DbContextOperationExecutor.ExecuteAsync(async (dbContext, token) =>
            {
                var authResult = await userFunction(loginIdentifier, password);

                if (!authResult.IsSuccess)
                {
                    if (authResult.UserAuthentication != null && authResult.UserAuthentication.IsLocked &&
                        DateTime.Compare(authResult.UserAuthentication.LockedUntil.Value, DateTime.Now) < 0)
                    {
                        await ClearFailedLoginAttempt(loginIdentifier, authenticationType);
                        await ClearUserAuthenticationLock(authResult.UserAuthentication);
                    }
                    else
                    {
                        var failedAttempt = await SetFailedLoginAttempt(loginIdentifier, authenticationType);

                        if (authResult.UserAuthentication != null)
                            userWasLocked = await EnsureLockedUserAfterLoginAttempt(failedAttempt, authResult.UserAuthentication);
                    }
                }
                else
                {
                    var userSessionID = EPZEUUserAccessor.UserSessionID.Value;

                    await SaveLoginSession(Guid.NewGuid().ToString(), userSessionID, loginSessionID,
                        authenticationType, ipAddress, authResult.User.UserID.Value, authResult.CertificateID);

                    await ClearFailedLoginAttempt(loginIdentifier, authenticationType);

                    if (authResult.UserAuthentication != null && authResult.UnlockUserAuthentication)
                        await ClearUserAuthenticationLock(authResult.UserAuthentication);

                    var auditUserLogin = new LogActionRequest()
                    {
                        ObjectType = ObjectTypes.UserProfile,
                        ActionType = ActionTypes.Login,
                        Module = Modules.EPZEU,
                        Functionality = Functionalities.Users,
                        Key = authResult.User.Email,
                        UserSessionID = userSessionID,
                        LoginSessionID = loginSessionID,
                        UserCIN = authResult.User.CIN.Value,
                        IpAddress = ipAddress,
                        AdditionalData = new { loginType = authenticationType.ToString() },
                        OperationID = Guid.NewGuid().ToString()
                    };
                    await AuditServiceClient.CreateLogActionAsync(auditUserLogin);
                }

                return new OperationResult<AuthenticationResultInternal>(OperationResultTypes.SuccessfullyCompleted) { Result = authResult };
            }, CancellationToken.None);

            return new AuthenticationResult()
            {
                LoginSessionID = loginSessionID.ToString(),
                User = res.Result.User,
                InvalidUsernamePassword = res.Result.InvalidUsernamePassword,
                UserLocked = res.Result.UserLocked,
                UserWasLocked = userWasLocked,
                UserDeactivated = res.Result.UserDeactivated,
                NotConfirmedAccount = res.Result.NotConfirmedAccount,
                CertificateNotEnabled = res.Result.CertificateNotEnabled,
                CertificateWasRenewed = res.Result.CertificateWasRenewed
            };
        }

        public async Task LogoutCurrentLoginSessionAsync()
        {
            var loginSessionID = EPZEUUserAccessor.User?.LoginSessionID;

            if (loginSessionID.HasValue)
            {
                var loginSession = (await UserLoginSessionRepository.SearchAsync(new UserLoginSessionSearchCriteria() { LoginSessionIDs = new Guid[] { loginSessionID.Value } })).SingleOrDefault();

                if (loginSession != null)
                {
                    loginSession.LogoutDate = DateTime.Now;
                    await UserLoginSessionRepository.UpdateAsync(loginSession);
                }
            }
        }

        public async Task<OperationResult> ResendConfirmationEmailAsync(string email)
        {
            var user = (await UsersRepository.SearchAsync(new UserSearchCriteria() { Email = email })).SingleOrDefault();

            var currentNotConfirmedProcess = (await UsersProcessesRepository.SearchAsync(new UserProcessesSearchCriteria()
            {
                UserIDs = new List<int>() { user.UserID.Value }
            }))
            .SingleOrDefault(up => up.Status == 0 && up.ProcessType == UserProcessTypes.Activation);

            if (currentNotConfirmedProcess == null)
                return new OperationResult(OperationResultTypes.CompletedWithError);

            string userProcessIdent = currentNotConfirmedProcess.ProcessGuid.ToString();

            string activationLink = BuildUserProcessConfirmationUrl(userProcessIdent, "activate"),
                deactivationLink = BuildUserProcessConfirmationUrl(userProcessIdent, "cancelRegistration"),
                userCIN = user.CIN.ToString(),
                deadline = currentNotConfirmedProcess.InvalidAfter?.ToString("MM.dd.yyyy hh:mm:ss");

            var request = new EmailNotificationRequest()
            {
                Priority = EmailPriority.Normal,
                TemplateID = 2,
                Parameters = new Dictionary<string, string>() {
                    { "CIN", userCIN },
                    { "ACTIVATION_LINK", activationLink },
                    { "DEADLINE", deadline },
                    { "DEACTIVATION_LINK", deactivationLink },
                },
                Recipients = new EmailRecipient[] {
                    new EmailRecipient() { Address = user.Email, DisplayName = user.Email, Type = (short)AddressTypes.To },
                },
                OperationID = Guid.NewGuid().ToString()
            };
            var reqResponse = await EmailClient.CreateEmailNotificationAsync(request);

            return new OperationResult(reqResponse.EmailIDs.Any() ? OperationResultTypes.SuccessfullyCompleted : OperationResultTypes.CompletedWithError);
        }

        private async Task<UserLoginAttempt> SetFailedLoginAttempt(string loginName, AuthenticationTypes authenticationType)
        {
            IUserLoginAttemptRepository userLoginAttemptEntity = UserLoginAttemptRepository;

            var failedAttempt = (await userLoginAttemptEntity.SearchAsync(new UserLoginAttemptSearchCriteria() { LoginName = loginName }))
                                    .SingleOrDefault(la => la.AuthenticationType == authenticationType);

            if (failedAttempt != null)
            {
                failedAttempt.FailedLoginAttempts++;
                userLoginAttemptEntity.Update(failedAttempt);
            }
            else
            {
                failedAttempt = new UserLoginAttempt()
                {
                    AuthenticationType = authenticationType,
                    LoginName = loginName,
                    FailedLoginAttempts = 1
                };
                await userLoginAttemptEntity.CreateAsync(failedAttempt);
            }
            return failedAttempt;
        }

        private async Task ClearFailedLoginAttempt(string loginName, AuthenticationTypes authenticationType)
        {
            IUserLoginAttemptRepository userLoginAttemptEntity = UserLoginAttemptRepository;

            var failedAttempt = (await userLoginAttemptEntity.SearchAsync(new UserLoginAttemptSearchCriteria() { LoginName = loginName }))
                                    .SingleOrDefault(la => la.AuthenticationType == authenticationType);

            if (failedAttempt != null)
            {
                await userLoginAttemptEntity.DeleteAsync(failedAttempt);
            }
        }

        private async Task<bool> EnsureLockedUserAfterLoginAttempt(UserLoginAttempt failedLoginAttempt, UserAuthentication userAuthentication)
        {
            if (failedLoginAttempt.FailedLoginAttempts >= _usersOptions.EP_USR_MAX_LOGIN_ATTEMPT_COUNT)
            {
                userAuthentication.IsLocked = true;
                userAuthentication.LockedUntil = DateTime.Now.Add(_usersOptions.EP_USR_LOCK_FOR_PERIOD);

                await UsersAuthenticationRepository.UpdateAsync(userAuthentication);

                return true;
            }

            return false;
        }

        private Task SaveLoginSession(
            string operationID, Guid userSessionID, Guid loginSessionID,
            AuthenticationTypes authenticationType, string ipAddress, int logedUserID, int? certificateID)
        {
            var loginSession = new UserLoginSession()
            {
                UserSessionID = userSessionID,
                LoginSessionID = loginSessionID,
                AuthenticationType = authenticationType,
                IpAddress = IPAddress.Parse(ipAddress),
                LoginDate = DateTime.Now,
                UserID = logedUserID,
                OperationID = Guid.Parse(operationID),
                CertificateID = certificateID
            };

            return UserLoginSessionRepository.CreateAsync(loginSession);
        }

        private async Task<AuthenticationResultInternal> AuthenticateUsernamePasswordInternal(string id, string pass)
        {
            bool invalidCredentials = false;
            bool lockedCreadentials = false;
            bool notConfirmedProfile = false, deactivatedProfile = false;
            bool unlockUser = false;
            UserAuthentication userAuthentication = null;

            var userFound = (await UsersRepository.SearchAsync(new UserSearchCriteria()
            {
                Email = id,
                //UserStatuses = new List<UserStatuses>() { UserStatuses.NotConfirmed, UserStatuses.Active, UserStatuses.Locked }
            })).SingleOrDefault();

            if (userFound == null)
            {
                invalidCredentials = true;
            }
            else if (userFound.Status == UserStatuses.NotConfirmed)
            {
                notConfirmedProfile = true;
            }
            else if (userFound.Status == UserStatuses.Inactive)
            {
                deactivatedProfile = true;
            }
            else
            {
                if (userFound.Status == UserStatuses.Locked)
                    lockedCreadentials = true;

                userAuthentication = (await UsersAuthenticationRepository.SearchAsync(new UserAuthenticationSearchCriteria()
                {
                    UserID = userFound.UserID,
                    AuthenticationType = AuthenticationTypes.UsernamePassword
                })).SingleOrDefault();

                if (userAuthentication == null)
                {
                    invalidCredentials = true;
                }
                else if (userAuthentication.IsLocked)
                {
                    if (userAuthentication.LockedUntil < DateTime.Now)
                    {
                        // do check password before performing unlock
                        if (!PasswordValidationService.ValidateWithHash(pass, userAuthentication.PasswordHash))
                        {
                            invalidCredentials = true;
                        }
                        else
                        {
                            unlockUser = true;
                        }
                    }
                    else
                    {
                        lockedCreadentials = true;
                    }
                }
                else if (!PasswordValidationService.ValidateWithHash(pass, userAuthentication.PasswordHash))
                {
                    invalidCredentials = true;
                }
            }

            return new AuthenticationResultInternal()
            {
                InvalidUsernamePassword = invalidCredentials,
                UserLocked = lockedCreadentials,
                UnlockUserAuthentication = unlockUser,
                NotConfirmedAccount = notConfirmedProfile,
                UserDeactivated = deactivatedProfile,
                User = userFound,
                UserAuthentication = userAuthentication
            };
        }

        private Task ClearUserAuthenticationLock(UserAuthentication userAuthentication)
        {
            if (userAuthentication.LockedUntil > DateTime.Now)
                throw new InvalidOperationException("UserAuthentication LockedUntil has not passed.");

            userAuthentication.IsLocked = false;
            userAuthentication.LockedUntil = null;

            return UsersAuthenticationRepository.UpdateAsync(userAuthentication);
        }

        private string BuildUserProcessConfirmationUrl(string userProcessIdent, string processAction)
        {
            var epzeuPublicUrl = AppParameters.GetParameter("GL_EPZEU_PUBLIC_UI_URL").ValueString;
            var profileConfirmationUrl = StaticPages.GetStaticPage("EP_USR_CONFIRMATION").Url;

            return new Uri(new Uri(epzeuPublicUrl), profileConfirmationUrl.Replace("{EP_USR_PROCESS_GUID}", userProcessIdent).Replace("{EP_USR_CONFIRM_ACTION}", processAction)).ToString();
        }

        class AuthenticationResultInternal : AuthenticationResult
        {
            public bool UnlockUserAuthentication { get; set; }
            public UserAuthentication UserAuthentication { get; set; }
        }
    }
}
