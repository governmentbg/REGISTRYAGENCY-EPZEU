using EPZEU.CMS.Models;
using EPZEU.CMS.Repositories;
using EPZEU.Nomenclatures;
using EPZEU.Utilities;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EPZEU.Utilities.Caching;

namespace EPZEU.CMS.Cache
{
    /// <summary>
    /// Кеш за статични страници.
    /// </summary>
    public class PagesDbCache : DataCacheItems<CachedDataInfo<Dictionary<int, Page>>, string>, IPagesDataCache
    {
        private readonly IPageRepository                _pageRepository;
        private readonly ILanguages                     _languages;
        private readonly ILogger                        _logger;
        private readonly IDbCacheInvalidationDispatcher _dbCacheInvalidationDispatcher;

        private readonly string[]  _depencyTableNames = new string[] { "cms.pages", "cms.pages_i18n", "nom.d_services", "nom.d_services_i18n", "nom.s_application_types", "nom.s_application_types_i18n" };

        public PagesDbCache(IPageRepository pageRepository, ILanguages languages, ILogger<PagesDbCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher)
        {
            _pageRepository                = pageRepository;
            _languages                     = languages;
            _logger                        = logger;
            _dbCacheInvalidationDispatcher = dbCacheInvalidationDispatcher;
        }

        protected override IDataCacheItem<CachedDataInfo<Dictionary<int, Page>>> CreateCacheItem(string key)
        {
            return new DbDataCacheItem<Dictionary<int, Page>>(_logger, _dbCacheInvalidationDispatcher, async(etag, cancellationToken) =>
            {
                var data = await _pageRepository.SearchInfoAsync(new PageSearchCriteria()
                { 
                    LangID = _languages.GetLanguage(key)?.LanguageID,
                    LoadContent = true,
                    LoadOnlyUntranslated = false,
                    LoadSeparateValueI18n = false
                }, cancellationToken);

                return new CachedDataInfo<Dictionary<int, Page>>()
                {
                    Value = data.Data.ToDictionary((item) => { return item.PageID.GetValueOrDefault(); }),
                    LastModifiedDate = data.LastUpdatedOn
                };
            }, _depencyTableNames);
        }
    }
}