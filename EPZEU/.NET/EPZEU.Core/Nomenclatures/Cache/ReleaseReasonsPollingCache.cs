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
    public class ReleaseReasons : IReleaseReasons
    {
        private readonly IReleaseReasonsCache _releaseReasonsCache;

        public ReleaseReasons(IReleaseReasonsCache releaseReasonsCache)
        {
            _releaseReasonsCache = releaseReasonsCache;
        }

        public ReleaseReason GetReleaseReason(int reasonID)
        {
            _releaseReasonsCache.Get().Value.TryGetValue(reasonID, out ReleaseReason ret);

            return ret;
        }

        public IEnumerable<ReleaseReason> GetReleaseReasons()
        {
            return _releaseReasonsCache.Get().Value?.Values;
        }

        public IEnumerable<ReleaseReason> GetReleaseReasons(out DateTime? lastDateModified)
        {
            CachedDataInfo<Dictionary<int, ReleaseReason>> data = _releaseReasonsCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.Values;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _releaseReasonsCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IReleaseReasonsCache : IDataCacheItem<CachedDataInfo<Dictionary<int, ReleaseReason>>>
    {
    }

    public class ReleaseReasonsPollingCache : PollingDataCacheItem<Dictionary<int, ReleaseReason>>, IReleaseReasonsCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public ReleaseReasonsPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<ReleaseReasonsPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<int, ReleaseReason>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadReleaseReasonsAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<int, ReleaseReason>>()
            {
                Value = source.Data?.ToDictionary((item) => item.ReasonID),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
