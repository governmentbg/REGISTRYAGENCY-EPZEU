﻿using EPZEU.Common.Models;
using EPZEU.Common.Repositories;
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

namespace EPZEU.Common.Cache
{
    /// <summary>
    /// Кеш за конфигурационни параметри на системата.
    /// </summary>
    public class AppParametersDbCache : DbDataCacheItem<Dictionary<string, AppParameter>>, IAppParametersDataCache
    {
        private readonly IAppParameterRepository _appParameterRepository;

        public AppParametersDbCache(ILogger<AppParametersDbCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher, IAppParameterRepository appParameterRepository) :
            base(logger, dbCacheInvalidationDispatcher, null, new string[] { "public.app_parameters" })
        {
            _appParameterRepository = appParameterRepository;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, AppParameter>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            CollectionInfo<AppParameter> data = await _appParameterRepository.SearchInfoAsync(new AppParameterSearchCriteria(), cancellationToken);

            /*Създаваме Dictionary, InvariantCultureIgnoreCase StringComparer, за да може да се търси без значение от главни малки букви */
            var appParametersDictionary = data.Data.ToDictionary((item) => { return item.Code; }, StringComparer.InvariantCultureIgnoreCase);

            return new CachedDataInfo<Dictionary<string, AppParameter>>() { Value = appParametersDictionary, LastModifiedDate = data.LastUpdatedOn };
        }
    }
}