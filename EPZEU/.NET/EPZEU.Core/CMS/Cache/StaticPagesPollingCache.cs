using EPZEU.CMS.Models;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CMS.Cache
{
    public class StaticPages : IStaticPages
    {
        private readonly IStaticPagesDataCache _nomCache;

        public StaticPages(IStaticPagesDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public StaticPage GetStaticPage(string pageKey)
        {
            var data = _nomCache.Get();

            data.Value.TryGetValue(pageKey, out StaticPage ret);

            return ret;
        }

        IEnumerable<StaticPage> IStaticPages.GetStaticPages(out DateTime? lastModifiedDate)
        {
            var data = _nomCache.Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value.Values;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }

        public IChangeToken GetChangeToken()
        {
            return _nomCache.GetChangeToken();
        }
    }

    public interface IStaticPagesDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, StaticPage>>>
    {
    }

    public class StaticPagesPollingCache : PollingDataCacheItem<Dictionary<string, StaticPage>>, IStaticPagesDataCache
    {
        private readonly ICMSServiceClient _cmsClient;

        public StaticPagesPollingCache(ICMSServiceClient cmsClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<StaticPagesPollingCache> logger) 
            : base(logger, pollingCacheInfrastructure, null)
        {
            _cmsClient = cmsClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, StaticPage>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _cmsClient.LoadStaticPagesAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, StaticPage>>()
            {
                /*Създаваме Dictionary, InvariantCultureIgnoreCase StringComparer, за да може да се търси без значение от главни малки букви */
                Value = source.Data?.ToDictionary(item => item.PageKey, StringComparer.InvariantCultureIgnoreCase),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
