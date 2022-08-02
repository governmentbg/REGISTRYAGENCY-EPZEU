using EPZEU.Nomenclatures.Models;
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

namespace EPZEU.Nomenclatures.Cache
{
    /// <summary>
    /// Кеш за административни услуги от ИИСДА
    /// </summary>
    public class IISDAServicesDbCache : DbDataCacheItem<List<IISDAService>>, IIISDAServicesCache
    {
        private readonly IIISDAServicesRepository _IISDAServicesRepository;

        public IISDAServicesDbCache(ILogger<IISDAServicesDbCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher, IIISDAServicesRepository IISDAServicesRepository) :
            base(logger, dbCacheInvalidationDispatcher, null, new string[] { "nom.d_iisda_services" })
        {
            _IISDAServicesRepository = IISDAServicesRepository;
        }


        protected override async Task<CachedDataInfo<List<IISDAService>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var services = await _IISDAServicesRepository.SearchInfoAsync(new IISDAServiceSearchCriteria(), cancellationToken);

            return new CachedDataInfo<List<IISDAService>>()
            {
                Value = services.Data?.ToList(),
                LastModifiedDate = services.LastUpdatedOn
            };
        }
    }
}
