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
    public class LegalForms : ILegalForms
    {
        private readonly ILegalFormDataCache _nomCache = null;

        public LegalForms(ILegalFormDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public LegalForm GetLegalForm(int ID)
        {
            CachedDataInfo<Dictionary<int, LegalForm>> data = _nomCache.Get();

            data.Value.TryGetValue(ID, out LegalForm legalForm);

            return legalForm;
        }

        public IEnumerable<LegalForm> GetLegalForms()
        {
            CachedDataInfo<Dictionary<int, LegalForm>> data = _nomCache.Get();

            return data.Value.Values;
        }

        public IEnumerable<LegalForm> GetLegalForms(out DateTime? lastDateModified)
        {
            CachedDataInfo<Dictionary<int, LegalForm>> data = _nomCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.Values;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface ILegalFormDataCache : IDataCacheItem<CachedDataInfo<Dictionary<int, LegalForm>>>
    {
    }

    public class LegalFormPollingCache : PollingDataCacheItem<Dictionary<int, LegalForm>>, ILegalFormDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public LegalFormPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<LegalFormPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<int, LegalForm>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadLegalFormsAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<int, LegalForm>>()
            {
                Value = source.Data?.ToDictionary((item) => item.ID),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
