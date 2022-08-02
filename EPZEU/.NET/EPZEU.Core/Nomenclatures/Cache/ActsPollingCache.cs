using EPZEU.Nomenclatures.Models;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Cache
{
    public class Acts : IActs
    {
        private readonly IActsCache _actsCache;

        public Acts(IActsCache actsCache)
        {
            _actsCache = actsCache;
        }

        public IEnumerable<Act> GetActs(out DateTime? lastDateModified)
        {
            var data = _actsCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _actsCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IActsCache : IDataCacheItem<CachedDataInfo<List<Act>>>
    {
    }

    public class ActsPollingCache : PollingDataCacheItem<List<Act>>, IActsCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public ActsPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<ActsPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<List<Act>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadActsAsync(etag, cancellationToken);

            return new CachedDataInfo<List<Act>>()
            {
                Value = source.Data?.ToList(),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
