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
    internal class EKATTE : IEkatte
    {
        private readonly IDistrictsDataCache _districtsCache;
        private readonly IMunicipalitiesDataCache _municipalitiesCache;
        private readonly ISettlementsDataCache _settlemetsCache;
        private readonly IAreasDataCache _areasCache;

        public EKATTE(
            IDistrictsDataCache districtsCache,
            IMunicipalitiesDataCache municipalitiesCache,
            ISettlementsDataCache settlementsCache,
            IAreasDataCache areasCache)
        {
            _districtsCache = districtsCache;
            _municipalitiesCache = municipalitiesCache;
            _settlemetsCache = settlementsCache;
            _areasCache = areasCache;
        }

        public IEnumerable<District> GetDistricts()
        {
            CachedDataInfo<Dictionary<string, District>> data = _districtsCache.Get();

            return data.Value.Values;
        }
        public IEnumerable<District> GetDistricts(out DateTime? lastDateModified)
        {
            CachedDataInfo<Dictionary<string, District>> data = _districtsCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.Values;
        }

        public IEnumerable<Municipality> GetMunicipalities()
        {
            CachedDataInfo<Dictionary<string, Municipality>> data = _municipalitiesCache.Get();

            return data.Value.Values;
        }
        public IEnumerable<Municipality> GetMunicipalities(out DateTime? lastDateModified)
        {
            CachedDataInfo<Dictionary<string, Municipality>> data = _municipalitiesCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.Values;
        }

        public IEnumerable<Settlement> GetSettlements()
        {
            CachedDataInfo<Dictionary<string, Settlement>> data = _settlemetsCache.Get();

            return data.Value.Values;
        }
        public IEnumerable<Settlement> GetSettlements(out DateTime? lastDateModified)
        {
            CachedDataInfo<Dictionary<string, Settlement>> data = _settlemetsCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.Values;
        }

        public IEnumerable<Area> GetAreas()
        {
            var data = _areasCache.Get();

            return data.Value.Values;
        }
        public IEnumerable<Area> GetAreas(out DateTime? lastDateModified)
        {
            var data = _areasCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.Values;
        }

        public District GetDistrict(string districtCode)
        {
            CachedDataInfo<Dictionary<string, District>> data = _districtsCache.Get();

            data.Value.TryGetValue(districtCode, out District ret);

            return ret;
        }

        public Municipality GetMunicipality(string municipalityCode)
        {
            CachedDataInfo<Dictionary<string, Municipality>> data = _municipalitiesCache.Get();

            data.Value.TryGetValue(municipalityCode, out Municipality ret);

            return ret;
        }

        public Settlement GetSettlement(string settlementCode)
        {
            CachedDataInfo<Dictionary<string, Settlement>> data = _settlemetsCache.Get();

            data.Value.TryGetValue(settlementCode, out Settlement ret);

            return ret;
        }

        public Area GetArea(string areaCode)
        {
            CachedDataInfo<Dictionary<string, Area>> data = _areasCache.Get();

            data.Value.TryGetValue(areaCode, out Area ret);

            return ret;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            ValueTask districtsValueTask      = _districtsCache.EnsureCreatedAsync(cancellationToken);
            ValueTask municipalitiesValueTask = _municipalitiesCache.EnsureCreatedAsync(cancellationToken);
            ValueTask settlemetsValueTask     = _settlemetsCache.EnsureCreatedAsync(cancellationToken);
            ValueTask areasValueTask          = _areasCache.EnsureCreatedAsync(cancellationToken);

            if (districtsValueTask.IsCompleted && municipalitiesValueTask.IsCompleted && settlemetsValueTask.IsCompleted && areasValueTask.IsCompleted)
                return new ValueTask(Task.CompletedTask);
            else
                return new ValueTask(Task.WhenAll(districtsValueTask.AsTask(), municipalitiesValueTask.AsTask(), settlemetsValueTask.AsTask(), areasValueTask.AsTask()));
        }
    }

    public interface IDistrictsDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, District>>>
    {
    }

    internal class DistrictsPollingCache : PollingDataCacheItem<Dictionary<string, District>>, IDistrictsDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public DistrictsPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<DistrictsPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, District>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            NomenclatureResult<IEnumerable<District>> data = await _nomenclaturesServiceClient.LoadDistrictsAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, District>>()
            {
                LastModifiedDate = data.ModifiedDate,
                Value = data.Data?.ToDictionary((item) => { return item.EkatteCode; })
            };
        }
    }

    public interface IMunicipalitiesDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, Municipality>>>
    {
    }

    internal class MunicipalitiesPollingCache : PollingDataCacheItem<Dictionary<string, Municipality>>, IMunicipalitiesDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public MunicipalitiesPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<MunicipalitiesPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, Municipality>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            NomenclatureResult<IEnumerable<Municipality>> data = await _nomenclaturesServiceClient.LoadMunicipaliesAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, Municipality>>()
            {
                LastModifiedDate = data.ModifiedDate,
                Value = data.Data?.ToDictionary((item) => { return item.EkatteCode; })
            };
        }
    }

    public interface ISettlementsDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, Settlement>>>
    {
    }

    internal class SettlementsPollingCache : PollingDataCacheItem<Dictionary<string, Settlement>>, ISettlementsDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public SettlementsPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<SettlementsPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, Settlement>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            NomenclatureResult<IEnumerable<Settlement>> data = await _nomenclaturesServiceClient.LoadSettlementsAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, Settlement>>()
            {
                LastModifiedDate = data.ModifiedDate,
                Value = data.Data?.ToDictionary((item) => { return item.EkatteCode; })
            };
        }
    }

    public interface IAreasDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, Area>>>
    {
    }

    internal class AreasPollingCache : PollingDataCacheItem<Dictionary<string, Area>>, IAreasDataCache
    {
        private readonly INomenclaturesServiceClient _nomenclaturesServiceClient;

        public AreasPollingCache(INomenclaturesServiceClient nomenclaturesServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<AreasPollingCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesServiceClient = nomenclaturesServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, Area>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            NomenclatureResult<IEnumerable<Area>> data = await _nomenclaturesServiceClient.LoadAreasAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, Area>>()
            {
                LastModifiedDate = data.ModifiedDate,
                Value = data.Data?.ToDictionary((item) => { return item.EkatteCode; })
            };
        }
    }
}
