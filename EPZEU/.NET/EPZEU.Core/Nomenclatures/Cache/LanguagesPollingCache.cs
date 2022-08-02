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
    public class Languages : ILanguages
    {
        private readonly ILanguagesCache _languagesCache;

        public Languages(ILanguagesCache languagesCache)
        {
            _languagesCache = languagesCache;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _languagesCache.EnsureCreatedAsync(cancellationToken);
        }

        public Language GetDefaultLanguage()
        {
            return _languagesCache.Get().Value.FirstOrDefault(lang => { return lang.IsDefault; });
        }

        public Language GetLanguage(string code)
        {
            var languages = _languagesCache.Get();

            return languages.Value.FirstOrDefault(lang => { return String.Compare(lang.Code, code, true) == 0; });
        }

        public IEnumerable<Language> GetLanguages()
        {
            return _languagesCache.Get().Value;
        }

        public IEnumerable<Language> GetLanguages(out DateTime? lastModifiedDate)
        {
            var data = _languagesCache.Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value;
        }
    }

    public interface ILanguagesCache : IDataCacheItem<CachedDataInfo<List<Language>>>
    { 

    }

    public class LanguagesPollingCache : PollingDataCacheItem<List<Language>>, ILanguagesCache
    {
        private readonly ILogger<LanguagesPollingCache> _logger;
        private readonly INomenclaturesServiceClient _nomenclaturesClient;
        private readonly IPollingCacheInfrastructure _pollingCacheInfrastructure;

        public LanguagesPollingCache(ILogger<LanguagesPollingCache> logger, INomenclaturesServiceClient nomenclaturesClient, IPollingCacheInfrastructure pollingCacheInfrastructure) : base(logger, pollingCacheInfrastructure, null)
        {
            _logger = logger;
            _nomenclaturesClient = nomenclaturesClient;
            _pollingCacheInfrastructure = pollingCacheInfrastructure;
        }

        protected override async Task<CachedDataInfo<List<Language>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesClient.LoadLanguagesAsync(null, etag, cancellationToken);

            return new CachedDataInfo<List<Language>>()
            {
                Value = source.Data?.ToList(),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
