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

    public class ForeignLegalForms : IForeignLegalForms
    {
        private readonly IForeignLegalFormsDataCache _nomCache = null;

        public ForeignLegalForms(IForeignLegalFormsDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public ForeignLegalForm GetForeignLegalForm(string code)
        {
            var data = _nomCache.Get();

            data.Value.TryGetValue(code, out ForeignLegalForm foreignLegalForm);

            return foreignLegalForm;
        }

        public IEnumerable<ForeignLegalForm> GetForeignLegalForms()
        {
            var data = _nomCache.Get();

            return data.Value.Values;
        }

        public IEnumerable<ForeignLegalForm> GetForeignLegalForms(out DateTime? lastDateModified)
        {
            var data = _nomCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.Values;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IForeignLegalFormsDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, ForeignLegalForm>>>
    {
    }

    public class ForeignLegalFormsPollingCache : PollingDataCacheItem<Dictionary<string, ForeignLegalForm>>, IForeignLegalFormsDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public ForeignLegalFormsPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<ForeignLegalFormsPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, ForeignLegalForm>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadForeignLegalFormsAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, ForeignLegalForm>>()
            {
                Value = source.Data?.ToDictionary((item) => item.Code),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
