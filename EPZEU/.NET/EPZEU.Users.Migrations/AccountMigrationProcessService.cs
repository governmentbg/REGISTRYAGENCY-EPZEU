using CNSys;
using CNSys.Data;
using EPZEU.Applications;
using EPZEU.Applications.Models;
using EPZEU.Common;
using EPZEU.Nomenclatures;
using EPZEU.Nomenclatures.Models;
using EPZEU.Security;
using EPZEU.Users.Migrations.Common;
using EPZEU.Users.Migrations.MessageHandlers;
using EPZEU.Users.Migrations.Models;
using EPZEU.Users.Migrations.Repositories;
using EPZEU.Users.Repositories;
using Microsoft.Extensions.Options;
using Payments.PaymentOrders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Migrations
{
    /// <summary>
    /// Интерфейс на услуга за работа с процес по мигриране на потребителски профил.
    /// </summary>
    public interface IAccountMigrationProcessService
    {
        /// <summary>
        /// Връща потребителски акаунт за миграция
        /// </summary>
        /// <param name="criteria">Критерии за търсене на акаунт</param>
        /// <returns></returns>
        OperationResult<Account> GetAccountForMigration(AccountSearchCriteria criteria);

        /// <summary>
        /// Търси порцеси по миграви
        /// </summary>
        /// <param name="criteria">Критерии за търсене на процес по миграция</param>
        /// <returns></returns>
        IEnumerable<AccountMigrationProcess> SearchAccountMigrationProcesses(AccountMigrationProcessSearchCriteria criteria);

        /// <summary>
        /// Стартита нов процес по миграция
        /// </summary>
        /// <param name="startRequest">Заявка за стартиране.</param>
        /// <returns></returns>
        Task<OperationResult<AccountMigrationProcess>> StartAccountMigrationProcessAsync(StartMigrationProcessRequest startRequest);

        /// <summary>
        /// Обработва процес по миграция
        /// </summary>
        /// <param name="migrationProcessID"></param>
        /// <returns></returns>
        Task ProcessAccountMigrationProcessesAsync(int migrationProcessID);
    }

    /// <summary>
    /// Реализация на интерфейс IAccountMigrationProcessService  за работа с процес по мигриране на потребителски профил.
    /// </summary>
    internal class AccountMigrationProcessService : IAccountMigrationProcessService
    {
        private readonly IApplicationService ApplicationService;
        private readonly IUsersRepository UsersRepository;
        private readonly IAccountMigrationProcessRepository MigrationProcessRepository;
        private readonly IOSSAccountRepository OSSAccountRepository;
        private readonly IActionDispatcher ActionDispatcher;
        private readonly GlobalOptions GlobalOptions;
        private readonly IDbContextOperationExecutor DBContextOperationExecutor;
        private readonly ITransactionServiceClient TransactionServiceClient;
        private readonly ILabels Labels;
        private readonly IEPZEUUserAccessor EPZEUUserAccessor;

        public AccountMigrationProcessService(
            IApplicationService applicationService,
            IUsersRepository usersRepository,
            IAccountMigrationProcessRepository migrationProcessRepository,
            IActionDispatcher actionDispatcher,
            IOSSAccountRepository ossAccountRepository,
            IOptionsMonitor<GlobalOptions> globalOptions,
            IDbContextOperationExecutor dbContextOperationExecutor,
            ITransactionServiceClient transactionServiceClient,
            ILabels labels,
            IEPZEUUserAccessor epzeuUserAccessor)
        {
            ApplicationService = applicationService;
            UsersRepository = usersRepository;
            MigrationProcessRepository = migrationProcessRepository;
            ActionDispatcher = actionDispatcher;
            OSSAccountRepository = ossAccountRepository;
            GlobalOptions = globalOptions.CurrentValue;
            DBContextOperationExecutor = dbContextOperationExecutor;
            TransactionServiceClient = transactionServiceClient;
            Labels = labels;
            EPZEUUserAccessor = epzeuUserAccessor;
        }

        #region IAccountMigrationProcessService

        public async Task ProcessAccountMigrationProcessesAsync(int migrationProcessID)
        {
            AccountMigrationProcess mgrProcess = null;

            DBContextOperationExecutor.Execute((dbcontext) =>
            {
                mgrProcess = SearchAccountMigrationProcesses(new AccountMigrationProcessSearchCriteria()
                {
                    MigrationProcessID = migrationProcessID
                }).Single();

                if (mgrProcess.Status == AccountMgrProcessStatuses.ReadyForProcessing)
                {
                    mgrProcess.Status = AccountMgrProcessStatuses.Processing;

                    MigrationProcessRepository.Update(mgrProcess);
                }

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });

            if (mgrProcess.Status == AccountMgrProcessStatuses.Processing)
            {
                await MigrateMoneyAsync(mgrProcess);

                mgrProcess.Status = AccountMgrProcessStatuses.ProcessingMoneyProcessed;

                MigrationProcessRepository.Update(mgrProcess);
            }

            if (mgrProcess.Status == AccountMgrProcessStatuses.ProcessingMoneyProcessed)
            {
                if (mgrProcess.Register != Registers.PR)
                {
                    mgrProcess.Status = AccountMgrProcessStatuses.Completed;

                    MigrationProcessRepository.Update(mgrProcess);
                }
                else
                {
                    List<OSSApplication> applications = null;
                    var user = UsersRepository.Search(new Users.Models.UserSearchCriteria()
                    {
                        CIN = mgrProcess.UserCIN
                    }).Single();
                    var userName = string.Join(" ", user.FirstName, user.MiddleName, user.FamilyName);

                    do
                    {
                        applications = OSSAccountRepository.GetApplicationsForMigration(mgrProcess.MigrantUserID.Value, GlobalOptions.EP_USR_MGR_PROCESSING_APP_MAX_COUNT.Value);

                        if (applications.Count > 0)
                        {
                            await DBContextOperationExecutor.ExecuteAsync(async (dbcontext, cancellationToken) =>
                            {
                                foreach (var app in applications)
                                {
                                    await ApplicationService.CreateApplicationAsync(MapOSSApplicationToApplication(app, mgrProcess.UserCIN.Value), cancellationToken);
                                }

                                return new OperationResult<OperationResultTypes>(OperationResultTypes.SuccessfullyCompleted);
                            }, CancellationToken.None);

                            OSSAccountRepository.ComplateApplicationsMigration(applications.Select(app => app.ServiceInstanceID.Value).ToList(), mgrProcess.UserCIN.Value, userName);
                        }
                    }
                    while (applications.Count > 0);

                    mgrProcess.Status = AccountMgrProcessStatuses.Completed;
                    MigrationProcessRepository.Update(mgrProcess);
                }
            }
        }

        public OperationResult<Account> GetAccountForMigration(AccountSearchCriteria criteria)
        {
            var result = new OperationResult<Account>(OperationResultTypes.SuccessfullyCompleted);

            if (criteria.Register != Registers.PR)
            {
                return new OperationResult<Account>("EP_USRM_00001_E", "EP_USRM_00001_E");
            }

            criteria.Password = MD5Hash(criteria.Password);

            var account = OSSAccountRepository.Search(criteria).SingleOrDefault();

            if (account != null)
            {
                var mgrProcess = MigrationProcessRepository.Search(new AccountMigrationProcessSearchCriteria()
                {
                    MigrantUsername = account.Username,
                    Register = criteria.Register

                }).SingleOrDefault();

                if (mgrProcess != null)
                {
                    return new OperationResult<Account>("EP_USRM_00002_E", "EP_USRM_00002_E");
                }

                account.ClientID = account.UserID;
                result.Result = account;
            }
            else
            {
                return new OperationResult<Account>("EP_USRM_00001_E", "EP_USRM_00001_E");
            }

            return result;
        }

        public IEnumerable<AccountMigrationProcess> SearchAccountMigrationProcesses(AccountMigrationProcessSearchCriteria criteria)
        {
            return MigrationProcessRepository.Search(criteria);
        }

        public async Task<OperationResult<AccountMigrationProcess>> StartAccountMigrationProcessAsync(StartMigrationProcessRequest startRequest)
        {
            var migrationProcess = MigrationProcessRepository.Search(new AccountMigrationProcessSearchCriteria()
            {
                MigrantUsername = startRequest.MigrantUsername,
                Register = startRequest.Register
            }).SingleOrDefault();

            if (migrationProcess == null)
            {
                var accountResult = GetAccountForMigration(new AccountSearchCriteria()
                {
                    Username = startRequest.MigrantUsername,
                    Password = startRequest.MigrantPassword,
                    Register = startRequest.Register
                });

                if (!accountResult.IsSuccessfullyCompleted)
                {
                    return new OperationResult<AccountMigrationProcess>(accountResult.Errors);
                }

                migrationProcess = new AccountMigrationProcess()
                {
                    UserCIN = EPZEUUserAccessor.User?.CIN,
                    Register = startRequest.Register,
                    MigrantUserID = accountResult.Result.UserID,
                    MigrantClientID = accountResult.Result.ClientID,
                    MigrantUsername = accountResult.Result.Username,
                    MigrantAmount = accountResult.Result.Amount,
                    Status = AccountMgrProcessStatuses.ReadyForProcessing,
                    MigrationData = DateTime.Now
                };

                MigrationProcessRepository.Create(migrationProcess);
            }

            if (migrationProcess.Status == AccountMgrProcessStatuses.ReadyForProcessing)
            {
                await ActionDispatcher.SendAsync(new ProcessAccountMgrProcessesMessage() { MigrationProcessID = migrationProcess.MigrationProcessID });

                migrationProcess.Status = AccountMgrProcessStatuses.Processing;

                MigrationProcessRepository.Update(migrationProcess);
            }

            var result = new OperationResult<AccountMigrationProcess>(OperationResultTypes.SuccessfullyCompleted);
            result.Result = migrationProcess;

            return result;
        }

        #endregion

        #region Helpers

        Task MigrateMoneyAsync(AccountMigrationProcess mgrProcess)
        {
            return TransactionServiceClient.OSSPersonalAccountMergeAsync("AccountMgr_" + mgrProcess.MigrationProcessID, new Payments.PaymentOrders.Models.OSSPersonalAccountMergeRequest()
            {
                Amount = mgrProcess.MigrantAmount.Value,
                CIN = mgrProcess.UserCIN.Value,
                Register = (Payments.Common.Models.Registers)mgrProcess.Register,
                Note = string.Format("Захранване на лична сметка от обединен потребител {0} от регистър имотен регистър {1}.", mgrProcess.MigrantClientID, mgrProcess.Register == Registers.CR ?
                Labels.GetLabel("bg", "GL_CR_REG_NAME_L_SHORT_L") :
                Labels.GetLabel("bg", "GL_PR_REG_NAME_L"))
            });
        }

        Application MapOSSApplicationToApplication(OSSApplication ossApplication, int userCIN)
        {
            var application = new Application()
            {
                ApplicantCIN = userCIN,
                ApplicationType = ossApplication.ApplicationType,
                IncomingNumber = ossApplication.IncomingNumber,
                Register = Registers.PR,
                RegistrationDate = ossApplication.RegistrationTime,
                ResultHTML = string.Format("<span class=\"field-title field-title--preview d-sm-none\">{{GL_RESULT_L}} </span><p class=\"field-text\">{{PR_APP_STATUS_COMPLETED_L}}</p><p class=\"field-text\"><a href=\"baseApplicationURL/DocumentAccess/{0}\" target=\"_blank\">{{GL_RESULT_L}}</a> {{GL_NUMBER_ABBREVATION_L}} {1}/{2} {{GL_YEAR_ABBREVIATION_L}} {3} {{GL_HOUR_ABBREVIATION_L}}, {{GL_REGISTER_L}} „Справки чрез отдалечен достъп“</p>",
                    ossApplication.ResultDocumentGuid,
                    ossApplication.ResultNumber,
                    ossApplication.ResultDate.Value.ToString("dd.MM.yyyy"),
                    ossApplication.ResultDate.Value.ToString("HH:mm:ss")
                )
            };

            return application;
        }

        string MD5Hash(string input)
        {
            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }

        #endregion
    }
}
