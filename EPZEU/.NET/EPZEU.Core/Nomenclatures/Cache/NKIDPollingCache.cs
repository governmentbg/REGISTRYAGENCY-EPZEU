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
    public class NKIDs : INKID
    {
        private readonly INKIDDataCache _nomCache = null;

        public NKIDs(INKIDDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public IEnumerable<NKID> GetNKID(out DateTime? lastDateModified)
        {
            CachedDataInfo<List<NKID>> data = _nomCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface INKIDDataCache : IDataCacheItem<CachedDataInfo<List<NKID>>>
    {

    }

    public class NKIDPollingCache : PollingDataCacheItem<List<NKID>>, INKIDDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public NKIDPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<NKIDPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<List<NKID>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadNKIDAsync(etag, cancellationToken);

            return new CachedDataInfo<List<NKID>>()
            {
                Value = source.Data?.ToList(),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
