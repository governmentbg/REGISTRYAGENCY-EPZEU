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
    public class SpecialAccessUserTypes : ISpecialAccessUserTypes
    {
        private readonly ISpecialAccessUserTypesDataCache _nomCache = null;

        public SpecialAccessUserTypes(ISpecialAccessUserTypesDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public IEnumerable<SpecialAccessUserType> GetSpecialAccessUserTypes(out DateTime? lastModifiedDate)
        {
            CachedDataInfo<List<SpecialAccessUserType>> data = _nomCache.Get();
            lastModifiedDate = data.LastModifiedDate;

            return data.Value;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface ISpecialAccessUserTypesDataCache : IDataCacheItem<CachedDataInfo<List<SpecialAccessUserType>>>
    {
    }

    public class SpecialAccessUserTypesPollingCache : PollingDataCacheItem<List<SpecialAccessUserType>>, ISpecialAccessUserTypesDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public SpecialAccessUserTypesPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<SpecialAccessUserTypesPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<List<SpecialAccessUserType>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadSpecialAccessUserTypesAsync(etag, cancellationToken);

            return new CachedDataInfo<List<SpecialAccessUserType>>()
            {
                Value = source.Data?.ToList(),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
