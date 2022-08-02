using EPZEU.CMS;
using EPZEU.Common.Cache;
using EPZEU.Nomenclatures;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Code
{
    public class ApplicationAsyncConfigurationService : IHostedService
    {
        private readonly ILanguages _languages;
        private readonly ILabels _labels;
        private readonly ICountries _coutries;
        private readonly IStaticPages _staticPages;
        private readonly IApplicationTypes _applicationTypes;
        private readonly IAppParameters _appParameters;
        private readonly IEkatte _ekatte;
        private readonly ILegalForms _legalForms;
        private readonly IApplicationDocumentTypes _applicationDocumentTypes;


        public ApplicationAsyncConfigurationService(ILanguages languages, ILabels labels, ICountries coutries, IStaticPages staticPages, IApplicationTypes applicationTypes, IAppParameters appParameters, ILegalForms legalForms, IEkatte ekatte, IApplicationDocumentTypes applicationDocumentTypes)
        {
            _languages = languages;
            _labels = labels;
            _coutries = coutries;
            _staticPages = staticPages;
            _applicationTypes = applicationTypes;
            _appParameters = appParameters;
            _legalForms = legalForms;
            _ekatte = ekatte;
            _applicationDocumentTypes = applicationDocumentTypes;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            return Task.WhenAll(CreateConfigurationTasks(cancellationToken));
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

        private IEnumerable<Task> CreateConfigurationTasks(CancellationToken cancellationToken)
        {
            yield return _languages.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _labels.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _coutries.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _staticPages.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _applicationTypes.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _appParameters.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _legalForms.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _ekatte.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _applicationDocumentTypes.EnsureLoadedAsync(cancellationToken).AsTask();
        }
    }
}
