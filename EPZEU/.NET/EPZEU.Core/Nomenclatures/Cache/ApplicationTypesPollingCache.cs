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
    public class ApplicationTypes : IApplicationTypes
    {
        private readonly IApplicationTypesDataCache _nomCache = null;

        public ApplicationTypes(IApplicationTypesDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public IEnumerable<ApplicationType> GetApplicationTypes(string langCode, Registers? registerID, out DateTime? lastModifiedDate)
        {
            CachedDataInfo<List<ApplicationType>> data = _nomCache.GetItem(langCode).Get();

            lastModifiedDate = data.LastModifiedDate;

            if (registerID.HasValue)
                return data.Value.Where(item => item.RegisterID == registerID);

            return data.Value;
        }

        public ValueTask EnsureLoadedAsync(string langCode)
        {
            return _nomCache.GetItem(langCode).EnsureCreatedAsync(CancellationToken.None);
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.GetItem("bg").EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IApplicationTypesDataCache : IDataCacheItems<CachedDataInfo<List<ApplicationType>>, string>
    {
    }

    public class ApplicationTypesPollingCache : DataCacheItems<CachedDataInfo<List<ApplicationType>>, string>, IApplicationTypesDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesClient;
        private readonly IPollingCacheInfrastructure _pollingCacheInfrastructure;
        private readonly ILogger _logger;

        public ApplicationTypesPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<ApplicationTypesPollingCache> logger)
        {
            _nomenclaturesClient = nomenclaturesServiceClient;
            _pollingCacheInfrastructure = pollingCacheInfrastructure;
            _logger = logger;
        }

        protected override IDataCacheItem<CachedDataInfo<List<ApplicationType>>> CreateCacheItem(string key)
        {
            return new PollingDataCacheItem<List<ApplicationType>>(_logger, _pollingCacheInfrastructure, async (etag, cancellationToken) =>
            {
                var source = await _nomenclaturesClient.LoadApplicationTypesAsync(key, null, etag, cancellationToken);

                return new CachedDataInfo<List<ApplicationType>>()
                {
                    Value = source.Data?.ToList(),
                    LastModifiedDate = source.ModifiedDate
                };
            });
        }
    }
}
