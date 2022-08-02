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
    public class Countries : ICountries
    {
        private readonly ICountriesCache _countriesCache;

        public Countries(ICountriesCache countriesCache)
        {
            _countriesCache = countriesCache;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _countriesCache.EnsureCreatedAsync(cancellationToken);
        }

        public Country GetBGCountry()
        {
            return GetCountries().SingleOrDefault(el => { return string.Compare(el.Code, "BGR", true) == 0; });
        }

        public IEnumerable<Country> GetCountries()
        {
            return _countriesCache.Get().Value;
        }

        public IEnumerable<Country> GetCountries(out DateTime? lastModifiedDate)
        {
            var data = _countriesCache.Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value;
        }
    }

    public interface ICountriesCache : IDataCacheItem<CachedDataInfo<List<Country>>>
    {

    }

    public class CountriesPollingCache : PollingDataCacheItem<List<Country>>, ICountriesCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesClient;

        public CountriesPollingCache(ILogger<CountriesPollingCache> logger, INomenclaturesServiceClient nomenclaturesClient, IPollingCacheInfrastructure pollingCacheInfrastructure) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesClient = nomenclaturesClient;
        }

        protected override async Task<CachedDataInfo<List<Country>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _nomenclaturesClient.LoadCountriesAsync(etag, cancellationToken);

            return new CachedDataInfo<List<Country>>()
            {
                Value = source.Data?.ToList(),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
