using CNSys;
using CNSys.Data;
using EPZEU.Common;
using EPZEU.Emails;
using EPZEU.Emails.Models;
using EPZEU.Nomenclatures.Models;
using EPZEU.Notifications.Models;
using EPZEU.Notifications.PR;
using EPZEU.Notifications.Repositories;
using EPZEU.Users.Repositories;
using Integration.EPZEU.Models;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Notifications
{
    /// <summary>
    /// Заявка за абониране за събития
    /// </summary>
    public class UserSubscriptionsCreateRequest
    {
        /// <summary>
        /// Клиентски идентификационене номер на потребителя абонирал се за събития в регистри.
        /// </summary
        public int? UserCIN { get; set; }

        /// <summary>
        /// Идентификатор на регистър.
        /// </summary> 
        public Registers? Register { get; set; }

        /// <summary>
        /// Тип на идентификатор на събития в регистри.
        /// </summary>
        public UserSubscriptionTypes? Type { get; set; }

        /// <summary>
        /// Стойност на тип на партида/обект
        /// </summary>       
        public List<string> Values { get; set; }
    }

    /// <summary>
    /// Заявка за изтриване на абонамент за събития
    /// </summary>
    public class UserSubscriptionsDeleteRequest
    {
        /// <summary>
        /// Клиентски идентификационене номер на потребителя абонирал се за събития в регистри.
        /// </summary>
        public int? UserCIN { get; set; }

        /// <summary>
        /// Списък с уникален идентификатори на aбонамент за събития в регистри.
        /// </summary>     
        public List<string> UserSubscriptionIDs { get; set; }
    }

    /// <summary>
    /// Интерфейс за абониране и обработка на събития.
    /// </summary>
    public interface INotificationService
    {
        /// <summary>
        /// Създава запис за абонамент на потребител за събитие
        /// </summary>      
        Task<OperationResult<List<UserSubscription>>> CreateUserSubscriptionsAsync(UserSubscriptionsCreateRequest request, CancellationToken cancellationToken);

        /// <summary>
        /// Създава запис за абонамент на потребител за събитие
        /// </summary>       
        Task DeleteUserSubscriptionsAsync(UserSubscriptionsDeleteRequest request, CancellationToken cancellationToken);

        /// <summary>
        /// Търси записи за абонамент на потребител
        /// </summary>
        /// <param name="searchCriteria"></param>
        /// <returns></returns>
        Task<IEnumerable<UserSubscription>> SearchUserSubscriptionsAsync(UserSubscriptionSearchCriteria searchCriteria, CancellationToken cancellationToken);

        /// <summary>
        /// Обработва събити от имотния регистър
        /// </summary>
        /// <param name="message"></param>
        Task ProcessCREventAsync(CREventMessage message);
    }

    /// <summary>
    /// Реализация на интерфейс INotificationService за абониране и обработка на събития.
    /// </summary>
    internal class NotificationService : INotificationService
    {
        private IUserSubscriptionRepository UserSubscriptionRepository;
        private IEmailNotificationService EmailNotificationService;
        private IDbContextOperationExecutor DBContextOperationExecutor;
        private GlobalOptions _globalOptions;
        private IStringLocalizer Localizer;
        private IPRNotificationServiceClient PRNotificationServiceClient;
        private IUsersRepository UsersRepository;

        public NotificationService(IUserSubscriptionRepository userSubscriptionRepository, 
            IEmailNotificationService emailNotificationService, 
            IDbContextOperationExecutor dbContextOperationExecutor, 
            IOptionsMonitor<GlobalOptions> globalOptions, 
            IStringLocalizer localizer, 
            IPRNotificationServiceClient prNotificationServiceClient, 
            IUsersRepository usersRepository)
        {
            UserSubscriptionRepository = userSubscriptionRepository;
            EmailNotificationService = emailNotificationService;
            DBContextOperationExecutor = dbContextOperationExecutor;
            _globalOptions = globalOptions.CurrentValue;
            Localizer = localizer;
            PRNotificationServiceClient = prNotificationServiceClient;
            UsersRepository = usersRepository;
        }

        #region INotificationService

        public async Task<OperationResult<List<UserSubscription>>> CreateUserSubscriptionsAsync(UserSubscriptionsCreateRequest request, CancellationToken cancellationToken)
        {
            var user = (await UsersRepository.SearchAsync(new Users.Models.UserSearchCriteria() { CIN = request.UserCIN }, cancellationToken)).Single();
            var userNotification = await PRNotificationServiceClient.GetActiveEmailNotificationAsync(user.Email, cancellationToken);

            var currentCRSubscriptionsCount = (await UserSubscriptionRepository.SearchAsync(new UserSubscriptionSearchCriteria()
            {
                UserCIN = request.UserCIN,
                Register = Registers.CR
            }, cancellationToken)).Count();

            var currentPRNotificationsCount = userNotification != null && !string.IsNullOrEmpty(userNotification.EmailNotificationId) && userNotification.RegisteredUIDs != null
                ? userNotification.RegisteredUIDs.Count
                : 0;

            //Надхвърлен е допустимият брой партиди/обекти за абонамент от регистъра.
            if (currentCRSubscriptionsCount + currentPRNotificationsCount + request.Values.Count() > _globalOptions.EP_SUBSCRIPTION_MAX_OBJ_COUNT)
                return new OperationResult<List<UserSubscription>>("EP_MAX_COUNT_SUBSCRIPTION_E", "EP_MAX_COUNT_SUBSCRIPTION_E");
            else
            {
                if (request.Register == Registers.PR)
                {
                    string userName = string.Join(" ", user.FirstName, user.MiddleName, user.FamilyName);

                    if (userNotification != null && !string.IsNullOrEmpty(userNotification.EmailNotificationId))
                    {
                        var registeredUIDs = new List<string>();

                        if (userNotification.RegisteredUIDs != null && userNotification.RegisteredUIDs.Count > 0)
                            registeredUIDs.AddRange(userNotification.RegisteredUIDs);

                        registeredUIDs.AddRange(request.Values);

                        await PRNotificationServiceClient.ModifyEmailNotificationAsync(new EmailNotificationsRequest()
                        {
                            PersonEmail = user.Email,
                            PersonFullName = userName,
                            RegisteredUIDs = registeredUIDs.Distinct().ToList()
                        }, cancellationToken);
                    }
                    else
                    {
                        await PRNotificationServiceClient.CreateEmailNotificationAsync(new EmailNotificationsRequest()
                        {
                            PersonEmail = user.Email,
                            PersonFullName = userName,
                            RegisteredUIDs = request.Values
                        }, cancellationToken);
                    }

                    var subscriptions = new List<UserSubscription>();

                    foreach (var value in request.Values)
                    {
                        var subscription = new UserSubscription()
                        {
                            UserCIN = request.UserCIN,
                            Register = request.Register,
                            Type = request.Type,
                            Value = value,
                            UserSubscriptionID = "PR_" + value
                        };

                        subscriptions.Add(subscription);
                    }

                    return new OperationResult<List<UserSubscription>>(OperationResultTypes.SuccessfullyCompleted) { Result = subscriptions };
                }
                else
                {
                    return await DBContextOperationExecutor.ExecuteAsync(async (dbCtx, token) => {
                        var subscriptions = new List<UserSubscription>();

                        foreach (var value in request.Values)
                        {
                            var subscription = new UserSubscription()
                            {
                                UserCIN = request.UserCIN,
                                Register = request.Register,
                                Type = request.Type,
                                Value = value
                            };

                            await UserSubscriptionRepository.CreateAsync(subscription, token);
                            subscriptions.Add(subscription);
                        }

                        return new OperationResult<List<UserSubscription>>(OperationResultTypes.SuccessfullyCompleted) { Result = subscriptions };
                    }, cancellationToken);
                }
            }
        }

        public async Task DeleteUserSubscriptionsAsync(UserSubscriptionsDeleteRequest request, CancellationToken cancellationToken)
        {
            var prUserSubscriptionIDs = request.UserSubscriptionIDs.Where(id => id.Contains("PR_")).ToList();
            var crUserSubscriptionIDs = request.UserSubscriptionIDs.Where(id => !id.Contains("PR_")).ToList();

            if (prUserSubscriptionIDs != null && prUserSubscriptionIDs.Count > 0)
            {
                var user =(await UsersRepository.SearchAsync(new Users.Models.UserSearchCriteria() { CIN = request.UserCIN }, cancellationToken)).Single();
                string userName = string.Join(" ", user.FirstName, user.MiddleName, user.FamilyName);
                var userNotification = await PRNotificationServiceClient.GetActiveEmailNotificationAsync(user.Email, cancellationToken);

                if (userNotification != null && !string.IsNullOrEmpty(userNotification.EmailNotificationId))
                {
                    var registeredUIDs = userNotification.RegisteredUIDs.Where(uid => !prUserSubscriptionIDs.Contains("PR_" + uid)).ToList();

                    if (registeredUIDs != null && registeredUIDs.Count > 0)
                    {
                        await PRNotificationServiceClient.ModifyEmailNotificationAsync(new EmailNotificationsRequest()
                        {
                            PersonEmail = user.Email,
                            PersonFullName = userName,
                            RegisteredUIDs = registeredUIDs.Distinct().ToList()
                        }, cancellationToken);
                    }
                    else
                    {
                        await PRNotificationServiceClient.DeactivateEmailNotificationAsync(new EmailNotificationsRequest()
                        {
                            PersonEmail = user.Email,
                            PersonFullName = userName,
                            RegisteredUIDs = userNotification.RegisteredUIDs
                        }, cancellationToken);
                    }
                }
            }

            if (crUserSubscriptionIDs != null && crUserSubscriptionIDs.Count > 0)
            {
                await UserSubscriptionRepository.DeleteUserSubscriptionsAsync(request.UserCIN, crUserSubscriptionIDs, cancellationToken);
            }
        }

        public async Task<IEnumerable<UserSubscription>> SearchUserSubscriptionsAsync(UserSubscriptionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var result = new List<UserSubscription>();

            if (!searchCriteria.Register.HasValue || searchCriteria.Register == Registers.CR)
            {
                var criteria = new UserSubscriptionSearchCriteria()
                {
                    UserSubscriptionIDs = searchCriteria.UserSubscriptionIDs,
                    UserCIN = searchCriteria.UserCIN,
                    Register = searchCriteria.Register,
                    Type = searchCriteria.Type,
                    Values = searchCriteria.Values,
                    LoadOption = searchCriteria.LoadOption
                };

                result.AddRange(await UserSubscriptionRepository.SearchAsync(criteria, cancellationToken));
            }

            if (!searchCriteria.Register.HasValue || searchCriteria.Register == Registers.PR)
            {
                var user = (await UsersRepository.SearchAsync(new Users.Models.UserSearchCriteria() { CIN = searchCriteria.UserCIN }, cancellationToken)).Single();
                var userNotification = await PRNotificationServiceClient.GetActiveEmailNotificationAsync(user.Email, CancellationToken.None);

                if (userNotification != null && userNotification.RegisteredUIDs.Count > 0)
                {
                    foreach (var registeredUID in userNotification.RegisteredUIDs)
                    {
                        result.Add(new UserSubscription()
                        {
                            UserCIN = searchCriteria.UserCIN,
                            Register = Registers.PR,
                            Type = UserSubscriptionTypes.EGN_LNCH_UIC,
                            Value = registeredUID,
                            UserSubscriptionID = "PR_" + registeredUID,
                            User = new User()
                            {
                                CIN = user.CIN,
                                Email = user.Email,
                                FamilyName = user.FamilyName,
                                FirstName = user.FirstName,
                                MiddleName = user.MiddleName
                            }
                        });
                    }
                }
            }

            searchCriteria.Count = result.Count();

            result = result.Count >= searchCriteria.Page ? result.Skip((searchCriteria.Page.Value - 1) * searchCriteria.PageSize.Value).Take(searchCriteria.PageSize.Value).ToList() : null;

            return result;
        }

        public async Task ProcessCREventAsync(CREventMessage message)
        {
            List<DeedSummary> eventDeeds = null;
            List<EmailNotificationRequest> emailRequests = new List<EmailNotificationRequest>();
            Dictionary<string, string> parameters = new Dictionary<string, string>() {
                                                       { "REGISTER_NAME", Localizer.GetString("GL_CR_REG_ABBREVATION_L") }
                                                    };

            switch (message.Type)
            {
                case CREventTypes.NewApplication:
                case CREventTypes.NewApplicationInstruction:
                    {
                        var appInfo = message.GetData<ApplicationInfo>();

                        eventDeeds = appInfo.IncomingLinkedDeeds?.Select(d => d).ToList();
                        break;
                    }
                case CREventTypes.NewProcessing:
                    {
                        var processings = message.GetData<List<ProcessingSummary>>();

                        eventDeeds = processings.Where(e => e.Deed != null && !string.IsNullOrEmpty(e.Deed.UIC)).Select(e => e.Deed).ToList();
                        break;
                    }
                default:
                    throw new ArgumentException("Unsupported CREventMessage Type.");
            }

            if (eventDeeds != null && eventDeeds.Count > 0)
            {
                var userSubscriptions = (await UserSubscriptionRepository.SearchAsync(new UserSubscriptionSearchCriteria()
                {
                    Register = Nomenclatures.Models.Registers.CR,
                    Type = UserSubscriptionTypes.UIC,
                    Values = eventDeeds.Select(d => d.UIC).ToList(),
                    LoadOption = new UserSubscriptionLoadOption()
                    {
                        LoadUserData = true
                    }
                }, CancellationToken.None)).ToList();

                foreach (var deed in eventDeeds)
                {
                    parameters["DEED_NAME"] = string.Format("{0} {1} {2}", Localizer.GetString("GL_COMPANY_ID_L"), deed.UIC, deed.CompanyFullName);

                    switch (message.Type)
                    {
                        case CREventTypes.NewApplication:
                            {
                                var appInfo = message.GetData<ApplicationInfo>();
                                parameters["EVENT_DATA"] = string.Format("{0} {1} {2} {3} {4}", Localizer.GetString("EP_SUBSCRIPTION_MSG_SUBMIT_APP_L"), appInfo.IncomingNumber, Localizer.GetString("EP_SUBSCRIPTION_MSG_BATCH_L"), deed.UIC, deed.CompanyFullName);
                                break;
                            }
                        case CREventTypes.NewApplicationInstruction:
                            {
                                var appInfo = message.GetData<ApplicationInfo>();
                                parameters["EVENT_DATA"] = string.Format("{0} {1} {2} {3} {4}", Localizer.GetString("EP_SUBSCRIPTION_MSG_INSTRUCTION_L"), appInfo.IncomingNumber, Localizer.GetString("EP_SUBSCRIPTION_MSG_BATCH_L"), deed.UIC, deed.CompanyFullName);
                                break;
                            }
                        case CREventTypes.NewProcessing:
                            {
                                var processing = message.GetData<List<ProcessingSummary>>().First(e => e.Deed != null && e.Deed.UIC == deed.UIC);
                                parameters["EVENT_DATA"] = string.Format("{0} {1} {2} {3} {4}", Localizer.GetString("EP_SUBSCRIPTION_MSG_PROCESSED_L"), processing.IncomingNumber, Localizer.GetString("EP_SUBSCRIPTION_MSG_BATCH_L"), deed.UIC, deed.CompanyFullName);
                                break;
                            }
                    }

                    var uicUsrSubcrs = userSubscriptions.Where(subscr => subscr.Value == deed.UIC).ToList();

                    if (uicUsrSubcrs.Count > 0)
                    {
                        emailRequests.Add(new EmailNotificationRequest()
                        {
                            TemplateID = 11,
                            OperationID = string.Format("{0}_{1}", message.EventID, deed.UIC),
                            Parameters = parameters,
                            Recipients = uicUsrSubcrs.Select(s => new EmailRecipient()
                            {
                                Address = s.User.Email,
                                DisplayName = string.Format("{0} {1}", s.User.FirstName, s.User.FamilyName),
                                Type = 1
                            }).ToArray(),
                            Transliterate = true,
                            SeparateMailPerRecipient = true,
                            Priority = EmailPriority.Normal
                        });
                    }
                }

                if (emailRequests.Count > 0)
                {
                    var emailNotfTasks = emailRequests.Select(req => EmailNotificationService.CreateEmailNotificationAsync(req));

                    await Task.WhenAll(emailNotfTasks);
                }
            }
        }

        #endregion
    }
}
