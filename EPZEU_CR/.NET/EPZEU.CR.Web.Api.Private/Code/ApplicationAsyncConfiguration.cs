using EPZEU.Common.Cache;
using EPZEU.Nomenclatures;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.Api.Private.Code
{
    public class ApplicationAsyncConfigurationService : IHostedService
    {
        private readonly ILanguages        _languages;
        private readonly ILabels           _labels;
        private readonly ICountries         _coutries;
        private readonly IApplicationTypes _applicationTypes;
        private readonly IAppParameters    _appParameters;

        public ApplicationAsyncConfigurationService(ILanguages languages, ILabels labels, ICountries coutries, IApplicationTypes applicationTypes, IAppParameters appParameters)
        {
            _languages        = languages;
            _labels           = labels;
            _coutries         = coutries;
            _applicationTypes = applicationTypes;
            _appParameters    = appParameters;
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
            yield return _applicationTypes.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _appParameters.EnsureLoadedAsync(cancellationToken).AsTask();
        }
    }
}
