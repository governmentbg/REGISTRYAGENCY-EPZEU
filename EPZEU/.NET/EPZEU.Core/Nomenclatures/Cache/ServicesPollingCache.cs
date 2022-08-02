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
    public class Services : IServices
    {
        private readonly IServicesDataCache _nomCache;

        public Services(IServicesDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public IEnumerable<Service> GetServices(string lang)
        {
            return _nomCache.GetItem(lang).Get().Value;
        }

        public IEnumerable<Service> GetServices(string lang, out DateTime? lastModifiedDate)
        {
            var data = _nomCache.GetItem(lang).Get();

            lastModifiedDate = data.LastModifiedDate;

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

    public interface IServicesDataCache : IDataCacheItems<CachedDataInfo<List<Service>>, string>
    {
    }

    public class ServicesPollingCache : DataCacheItems<CachedDataInfo<List<Service>>, string>, IServicesDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesClient;
        private readonly IPollingCacheInfrastructure _pollingCacheInfrastructure;
        private readonly ILogger _logger;

        public ServicesPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<ServicesPollingCache> logger)
        {
            _nomenclaturesClient = nomenclaturesServiceClient;
            _pollingCacheInfrastructure = pollingCacheInfrastructure;
            _logger = logger;
        }

        protected override IDataCacheItem<CachedDataInfo<List<Service>>> CreateCacheItem(string key)
        {
            return new PollingDataCacheItem<List<Service>>(_logger, _pollingCacheInfrastructure, async (etag, cancellationToken) =>
            {
                var source = await _nomenclaturesClient.LoadServicesAsync(key, null, etag, cancellationToken);

                return new CachedDataInfo<List<Service>>()
                {
                    Value = source.Data?.ToList(),
                    LastModifiedDate = source.ModifiedDate
                };
            });
        }
    }
}
