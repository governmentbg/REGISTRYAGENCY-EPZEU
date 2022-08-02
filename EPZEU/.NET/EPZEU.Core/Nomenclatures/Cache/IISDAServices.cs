using EPZEU.Nomenclatures.Models;
using CNSys.Caching;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Cache
{
    public interface IIISDAServicesCache : IDataCacheItem<CachedDataInfo<List<IISDAService>>>
    {

    }

    public class IISDAServices : IIISDAServices
    {
        private readonly IIISDAServicesCache _iisdaServicesCache;

        public IISDAServices(IIISDAServicesCache iISDAServicesCache)
        {
            _iisdaServicesCache = iISDAServicesCache;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _iisdaServicesCache.EnsureCreatedAsync(cancellationToken);
        }

        public IEnumerable<IISDAService> GetIISDAServices(out DateTime? lastModifiedDate)
        {
            var cacheData = _iisdaServicesCache.Get();

            lastModifiedDate = cacheData.LastModifiedDate;

            return cacheData.Value;
        }

        public IEnumerable<IISDAService> GetIISDAServices()
        {
            var cacheData = _iisdaServicesCache.Get();

            return cacheData.Value;
        }
    }
}
