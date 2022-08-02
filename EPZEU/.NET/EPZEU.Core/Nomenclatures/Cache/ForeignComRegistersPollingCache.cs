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
    public class ForeignComRegisters : IForeignComRegisters
    {
        private readonly IForeignComRegistersDataCache _nomCache = null;

        public ForeignComRegisters(IForeignComRegistersDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public ForeignComRegister GetForeignComRegister(string code)
        {
            var data = _nomCache.Get();

            data.Value.TryGetValue(code, out ForeignComRegister res);

            return res;
        }

        public IEnumerable<ForeignComRegister> GetForeignComRegisters()
        {
            var data = _nomCache.Get();
            return data.Value.Values;
        }

        public IEnumerable<ForeignComRegister> GetForeignComRegisters(out DateTime? lastDateModified)
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

    public interface IForeignComRegistersDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, ForeignComRegister>>>
    {
    }

    public class ForeignComRegistersPollingCache : PollingDataCacheItem<Dictionary<string, ForeignComRegister>>, IForeignComRegistersDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public ForeignComRegistersPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<ForeignComRegistersPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, ForeignComRegister>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadForeignComRegistersAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, ForeignComRegister>>()
            {
                Value = source.Data?.ToDictionary((item) => item.Code),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
