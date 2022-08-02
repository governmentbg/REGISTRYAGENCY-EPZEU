using EPZEU.Audit;
using EPZEU.CR.ApplicationFormProviders;
using EPZEU.CR.ApplicationProcesses.Repositories;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.Security;
using Integration.EPZEU.Models;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace EPZEU.CR.Applications
{
    /// <summary>
    /// Интерфейс за работа със заявления.
    /// </summary>
    public interface IApplicationService
    {
        /// <summary>
        /// Операция за промяна статус на заявление.
        /// </summary>
        void UpdateApplicationStatus();

        /// <summary>
        /// Операция за създаване на заявление.
        /// </summary>
        /// <param name="applicationInfo">Информация за заявление.</param>
        void CreateApplication(ApplicationInfo applicationInfo);

        /// <summary>
        /// Операция за изчитане на данни за заявление.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <returns>Данни за заявление.</returns>
        Task<IApplicationForm> GetApplicationFormAsync(string incomingNumber);

        /// <summary>
        /// Флаг указващ дали потребител има достъп до чернова на документ.
        /// </summary>
        /// <param name="docGuid">Идентификатор на документ.</param>
        /// <param name="cin">КИН</param>
        /// <param name="isUserIdentifiable">Флаг указващ дали потребителя е идентифицируем.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns></returns>
        Task<bool> HasUserDocumentDraftAccessAsync(string docGuid, int cin, bool isUserIdentifiable, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс за работа със заявления.
    /// </summary>
    internal class ApplicationService : IApplicationService
    {
        private Integration.EPZEU.IApplicationServiceClient _crAppServiceClient;
        private EPZEU.Applications.IApplicationServiceClient _epzeuAppServiceClient;
        private IApplicationFormProviderFactory _providerFactory;
        private readonly IAuditServiceClient auditServiceClient = null;
        private readonly IEPZEUUserAccessor _EPZEUUserAccessor;
        private readonly IApplicationRepository _applicationRepository;

        [ThreadStatic] static XmlNameTable nameTable;

        public ApplicationService(Integration.EPZEU.IApplicationServiceClient crAppServiceClient, 
            EPZEU.Applications.IApplicationServiceClient epzeuAppServiceClient,
            IApplicationFormProviderFactory providerFactory,
            IAuditServiceClient auditServiceClient,
            IEPZEUUserAccessor EPZEUUserAccessor,
            IApplicationRepository applicationRepository)
        {
            _crAppServiceClient = crAppServiceClient;
            _epzeuAppServiceClient = epzeuAppServiceClient;
            _providerFactory = providerFactory;
            this.auditServiceClient = auditServiceClient;
            _EPZEUUserAccessor = EPZEUUserAccessor;
            _applicationRepository = applicationRepository;
        }

        #region IApplicationService

        public void CreateApplication(ApplicationInfo applicationInfo)
        {
            throw new NotImplementedException();
        }

        public async Task<IApplicationForm> GetApplicationFormAsync(string incomingNumber)
        { 
            IApplicationForm appForm = null;
            var appXml = new XmlDocument();
            string appFormsNamespace = typeof(ApplicationFormBase).Namespace;

            var appDoc = (await _crAppServiceClient.GeApplicationFileContentAsync(incomingNumber, PassedFrom.Internet))?.FileContentStream;
            
            if (appDoc != null && appDoc.Content != null)
            {
                using (appDoc.Content)
                {
                    appXml.Load(appDoc.Content);
                }

                var appFromType = Type.GetType($"{appFormsNamespace}.{appXml.DocumentElement.LocalName},EPZEU.CR.Domain");
                var appFromProvider = _providerFactory.CreateApplicationProvider(((IApplicationForm)Activator.CreateInstance(appFromType)).AppType);

                if (nameTable == null)
                {
                    nameTable = new NameTable();
                }

                using (TextReader textReader = new StringReader(appXml.DocumentElement.OuterXml))
                {
                    using (var xmlReader = new XmlTextReader(textReader, nameTable))
                    {
                        appFromProvider.LoadFromXml(xmlReader);
                    }
                }

                appForm = appFromProvider.ApplicationForm;
            }

            return appForm;
        }

        public void UpdateApplicationStatus()
        {
            throw new NotImplementedException();
        }

        public Task<bool> HasUserDocumentDraftAccessAsync(string docGuid, int cin, bool isUserIdentifiable, CancellationToken cancellationToken)
        {
            return _applicationRepository.HasUserDocumentDraftAccess(docGuid, cin, isUserIdentifiable, cancellationToken);
        }

        #endregion
    }
}
