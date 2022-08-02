using CNSys.Data;
using EPZEU.Applications;
using EPZEU.Applications.Repositories;
using EPZEU.Audit;
using EPZEU.Audit.Repositories;
using EPZEU.Common;
using EPZEU.Common.Repositories;
using EPZEU.Emails;
using EPZEU.Emails.Cache;
using EPZEU.Emails.Repositories;
using EPZEU.Notifications;
using EPZEU.Notifications.PR;
using EPZEU.Notifications.Repositories;
using EPZEU.Security;
using EPZEU.Users;
using EPZEU.Users.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionEPZEUCommonEntensions
    {
        /// <summary>
        /// Добавя общи услуги от ЕПЗЕУ за работа с одит, разпределени операции и други.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUCommonServices( 
            this IServiceCollection services)
        {
            services.TryAddSingleton(typeof(ILogActionRepository), typeof(LogActionRepository));
            services.TryAddSingleton(typeof(IAuditService), typeof(AuditService));

            services.AddEPZEUEmailBaseServices();
            services.TryAddSingleton<IEmailsCache, EmailsTemplateDbDataCache>();
            services.TryAddSingleton(typeof(IEmailNotificationService), typeof(EmailNotificationService));

            services.TryAddSingleton(typeof(IApplicationRepository), typeof(ApplicationRepository));
            services.TryAddSingleton(typeof(IApplicationService), typeof(ApplicationService));

            services.TryAddSingleton<IActionDispatcher, DefaultActionDispatcher>();

            services.TryAddSingleton(typeof(IServiceOperationRepository), typeof(ServiceOperationRepository));
            services.TryAddSingleton(typeof(IUserSubscriptionRepository), typeof(UserSubscriptionRepository));

            services.TryAddScoped(typeof(INotificationService), typeof(NotificationService));
            services.AddScopedWithHttpClient<IPRNotificationServiceClient, PRNotificationServiceClient>(EPZEUHttpClientNames.PRRegisterApi);

            services.AddEPZEUUserServices();

            services.AddIdempotentOperationExecutor();

            return services;
        }

        /// <summary>
        /// Добавя общи базови услуги за работа с емаили.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUEmailBaseServices(
            this IServiceCollection services)
        {
            services.TryAddSingleton(typeof(IEmailTemplateRepository), typeof(EmailTemplateRepository));
            services.TryAddSingleton(typeof(IEmailRepository), typeof(EmailRepository));
            services.TryAddSingleton(typeof(IEmailService), typeof(EmailService));

            return services;
        }

            /// <summary>
            /// Добавя услуги за достъп до потребители
            /// </summary>
            /// <param name="services"></param>
            /// <returns></returns>
            public static IServiceCollection AddEPZEUUserServices(
            this IServiceCollection services)
        {
            services.TryAddSingleton<IUsersAuthenticationRepository, UsersAuthenticationRepository>();
            services.TryAddSingleton<IUserLoginSessionRepository, UserLoginSessionRepository>();
            services.TryAddSingleton<IUsersProcessesRepository, UserProcessesRepository>();
            services.TryAddSingleton<IUserLoginAttemptRepository, UserLoginAttemptRepository>();
            services.TryAddSingleton<IUsersPermissionRepository, UserPermissionRepository>();
            services.TryAddSingleton<IUsersRepository, UsersRepository>();
            services.TryAddSingleton<ICertificateRepository, CertificateRepository>();
            services.TryAddSingleton<IUsersService, UsersService>();

            services.TryAddSingleton<IDataSourceUserMapper, EPZEUDataSourceUserMapper>();

            return services;
        }
    }
}
