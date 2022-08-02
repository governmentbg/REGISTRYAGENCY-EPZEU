using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Cache
{
    public class Labels : ILabels
    {
        private readonly ILabelsDataCache _labelsCache = null;

        public Labels(ILabelsDataCache labelsDataCache)
        {
            _labelsCache = labelsDataCache;
        }
        public string GetLabel(string lang, string labelCode)
        {
            var cache = _labelsCache.GetItem(lang);

            if (cache.Get().Value.TryGetValue(labelCode, out string value))
                return value;
            else
                return default(string);
        }

        public IDictionary<string, string> GetLabels(string lang, out DateTime? lastModifiedDate)
        {
            var data = _labelsCache.GetItem(lang).Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value;
        }

        public ValueTask EnsureLoadedAsync(string lang)
        {
            return _labelsCache.GetItem(lang).EnsureCreatedAsync(CancellationToken.None);
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _labelsCache.GetItem("bg").EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface ILabelsDataCache : IDataCacheItems<CachedDataInfo<Dictionary<string,string>>, string>
    {

    }

    public class LabelPollingCache : DataCacheItems<CachedDataInfo<Dictionary<string, string>>, string>, ILabelsDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesClient;
        private readonly IPollingCacheInfrastructure _pollingCacheInfrastructure;
        private readonly ILogger _logger;

        public LabelPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<LabelPollingCache> logger)
        {
            _nomenclaturesClient = nomenclaturesServiceClient;
            _pollingCacheInfrastructure = pollingCacheInfrastructure;
            _logger = logger;
        }

        protected override IDataCacheItem<CachedDataInfo<Dictionary<string, string>>> CreateCacheItem(string key)
        {
            return new PollingDataCacheItem<Dictionary<string, string>>(_logger, _pollingCacheInfrastructure, async (etag, cancellationToken) =>
            {
                var source = await _nomenclaturesClient.LoadLabelsAsync(key, null, etag, cancellationToken);

                return new CachedDataInfo<Dictionary<string, string>>()
                {
                    /*Създаваме Dictionary, InvariantCultureIgnoreCase StringComparer, за да може да се търси без значение от главни малки букви */
                    Value = source.Data != null ? new Dictionary<string, string>(source.Data, StringComparer.InvariantCultureIgnoreCase) : null,
                    LastModifiedDate = source.ModifiedDate
                };
            });
        }
    }
}
