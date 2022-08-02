using EPZEU.Common.Cache;
using EPZEU.Nomenclatures;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Private
{
    public class ApplicationAsyncConfigurationService : IHostedService
    {
        private readonly ILanguages _languages;
        private readonly ILabels _labels;
        private readonly IAppParameters _appParameters;
        private readonly Nomenclatures.IApplicationTypes _appTypes;

        public ApplicationAsyncConfigurationService(ILanguages languages, ILabels labels, IAppParameters appParameters, Nomenclatures.IApplicationTypes appTypes)
        {
            _languages = languages;
            _labels = labels;
            _appParameters = appParameters;
            _appTypes = appTypes;
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
            yield return _appParameters.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _appTypes.EnsureLoadedAsync(cancellationToken).AsTask();
        }
    }
}
