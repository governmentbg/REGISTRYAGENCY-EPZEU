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
    /// <summary>
    /// Кеш за услуги
    /// </summary>
    public class ServicesDbCache : DataCacheItems<CachedDataInfo<List<Service>>, string>, IServicesDataCache
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly ILanguages _languages;
        private readonly ILogger _logger;
        private readonly IDbCacheInvalidationDispatcher _dbCacheInvalidationDispatcher;
        private readonly string[] _depencyTableNames = new string[] { "nom.d_services", "nom.d_services_i18n", "nom.d_iisda_services" };

        public ServicesDbCache(
            IServiceRepository serviceRepository
            , ILanguages languages
            , ILogger<ServicesDbCache> logger
            , IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher)
        {
            _serviceRepository = serviceRepository;
            _languages = languages;
            _logger = logger;
            _dbCacheInvalidationDispatcher = dbCacheInvalidationDispatcher;
        }

        protected override IDataCacheItem<CachedDataInfo<List<Service>>> CreateCacheItem(string key)
        {
            return new DbDataCacheItem<List<Service>>(_logger, _dbCacheInvalidationDispatcher, async (etag, cancellationToken) =>
            {
                await _languages.EnsureLoadedAsync(cancellationToken);

                int langID = _languages.GetLanguageOrDefault(key).LanguageID;

                var data = await _serviceRepository.SearchInfoAsync(new ServiceSearchCriteria() { LanguageID = langID, LoadDecsription = true, LoadShortDescription = true}, cancellationToken);

                return new CachedDataInfo<List<Service>>()
                {
                    LastModifiedDate = data.LastUpdatedOn,
                    Value = data.Data?.ToList()
                };
            }, _depencyTableNames);
        }
    }
}
