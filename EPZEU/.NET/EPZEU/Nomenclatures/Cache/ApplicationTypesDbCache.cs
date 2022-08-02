using EPZEU.Nomenclatures.Models;
using EPZEU.Nomenclatures.Repositories;
using EPZEU.Utilities;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using EPZEU.Utilities.Caching;

namespace EPZEU.Nomenclatures.Cache
{

    public class ApplicationTypesDbCache : DataCacheItems<CachedDataInfo<List<ApplicationType>>, string>, IApplicationTypesDataCache
    {
        private readonly IApplicationTypeRepository _applicationTypeRepository;
        private readonly ILanguages _languages;
        private readonly ILogger _logger;
        private readonly IDbCacheInvalidationDispatcher _dbCacheInvalidationDispatcher;
        private readonly string[] _depencyTableNames = new string[] { "nom.s_application_types", "nom.s_application_types_i18n" };

        public ApplicationTypesDbCache(
            IApplicationTypeRepository applicationTypeRepository
            , ILanguages languages
            , ILogger<ApplicationTypesDbCache> logger
            , IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher)
        {
            _applicationTypeRepository = applicationTypeRepository;
            _languages = languages;
            _logger = logger;
            _dbCacheInvalidationDispatcher = dbCacheInvalidationDispatcher;
        }

        protected override IDataCacheItem<CachedDataInfo<List<ApplicationType>>> CreateCacheItem(string key)
        {
            return new DbDataCacheItem<List<ApplicationType>>(_logger, _dbCacheInvalidationDispatcher, async (etag, cancellationToken) =>
            {
                await _languages.EnsureLoadedAsync(cancellationToken);

                int langID = _languages.GetLanguageOrDefault(key).LanguageID;

                var data = await _applicationTypeRepository.SearchInfoAsync(new ApplicationTypeSearchCriteria() { LanguageID = (short?)langID }, cancellationToken);

                return new CachedDataInfo<List<ApplicationType>>()
                {
                    LastModifiedDate = data.LastUpdatedOn,
                    Value = data.Data.ToList()
                };
            }, _depencyTableNames);
        }
    }
}
