using EPZEU.CMS;
using EPZEU.Common.Cache;
using EPZEU.Nomenclatures;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.IdentityServer.Common
{
    public class ApplicationAsyncConfigurationService : IHostedService
    {
        private readonly ILanguages     _languages;
        private readonly ILabels        _labels;
        private readonly IStaticPages   _staticPages;
        private readonly IAppParameters _appParameters;

        public ApplicationAsyncConfigurationService(ILanguages languages, ILabels labels, IStaticPages staticPages, IAppParameters appParameters)
        {
            _languages     = languages;
            _labels        = labels;
            _staticPages   = staticPages;
            _appParameters = appParameters;
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
            yield return _staticPages.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _appParameters.EnsureLoadedAsync(cancellationToken).AsTask();
        }
    }
}
