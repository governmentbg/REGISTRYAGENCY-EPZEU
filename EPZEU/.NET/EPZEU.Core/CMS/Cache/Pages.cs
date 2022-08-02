using CNSys.Caching;
using EPZEU.CMS.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CMS.Cache
{
    public class Pages : IPages
    {
        private IPagesDataCache _nomCache;

        public Pages(IPagesDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public Page GetPage(string lang, int pageID)
        {
            var data = _nomCache.GetItem(lang).Get();

            data.Value.TryGetValue(pageID, out Page ret);

            return ret;
        }

        IEnumerable<Page> IPages.GetPages(string lang, out DateTime? lastModifiedDate)
        {
            var data = _nomCache.GetItem(lang).Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value.Values;
        }

        public ValueTask EnsureLoadedAsync(string lang)
        {
            return _nomCache.GetItem(lang).EnsureCreatedAsync(CancellationToken.None);
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.GetItem("bg").EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IPagesDataCache : IDataCacheItems<CachedDataInfo<Dictionary<int, Page>>, string>
    {
    }

    public class PagesPollingCache : DataCacheItems<CachedDataInfo<Dictionary<int, Page>>, string>, IPagesDataCache
    {
        private readonly ICMSServiceClient _cmsClient;
        private readonly IPollingCacheInfrastructure _pollingCacheInfrastructure;
        private readonly ILogger _logger;

        public PagesPollingCache(ICMSServiceClient cmsClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<PagesPollingCache> logger)
        {
            _cmsClient = cmsClient;
            _pollingCacheInfrastructure = pollingCacheInfrastructure;
            _logger = logger;
        }

        protected override IDataCacheItem<CachedDataInfo<Dictionary<int, Page>>> CreateCacheItem(string key)
        {
            return new PollingDataCacheItem<Dictionary<int, Page>>(_logger, _pollingCacheInfrastructure, async (etag, cancellationToken) =>
            {
                CMSResult<IEnumerable<Page>> source = await _cmsClient.LoadPagesAsync(key, etag, cancellationToken);

                return new CachedDataInfo<Dictionary<int, Page>>()
                {
                    Value = source.Data != null ? source.Data.ToDictionary(item => item.PageID.Value) : null,
                    LastModifiedDate = source.ModifiedDate
                };
            });
        }
    }
}
