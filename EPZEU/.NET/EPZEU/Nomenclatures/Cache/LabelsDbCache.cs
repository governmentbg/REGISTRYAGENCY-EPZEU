using EPZEU.Nomenclatures.Repositories;
using EPZEU.Utilities;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using EPZEU.Utilities.Caching;

namespace EPZEU.Nomenclatures.Cache
{
    /// <summary>
    /// Кеш за етикети
    /// </summary>
    public class LabelsDbCache : DataCacheItems<CachedDataInfo<Dictionary<string, string>>, string>, ILabelsDataCache
    {
        private readonly ILabelService _labelService;
        private readonly ILanguages _languages;
        private readonly ILogger<LabelsDbCache> _logger;
        private readonly IDbCacheInvalidationDispatcher _dbCacheInvalidationDispatcher;
        private readonly string[] _depencyTableNames = new string[] { };

        public LabelsDbCache(ILabelService labelService, ILanguages languages, ILogger<LabelsDbCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher)
        {
            _labelService = labelService;
            _languages = languages;
            _logger = logger;
            _dbCacheInvalidationDispatcher = dbCacheInvalidationDispatcher;
            _depencyTableNames = new string[] { "nom.d_labels", "nom.d_labels_i18n" };
        }

        protected override IDataCacheItem<CachedDataInfo<Dictionary<string, string>>> CreateCacheItem(string key)
        {
            return new DbDataCacheItem<Dictionary<string, string>>(_logger, _dbCacheInvalidationDispatcher, async (etag, cancellationToken) =>
            {
                await _languages.EnsureLoadedAsync(cancellationToken);

                int langID = _languages.GetLanguageOrDefault(key).LanguageID;

                var data = (await _labelService
                    .SearchLabel(new LabelSearchCriteria() { LanguageID = langID, LoadDecsription = false }, cancellationToken)).Result;

                return new CachedDataInfo<Dictionary<string, string>>()
                {
                    Value = data.Data.ToDictionary((item) => { return item.Code; }, (item) => { return item.Value; }),
                    LastModifiedDate = data.LastUpdatedOn
                };
            }, _depencyTableNames);
        }
    }
}
