using EPZEU.Common;
using EPZEU.Users.Models;
using EPZEU.Users.Repositories;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users
{
    /// <summary>
    /// Предоставя методи за достъп до логин сесия.
    /// </summary>
    public interface ILoginSessionsService
    {
        Task<UserLoginSession> GetLoginSessionByIdAsync(Guid loginSessionID, bool loadCertificateInfo, bool loadOrganizationIdentifier, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Имплементация на ILoginSessionsService.
    /// </summary>
    public class LoginSessionsService : ILoginSessionsService
    {
        private IUserLoginSessionRepository UserLoginSessionRepository { get; set; }
        private ICertificateRepository CertificateRepository { get; set; }
        private IUsersAuthenticationRepository UsersAuthenticationRepository { get; set; }
        private ICertificateHelper CertificateHelper { get; set; }
        private ILogger Logger { get; set; }

        public LoginSessionsService(ICertificateRepository certificateRepository,
            IUserLoginSessionRepository userLoginSessionRepository,
            IUsersAuthenticationRepository usersAuthenticationRepository,
            ICertificateHelper certificateHelper,
            ILogger<LoginSessionsService> logger)
        {
            CertificateRepository = certificateRepository;
            UserLoginSessionRepository = userLoginSessionRepository;
            UsersAuthenticationRepository = usersAuthenticationRepository;
            CertificateHelper = certificateHelper;
            Logger = logger;
        }

        public async Task<UserLoginSession> GetLoginSessionByIdAsync(Guid loginSessionID, bool loadCertificateInfo, bool loadOrganizationIdentifier, CancellationToken cancellationToken)
        {
            var session = (await UserLoginSessionRepository.SearchAsync(new UserLoginSessionSearchCriteria() { LoginSessionIDs = new Guid[] { loginSessionID } }, cancellationToken))
                .SingleOrDefault();

            if (session == null)
            {
                Logger.LogWarning($"Attempt to read login session with id {loginSessionID}, but none was found.");
                return session;
            }

            if (loadCertificateInfo && session.CertificateID.HasValue)
                await LoadCertificateInfo(session, loadOrganizationIdentifier, cancellationToken);

            if (session.AuthenticationType == AuthenticationTypes.NRA)
            {
                var userAuthentication = (await UsersAuthenticationRepository
                    .SearchAsync(new UserAuthenticationSearchCriteria() { UserID=session.UserID, AuthenticationType = AuthenticationTypes.NRA }, cancellationToken))
                    .First(ua => ua.IsActive);

                session.UserIdentifier = userAuthentication.Username;
            }

            return session;
        }

        private async Task LoadCertificateInfo(UserLoginSession session, bool loadOrganizationIdentifier, CancellationToken cancellationToken)
        {
            var certificate = (await CertificateRepository
                .SearchAsync(new CertificateSearchCriteria() { CertificateIDs = new List<int>() { session.CertificateID.Value }, LoadContent = true }, cancellationToken))
                .SingleOrDefault();

            if (certificate == null)
                throw new InvalidOperationException($"Could not load certificate with id {session.CertificateID} for login session id {session.LoginSessionID}.");

            var personInfo = CertificateHelper.ExtractPersonInfo(certificate.Issuer, certificate.Subject, certificate.Content, loadOrganizationIdentifier);

            var certificateInfo = new CertificateInfo()
            {
                CertificateID = certificate.CertificateID.Value,
                SerialNumber = certificate.SerialNumber,
                Identifier = personInfo.Identifier,
                OrganizationIdentifier = personInfo.OrganizationIdentifier,
                Names = personInfo.Names,
                Issuer = certificate.Issuer,
                CertHash = certificate.CertHash,
                Content = Convert.ToBase64String(certificate.Content)
            };

            session.CertificateInfo = certificateInfo;
            session.UserIdentifier = personInfo.Identifier;
        }
    }
}
