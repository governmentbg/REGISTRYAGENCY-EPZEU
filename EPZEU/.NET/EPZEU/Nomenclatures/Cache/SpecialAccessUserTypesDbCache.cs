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
    /// Кеш за Видове потребители със специален достъп.
    /// </summary>
    public class SpecialAccessUserTypesDbCache : DbDataCacheItem<List<SpecialAccessUserType>>, ISpecialAccessUserTypesDataCache
    {
        private readonly ISpecialAccessUserTypeRepository _specialAccessUserTypeRepository;

        public SpecialAccessUserTypesDbCache(ILogger<SpecialAccessUserTypesDbCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher, ISpecialAccessUserTypeRepository specialAccessUserTypeRepository) :
            base(logger, dbCacheInvalidationDispatcher, null, new string[] { "usr.n_s_special_access_user_types" })
        {
            _specialAccessUserTypeRepository = specialAccessUserTypeRepository;
        }

        protected override async Task<CachedDataInfo<List<SpecialAccessUserType>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var data = await _specialAccessUserTypeRepository
                .SearchInfoAsync(new SpecialAccessUserTypeSearchCriteria(), cancellationToken);

            return new CachedDataInfo<List<SpecialAccessUserType>>()
            {
                LastModifiedDate = data.LastUpdatedOn,
                Value = data.Data?.ToList()
            };
        }
    }
}
