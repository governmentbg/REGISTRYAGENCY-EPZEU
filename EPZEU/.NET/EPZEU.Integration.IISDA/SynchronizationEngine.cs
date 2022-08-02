using CNSys.Hosting;
using EPZEU.Common;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Integration.IISDA
{
    /// <summary>
    /// Engine за синхронизация на услугите в IISDA.
    /// </summary>
    public class SynchronizationEngine : PollingBackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public SynchronizationEngine(ILogger<SynchronizationEngine> logger, IServiceProvider serviceProvider) : base(logger)
        {
            _serviceProvider = serviceProvider;

            var intgrOptions = _serviceProvider.GetRequiredService<IOptionsMonitor<IntegrationIISDAOptions>>().CurrentValue;

            NextDelayCalculator = GetDefaultCalculatorWithIncrementalBackoff(
                intgrOptions.EP_INTGR_IISDA_ADM_SERVICES_INTERVAL,
                intgrOptions.EP_INTGR_IISDA_ADM_SERVICES_INTERVAL, new TimeSpan(intgrOptions.EP_INTGR_IISDA_ADM_SERVICES_INTERVAL.Ticks * 10));
        }

        protected override async Task PollAsync(CancellationToken stoppingToken)
        {
            using (var scopeServices = _serviceProvider.CreateScope())
            {
                bool success = false;

                var serviceProcessor = scopeServices.ServiceProvider.GetRequiredService<IIISDAServicesProcessor>();
                var intgrOptions = scopeServices.ServiceProvider.GetRequiredService<IOptionsMonitor<IntegrationIISDAOptions>>().CurrentValue;
                var globalOptions = scopeServices.ServiceProvider.GetRequiredService<IOptionsMonitor<GlobalOptions>>().CurrentValue;

                for (int i = 0; i < globalOptions.GL_API_TRY_COUNT; i++)
                {
                    try
                    {
                        await serviceProcessor.ReadAndProcessItemsFromIISDAAsync(stoppingToken);

                        success = true;
                        break;
                    }
                    catch (Exception ex)
                    {
                        Logger.LogException(ex);
                    }

                    await Task.Delay(globalOptions.GL_API_RETRY_INTERVAL, stoppingToken);
                }

                if (!success)
                {
                    //TODO Send mail to administrator: IISDA integration failed!
                }
            }
        }
    }
}
