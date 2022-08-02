using EPZEU.CMS.Models;
using EPZEU.CMS.Repositories;
using EPZEU.Nomenclatures.Repositories;
using EPZEU.Utilities;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EPZEU.Utilities.Caching;

namespace EPZEU.CMS.Cache
{
    /// <summary>
    /// Кеш за статични страници.
    /// </summary>
    public class StaticPagesDbCache : DbDataCacheItem<Dictionary<string, StaticPage>>, IStaticPagesDataCache
    {
        private readonly IStaticPageRepository _staticPageRepository;

        public StaticPagesDbCache(ILogger<StaticPagesDbCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher, IStaticPageRepository staticPageRepository) :
            base(logger, dbCacheInvalidationDispatcher, null, new string[] { "cms.n_s_static_pages" })
        {
            _staticPageRepository = staticPageRepository;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, StaticPage>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            CollectionInfo<StaticPage> data = await _staticPageRepository.SearchInfoAsync(new StaticPageSearchCriteria(), cancellationToken);

            return new CachedDataInfo<Dictionary<string, StaticPage>>()
            {
                /*Създаваме Dictionary, InvariantCultureIgnoreCase StringComparer, за да може да се търси без значение от главни малки букви */
                Value = data.Data?.ToDictionary((item) => { return item.PageKey; }, StringComparer.InvariantCultureIgnoreCase),
                LastModifiedDate = data.LastUpdatedOn
            };
        }
    }
}
