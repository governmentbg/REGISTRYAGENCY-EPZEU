using CNSys;
using CNSys.Data;
using CNSys.Xml;
using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.CMS;
using EPZEU.Common;
using EPZEU.CR.ApplicationFormProviders;
using EPZEU.CR.ApplicationProcesses.MessageHandlers;
using EPZEU.CR.ApplicationProcesses.Models;
using EPZEU.CR.ApplicationProcesses.Repositories;
using EPZEU.CR.Applications.Models;
using EPZEU.CR.ApplicationUsers.Repositotories;
using EPZEU.CR.Common;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.CR.Reports;
using EPZEU.DocumentTemplates;
using EPZEU.Nomenclatures;
using EPZEU.Security;
using EPZEU.Signing;
using EPZEU.Signing.Models;
using EPZEU.Utilities;
using Integration.EPZEU;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace EPZEU.CR.ApplicationProcesses
{
    /// <summary>
    /// Заявка за създаване на заявление
    /// </summary>
    public class ApplicationRequest
    {
        /// <summary>
        /// Допълнителни данни
        /// </summary>
        public AdditionalData AdditionalData { get; set; }

        /// <summary>
        /// Тип на заявлението
        /// </summary>
        public Integration.EPZEU.Models.ApplicationFormTypes? ApplicationType { get; set; }
    }

    public class CompleteSigningResult
    {
        public long ApplicationProcessID { get; set; }
    }

    /// <summary>
    /// Интерфейс на услуга за работа с процеси по заявяване.
    /// </summary>
    public interface IApplicationProcessService
    {
        /// <summary>
        /// Търси процеси по заявяване.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Процеси по заявяване.</returns>
        Task<IEnumerable<ApplicationProcess>> SearchAsync(ApplicationProcessSearchCriteria criteria, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда всички данни за процес по заявяване.
        /// </summary>
        /// <param name="appl">Тип на заявлението.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Процес по заявяване.</returns>
        Task<OperationResult<ApplicationProcess>> LoadAsync(Integration.EPZEU.Models.ApplicationFormTypes appl, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда всички данни за процес по заявяване.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <returns>Процес по заявяване.</returns>
        Task<OperationResult<ApplicationProcess>> LoadAsync(long processID, CancellationToken cancellationToken);

        /// <summary>
        /// Стартира процес по заявяване.
        /// </summary>
        /// <param name="request">Заявка за създаване на процес по заявяване.</param>
        /// <returns>Процес по заявяване.</returns>
        Task<OperationResult<ApplicationProcess>> StartAsync(ApplicationRequest request, CancellationToken cancellationToken);

        /// <summary>
        /// Добавяме допълнителем ApplicationProcess
        /// </summary>
        /// <param name="parentProcessID"></param>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<OperationResult<ApplicationProcess>> AddChildApplicationProcessAsync(long parentProcessID, ApplicationRequest request, CancellationToken cancellationToken);

        /// <summary>
        /// Изтрива процес по заявяване.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name=""></param>
        /// <param name="cancellationToken"></param>
        /// <param name="deleteDocumentsInCr">Флаг, оказващ дали да изтрие и документите в търговския регистър</param>        
        Task DeleteAsync(long processID, CancellationToken cancellationToken, bool deleteDocumentsInCr = true);


        /// <summary>
        /// Търси заявление.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Заявления.</returns>
        Task<IEnumerable<Application>> SearchApplication(ApplicationSearchCriteria criteria, CancellationToken cancellationToken);

        /// <summary>
        /// Добавя заявление към процес по заявяване.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="request">Данни за заявление.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Заявление.</returns>
        Task<OperationResult<Application>> AddApplicationAsync(long processID, ApplicationRequest request, CancellationToken cancellationToken);

        /// <summary>
        /// Изтрива заявление от процес по заявяване.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="cancellationToken"></param>       
        Task DeleteApplicationAsync(long processID, long applID, CancellationToken cancellationToken);

        /// <summary>
        /// Обновява съдържанието на заявлението.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="applContent">Съдържание на заявлението.</param>
        Task<OperationResult> UpdateApplicationContentAsync(long processID, long applID, Stream applContent, CancellationToken cancellationToken);

        /// <summary>
        /// Търси документи прикачени към заявления.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Документи прикачени към заявления</returns>
        Task<IEnumerable<ApplicationDocument>> SearchApplicationDocumentsAsync(ApplicationDocumentSearchCriteria criteria, CancellationToken cancellationToken);

        /// <summary>
        /// Добавя документ към заявление.
        /// </summary>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="doc">Документ.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Документ.</returns>
        Task<OperationResult<ApplicationDocument>> AddApplicationDocumentAsync(long applID, ApplicationDocument doc, CancellationToken cancellationToken);

        /// <summary>
        /// Обновява документ прикачен към заявление.
        /// </summary>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="doc">Документ.</param>
        /// <param name="cancellationToken"></param>       
        Task<OperationResult> UpdateApplicationDocumentAsync(long applID, ApplicationDocument doc, CancellationToken cancellationToken);

        /// <summary>
        /// Изтрива документ прикачен към заявление.
        /// </summary>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="docID">Идентификатор на документ.</param>
        /// <param name="cancellationToken"></param>       
        Task DeleteApplicationDocumentAsync(long applID, long docID, CancellationToken cancellationToken);

        /// <summary>
        /// Започва процес по подписване на документ прикачен към заявление.
        /// </summary>
        /// <param name="applID">Идентификатор на заявление.</param>
        /// <param name="docID">Идентификатор на документ.</param>
        /// <param name="cancellationToken"></param>       
        Task<OperationResult<Guid>> StartSigningApplicationDocumentAsync(long applID, long docID, CancellationToken cancellationToken);

        /// <summary>
        /// Отказва процес по подписване на документ прикачен към заявление.
        /// </summary>
        /// <param name="signingGiud">Идентификатор на процес по подписване.</param>
        /// <param name="cancellationToken"></param>
        Task SigningApplicationDocumentRejectedAsync(Guid signingGiud, CancellationToken cancellationToken);

        /// <summary>
        /// Приключва процес по подписване на документ прикачен към заявление.
        /// </summary>
        /// <param name="signingGiud">Идентификатор на процес по подписване.</param>
        /// <param name="documentContent">Подписан документ.</param>
        /// <param name="cancellationToken"></param>     
        Task SigningApplicationDocumentCompletedAsync(Guid signingGiud, Stream documentContent, CancellationToken cancellationToken);

        /// <summary>
        /// Започва процес по подписване на заявление
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="cancellationToken"></param>
        Task<OperationResult<Guid>> StartSigningAsync(long processID, CancellationToken cancellationToken);

        /// <summary>
        /// Отказва процес по подписване на заявление
        /// </summary>
        /// <param name="signingGiud">Идентификатор на процес по подписване.</param>
        /// <param name="cancellationToken"></param>
        Task SigningRejectedAsync(Guid signingGiud, CancellationToken cancellationToken);

        /// <summary>
        /// Приключва процеса по подписването 
        /// </summary>
        /// <param name="signingGiud">Идентификатор на процес по подписване.</param>
        /// <param name="documentContent">Подписан документ.</param>
        /// <param name="userSessionID"></param>
        /// <param name="loginSessionID"></param>
        /// <param name="ipAddress"></param>
        /// <param name="userCIN"></param>
        /// <param name="cancellationToken"></param>    
        Task SigningCompletedAsync(Guid signingGiud, Stream documentContent, Guid? userSessionID, Guid? loginSessionID, string ipAddress, int? userCIN, CancellationToken cancellationToken);

        /// <summary>
        /// Стартира порцеса по изпращане на заявлението.
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="cancellationToken"></param>        
        Task<OperationResult> StartSendingAsync(long processID, CancellationToken cancellationToken);

        /// <summary>
        /// Изпраща заявление към back-end на търговския регистър
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>       
        Task SendAsync(string operationID, long processID);

        /// <summary>
        /// Пролучава отговор от ТР когато заявлението е регистрирано
        /// </summary>
        /// <param name="operationID"></param>      
        /// <param name="appsRequests">Регистрирани заявления в ТР</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task ApplicationsRegisteredAsync(string operationID, List<ApplicationRegisteredRequest> appsRequests, CancellationToken cancellationToken);

        /// <summary>
        /// Връща заявлението в първоначалния статус преди да е започнало подаването на заявленеито
        /// </summary>
        /// <param name="processID">Идентификатор на процес по заявяване.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<ProcessStatuses> ReturnToBeginningStatusAsync(long processID, CancellationToken cancellationToken);

        /// <summary>
        /// Проверява, дали за конкретния вид заявление може да се подава заявление
        /// </summary>
        /// <param name="appType"></param>
        /// <returns></returns>
        Task<bool> IsApplicationActiveAsync(Integration.EPZEU.Models.ApplicationFormTypes appType);

        Task<bool> HasChangeInApplicationsInitialDataAsync(ApplicationProcess appProcess);

        Task<bool> HasChangesInApplicationsNomenclatureAsync(ApplicationProcess appProcess);
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationProcessService за работа с процеси по заявяване.
    /// </summary>
    internal class ApplicationProcessService : IApplicationProcessService
    {
        #region Private members

        private readonly IApplicationDocumentRepository _applicationDocumentRepository = null;
        private readonly IApplicationRepository _applicationRepository = null;
        private readonly IApplicationProcessRepository _applicationProcessRepository = null;
        private readonly IApplicationProcessContentRepository _applicationProcessContentRepository = null;
        private readonly IApplicationFormProviderFactory _applicationFormProviderFactory = null;
        private readonly IApplicationServiceClient _integrationAppServiceClient = null;
        private readonly IFileServiceClient _integrationFileServiceClient = null;
        private readonly IDeedReportService _deedReportService = null;
        private readonly ISigningServiceClient _signingServiceClient = null;
        private readonly IAuditServiceClient _auditServiceClient = null;
        private readonly IDocumentTemplatesServiceClient _documentTemplatesServiceClient = null;
        private readonly IEPZEUUserAccessor _EPZEUUserAccessor;
        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;
        private readonly IActionDispatcher ActionDispatcher;
        private readonly IIdempotentOperationExecutor OperationExecutor;
        private readonly IAppUserRepository _appUserRepository;
        private readonly GlobalOptions _globalOptions;

        //Nomenclatures
        private readonly ICountries _countries = null;
        private readonly IEkatte _ekatte = null;
        private readonly INKID _nkid = null;
        private readonly IAuthorities _authorities = null;
        private readonly ILegalForms _legalForms = null;
        private readonly IApplicationDocumentTypes _applicationDocumentTypes = null;
        private readonly IForeignLegalForms _foreignLegalForms = null;
        private readonly IForeignComRegisters _foreignComRegisters = null;
        private readonly IActs _acts = null;
        private readonly IReleaseReasons _releaseReasons = null;
        private readonly ILabels _labels = null;
        private readonly IServices _services = null;
        private readonly IApplicationTypes _applicationTypes = null;
        private readonly IPages _pages = null;
        private readonly IBulstatReportServiceClient _bulstatReportServiceClient = null;


        private readonly List<Integration.EPZEU.Models.ApplicationFormTypes> applicationFormWithoutSigning = new List<Integration.EPZEU.Models.ApplicationFormTypes>()
        {
            Integration.EPZEU.Models.ApplicationFormTypes.CertificateForReserveFirm,
            Integration.EPZEU.Models.ApplicationFormTypes.ActOrCopyOfActCertificate,
            Integration.EPZEU.Models.ApplicationFormTypes.EnteredCircumstancesCertificate,
            Integration.EPZEU.Models.ApplicationFormTypes.MissingActsCertificate,
            Integration.EPZEU.Models.ApplicationFormTypes.PublicationByPeriodCertificate,
            Integration.EPZEU.Models.ApplicationFormTypes.EntryByPeriodCertificate,
            Integration.EPZEU.Models.ApplicationFormTypes.ActualStateCertificate
        };

        #endregion

        #region Constructor

        public ApplicationProcessService(
            IApplicationDocumentRepository appDocumentRepository,
            IApplicationRepository appRepository,
            IApplicationProcessRepository applicationProcessRepository,
            IApplicationProcessContentRepository processContentRepository,
            IApplicationFormProviderFactory applicationFormProviderFactory,
            IApplicationServiceClient integrationAppServiceClient,
            IFileServiceClient integrationDocServiceClient,
            IDeedReportService deedReportService,
            ISigningServiceClient signingServiceClient,
            IAuditServiceClient auditServiceClient,
            IDocumentTemplatesServiceClient documentTemplatesServiceClient,
            IApplicationTypes applicationTypes,
            IEPZEUUserAccessor EPZEUUserAccessor,
            IDbContextOperationExecutor dbContextOperationExecutor,
            ICountries countries,
            IEkatte ekatte,
            INKID nkid,
            IAuthorities authorities,
            ILegalForms legalForms,
            IApplicationDocumentTypes applicationDocumentTypes,
            IForeignLegalForms foreignLegalForms,
            IForeignComRegisters foreignComRegisters,
            IActs acts,
            IReleaseReasons releaseReasons,
            IIdempotentOperationExecutor idempotentOperationExecutor,
            IActionDispatcher actionDispatcher,
            IAppUserRepository appUserRepository,
            IOptionsMonitor<GlobalOptions> globalOptions,
            ILabels labels,
            IServices services,
            IBulstatReportServiceClient bulstatReportServiceClient,
            IPages pages)
        {
            _applicationDocumentRepository = appDocumentRepository;
            _applicationRepository = appRepository;
            _applicationProcessRepository = applicationProcessRepository;
            _applicationProcessContentRepository = processContentRepository;
            _applicationFormProviderFactory = applicationFormProviderFactory;
            _integrationAppServiceClient = integrationAppServiceClient;
            _integrationFileServiceClient = integrationDocServiceClient;
            _deedReportService = deedReportService;
            _signingServiceClient = signingServiceClient;
            _auditServiceClient = auditServiceClient;
            OperationExecutor = idempotentOperationExecutor;
            _documentTemplatesServiceClient = documentTemplatesServiceClient;
            _EPZEUUserAccessor = EPZEUUserAccessor;
            _dbContextOperationExecutor = dbContextOperationExecutor;
            _appUserRepository = appUserRepository;
            _globalOptions = globalOptions.CurrentValue;

            _countries = countries;
            _ekatte = ekatte;
            _nkid = nkid;
            _authorities = authorities;
            _legalForms = legalForms;
            _applicationDocumentTypes = applicationDocumentTypes;
            _foreignLegalForms = foreignLegalForms;
            _foreignComRegisters = foreignComRegisters;
            _acts = acts;
            _releaseReasons = releaseReasons;
            _applicationTypes = applicationTypes;
            _services = services;
            _bulstatReportServiceClient = bulstatReportServiceClient;
            _pages = pages;

            ActionDispatcher = actionDispatcher;

            _labels = labels;
        }

        #endregion

        #region IApplicationProcessService

        public Task<OperationResult<ApplicationProcess>> LoadAsync(Integration.EPZEU.Models.ApplicationFormTypes applType, CancellationToken cancellationToken)
        {
            return LoadInternalAsync(null, applType, cancellationToken);
        }

        public Task<OperationResult<ApplicationProcess>> LoadAsync(long processID, CancellationToken cancellationToken)
        {
            return LoadInternalAsync(processID, null, cancellationToken);
        }

        public Task<IEnumerable<ApplicationProcess>> SearchAsync(ApplicationProcessSearchCriteria criteria, CancellationToken cancellationToken)
        {
            return _applicationProcessRepository.SearchAsync(criteria, cancellationToken);
        }

        public async Task DeleteAsync(long processID, CancellationToken cancellationToken, bool deleteDocumentsInCrBackEnd = true)
        {
            ApplicationProcess processToDelete = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
            {
                ApplicationProcessID = processID,
                LoadOption = new ApplicationProcessLoadOption()
                {
                    LoadApplicationDocuments = true,
                    LoadApplications = true,
                    LoadChildApplicationProcesses = true
                }
            }, cancellationToken)).SingleOrDefault();

            if (processToDelete != null &&
                (processToDelete.Status == ProcessStatuses.Accepted ||
                (!processToDelete.ParentApplicationProcessID.HasValue &&
                (processToDelete.Status == ProcessStatuses.ReadyForSending || processToDelete.Status == ProcessStatuses.Sending))))
            {
                throw new InvalidOperationException(string.Format("Can't delete application in status {0}.", processToDelete.Status));
            }

            if (processToDelete != null && processToDelete.ChildApplicationProcesses != null && processToDelete.ChildApplicationProcesses.Count > 0)
            {
                foreach (var process in processToDelete.ChildApplicationProcesses)
                {
                    await DeleteAsync(process.ApplicationProcessID.Value, cancellationToken, deleteDocumentsInCrBackEnd);
                }
            }

            if (processToDelete != null)
            {
                var guidsToDelete = new List<string>();
                processToDelete.Applications.ForEach(app =>
                {
                    if (app.Documents != null)
                    {
                        guidsToDelete.AddRange(app.Documents.Select(ad => ad.BackofficeGuid));
                    }
                });

                await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext, token) =>
                {
                    //Изтриваме всички прикачени файлове към заявленията
                    foreach (var app in processToDelete.Applications)
                    {
                        if (app.Documents != null)
                        {
                            foreach (var d in app.Documents)
                            {
                                await _applicationDocumentRepository.DeleteAsync(d, token);
                            }
                        }
                    }

                    //Изтриваме самите заявления.
                    //За целта премахваме връзката на пакета с главното заявление.
                    processToDelete.MainApplicationID = null;
                    await _applicationProcessRepository.UpdateAsync(processToDelete, token);

                    foreach (var app in processToDelete.Applications)
                    {
                        await _applicationRepository.DeleteAsync(app.ApplicationID, token);
                    }

                    //Изтриваме съдържанията на заявленията към пакета.
                    var applicationContentsToDelete = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                    {
                        ApplicationProcessID = processID
                    }, token)).ToList();

                    foreach (var item in applicationContentsToDelete)
                    {
                        await _applicationProcessContentRepository.DeleteAsync(item.ApplicationProcessContentID, token);
                    }

                    //Изтриваме самия пакет.
                    await _applicationProcessRepository.DeleteAsync(processID, token);

                    return new OperationResult<object>(OperationResultTypes.SuccessfullyCompleted);
                }, cancellationToken);

                if (deleteDocumentsInCrBackEnd && processToDelete.Status != ProcessStatuses.Completed)
                {
                    //Изтриваме прикачените към заявленията файлове в ТР.
                    var docDeleteTasks = new List<Task>();

                    processToDelete.Applications.ForEach(app =>
                    {
                        if (app.Documents != null)
                        {
                            app.Documents.ForEach(d =>
                            {
                                if (CanDeleteDocumentInCR(d))
                                {
                                    docDeleteTasks.Add(_integrationFileServiceClient.DeleteFileAsync(d.BackofficeGuid));
                                }
                            });
                        }
                    });

                    //Изчакваме да приключи изтриването
                    foreach (var dt in docDeleteTasks)
                    {
                        await dt;
                    };
                }

                //Изтриваме заявките за подписване на шабло на документи в модула за подписване
                var temlatesDocsSignGuids = processToDelete.Applications.SelectMany(app => app.Documents != null ?
                    app.Documents.Where(d => string.IsNullOrEmpty(d.BackofficeGuid) && d.SigningGuid.HasValue).Select(d => d.SigningGuid.Value) :
                    new List<Guid>()).ToArray();

                if (temlatesDocsSignGuids.Count() > 0)
                {
                    await _signingServiceClient.DeleteSigningProcessesAsync(temlatesDocsSignGuids, cancellationToken);
                }
            }
        }

        public Task<OperationResult<ApplicationProcess>> StartAsync(ApplicationRequest request, CancellationToken cancellationToken)
        {
            return StartApplicationProcessAsync(request, cancellationToken);
        }

        public Task<OperationResult<ApplicationProcess>> AddChildApplicationProcessAsync(long parentProcessID, ApplicationRequest request, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async (dbcontext, token) =>
            {
                var parentProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = parentProcessID,
                    IsParent = true,
                    LoadOption = new ApplicationProcessLoadOption()
                    {
                        LoadChildApplicationProcesses = true,
                        LoadApplications = true,
                        LoadApplicationContent = true,
                        LoadApplicationDocuments = true
                    }
                }, token)).SingleOrDefault();

                if (parentProcess == null)
                {
                    throw new ArgumentException(string.Format("There is no parent process with ApplicationProcessID {0}.", parentProcessID));
                }

                if (parentProcess.Status != ProcessStatuses.WaitPreregistrationCompletion)
                {
                    throw new ArgumentException(string.Format("Parent ApplicationProcessID {0} is not with status WaitPreregistrationCompletion.", parentProcessID));
                }

                if (parentProcess.ChildApplicationProcesses != null && parentProcess.ChildApplicationProcesses.Any(p => p.Status != ProcessStatuses.Sending))
                {
                    throw new ArgumentException(string.Format("There is chiled ApplicationProcess for parent with ApplicationProcessID {0}, which is not with status Sending.", parentProcessID));
                }

                if (parentProcess != null && parentProcess.Status == ProcessStatuses.WaitPreregistrationCompletion && parentProcess.ChildApplicationProcesses != null)
                {
                    for (var i = 0; i < parentProcess.ChildApplicationProcesses.Count; i++)
                    {
                        var childProcess = parentProcess.ChildApplicationProcesses[i];

                        var newChildProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                        {
                            ApplicationProcessID = childProcess.ApplicationProcessID,
                            IsParent = false,
                            LoadOption = new ApplicationProcessLoadOption()
                            {
                                LoadApplications = true
                            }
                        }, token)).Single();

                        parentProcess.ChildApplicationProcesses[i] = newChildProcess;
                    }
                }

                var possibleAppType = request.AdditionalData["state"] == ((int)ProcessStates.New).ToString() ?
                    GetPossiblePreregistrationNewPackegesTypes(parentProcess) :
                    GetPossiblePreregistrationChangePackegesTypes(parentProcess);

                if (!possibleAppType.Contains(request.ApplicationType.Value))
                {
                    throw new ArgumentException(string.Format("Application with type {0} can't be add to process with id {1}.", request.ApplicationType, parentProcessID));
                }

                return await StartApplicationProcessAsync(request, token, parentProcess);
            }, cancellationToken);
        }


        public Task<IEnumerable<Application>> SearchApplication(ApplicationSearchCriteria criteria, CancellationToken cancellationToken)
        {
            return _applicationRepository.SearchAsync(criteria, cancellationToken);
        }

        public Task<OperationResult<Application>> AddApplicationAsync(long processID, ApplicationRequest request, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async (dbcontext, token) =>
            {
                var process = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = processID,
                    LoadOption = new ApplicationProcessLoadOption()
                    {
                        LoadApplications = true,
                        LoadApplicationContent = true
                    }
                }, token)).SingleOrDefault();

                if (process == null)
                {
                    throw new ArgumentException("No process with processID: " + processID);
                }

                var additionalApplicationFormTypes = GetAdditionalApplicationFormTypes(process.Applications.Single(appl => appl.ApplicationID == process.MainApplicationID),
                                                    process.Applications.Where(appl => appl.ApplicationID != process.MainApplicationID).Select(appl => appl.Type.Value).ToList());

                if (!additionalApplicationFormTypes.Contains(request.ApplicationType.Value))
                {
                    throw new ArgumentException("Can't add additional application.");
                }

                var appJsonStreamResult = await CreateAndInitApplicationAsync(request, process.Applications.Single(appl => appl.ApplicationID == process.MainApplicationID));

                if (!appJsonStreamResult.IsSuccessfullyCompleted)
                {
                    return new OperationResult<Application>(appJsonStreamResult.Errors);
                }

                ApplicationProcessContent appContent = null;

                using (appJsonStreamResult.Result)
                {
                    appContent = await CreateApplicationProcessJsonContent(processID, appJsonStreamResult.Result, token);
                }

                var app = new Application()
                {
                    ApplicationContentID = appContent.ApplicationProcessContentID,
                    ApplicationProcessID = process.ApplicationProcessID,
                    Type = request.ApplicationType,
                    AdditionalData = request.AdditionalData,
                    Order = (short)(process.Applications.Max(a => a.Order) + 1),
                };
                await _applicationRepository.CreateAsync(app, token);

                var result = new OperationResult<Application>(OperationResultTypes.SuccessfullyCompleted);

                result.Result = (await _applicationRepository.SearchAsync(new ApplicationSearchCriteria()
                {
                    ApplicationProcessID = process.ApplicationProcessID,
                    ApplicationIDs = new List<long>() { app.ApplicationID.Value },
                    LoadOption = new ApplicationLoadOption()
                    {
                        LoadApplicationContent = true,
                        LoadApplicationDocuments = true
                    }
                }, token)).Single();

                return result;
            }, cancellationToken);
        }

        public async Task DeleteApplicationAsync(long processID, long applID, CancellationToken cancellationToken)
        {
            Application appToDelete = null;

            await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext, token) =>
            {
                //Проверяваме дали подаденото ID не е MainApplicationId
                var process = await _applicationProcessRepository.ReadAsync(processID, token);
                if (process.MainApplicationID == applID)
                {
                    throw new ArgumentException("Can't delete main application.");
                }

                //Взимаме си всички документи за заявлението
                appToDelete = (await _applicationRepository.SearchAsync(new ApplicationSearchCriteria()
                {
                    ApplicationProcessID = processID,
                    ApplicationIDs = new List<long>() { applID },
                    LoadOption = new ApplicationLoadOption()
                    {
                        LoadApplicationDocuments = true
                    }
                }, token)).SingleOrDefault();

                if (appToDelete != null)
                {
                    if (appToDelete.Documents != null && appToDelete.Documents.Count > 0)
                    {
                        //Изтриваме всички документи по заявлението
                        foreach (var d in appToDelete.Documents)
                        {
                            await _applicationDocumentRepository.DeleteAsync(d, token);
                        }
                    }

                    //Изтриваме заявлението
                    await _applicationRepository.DeleteAsync(applID, token);

                    //Изтриваме съдържанието на заявлението
                    await _applicationProcessContentRepository.DeleteAsync(appToDelete.ApplicationContentID, token);
                }

                return new OperationResult<object>(OperationResultTypes.SuccessfullyCompleted);
            }, cancellationToken);

            if (appToDelete != null && appToDelete.Documents != null && appToDelete.Documents.Count > 0)
            {
                //Изтриваме прикачените към заявленията файлове в ТР.
                var docDeleteTasks = new List<Task>();

                appToDelete.Documents.ForEach(d =>
                {
                    if (CanDeleteDocumentInCR(d))
                    {
                        docDeleteTasks.Add(_integrationFileServiceClient.DeleteFileAsync(d.BackofficeGuid));
                    }
                });

                //Изчакваме да приключи изтриването
                foreach (var dt in docDeleteTasks)
                {
                    await dt;
                };

                //Изтриваме заявките за подписване на шабло на документи в модула за подписване
                var temlatesDocsSignGuids = appToDelete.Documents.Where(d => string.IsNullOrEmpty(d.BackofficeGuid) && d.SigningGuid.HasValue).Select(d => d.SigningGuid.Value).ToArray();

                if (temlatesDocsSignGuids.Count() > 0)
                {
                    await _signingServiceClient.DeleteSigningProcessesAsync(temlatesDocsSignGuids, cancellationToken);
                }
            }
        }

        public Task<OperationResult> UpdateApplicationContentAsync(long processID, long applID, Stream appContent, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                using (appContent)
                {
                    var application = (await _applicationRepository.SearchAsync(new ApplicationSearchCriteria()
                    {
                        ApplicationProcessID = processID,
                        ApplicationIDs = new List<long>() { applID },
                        LoadOption = new ApplicationLoadOption()
                        {
                            LoadApplicationDocuments = true,
                            LoadApplicationContent = true
                        }
                    }, cancellationToken)).SingleOrDefault();

                    if (application == null || application.ApplicationContent == null)
                    {
                        return new OperationResult("CR_GL_NO_APP_PROCESS_WITH_THIS_ID_E", "CR_GL_NO_APP_PROCESS_WITH_THIS_ID_E");
                    }

                    var provider = _applicationFormProviderFactory.CreateApplicationProvider(application.Type.Value);

                    await provider.LoadFromJsonAsync(appContent);

                    //Ако има разлика между документите записани в заявлението и тези записани в процеса не позволяваме промените да бъдат запазени
                    if (
                        //Има документи в заявлението но няма в процеса
                        ((provider.ApplicationForm.Documents != null && provider.ApplicationForm.Documents.Count > 0) && (application.Documents == null || application.Documents.Count == 0)) ||
                        //Броя на документите в заявлението е по-голям от тези в процеса
                        (provider.ApplicationForm.Documents != null && application.Documents != null && provider.ApplicationForm.Documents.Count > application.Documents.Count) ||
                        //Има еднакъв брой документи но се различават по идентификаторите си
                        (provider.ApplicationForm.Documents != null && application.Documents != null && provider.ApplicationForm.Documents.Any(pd => !application.Documents.Any(ad => ad.BackofficeGuid == pd.Guid))))
                    {
                        return new OperationResult("GL_INCONSISTENCY_BETWEEN_NUMBER_DOCS_APPLICATION_AND_SERVER_E", "GL_INCONSISTENCY_BETWEEN_NUMBER_DOCS_APPLICATION_AND_SERVER_E");
                    }

                    appContent.Position = 0;

                    application.ApplicationContent.Content = appContent;

                    await _applicationProcessContentRepository.UpdateAsync(application.ApplicationContent, cancellationToken);


                    return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                }
            });
        }


        public Task<IEnumerable<ApplicationDocument>> SearchApplicationDocumentsAsync(ApplicationDocumentSearchCriteria criteria, CancellationToken cancellationToken)
        {
            return _applicationDocumentRepository.SearchAsync(criteria, cancellationToken);
        }

        public Task<OperationResult<ApplicationDocument>> AddApplicationDocumentAsync(long applID, ApplicationDocument doc, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                if (doc.ApplicationID != applID)
                {
                    return new OperationResult<ApplicationDocument>("GL_DOCUMENT_NOT_FOUND_E", "GL_DOCUMENT_NOT_FOUND_E");
                }

                if (doc.Content != null)
                {
                    using (doc.Content)
                    {
                        await SendDocumentToCRBackoffice(doc);
                    }
                }

                await _applicationDocumentRepository.CreateAsync(doc, cancellationToken);

                var result = new OperationResult<ApplicationDocument>(OperationResultTypes.SuccessfullyCompleted) { Result = doc };

                return result;
            });
        }

        public async Task<OperationResult> UpdateApplicationDocumentAsync(long applID, ApplicationDocument appDoc, CancellationToken cancellationToken)
        {
            return await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                var appDocToUpdate = (await SearchApplicationDocumentsAsync(new ApplicationDocumentSearchCriteria()
                {
                    ApplDocumentIDs = new List<long>() { appDoc.ApplicationDocumentID.Value },
                    ApplicationIDs = new List<long>() { applID }
                }, cancellationToken)).SingleOrDefault();

                appDocToUpdate.DocumentTypeID = appDoc.DocumentTypeID;
                appDocToUpdate.Name = appDoc.Name;
                appDocToUpdate.HtmlTemplateContent = appDoc.HtmlTemplateContent;

                await _applicationDocumentRepository.UpdateAsync(appDocToUpdate, cancellationToken);

                return new OperationResult<ApplicationDocument>(OperationResultTypes.SuccessfullyCompleted);
            });
        }

        public async Task DeleteApplicationDocumentAsync(long applID, long docID, CancellationToken cancellationToken)
        {
            await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                var appDoc = (await SearchApplicationDocumentsAsync(new ApplicationDocumentSearchCriteria()
                {
                    ApplDocumentIDs = new List<long>() { docID },
                    ApplicationIDs = new List<long>() { applID }
                }, cancellationToken)).SingleOrDefault();

                if (appDoc != null)
                {
                    if (appDoc.ApplicationID != applID)
                    {
                        throw new ArgumentException(string.Format("Document with documentID: {0} is not part of application with ID: {1}.", applID, docID));
                    }

                    if (CanDeleteDocumentInCR(appDoc))
                    {
                        //Изтриваме съдържанието на документа по BackofficeGuid.
                        await _integrationFileServiceClient.DeleteFileAsync(appDoc.BackofficeGuid);
                    }

                    //Изтриваме заявките за подписване на шабло на документи в модула за подписване      
                    if (string.IsNullOrEmpty(appDoc.BackofficeGuid) && appDoc.SigningGuid.HasValue)
                    {
                        await _signingServiceClient.DeleteSigningProcessesAsync(new Guid[] { appDoc.SigningGuid.Value }, cancellationToken);
                    }

                    await _applicationDocumentRepository.DeleteAsync(appDoc, cancellationToken);
                }

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });
        }

        public async Task<OperationResult<Guid>> StartSigningApplicationDocumentAsync(long applID, long docID, CancellationToken cancellationToken)
        {
            var appDoc = (await SearchApplicationDocumentsAsync(new ApplicationDocumentSearchCriteria()
            {
                ApplDocumentIDs = new List<long>() { docID },
                ApplicationIDs = new List<long>() { applID }
            }, cancellationToken)).SingleOrDefault();

            var createDocReq = new DocumentTemplates.Models.CreateDocumentRequest()
            {
                FileName = appDoc.Name,
                HtmlTemplateContent = appDoc.HtmlTemplateContent
            };

            var pdfDoc = await _documentTemplatesServiceClient.CreateDocumentAsync(createDocReq);

            var signingRequest = new SigningRequest()
            {
                Content = pdfDoc.Content,
                Format = SigningFormats.PAdES,
                FileName = pdfDoc.FileName,
                ContentType = pdfDoc.ContentType,
                CompletedCallbackUrl = (_globalOptions.GL_CR_API + "/ApplicationProcesses/SigningApplicationDocumentCompleted").Replace("//ApplicationProcesses", "/ApplicationProcesses"),
                RejectedCallbackUrl = (_globalOptions.GL_CR_API + "/ApplicationProcesses/SigningApplicationDocumentRejected").Replace("//ApplicationProcesses", "/ApplicationProcesses"),
                SignerRequests = new List<SignerRequest>() { new SignerRequest() }
            };

            var signingGuid = await _signingServiceClient.CreateSigningProcessAsync(signingRequest, cancellationToken);
            appDoc.SigningGuid = signingGuid;

            await _applicationDocumentRepository.UpdateAsync(appDoc, cancellationToken);

            var result = new OperationResult<Guid>(OperationResultTypes.SuccessfullyCompleted) { Result = signingGuid };

            return result;
        }

        public async Task SigningApplicationDocumentRejectedAsync(Guid signingGiud, CancellationToken cancellationToken)
        {
            await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {

                var appDoc = (await SearchApplicationDocumentsAsync(new ApplicationDocumentSearchCriteria()
                {
                    SigningGiud = signingGiud
                }, cancellationToken)).SingleOrDefault();

                var signingGuid = appDoc.SigningGuid.Value;

                appDoc.SigningGuid = null;

                await _applicationDocumentRepository.UpdateAsync(appDoc, cancellationToken);

                var application = (await SearchApplication(new ApplicationSearchCriteria()
                {
                    ApplicationIDs = new List<long>() { appDoc.ApplicationID.Value },
                    LoadOption = new ApplicationLoadOption()
                    {
                        LoadApplicationContent = true
                    }
                }, cancellationToken)).Single();

                var appProvider = await GetApplicationProviderAsync(application);
                var appContentDocument = appProvider.ApplicationForm.Documents.Single(d => d.ApplicationDocumentID == appDoc.ApplicationDocumentID);
                appContentDocument.SigningGuid = null;

                using (var ms = new MemoryStream())
                {
                    await appProvider.SaveAsJsonAsync(ms);

                    ms.Position = 0;
                    application.ApplicationContent.Content = ms;

                    await _applicationProcessContentRepository.UpdateAsync(application.ApplicationContent, cancellationToken);
                }

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });
        }

        public Task SigningApplicationDocumentCompletedAsync(Guid signingGiud, Stream documentContent, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                var appDoc = (await SearchApplicationDocumentsAsync(new ApplicationDocumentSearchCriteria()
                {
                    SigningGiud = signingGiud
                }, cancellationToken)).SingleOrDefault();

                var application = (await SearchApplication(new ApplicationSearchCriteria()
                {
                    ApplicationIDs = new List<long>() { appDoc.ApplicationID.Value },
                    LoadOption = new ApplicationLoadOption()
                    {
                        LoadApplicationContent = true
                    }
                }, cancellationToken)).Single();

                var appProvider = await GetApplicationProviderAsync(application);
                var appContentDocument = appProvider.ApplicationForm.Documents.Single(d => d.ApplicationDocumentID == appDoc.ApplicationDocumentID);

                using (documentContent)
                {
                    var crIntegrationDocument = new Integration.EPZEU.Models.FileContentStream()
                    {
                        FileName = appDoc.Name + ".pdf",
                        ContentType = "application/pdf",
                        Content = documentContent
                    };

                    var response = await _integrationFileServiceClient.CreateFileAsync(crIntegrationDocument);

                    appDoc.BackofficeGuid = response.Guid;
                    appDoc.FileMetadata = response;
                    appDoc.FileMetadata.Guid = response.Guid;
                    appDoc.HtmlTemplateContent = null;
                    appDoc.SigningGuid = null;

                    appContentDocument.SigningGuid = null;
                    appContentDocument.HtmlTemplateContent = null;
                    appContentDocument.Guid = response.Guid;
                    appContentDocument.NumberOfPages = response.NumberOfPages;
                    appContentDocument.Size = response.Size;
                    appContentDocument.Hash = response.Hash;
                    appContentDocument.HashAlgorithm = response.HashAlgorithm;
                    appContentDocument.ContentType = response.ContentType;
                    appContentDocument.FileName = response.FileName;
                }

                using (var ms = new MemoryStream())
                {
                    await appProvider.SaveAsJsonAsync(ms);

                    ms.Position = 0;
                    application.ApplicationContent.Content = ms;

                    await _applicationProcessContentRepository.UpdateAsync(application.ApplicationContent, cancellationToken);
                }

                await _applicationDocumentRepository.UpdateAsync(appDoc, cancellationToken);

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });
        }


        public async Task<OperationResult<Guid>> StartSigningAsync(long processID, CancellationToken cancellationToken)
        {
            ApplicationProcess appProcess = null;
            MemoryStream xmlStream = new MemoryStream();
            OperationResult<Guid> result = null;

            using (xmlStream)
            {
                SigningRequest signingRequest = null;
                IApplicationProvider mainAppProvider = null;

                result = await _dbContextOperationExecutor.ExecuteAsync<Guid>(async (dbcontext, token) =>
                {
                    appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                    {
                        ApplicationProcessID = processID,
                        LoadOption = new ApplicationProcessLoadOption()
                        {
                            LoadApplications = true,
                            LoadApplicationDocuments = true,
                            LoadApplicationContent = true
                        }
                    }, token)).SingleOrDefault();

                    if (appProcess.Status == ProcessStatuses.Signing)
                    {
                        var res = new OperationResult<Guid>(OperationResultTypes.SuccessfullyCompleted);
                        res.Result = appProcess.SigningGuid.Value;

                        return res;
                    }

                    #region Проверяваме дали процеса по заявяване може да буде изпратен

                    if (appProcess.Status != ProcessStatuses.InProcess)
                    {
                        throw new ArgumentException("Only application process is status InProcess can used action StartSigning.");
                    }

                    var hasChangeInApplicationsInitialData = await HasChangeInApplicationsInitialDataAsync(appProcess);

                    if (await HasChangesInApplicationsNomenclatureAsync(appProcess))
                        return new OperationResult<Guid>("CR_APP_CHANGED_NOMENCLATURES_I", "CR_APP_CHANGED_NOMENCLATURES_I");

                    if (hasChangeInApplicationsInitialData)
                        return new OperationResult<Guid>("CR_APP_CHANGED_BATCH_FOR_APP_I", "CR_APP_CHANGED_BATCH_FOR_APP_I");

                    mainAppProvider = await GetMainApplicationProviderForSingingAsync(appProcess);

                    //Добавяме актуалния текст на GDPR Agreement
                    mainAppProvider.SetGDPRAgreementText(_labels.GetLabel(System.Globalization.CultureInfo.CurrentCulture.Name, "CR_APP_INFORMED_AGREEMENT_TEXT_L"));

                    //Валидираме съдържанието на документа
                    var errors = await mainAppProvider.ValidateAsync();

                    if (errors != null && errors.Count > 0)
                        return new OperationResult<Guid>(errors);

                    #endregion

                    #region Ако има документ подготвен за изпращане за подпис го изтриваме

                    var appDocumentContent = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                    {
                        ApplicationProcessID = processID,
                        Type = ApplicationProcessContentTypes.PackageXML
                    }, token)).SingleOrDefault();

                    if (appDocumentContent != null)
                    {
                        await _applicationProcessContentRepository.DeleteAsync(appDocumentContent, token);
                    }

                    #endregion

                    #region Създаваме запис за документа, който трябва да се подпише

                    using (var writer = XmlWriter.Create(xmlStream, new XmlWriterSettings { Encoding = new UTF8Encoding(false) }))
                    {
                        mainAppProvider.SaveAsXml(writer);
                    }

                    xmlStream.Position = 0;

                    var appXmlContent = new ApplicationProcessContent()
                    {
                        ApplicationProcessID = processID,
                        Type = ApplicationProcessContentTypes.PackageXML,
                        Content = xmlStream
                    };

                    await _applicationProcessContentRepository.CreateAsync(appXmlContent, token);

                    #endregion

                    return new OperationResult<Guid>(OperationResultTypes.SuccessfullyCompleted);
                }, cancellationToken);

                if (!result.IsSuccessfullyCompleted || (result.Result != null && result.Result != default(Guid)))
                {
                    return result;
                }

                #region Създаваме запис в приложението за подписване

                xmlStream.Position = 0;
                signingRequest = CreateApplicationSigningRequest(mainAppProvider, xmlStream, mainAppProvider.ApplicationForm.AppType);

                var signingGiud = await _signingServiceClient.CreateSigningProcessAsync(signingRequest, cancellationToken);

                #endregion

                #region Подменяме статуса на заявлението на Signing

                await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
                {
                    if (appProcess.AdditionalData == null)
                    {
                        appProcess.AdditionalData = new AdditionalData();
                    }

                    appProcess.Status = ProcessStatuses.Signing;
                    appProcess.SigningGuid = signingGiud;

                    appProcess.AdditionalData["userSessionID"] = _EPZEUUserAccessor.UserSessionID.ToString();
                    appProcess.AdditionalData["loginSessionID"] = _EPZEUUserAccessor.User?.LoginSessionID.ToString();
                    appProcess.AdditionalData["ipAddress"] = _EPZEUUserAccessor.RemoteIpAddress.ToString();
                    appProcess.AdditionalData["userCIN"] = _EPZEUUserAccessor.User?.CIN.ToString();

                    result.Result = signingGiud;

                    await _applicationProcessRepository.UpdateAsync(appProcess);

                    return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                });

                #endregion
            }

            return result;
        }

        public async Task SigningRejectedAsync(Guid signingGiud, CancellationToken cancellationToken)
        {
            await OperationExecutor.ExecuteOrRestoreAsync<ProcessStatuses>(signingGiud.ToString(), (int)Common.Models.ServiceOperationTypes.ApplicationProcessRejectSigning, async (ctx) =>
            {
                var appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    SigningGiud = signingGiud
                }, cancellationToken)).Single();

                if (appProcess.Status != ProcessStatuses.Signing)
                {
                    throw new ArgumentException("Only application process is status Signing can used action RejectSigning.");
                }

                var documentContent = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                {
                    ApplicationProcessID = appProcess.ApplicationProcessID,
                    Type = ApplicationProcessContentTypes.PackageXML
                }, cancellationToken)).Single();

                appProcess.Status = ProcessStatuses.InProcess;
                appProcess.SigningGuid = null;

                await _applicationProcessRepository.UpdateAsync(appProcess, cancellationToken);

                await _applicationProcessContentRepository.DeleteAsync(documentContent, cancellationToken);

                ctx.Result = ProcessStatuses.InProcess;
            });
        }

        public async Task SigningCompletedAsync(Guid signingGiud, Stream signDocumentContent, Guid? userSessionID, Guid? loginSessionID, string ipAddress, int? userCIN, CancellationToken cancellationToken)
        {
            var operationResult = await OperationExecutor.ExecuteOrRestoreAsync<CompleteSigningResult>(signingGiud.ToString(), (int)Common.Models.ServiceOperationTypes.ApplicationProcessCompleteSigning, async (ctx) =>
            {
                var appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    SigningGiud = signingGiud,
                    LoadOption =
                {
                    LoadApplications = true
                }
                }, cancellationToken)).SingleOrDefault();

                if (appProcess == null)
                {
                    throw new ArgumentException(string.Format("Can't complete signing no process with signingGiud {0}. ", signingGiud));
                }

                if (appProcess.Status != ProcessStatuses.Signing)
                {
                    throw new ArgumentException(string.Format("Can't complete signing for ApplicationProcess with ID: {0}. Process not in Signing status.", appProcess.ApplicationProcessID));
                }

                var signDocumentContentBuffer = new MemoryStream();
                signDocumentContent.CopyTo(signDocumentContentBuffer);

                using (signDocumentContentBuffer)
                {

                    #region Десеризираме съдържанието на подписаното заявление.

                    signDocumentContentBuffer.Position = 0;
                    XmlDocument signedDocumentXml = null;
                    signedDocumentXml = XmlHelpers.CreateXmlDocument(signDocumentContentBuffer);

                    #endregion

                    #region Изчитаме съдържанието на заявлението преди подписването.

                    var documentContent = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                    {
                        ApplicationProcessID = appProcess.ApplicationProcessID,
                        Type = ApplicationProcessContentTypes.PackageXML,
                        LoadOption = new ApplicationProcessContentLoadOption()
                        {
                            LoadContent = true
                        }
                    }, cancellationToken)).Single();

                    XmlDocument documentXml = new XmlDocument();

                    using (documentContent.Content)
                    {
                        documentXml.Load(documentContent.Content);
                    }

                    #endregion

                    #region Валидираме подписа на документа

                    var signErrors = await ValidateDocumentContentAfterSignAsync(documentXml, signedDocumentXml);

                    if (signErrors.HasErrors)
                    {
                        //TODO:да се обмисли как да се локализира
                        var errorMessage = "";
                        foreach (var error in signErrors)
                        {
                            errorMessage += error.Message + "; ";
                        }


                        appProcess.Status = ProcessStatuses.ErrorInSignature;
                        appProcess.ErrorMessage = errorMessage;
                        await _applicationProcessRepository.UpdateAsync(appProcess, cancellationToken);

                        ctx.Result = new CompleteSigningResult()
                        {
                            ApplicationProcessID = appProcess.ApplicationProcessID.Value
                        };

                        return;
                    }

                    #endregion

                    var mainAppAdditionalData = appProcess.Applications.Single(app => app.ApplicationID == appProcess.MainApplicationID).AdditionalData;
                    var newProcessStatuses = mainAppAdditionalData == null
                        ? ProcessStatuses.Sending
                        : mainAppAdditionalData.ContainsKey("state") && mainAppAdditionalData["state"] == ((int)ProcessStates.Preregistration).ToString() ? ProcessStatuses.WaitPreregistrationCompletion : ProcessStatuses.Sending;

                    signDocumentContentBuffer.Position = 0;

                    documentContent.Content = signDocumentContentBuffer;
                    await _applicationProcessContentRepository.UpdateAsync(documentContent, cancellationToken);

                    appProcess.Status = newProcessStatuses;
                    appProcess.AdditionalData["userSessionID"] = userSessionID?.ToString();
                    appProcess.AdditionalData["loginSessionID"] = loginSessionID?.ToString();
                    appProcess.AdditionalData["ipAddress"] = ipAddress;
                    appProcess.AdditionalData["userCIN"] = userCIN?.ToString();

                    await _applicationProcessRepository.UpdateAsync(appProcess, cancellationToken);

                    ctx.Result = new CompleteSigningResult()
                    {
                        ApplicationProcessID = appProcess.ApplicationProcessID.Value
                    };

                    if (newProcessStatuses == ProcessStatuses.Sending && !appProcess.ParentApplicationProcessID.HasValue)
                    {
                        ctx.AddNextOperation("ApplicationProcessSend");
                    }
                }
            });

            //Ако заявлението е в статус Sending и проса няма родителски процес, който да се грижи за изпращането му, то изпращаме заявлението
            string nextOperationID;
            if (operationResult.TryGetNextOperation("ApplicationProcessSend", out nextOperationID))
            {
                await ActionDispatcher.SendAsync(new ApplicationSendMessage()
                {
                    OperationID = nextOperationID,
                    ApplicationProcessID = operationResult.Result.ApplicationProcessID
                });
            }
        }

        public async Task<OperationResult> StartSendingAsync(long processID, CancellationToken cancellationToken)
        {
            ApplicationProcess appProcess = null;
            ApplicationProcessContent appXmlContent = null;

            var result = await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = processID,
                    LoadOption =
                    {
                        LoadApplications = true,
                        LoadApplicationContent = true,
                        LoadApplicationDocuments = true,
                        LoadChildApplicationProcesses = true
                    }
                }, cancellationToken)).SingleOrDefault();

                #region Проверяваме дали процеса по заявяване може да буде изпратен

                if (appProcess == null)
                {
                    return new OperationResult("GL_NO_DATA_FOUND_L", "GL_NO_DATA_FOUND_L");
                }

                var hasChangeInApplicationsInitialData = await HasChangeInApplicationsInitialDataAsync(appProcess);

                if (await HasChangesInApplicationsNomenclatureAsync(appProcess))
                    return new OperationResult("CR_APP_CHANGED_NOMENCLATURES_I", "CR_APP_CHANGED_NOMENCLATURES_I");

                if (hasChangeInApplicationsInitialData)
                    return new OperationResult("CR_APP_CHANGED_BATCH_FOR_APP_I", "CR_APP_CHANGED_BATCH_FOR_APP_I");

                if (appProcess.Status == ProcessStatuses.Sending || appProcess.Status == ProcessStatuses.Accepted || appProcess.Status == ProcessStatuses.Completed)
                {
                    return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                }

                if (appProcess.Status != ProcessStatuses.InProcess && appProcess.Status != ProcessStatuses.WaitPreregistrationCompletion && appProcess.Status != ProcessStatuses.ReadyForSending)
                {
                    throw new ArgumentException(string.Format("Can't start sending for ApplicationProcess with ID: {0}. Process not in InProcess or WaitPreregistrationCompletion status.", processID));
                }

                if (appProcess.ChildApplicationProcesses != null && appProcess.ChildApplicationProcesses.Any(p => p.Status != ProcessStatuses.Sending))
                {
                    throw new ArgumentException(string.Format("Can't start sending for ApplicationProcess with ID: {0}. Because there is child application with status .", processID));
                }

                if (appProcess.Status == ProcessStatuses.InProcess && !applicationFormWithoutSigning.Contains(appProcess.MainApplicationType.Value))
                {
                    throw new ArgumentException(string.Format("ApplicationProcess with ID: {0}, require signing.", processID));
                }

                #endregion

                #region Записваме съдързанието на заявлението и поставяме заявлението в статус ReadyForSending

                if (appProcess.Status == ProcessStatuses.InProcess || appProcess.Status == ProcessStatuses.WaitPreregistrationCompletion)
                {
                    if (appProcess.Status == ProcessStatuses.InProcess)
                    {
                        #region Ако има документ подготвен за изпращане за подпис го изтриваме

                        var appDocumentContent = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                        {
                            ApplicationProcessID = processID,
                            Type = ApplicationProcessContentTypes.PackageXML
                        }, cancellationToken)).SingleOrDefault();

                        if (appDocumentContent != null)
                        {
                            await _applicationProcessContentRepository.DeleteAsync(appDocumentContent, cancellationToken);
                        }

                        #endregion

                        #region Ако заявлението е в статус InProcess записваме xml на заявлението.

                        var mainAppProvider = await GetMainApplicationProviderForSingingAsync(appProcess);

                        //Валидираме съдържанието на документа
                        var errors = await mainAppProvider.ValidateAsync();

                        if (errors != null && errors.Count > 0)
                            return new OperationResult<Guid>(errors);

                        MemoryStream xmlStream = new MemoryStream();
                        using (var writer = XmlWriter.Create(xmlStream, new XmlWriterSettings { Encoding = new UTF8Encoding(false) }))
                        {
                            mainAppProvider.SaveAsXml(writer);
                        }

                        using (xmlStream)
                        {
                            xmlStream.Position = 0;

                            appXmlContent = new ApplicationProcessContent()
                            {
                                ApplicationProcessID = processID,
                                Type = ApplicationProcessContentTypes.PackageXML,
                                Content = xmlStream
                            };

                            await _applicationProcessContentRepository.CreateAsync(appXmlContent, cancellationToken);
                        }

                        #endregion
                    }

                    if (appProcess.AdditionalData == null)
                    {
                        appProcess.AdditionalData = new AdditionalData();
                    }

                    appProcess.AdditionalData["userSessionID"] = _EPZEUUserAccessor.UserSessionID.ToString();
                    appProcess.AdditionalData["loginSessionID"] = _EPZEUUserAccessor.User?.LoginSessionID.ToString();
                    appProcess.AdditionalData["ipAddress"] = _EPZEUUserAccessor.RemoteIpAddress.ToString();
                    appProcess.AdditionalData["userCIN"] = _EPZEUUserAccessor.User?.CIN.ToString();

                    appProcess.Status = ProcessStatuses.ReadyForSending;
                    await _applicationProcessRepository.UpdateAsync(appProcess, cancellationToken);
                }


                if (appXmlContent == null)
                {
                    appXmlContent = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                    {
                        ApplicationProcessID = processID,
                        Type = ApplicationProcessContentTypes.PackageXML
                    }, cancellationToken)).Single();
                }

                #endregion

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            if (appProcess.Status == ProcessStatuses.ReadyForSending)
            {
                await ActionDispatcher.SendAsync(new ApplicationSendMessage()
                {
                    OperationID = "ApplicationProcessContentID_" + appXmlContent.ApplicationProcessContentID,
                    ApplicationProcessID = processID
                });
            }

            result = await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {

                appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = processID
                }, cancellationToken)).SingleOrDefault();

                if (appProcess.Status == ProcessStatuses.ReadyForSending)
                {
                    appProcess.Status = ProcessStatuses.Sending;
                    await _applicationProcessRepository.UpdateAsync(appProcess, cancellationToken);
                }

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });

            return result;
        }

        public async Task SendAsync(string operationID, long processID)
        {
            List<(string ApplicationKey, Stream ApplicationContent)> appRequests = null;
            ApplicationProcess appProcess = null;
            int? userCIN = null;
            AcceptApplicationsResult appAcceptResult = null;

            await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = processID,
                    LoadOption =
                {
                    LoadApplications = true,
                    LoadChildApplicationProcesses = true
                }
                })).SingleOrDefault();

                if (appProcess == null || 
                    appProcess.Status == ProcessStatuses.Accepted || appProcess.Status == ProcessStatuses.ErrorInAccepting || appProcess.Status == ProcessStatuses.Completed)
                {
                    return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                }

                #region Проверяваме дали процеса по заявяване може да буде изпратен

                if (appProcess == null)
                {
                    throw new ArgumentException(string.Format("No ApplicationProcess with processID : {0}.", processID));
                }

                if (appProcess.Status != ProcessStatuses.Sending && appProcess.Status != ProcessStatuses.ReadyForSending)
                {
                    throw new ArgumentException(string.Format("Can't send for ApplicationProcess with ID: {0}. Process not in Sending status.", processID));
                }

                if (appProcess.ParentApplicationProcessID != null)
                {
                    throw new ArgumentException("Only parent ApplicationProcesses can be send.");
                }

                #endregion

                #region Ако заявлението е в статус ReadyForSending променяме статуса на заявлнението на Sending

                if (appProcess.Status == ProcessStatuses.ReadyForSending)
                {
                    appProcess.Status = ProcessStatuses.Sending;
                    await _applicationProcessRepository.UpdateAsync(appProcess);
                }

                #endregion

                #region Изчитаме заявленията и подговтвяме заявката за запис на заявлението в ТР

                appRequests = new List<(string ApplicationKey, Stream ApplicationContent)>();
                var mainAppDocumentContent = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                {
                    ApplicationProcessID = processID,
                    Type = ApplicationProcessContentTypes.PackageXML,
                    LoadOption = new ApplicationProcessContentLoadOption()
                    {
                        LoadContent = true
                    }
                })).Single();

                //TODO: Да се помисли как да се избегне това копиране
                using (mainAppDocumentContent.Content)
                {
                    var mStream = new MemoryStream();
                    mainAppDocumentContent.Content.CopyTo(mStream);

                    mStream.Position = 0;
                    appRequests.Add((processID.ToString(), mStream));
                }

                if (appProcess.ChildApplicationProcesses != null)
                {
                    foreach (var childProcess in appProcess.ChildApplicationProcesses)
                    {
                        var appDocumentContent = (await _applicationProcessContentRepository.SearchAsync(new ApplicationProcessContentSearchCriteria()
                        {
                            ApplicationProcessID = childProcess.ApplicationProcessID,
                            Type = ApplicationProcessContentTypes.PackageXML,
                            LoadOption = new ApplicationProcessContentLoadOption()
                            {
                                LoadContent = true
                            }
                        })).Single();

                        using (appDocumentContent.Content)
                        {
                            var mStream = new MemoryStream();
                            appDocumentContent.Content.CopyTo(mStream);

                            mStream.Position = 0;
                            appRequests.Add((childProcess.ApplicationProcessID.ToString(), mStream));
                        }
                    }
                }

                #endregion

                userCIN = (await _appUserRepository.SearchAsync(new AppUserSearchCriteria()
                {
                    UserID = appProcess.ApplicantID.Value
                })).SingleOrDefault().CIN;

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });

            if (appRequests != null)
            {
                appAcceptResult = await _integrationAppServiceClient.AcceptApplicationsAsync(appRequests, operationID, userCIN.Value);

                await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
                {
                    if (appAcceptResult.IsApplicationAccept.GetValueOrDefault())
                    {
                        appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                        {
                            ApplicationProcessID = processID,
                            LoadOption =
                            {
                                LoadChildApplicationProcesses = true,
                                LoadWithLock = true
                            }
                        })).SingleOrDefault();

                        if (appProcess.Status != ProcessStatuses.Completed)
                        {
                            appProcess.Status = ProcessStatuses.Accepted;
                            await _applicationProcessRepository.UpdateAsync(appProcess);

                            if (appProcess.ChildApplicationProcesses != null && appProcess.ChildApplicationProcesses.Count > 0)
                            {
                                foreach (var chProcess in appProcess.ChildApplicationProcesses)
                                {
                                    chProcess.Status = ProcessStatuses.Accepted;
                                    await _applicationProcessRepository.UpdateAsync(chProcess);
                                }
                            }
                        }
                    }
                    else
                    {
                        appProcess.Status = ProcessStatuses.ErrorInAccepting;
                        appProcess.ErrorMessage = appAcceptResult.ErrorMessage;

                        await _applicationProcessRepository.UpdateAsync(appProcess);
                    }

                    return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                });
            }
        }

        public async Task ApplicationsRegisteredAsync(string operationID, List<ApplicationRegisteredRequest> appsRequests, CancellationToken cancellationToken)
        {
            ApplicationProcess appProcess = null;
            List<Application> childMainApplication = null;

            await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext) =>
            {
                appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = Convert.ToInt64(appsRequests[0].ApplicationKey),
                    LoadOption =
                    {
                        LoadWithLock = true,
                        LoadApplications = true,
                        LoadChildApplicationProcesses = true
                    }
                }, cancellationToken)).SingleOrDefault();

                //Потребителя вече е видял заявлението и е изтрил процеса
                if (appProcess == null)
                {
                    return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                }

                if (appProcess.ChildApplicationProcesses != null && appProcess.ChildApplicationProcesses.Count > 0)
                {
                    childMainApplication = (await _applicationRepository.SearchAsync(new ApplicationSearchCriteria()
                    {
                        ApplicationIDs = appProcess.ChildApplicationProcesses.Select(pp => pp.MainApplicationID.Value).ToList()
                    }, cancellationToken)).ToList();
                }

                if (appProcess.Status == ProcessStatuses.Accepted || appProcess.Status == ProcessStatuses.Sending)
                {
                    #region Променяме статуса за заявлението на Completed

                    appProcess.IncomingNumber = appsRequests[0].Application.IncomingNumber;
                    appProcess.Status = ProcessStatuses.Completed;

                    await _applicationProcessRepository.UpdateAsync(appProcess, cancellationToken);

                    if (appProcess.ChildApplicationProcesses != null && appProcess.ChildApplicationProcesses.Count > 0)
                    {
                        foreach (var chProcess in appProcess.ChildApplicationProcesses)
                        {
                            chProcess.IncomingNumber = appsRequests.Single(ar => Convert.ToInt64(ar.ApplicationKey) == chProcess.ApplicationProcessID).Application.IncomingNumber;
                            chProcess.Status = ProcessStatuses.Completed;

                            await _applicationProcessRepository.UpdateAsync(chProcess, cancellationToken);
                        }
                    }

                    #endregion
                }
                else if (appProcess.Status != ProcessStatuses.Completed)
                {
                    throw new ArgumentException(string.Format("ApplicationProcess {0} is in wrong status {1} to be Completed.", appProcess.ApplicationProcessID, appProcess.Status.ToString()));
                }

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            });

            if (appProcess != null && appProcess.Status == ProcessStatuses.Completed)
            {
                List<Task> waitTasks = new List<Task>();

                foreach (var appsRequest in appsRequests)
                {
                    #region Записва данни за заявлението в Одита

                    Application mainApplication = null;

                    if (appProcess.ApplicationProcessID.ToString() == appsRequest.ApplicationKey)
                    {
                        mainApplication = appProcess.Applications.Single(app => app.ApplicationID == appProcess.MainApplicationID);
                    }
                    else
                    {
                        mainApplication = childMainApplication.Single(app => app.ApplicationProcessID.ToString() == appsRequest.ApplicationKey);
                    }

                    var auditUserLogin = CreateSendDocumentLogActionRequest(appProcess, mainApplication, appsRequest.Application.IncomingNumber, operationID + appsRequest.Application.IncomingNumber);
                    waitTasks.Add(_auditServiceClient.CreateLogActionAsync(auditUserLogin));

                    #endregion
                }

                await Task.WhenAll(waitTasks);
            }
        }

        public async Task<ProcessStatuses> ReturnToBeginningStatusAsync(long processID, CancellationToken cancellationToken)
        {
            OperationResult<ProcessStatuses> result = await _dbContextOperationExecutor.ExecuteAsync(async (dbcontext, token) =>
            {
                var appProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                {
                    ApplicationProcessID = processID,
                    LoadOption =
                    {
                        LoadChildApplicationProcesses = true
                    }
                }, token)).Single();

                if (appProcess.Status != ProcessStatuses.ErrorInAccepting && appProcess.Status != ProcessStatuses.ErrorInSignature)
                {
                    throw new ArgumentException("Only aplication with status ErrorInAccepting or ErrorInSignature can br returned to  BeginningStatus");
                }

                if (appProcess.ChildApplicationProcesses != null && appProcess.ChildApplicationProcesses.Count > 0)
                {
                    appProcess.Status = ProcessStatuses.WaitPreregistrationCompletion;
                }
                else
                {
                    appProcess.Status = ProcessStatuses.InProcess;
                    appProcess.SigningGuid = null;
                }

                appProcess.ErrorMessage = null;

                await _applicationProcessRepository.UpdateAsync(appProcess, token);

                return new OperationResult<ProcessStatuses>(OperationResultTypes.SuccessfullyCompleted) { Result = appProcess.Status.Value };
            }, cancellationToken);

            return result.Result;
        }

        public async Task<bool> HasChangeInApplicationsInitialDataAsync(ApplicationProcess appProcess)
        {
            var mainApplication = appProcess.Applications.Where(app => app.ApplicationID == appProcess.MainApplicationID).Single();

            if (mainApplication.AdditionalData != null &&
                mainApplication.AdditionalData.ContainsKey("uic") &&
                mainApplication.AdditionalData.ContainsKey("state") &&
                mainApplication.AdditionalData["state"] == ((int)ProcessStates.ForChange).ToString() &&
                (!mainApplication.AdditionalData.ContainsKey("isPreregistrationChildProcess") || !Convert.ToBoolean(mainApplication.AdditionalData["isPreregistrationChildProcess"])))
            {
                var mainAppProvider = _applicationFormProviderFactory.CreateApplicationProvider(mainApplication.Type.Value);

                if (mainAppProvider is IApplicationWithFieldsProvider)
                {
                    var uic = mainApplication.AdditionalData["uic"];
                    if (!string.IsNullOrWhiteSpace(uic))
                    {
                        var deed = await _deedReportService.GetDeedAsync(uic, new Integration.EPZEU.Models.SearchCriteria.DeedLoadOption()
                        {
                            SubUIC = mainApplication.AdditionalData["subUIC"],
                            SubUICType = ((IApplicationWithFieldsProvider)mainAppProvider).SubUICType
                        });

                        var subDeed = deed.SubDeeds.SingleOrDefault(sd => sd.Status == Integration.EPZEU.Models.SubDeedStatuses.Active
                        && sd.SubUICType == ((IApplicationWithFieldsProvider)mainAppProvider).SubUICType
                        && (sd.SubUIC == mainApplication.AdditionalData["subUIC"]) || string.IsNullOrEmpty(mainApplication.AdditionalData["subUIC"]));

                        if (subDeed != null)
                        {
                            using (SHA256 sha256Hash = SHA256.Create())
                            {
                                if (mainApplication.AdditionalData.ContainsKey("HashedInitialData"))
                                {
                                    var subDeedJsonAsString = EPZEUJsonSerializer.Serialize(subDeed);

                                    return !VerifyHash(sha256Hash, subDeedJsonAsString, mainApplication.AdditionalData["HashedInitialData"]);
                                }
                            }
                        }

                        return false;
                    }
                }
                else
                    return false;
            }

            return false;
        }

        public async Task<bool> HasChangesInApplicationsNomenclatureAsync(ApplicationProcess appProcess)
        {
            if (appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.ActualStateCertificate
                || appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.EntryByPeriodCertificate
                || appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.PublicationByPeriodCertificate
                || appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.EnteredCircumstancesCertificate
                || appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.ActOrCopyOfActCertificate
                || appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.MissingActsCertificate
                || appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.CertificateForReserveFirm)
            {
                return false;
            }

            List<Task> tasks = new List<Task>()
            {
                _acts.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _countries.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _nkid.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _authorities.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _legalForms.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _applicationDocumentTypes.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _foreignLegalForms.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _foreignComRegisters.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _ekatte.EnsureLoadedAsync(CancellationToken.None).AsTask(),
                _releaseReasons.EnsureLoadedAsync(CancellationToken.None).AsTask()
            };

            await Task.WhenAll(tasks);

            //Взимаме от номенклатурите, чиято промяна би оказала промяна по заявленията в процес, най-скорошната дата на промяна и я сравняваме с датата на създаване на процеса.
            DateTime? actUpdatedOn;
            DateTime? countriesUpdatedOn;
            DateTime? areasUpdatedOn;
            DateTime? districtsUpdatedOn;
            DateTime? municipalitiesUpdatedOn;
            DateTime? settlementsUpdatedOn;
            DateTime? nkidUpdatedOn;
            DateTime? authoritiesUpdatedOn;
            DateTime? legalFormsUpdatedOn;
            DateTime? applicationDocumentTypesUpdatedOn;
            DateTime? foreignLegalFormsUpdatedOn;
            DateTime? foreignComRegistersUpdatedOn;
            DateTime? releaseReasonsUpdatedOn;

            _acts.GetActs(out actUpdatedOn);
            _countries.GetCountries(out countriesUpdatedOn);
            _nkid.GetNKID(out nkidUpdatedOn);
            _authorities.GetAuthorities(out authoritiesUpdatedOn);
            _legalForms.GetLegalForms(out legalFormsUpdatedOn);
            _applicationDocumentTypes.GetApplicationDocumentTypes(out applicationDocumentTypesUpdatedOn);
            _foreignLegalForms.GetForeignLegalForms(out foreignLegalFormsUpdatedOn);
            _foreignComRegisters.GetForeignComRegisters(out foreignComRegistersUpdatedOn);
            _ekatte.GetAreas(out areasUpdatedOn);
            _ekatte.GetDistricts(out districtsUpdatedOn);
            _ekatte.GetMunicipalities(out municipalitiesUpdatedOn);
            _ekatte.GetSettlements(out settlementsUpdatedOn);
            _releaseReasons.GetReleaseReasons(out releaseReasonsUpdatedOn);

            var nomDates = new List<DateTime?>()
            {
                actUpdatedOn,
                countriesUpdatedOn,
                areasUpdatedOn,
                districtsUpdatedOn,
                municipalitiesUpdatedOn,
                settlementsUpdatedOn,
                nkidUpdatedOn,
                authoritiesUpdatedOn,
                legalFormsUpdatedOn,
                applicationDocumentTypesUpdatedOn,
                foreignLegalFormsUpdatedOn,
                foreignComRegistersUpdatedOn,
            };

            if (appProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.AppointingExpert)
                nomDates.Add(releaseReasonsUpdatedOn);

            var lastUpdatedNom = nomDates.OrderByDescending(x => x).FirstOrDefault();

            return lastUpdatedNom > appProcess.UpdatedOn;
        }

        public async Task<bool> IsApplicationActiveAsync(Integration.EPZEU.Models.ApplicationFormTypes appType)
        {
            DateTime? lastModified;

            await _applicationTypes.EnsureLoadedAsync("bg");
            await _pages.EnsureLoadedAsync("bg");

            var appNom = _applicationTypes.GetApplicationTypes("bg", EPZEU.Nomenclatures.Models.Registers.CR, out lastModified).Single(app => app.AppType == ((int)appType).ToString());

            var appPage = _pages.GetPages("bg", out lastModified).FirstOrDefault(p => p.ApplicationID == appNom.ApplicationTypeID);

            if (appPage != null)
            {
                return true;
            }

            await _services.EnsureLoadedAsync("bg");
            var services = _services.GetServices("bg").Where(srv => srv.AppTypeID == appNom.ApplicationTypeID && srv.Status == 0);

            if (services != null && services.Count() > 0)
            {
                var srvPages = _pages.GetPages("bg", out lastModified).FirstOrDefault(p => services.Any(srv => srv.ServiceID == p.ServiceID));

                if (srvPages != null)
                {
                    return true;
                }
            }

            return false;
        }

        #endregion

        #region Helper

        //TODO: Да се изнесе и да се преизползва.
        private static string GetHash(HashAlgorithm hashAlgorithm, string input)
        {
            // Convert the input string to a byte array and compute the hash.
            byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        // Verify a hash against a string.
        private static bool VerifyHash(HashAlgorithm hashAlgorithm, string input, string hash)
        {
            // Hash the input.
            var hashOfInput = GetHash(hashAlgorithm, input);

            // Create a StringComparer an compare the hashes.
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            return comparer.Compare(hashOfInput, hash) == 0;
        }

        private async Task<OperationResult<ApplicationProcess>> LoadInternalAsync(long? processID, Integration.EPZEU.Models.ApplicationFormTypes? applType, CancellationToken cancellationToken)
        {
            var process = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
            {
                ApplicationProcessID = processID,
                ApplicantCIN = _EPZEUUserAccessor.User.CIN,
                MainApplicationType = applType,
                IsParent = applType.HasValue ? true : (bool?)null,
                LoadOption = new ApplicationProcessLoadOption()
                {
                    LoadApplications = true,
                    LoadApplicationDocuments = true,
                    LoadApplicationContent = true,
                    LoadChildApplicationProcesses = true
                }
            }, cancellationToken)).SingleOrDefault();

            if (applType.HasValue
                && process != null
                && process.Status != ProcessStatuses.Completed
                && (process.Applications.SingleOrDefault(t => t.ApplicationID == process.MainApplicationID)?.AdditionalData?.ContainsKey("state")).GetValueOrDefault()
                && process.Applications.SingleOrDefault(t => t.ApplicationID == process.MainApplicationID)?.AdditionalData?["state"] == ((int)ProcessStates.ForChange).ToString()
                && _EPZEUUserAccessor?.User?.IsUserIdentifiable != true)
            {
                return new OperationResult<ApplicationProcess>("GL_NEED_SERTIFICATE_AUTHENTICATION_Е", "GL_NEED_SERTIFICATE_AUTHENTICATION_Е");
            }

            if (process != null && process.Status == ProcessStatuses.WaitPreregistrationCompletion && process.ChildApplicationProcesses != null)
            {
                for (var i = 0; i < process.ChildApplicationProcesses.Count; i++)
                {
                    var childProcess = process.ChildApplicationProcesses[i];

                    var newChildProcess = (await _applicationProcessRepository.SearchAsync(new ApplicationProcessSearchCriteria()
                    {
                        ApplicationProcessID = childProcess.ApplicationProcessID,
                        IsParent = false,
                        LoadOption = new ApplicationProcessLoadOption()
                        {
                            LoadApplications = true,
                            LoadApplicationDocuments = childProcess.Status == ProcessStatuses.Sending ? false : true,
                            LoadApplicationContent = true
                        }
                    }, cancellationToken)).Single();

                    process.ChildApplicationProcesses[i] = newChildProcess;
                }
            }

            var result = new OperationResult<ApplicationProcess>(OperationResultTypes.SuccessfullyCompleted) { Result = process };

            return result;
        }

        private Task<OperationResult<ApplicationProcess>> StartApplicationProcessAsync(ApplicationRequest request, CancellationToken cancellationToken, ApplicationProcess parentProcess = null)
        {
            return _dbContextOperationExecutor.ExecuteAsync<ApplicationProcess>(async (dbcontext, token) =>
            {
                //Инициализираме основно заявление.                
                var appJSONResult = await CreateAndInitApplicationAsync(request, null, parentProcess);

                //Създаваме процес.
                var process = new ApplicationProcess()
                {
                    Status = ProcessStatuses.InProcess,
                    MainApplicationType = request.ApplicationType,
                    ApplicantID = _EPZEUUserAccessor.User.LocalClientID,
                    ParentApplicationProcessID = parentProcess != null ? parentProcess.ApplicationProcessID : null
                };
                await _applicationProcessRepository.CreateAsync(process, token);

                if (!appJSONResult.IsSuccessfullyCompleted)
                    return new OperationResult<ApplicationProcess>(appJSONResult.Errors);

                //Записваме JSON съдържанието на основното заявлението към процеса.
                var mainApp = await CreateApplication(process, appJSONResult.Result, request.ApplicationType.Value, 1, request.AdditionalData, cancellationToken);

                //Записваме ID-то на главното заявление в пакета
                process.MainApplicationID = mainApp.ApplicationID;
                await _applicationProcessRepository.UpdateAsync(process, token);

                return new OperationResult<ApplicationProcess>(OperationResultTypes.SuccessfullyCompleted) { Result = process };
            }, cancellationToken);
        }

        private async Task<Application> CreateApplication(ApplicationProcess process, Stream content, Integration.EPZEU.Models.ApplicationFormTypes appType, short order, AdditionalData additionalData, CancellationToken cancellationToken)
        {
            ApplicationProcessContent appContent = await CreateApplicationProcessJsonContent(process.ApplicationProcessID.Value, content, cancellationToken);

            var app = new Application()
            {
                ApplicationContentID = appContent.ApplicationProcessContentID,
                ApplicationProcessID = process.ApplicationProcessID,
                Type = appType,
                Order = order,
                AdditionalData = additionalData
            };

            await _applicationRepository.CreateAsync(app, cancellationToken);

            return app;
        }

        private async Task<OperationResult<Stream>> CreateAndInitApplicationAsync(ApplicationRequest request, Application mainApplication = null, ApplicationProcess parentProcess = null)
        {
            var appProvider = _applicationFormProviderFactory.CreateApplicationProvider(request.ApplicationType.Value);

            var initParamsResult = await GetApplicationInitParameters(appProvider, request, mainApplication, parentProcess);

            if (!initParamsResult.IsSuccessfullyCompleted)
            {
                return new OperationResult<Stream>(initParamsResult.Errors);
            }

            var initParams = initParamsResult.Result;

            var initResult = await appProvider.InitApplicationAsync(initParams);

            if (initResult.IsSuccessfullyCompleted)
            {
                await TryLogAuditLoadDataForChange(initParams, request.ApplicationType.Value);
            }
            else
            {
                return new OperationResult<Stream>(initResult.Errors);
            }

            InitApplicationAdditionalData(request, initParams, mainApplication);

            var resultStr = new MemoryStream();

            await appProvider.SaveAsJsonAsync(resultStr);

            resultStr.Position = 0;

            var result = new OperationResult<Stream>(OperationResultTypes.SuccessfullyCompleted);
            result.Result = resultStr;

            return result;
        }

        private async Task<ApplicationProcessContent> CreateApplicationProcessJsonContent(long processID, Stream appContent, CancellationToken cancellationToken)
        {
            ApplicationProcessContent result = new ApplicationProcessContent()
            {
                ApplicationProcessID = processID,
                Type = ApplicationProcessContentTypes.ApplicationJSON,
                Content = appContent
            };

            await _applicationProcessContentRepository.CreateAsync(result, cancellationToken);

            return result;
        }

        private async Task<IApplicationProvider> GetMainApplicationProviderForSingingAsync(ApplicationProcess appProcess)
        {
            var mainApplication = appProcess.Applications.Where(app => app.ApplicationID == appProcess.MainApplicationID).Single();
            var mainAppProvider = await GetApplicationProviderAsync(mainApplication);

            var subApplications = appProcess.Applications.Where(app => app != mainApplication).ToList();

            if (subApplications != null && subApplications.Count > 0)
            {
                foreach (var subApplication in subApplications)
                {
                    var subAppProvider = await GetApplicationProviderAsync(subApplication);
                    subAppProvider.PrepareForSinging();

                    var mainApplicationForm = (ApplicationWithFieldsForm)mainAppProvider.ApplicationForm;

                    if (mainApplicationForm.Applications == null)
                    {
                        mainApplicationForm.Applications = new List<ApplicationWithFieldsForm>();
                    }

                    mainApplicationForm.Applications.Add((ApplicationWithFieldsForm)subAppProvider.ApplicationForm);
                }
            }

            mainAppProvider.PrepareForSinging();

            return mainAppProvider;
        }

        private async Task<IApplicationProvider> GetApplicationProviderAsync(Application application)
        {
            var appProvider = _applicationFormProviderFactory.CreateApplicationProvider(application.Type.Value);

            using (application.ApplicationContent.Content)
            {
                await appProvider.LoadFromJsonAsync(application.ApplicationContent.Content);
            }

            return appProvider;
        }

        private SigningRequest CreateApplicationSigningRequest(IApplicationProvider mainAppProvider, Stream xmlStream, Integration.EPZEU.Models.ApplicationFormTypes appType)
        {
            short i = 1;
            DateTime? lastModifed = null;
            return new SigningRequest()
            {
                Content = xmlStream,
                Format = SigningFormats.XAdES,
                ContentType = "application/xml",
                FileName = this._applicationTypes.GetApplicationTypes("bg", null, out lastModifed).Single(at => at.AppType == ((int)mainAppProvider.ApplicationForm.AppType).ToString()).Name + ".xml",
                CompletedCallbackUrl = (_globalOptions.GL_CR_API + "/ApplicationProcesses/SigningCompleted").Replace("//ApplicationProcesses", "/ApplicationProcesses"),
                RejectedCallbackUrl = (_globalOptions.GL_CR_API + "/ApplicationProcesses/SigningRejected").Replace("//ApplicationProcesses", "/ApplicationProcesses"),
                SignerRequests = mainAppProvider.ApplicationForm.ApplicantInfo != null && mainAppProvider.ApplicationForm.ApplicantInfo.Applicants != null && mainAppProvider.ApplicationForm.ApplicantInfo.Applicants.ApplicantsList.Count > 0 ?
                    mainAppProvider.ApplicationForm.ApplicantInfo.Applicants.ApplicantsList.Select(applicant => new SignerRequest()
                    {
                        Name = applicant.Person.Name,
                        Ident = applicant.Person.Indent,
                        Order = i++
                    }).ToList() : null
            };
        }

        private async Task SendDocumentToCRBackoffice(ApplicationDocument document)
        {
            var crIntegrationDocument = new Integration.EPZEU.Models.FileContentStream()
            {
                FileName = document.FileMetadata.FileName,
                ContentType = document.FileMetadata.ContentType,
                Content = document.Content
            };

            var response = await _integrationFileServiceClient.CreateFileAsync(crIntegrationDocument);

            document.BackofficeGuid = response.Guid;
            document.FileMetadata = response;
            response.Guid = null;
        }

        private async Task<IErrorCollection> ValidateDocumentContentAfterSignAsync(XmlDocument xmlDocument, XmlDocument signedXmlDocument)
        {
            //TODO
            return new ErrorCollection();

            //DocumentSignatureInfo signInfo = this.GetDocumentSignInfoInternal(docProcess.DocumentProcessGuid.Value);
            //XmlNamespaceManager mgr = new XmlNamespaceManager(signedXmlDocument.NameTable);
            //foreach (KeyValuePair<string, string> ns in signInfo.SignatureXPathNamespaces)
            //{
            //    mgr.AddNamespace(ns.Key, ns.Value);
            //}

            //var signContainerNode = signedXmlDocument.SelectSingleNode(signInfo.SignatureXpath, mgr);

            //if (signContainerNode != null)
            //{
            //    var signNode = signContainerNode.FirstChild;

            //    if (string.Compare(signNode.Name, "Signature", true) == 0)
            //    {
            //        signContainerNode.RemoveChild(signNode);

            //        XmlDiff xmldiff = new XmlDiff(XmlDiffOptions.IgnoreXmlDecl);

            //        if (!xmldiff.Compare(xmlDocument.DocumentElement, signedXmlDocument.DocumentElement))
            //        {
            //            throw new NotSupportedException(ESP.Core.Resources.Errors.DocNotMatchAfterSign);
            //        }

            //        signContainerNode.AppendChild(signNode);
            //    }
            //    else
            //        throw new NotSupportedException(ESP.Core.Resources.Errors.InternalCertificateCheckError);
            //}
            //else
            //    throw new NotSupportedException(ESP.Core.Resources.Errors.InternalCertificateCheckError);
        }

        private LogActionRequest CreateSendDocumentLogActionRequest(ApplicationProcess appProcess, Application application, string incommingNumber, string operationID)
        {
            DateTime? lastModifed = null;
            var additionalData = new AdditionalData();
            additionalData["applicationTypeName"] = this._applicationTypes.GetApplicationTypes("bg", null, out lastModifed).SingleOrDefault(at => at.AppType == ((int?)application.Type)?.ToString())?.Name;
            additionalData["uIC"] = application.AdditionalData == null ? null : application.AdditionalData.ContainsKey("uic") ? application.AdditionalData["uic"] : null;
            additionalData["companyName"] = application.AdditionalData == null ? null : application.AdditionalData.ContainsKey("companyName") ? application.AdditionalData["companyName"] : null;

            var request = new LogActionRequest()
            {
                ObjectType = ObjectTypes.EAUApplication,
                ActionType = ActionTypes.Submission,
                Module = Modules.EPZEU_CR,
                Functionality = Functionalities.Applications,
                Key = incommingNumber,
                AdditionalData = additionalData,
                UserSessionID = Guid.Parse(appProcess.AdditionalData["userSessionID"]),
                IpAddress = appProcess.AdditionalData["ipAddress"],
                LoginSessionID = string.IsNullOrEmpty(appProcess.AdditionalData["loginSessionID"]) ? (Guid?)null : Guid.Parse(appProcess.AdditionalData["loginSessionID"]),
                UserCIN = string.IsNullOrEmpty(appProcess.AdditionalData["userCIN"]) ? (int?)null : int.Parse(appProcess.AdditionalData["userCIN"]),
                OperationID = operationID
            };

            return request;
        }

        private bool CanDeleteDocumentInCR(ApplicationDocument document)
        {
            return !string.IsNullOrEmpty(document.BackofficeGuid) && string.IsNullOrEmpty(document.IncomingNumber);
        }

        private static Stream XmlToStream(XmlDocument xml)
        {
            var stream = new MemoryStream();
            XmlTextWriter writer = new XmlTextWriter(stream, new System.Text.UTF8Encoding(false));
            xml.Save(writer);

            stream.Position = 0;
            return stream;
        }

        private List<Integration.EPZEU.Models.ApplicationFormTypes> GetPossiblePreregistrationNewPackegesTypes(ApplicationProcess parentProcess)
        {
            var possibleFormTypes = new List<Integration.EPZEU.Models.ApplicationFormTypes>()
            {
                Integration.EPZEU.Models.ApplicationFormTypes.B1,
                Integration.EPZEU.Models.ApplicationFormTypes.B2,
                Integration.EPZEU.Models.ApplicationFormTypes.B3,
                Integration.EPZEU.Models.ApplicationFormTypes.B4,
                Integration.EPZEU.Models.ApplicationFormTypes.B5,
                Integration.EPZEU.Models.ApplicationFormTypes.B6,
                Integration.EPZEU.Models.ApplicationFormTypes.G1,
                Integration.EPZEU.Models.ApplicationFormTypes.G2,
                Integration.EPZEU.Models.ApplicationFormTypes.G3
            };

            // A8 nqma klon i procura
            if (parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A8 ||
                parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A18)
            {
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B1);
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B2);
            }

            if (parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A1 ||
                parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A18)
            {
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B6);
            }

            if (parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A15 ||
                parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A16 ||
                parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A17 ||
                parentProcess.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.A18)
            {
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B1);
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B4);
            }

            // Zapor i zalog na dql imat samo kapitalovite druzestva
            if (parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A2 &&
                parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A3 &&
                parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A4 &&
                parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A6 &&
                parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A10 &&
                parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A11 &&
                parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A12 &&
                parentProcess.MainApplicationType != Integration.EPZEU.Models.ApplicationFormTypes.A13)
            {
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B3);
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B5);
            }

            //B1 - прокура може да се подава при пререгистрация 
            //ако досега не е подадена т.к. прокурата трябва да е една.
            if (parentProcess.Applications.Any(app => app.Type == Integration.EPZEU.Models.ApplicationFormTypes.B1) ||
                (parentProcess.ChildApplicationProcesses != null && parentProcess.ChildApplicationProcesses.Any(pr => pr.MainApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.B1)))
            {
                possibleFormTypes.Remove(Integration.EPZEU.Models.ApplicationFormTypes.B1);
            }

            return possibleFormTypes;
        }

        private List<Integration.EPZEU.Models.ApplicationFormTypes> GetPossiblePreregistrationChangePackegesTypes(ApplicationProcess parentProcess)
        {
            var possibleFormTypes = new List<Integration.EPZEU.Models.ApplicationFormTypes>();

            foreach (var app in parentProcess.Applications)
            {
                if (app.Type == Integration.EPZEU.Models.ApplicationFormTypes.G1 ||
                   app.Type == Integration.EPZEU.Models.ApplicationFormTypes.G2 ||
                   app.Type == Integration.EPZEU.Models.ApplicationFormTypes.G3)
                {
                    continue;
                }

                //Не може да променяме добавено заявление повече от веднъж
                if (parentProcess.ChildApplicationProcesses == null ||
                    !parentProcess.ChildApplicationProcesses.Any(pr => pr.Applications.Single(chApp => chApp.ApplicationID == pr.MainApplicationID).AdditionalData["state"] == ((int)ProcessStates.ForChange).ToString()
                                                                      && pr.Applications.Single(chApp => chApp.ApplicationID == pr.MainApplicationID).AdditionalData["applicationToChangeID"] == app.ApplicationID.ToString()))
                {
                    possibleFormTypes.Add(app.Type.Value);
                }
            }

            return possibleFormTypes;
        }

        #endregion

        #region ApplicationFormContentHelpers

        private async Task TryLogAuditLoadDataForChange(ApplicationInitParameters initParams, Integration.EPZEU.Models.ApplicationFormTypes appType)
        {
            if (initParams is ApplicationWithFieldsInitParameters)
            {
                var awfInitParams = (ApplicationWithFieldsInitParameters)initParams;
                if (awfInitParams.State == ProcessStates.ForChange
                    && awfInitParams.DeedContext != null
                    && !string.IsNullOrEmpty(awfInitParams.DeedContext.UIC))
                {
                    DateTime? lastModifed = null;
                    var additionalData = new AdditionalData();

                    additionalData["applicationTypeName"] = this._applicationTypes.GetApplicationTypes("bg", null, out lastModifed).SingleOrDefault(at => at.AppType == ((int?)appType)?.ToString())?.Name;
                    additionalData["uIC"] = awfInitParams.DeedContext.UIC;
                    additionalData["companyName"] = awfInitParams.DeedContext.CompanyName;

                    //REQ_D04_EPZU_00693 Зареждане на данни при подаване на заявление за промяна на обстоятелства в ТР                   
                    var auditRequest = new LogActionRequest()
                    {
                        ObjectType = ObjectTypes.EAUApplication,
                        ActionType = ActionTypes.LoadDataForChange,
                        Module = Modules.EPZEU_CR,
                        Functionality = Functionalities.Applications,
                        UserSessionID = _EPZEUUserAccessor.UserSessionID,
                        IpAddress = _EPZEUUserAccessor.RemoteIpAddress.ToString(),
                        UserCIN = _EPZEUUserAccessor.User?.CIN,
                        LoginSessionID = _EPZEUUserAccessor.User?.LoginSessionID,
                        Key = awfInitParams.DeedContext.UIC,
                        AdditionalData = additionalData,
                        OperationID = Guid.NewGuid().ToString()
                    };
                    await _auditServiceClient.CreateLogActionAsync(auditRequest);
                }
            }
        }

        private async Task<OperationResult<ApplicationInitParameters>> GetApplicationInitParameters(IApplicationProvider provider, ApplicationRequest request, Application mainApplication = null, ApplicationProcess parentProcess = null)
        {
            var result = new OperationResult<ApplicationInitParameters>(OperationResultTypes.SuccessfullyCompleted);

            if (provider is IApplicationWithFieldsProvider)
            {
                var appWithFieldsInitParams = new ApplicationWithFieldsInitParameters()
                {
                    IsMainApplication = mainApplication == null,
                    AdditionalData = request.AdditionalData
                };

                if (appWithFieldsInitParams.State == ProcessStates.New || request.ApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.D1)
                {
                    if (mainApplication != null)
                    {
                        appWithFieldsInitParams.DeedContext = new ApplicationDeedContext(mainApplication);
                    }
                    else
                    {
                        if (appWithFieldsInitParams.IsPreregistrationChildProcess)
                        {
                            var parentMainAppProvider = await GetApplicationProviderAsync(parentProcess.Applications.Single(app => app.ApplicationID == parentProcess.MainApplicationID));

                            appWithFieldsInitParams.DeedContext = new ApplicationADeedContext((IApplicationAProvider)parentMainAppProvider);
                            appWithFieldsInitParams.ApplicantInfo = parentMainAppProvider.ApplicationForm.ApplicantInfo;
                            appWithFieldsInitParams.ApplicantExchange = parentMainAppProvider.ApplicationForm.ApplicantExchange;

                            appWithFieldsInitParams.Fields = new List<Domain.Fields.Common.IField>() { ((ApplicationWithFieldsForm)parentMainAppProvider.ApplicationForm).GetFiledsContainer().UIC };
                        }
                        else if (appWithFieldsInitParams.UIC != null)
                        {
                            var deed = await _deedReportService.GetDeedSummaryAsync(appWithFieldsInitParams.UIC);

                            if (deed != null)
                            {
                                appWithFieldsInitParams.DeedContext = new DeedSummaryContext(deed);
                            }
                            else if (request.ApplicationType == Integration.EPZEU.Models.ApplicationFormTypes.B6)
                            {
                                var bulstatDeed = await _bulstatReportServiceClient.GetBulstatSummaryAsync(appWithFieldsInitParams.UIC);

                                if (bulstatDeed != null)
                                {
                                    var firmCase = new BulstatDeed()
                                    {
                                        CourtCode = bulstatDeed.CourtCode,
                                        Deed = bulstatDeed.CaseNumber.HasValue ? bulstatDeed.CaseNumber.Value.ToString() : string.Empty,
                                        Year = bulstatDeed.CaseYear.HasValue ? bulstatDeed.CaseYear.Value.ToString() : string.Empty
                                    };

                                    appWithFieldsInitParams.DeedContext = new ApplicationPreregistrationContext(appWithFieldsInitParams.UIC, bulstatDeed.CompanyName, firmCase, (Integration.EPZEU.Models.LegalForms)Convert.ToInt32(bulstatDeed.LegalFormID));
                                }
                            }
                        }
                        else if (provider is IApplicationAProvider)
                        {
                            appWithFieldsInitParams.DeedContext = new ApplicationADeedContext((IApplicationAProvider)provider);
                        }
                    }
                }
                else if (appWithFieldsInitParams.State == ProcessStates.ForChange)
                {
                    if (appWithFieldsInitParams.IsPreregistrationChildProcess)
                    {
                        var parentMainAppProvider = await GetApplicationProviderAsync(parentProcess.Applications.Single(app => app.ApplicationID == parentProcess.MainApplicationID));

                        appWithFieldsInitParams.DeedContext = new ApplicationADeedContext((IApplicationAProvider)parentMainAppProvider);
                        appWithFieldsInitParams.ApplicantInfo = parentMainAppProvider.ApplicationForm.ApplicantInfo;
                        appWithFieldsInitParams.ApplicantExchange = parentMainAppProvider.ApplicationForm.ApplicantExchange;

                        if (parentProcess.MainApplicationID == appWithFieldsInitParams.ApplicationToChangeID)
                        {
                            appWithFieldsInitParams.Fields = ((ApplicationWithFieldsForm)parentMainAppProvider.ApplicationForm).GetFiledsContainer().GetFields();
                            appWithFieldsInitParams.SubUIC = ((ApplicationWithFieldsForm)parentMainAppProvider.ApplicationForm).SubUIC;

                        }
                        else
                        {
                            var appToChangeProvider = await GetApplicationProviderAsync(parentProcess.Applications.Single(app => app.ApplicationID == appWithFieldsInitParams.ApplicationToChangeID));

                            appWithFieldsInitParams.Fields = ((ApplicationWithFieldsForm)appToChangeProvider.ApplicationForm).GetFiledsContainer().GetFields();
                            appWithFieldsInitParams.SubUIC = ((ApplicationWithFieldsForm)appToChangeProvider.ApplicationForm).SubUIC;
                        }

                        var recordID = -1;

                        appWithFieldsInitParams.Fields.ForEach(f =>
                        {
                            if (f is Domain.Fields.Common.RecordField)
                            {
                                if (((Domain.Fields.Common.RecordField)f).RecordOperation != Domain.Fields.Common.RecordOperations.Current)
                                {
                                    ((Domain.Fields.Common.RecordField)f).RecordOperation = Domain.Fields.Common.RecordOperations.Current;
                                    ((Domain.Fields.Common.RecordField)f).RecordID = recordID.ToString();

                                    recordID--;
                                }
                            }
                            else
                            {
                                var records = ((Domain.Fields.Common.CompositeField)f).GetRecords();

                                records.ForEach(r =>
                                {
                                    if (r.RecordOperation != Domain.Fields.Common.RecordOperations.Current)
                                    {
                                        r.RecordOperation = Domain.Fields.Common.RecordOperations.Current;
                                        r.RecordID = recordID.ToString();

                                        recordID--;
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        if (_EPZEUUserAccessor?.User?.IsUserIdentifiable != true)
                        {
                            return new OperationResult<ApplicationInitParameters>("GL_NEED_SERTIFICATE_AUTHENTICATION_Е", "GL_NEED_SERTIFICATE_AUTHENTICATION_Е");
                        }

                        var deed = await _deedReportService.GetDeedAsync(appWithFieldsInitParams.UIC, new Integration.EPZEU.Models.SearchCriteria.DeedLoadOption()
                        {
                            SubUIC = appWithFieldsInitParams.SubUIC,
                            SubUICType = ((IApplicationWithFieldsProvider)provider).SubUICType
                        });

                        if (deed != null)
                        {
                            appWithFieldsInitParams.DeedContext = new DeedSummaryContext(deed);

                            if (deed.SubDeeds != null && deed.SubDeeds.Count() > 0)
                            {
                                //За прокурата позволяваме и неактивни подпартиди. Прокурата трябва да може да бъде подавана за промяна TRIR-5217
                                var subDeed = deed.SubDeeds.SingleOrDefault(sd => (sd.Status == Integration.EPZEU.Models.SubDeedStatuses.Active || sd.SubUICType == Integration.EPZEU.Models.SubUICTypes.B1_Procura)
                                && sd.SubUICType == ((IApplicationWithFieldsProvider)provider).SubUICType
                                && (string.IsNullOrEmpty(appWithFieldsInitParams.SubUIC) || sd.SubUIC == appWithFieldsInitParams.SubUIC));

                                if (subDeed != null)
                                {
                                    appWithFieldsInitParams.Fields = new List<Domain.Fields.Common.IField>();

                                    foreach (var field in subDeed.Fields)
                                    {
                                        appWithFieldsInitParams.Fields.Add((Domain.Fields.Common.IField)field);
                                    }

                                    var subDeedJsonAsString = EPZEUJsonSerializer.Serialize(subDeed);

                                    using (SHA256 sha256Hash = SHA256.Create())
                                    {
                                        var subDeedJsonAsHash = GetHash(sha256Hash, subDeedJsonAsString);
                                        appWithFieldsInitParams.AdditionalData["HashedInitialData"] = subDeedJsonAsHash;
                                    }
                                }

                                if (subDeed != null
                                    && (!appWithFieldsInitParams.AdditionalData.ContainsKey("subUIC") || string.IsNullOrEmpty(appWithFieldsInitParams.AdditionalData["subUIC"])))
                                {
                                    if (appWithFieldsInitParams.AdditionalData.ContainsKey("subUIC"))
                                    {
                                        appWithFieldsInitParams.AdditionalData["subUIC"] = subDeed.SubUIC;
                                    }
                                    else
                                    {
                                        appWithFieldsInitParams.AdditionalData.Add("subUIC", subDeed.SubUIC);
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {
                    appWithFieldsInitParams.DeedContext = new ApplicationPreregistrationContext(appWithFieldsInitParams.UIC, appWithFieldsInitParams.CompanyName, appWithFieldsInitParams.BulstatDeed, provider is IApplicationAProvider ? ((IApplicationAProvider)provider).LegalFormBase : (Integration.EPZEU.Models.LegalForms)Convert.ToInt32(appWithFieldsInitParams.AdditionalData["legalForm"]));
                }

                result.Result = appWithFieldsInitParams;
            }
            else
            {
                var appInitParams = new ApplicationInitParameters()
                {
                    AdditionalData = request.AdditionalData,
                    IsMainApplication = mainApplication == null
                };

                // Някои заявления, като Е1, не наследяват IApplicationWithFieldsProvider, но ни трябва правна форма за валидации - виж E1Provider
                if ((request.AdditionalData?.ContainsKey("uic")).GetValueOrDefault() && request.AdditionalData?["uic"] != null)
                {
                    var deed = await _deedReportService.GetDeedSummaryAsync(request.AdditionalData["uic"]);
                    if (deed != null)
                    {
                        appInitParams.AdditionalData["legalForm"] = ((int?)deed.LegalForm.Value).ToString();
                        appInitParams.AdditionalData["companyName"] = deed.CompanyName;
                    }
                }

                result.Result = appInitParams;
            }

            return result;
        }

        private void InitApplicationAdditionalData(ApplicationRequest request, ApplicationInitParameters appInitParams, Application mainApplication = null)
        {
            if (appInitParams is ApplicationWithFieldsInitParameters)
            {
                var initParams = (ApplicationWithFieldsInitParameters)appInitParams;

                if (mainApplication == null || !IsTransformation(mainApplication.Type.Value))
                {
                    if (initParams.DeedContext != null && initParams.DeedContext.LegalForm.HasValue && !request.AdditionalData.ContainsKey("legalForm"))
                    {
                        request.AdditionalData.Add("legalForm", ((int)initParams.DeedContext.LegalForm).ToString());
                    }

                    if (initParams.DeedContext != null && !string.IsNullOrEmpty(initParams.DeedContext.CompanyName))
                    {
                        if (request.AdditionalData.ContainsKey("companyName"))
                        {
                            if (string.IsNullOrEmpty(request.AdditionalData["companyName"]))
                            {
                                request.AdditionalData.Remove("companyName");
                                request.AdditionalData.Add("companyName", initParams.DeedContext.CompanyName);
                            }
                        }
                        else
                        {
                            request.AdditionalData.Add("companyName", initParams.DeedContext.CompanyName);
                        }
                    }
                }
            }
        }

        private bool IsTransformation(Integration.EPZEU.Models.ApplicationFormTypes applicationType)
        {
            if (applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V1 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V2 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V21 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V22 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V23 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V24 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V25 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V26 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V3 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V31 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V32 ||
                applicationType == Integration.EPZEU.Models.ApplicationFormTypes.V33)
            {
                return true;
            }

            return false;
        }

        private bool IsApplicationTypeA(Integration.EPZEU.Models.ApplicationFormTypes applicationType)
        {
            if (applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A1 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A2 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A3 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A4 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A5 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A6 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A7 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A8 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A9 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.AA ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A10 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A11 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A12 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A13 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A14 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A15 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A16 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A17 ||
               applicationType == Integration.EPZEU.Models.ApplicationFormTypes.A18)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private List<Integration.EPZEU.Models.ApplicationFormTypes> GetAdditionalApplicationFormTypes(Application mainAppl, List<Integration.EPZEU.Models.ApplicationFormTypes> subApplTypes)
        {
            var result = new List<Integration.EPZEU.Models.ApplicationFormTypes>();
            var processState = (ProcessStates)int.Parse(mainAppl.AdditionalData["state"]);

            if (processState == ProcessStates.New && IsApplicationTypeA(mainAppl.Type.Value))
            {
                if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B1)
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A8
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A15
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A16
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A17
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A18)
                {
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B1);
                }

                if (mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A8
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A11
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A14
                    && mainAppl.Type != Integration.EPZEU.Models.ApplicationFormTypes.A18)
                {
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B2);
                }

                if (mainAppl.Type == Integration.EPZEU.Models.ApplicationFormTypes.A12)
                {
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B4);

                    if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B6))
                    {
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B6);
                    }
                }

                if (mainAppl.Type == Integration.EPZEU.Models.ApplicationFormTypes.A14)
                {
                    if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B7))
                    {
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B7);
                    }
                }

                if (mainAppl.Type == Integration.EPZEU.Models.ApplicationFormTypes.A10
                    || mainAppl.Type == Integration.EPZEU.Models.ApplicationFormTypes.A13)
                {
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B3);
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B4);
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B5);
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B6);
                }

                if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                {
                    result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                }
            }

            if (processState == ProcessStates.Preregistration && IsApplicationTypeA(mainAppl.Type.Value))
            {
                switch (mainAppl.Type)
                {
                    case Integration.EPZEU.Models.ApplicationFormTypes.A1:
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B1);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B2);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B4);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.A2:
                    case Integration.EPZEU.Models.ApplicationFormTypes.A3:
                    case Integration.EPZEU.Models.ApplicationFormTypes.A4:
                    case Integration.EPZEU.Models.ApplicationFormTypes.A6:
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B1);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B2);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B3);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B4);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B5);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B6))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B6);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.A5:
                    case Integration.EPZEU.Models.ApplicationFormTypes.A7:
                    case Integration.EPZEU.Models.ApplicationFormTypes.A9:
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B1);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B2);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B4);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B6))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B6);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.A14:
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B1);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B2);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B4);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.A8:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B4);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.A15:
                    case Integration.EPZEU.Models.ApplicationFormTypes.A16:
                    case Integration.EPZEU.Models.ApplicationFormTypes.A17:
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.B6))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.B6);
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.A18:
                        if (!subApplTypes.Contains(Integration.EPZEU.Models.ApplicationFormTypes.G1))
                            result.Add(Integration.EPZEU.Models.ApplicationFormTypes.G1);
                        break;
                }
            }

            if (IsTransformation(mainAppl.Type.Value))
            {
                switch (mainAppl.Type)
                {
                    case Integration.EPZEU.Models.ApplicationFormTypes.V1:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A1);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.V21:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A1);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A2);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A3);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A4);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A5);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A6);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A9);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A12);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A14);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.V22:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A2);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A3);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A4);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A5);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A6);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A9);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A14);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.V24:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A4);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A5);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A6);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A12);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A14);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.V25:
                    case Integration.EPZEU.Models.ApplicationFormTypes.V26:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A15);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A16);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A17);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.V31:
                    case Integration.EPZEU.Models.ApplicationFormTypes.V32:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A7);
                        break;
                    case Integration.EPZEU.Models.ApplicationFormTypes.V33:
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A7);
                        result.Add(Integration.EPZEU.Models.ApplicationFormTypes.A13);
                        break;
                }
            }

            return result;
        }

        #endregion
    }
}