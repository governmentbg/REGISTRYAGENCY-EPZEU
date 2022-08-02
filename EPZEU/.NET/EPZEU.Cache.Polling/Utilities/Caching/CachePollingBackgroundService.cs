using CNSys.Caching;
using CNSys.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Utilities.Caching
{
    public class CachePollingBackgroundService : PollingBackgroundService, IPollingCacheInfrastructure
    {
        private readonly object _syncRoot = new object();
        private Func<CancellationToken, Task>[] _pollingDelegates = new Func<CancellationToken, Task>[0];
        private readonly CachePollingOptions _options;

        public CachePollingBackgroundService(ILogger<CachePollingBackgroundService> logger, IOptions<CachePollingOptions> options)
            : base(logger)
        {
            _options = options.Value;

            NextDelayCalculator = GetDefaultCalculatorWithIncrementalBackoff(_options.PollingInterval, TimeSpan.MinValue, _options.PollingInterval);
        }

        public void RegisterPollingDelegate(Func<CancellationToken, Task> pollingDelegate)
        {
            lock (_syncRoot)
            {
                var oldDelegates = new List<Func<CancellationToken, Task>>(_pollingDelegates.Length + 1);

                oldDelegates.AddRange(_pollingDelegates);

                oldDelegates.Add(pollingDelegate);

                _pollingDelegates = oldDelegates.ToArray();
            }
        }

        public void UnregisterPollingDelegate(Func<CancellationToken, Task> pollingDelegate)
        {
            lock (_syncRoot)
            {
                var oldDelegates = new List<Func<CancellationToken, Task>>(_pollingDelegates);

                if (!oldDelegates.Remove(pollingDelegate))
                    throw new NotSupportedException();

                _pollingDelegates = oldDelegates.ToArray();
            }
        }

        protected override async Task PollAsync(CancellationToken stoppingToken)
        {
            var delegatesToPoll = GetDelegatesToPoll();

            if (_options.ParallelCachePoll)
            {
                await Task.WhenAll(delegatesToPoll.Select((item) =>
                {
                    try
                    {
                        return item(stoppingToken);
                    }
                    catch (Exception ex)
                    {
                        Logger.LogException(ex);

                        return Task.CompletedTask;
                    }
                }));
            }
            else
            {
                foreach (var delegateToPoll in delegatesToPoll)
                {
                    try
                    {
                        await delegateToPoll(stoppingToken);
                    }
                    catch (Exception exInner)
                    {
                        Logger.LogException(exInner);
                    }
                }
            }
        }

        private Func<CancellationToken, Task>[] GetDelegatesToPoll()
        {
            lock(_syncRoot)
            {
                return _pollingDelegates;
            }
        }
    }
}
