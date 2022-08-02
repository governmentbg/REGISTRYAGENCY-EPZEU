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
    public class Authorities : IAuthorities
    {
        private readonly IAuthoritiesDataCache _nomCache = null;

        public Authorities(IAuthoritiesDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public IEnumerable<Authority> GetAuthorities()
        {
            return _nomCache.Get().Value;
        }

        public IEnumerable<Authority> GetAuthorities(out DateTime? lastDateModified)
        {
            CachedDataInfo<List<Authority>> data = _nomCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value;
        }

        public Authority GetAuthorityById(int id)
        {
            CachedDataInfo<List<Authority>> data = _nomCache.Get();
            return data?.Value.SingleOrDefault(el => el.AuthorityID == id);
        }

        public Authority GetAuthorityByCourtCode(string code)
        {
            if (!string.IsNullOrEmpty(code)
                && int.TryParse(code, out int id))
            {
                return GetAuthorityById(id);
            }

            return null;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IAuthoritiesDataCache : IDataCacheItem<CachedDataInfo<List<Authority>>>
    {

    }

    public class AuthoritiesPollingCache : PollingDataCacheItem<List<Authority>>, IAuthoritiesDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public AuthoritiesPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<AuthoritiesPollingCache> logger): base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<List<Authority>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesServiceClient.LoadAuthoritiesAsync(etag, cancellationToken);

            return new CachedDataInfo<List<Authority>>()
            {
                Value = source.Data?.ToList(),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
