using EPZEU.Common.Models;
using EPZEU.Nomenclatures;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Common.Cache
{
    public interface IAppParameters : ILoadable
    {
        AppParameter GetParameter(string parameterName);
        IEnumerable<AppParameter> GetAppParameters();
        IEnumerable<AppParameter> GetAppParameters(out DateTime? lastModifiedDate);

        IChangeToken GetChangeToken();
    }

    public class AppParameters : IAppParameters
    {
        private readonly IAppParametersDataCache _nomCache;

        public AppParameters(IAppParametersDataCache nomCache)
        {
            _nomCache = nomCache;
        }

        public AppParameter GetParameter(string parameterName)
        {
            return _nomCache.Get().Value[parameterName];
        }

        public IEnumerable<AppParameter> GetAppParameters()
        {
            return _nomCache.Get().Value.Values;
        }

        public IEnumerable<AppParameter> GetAppParameters(out DateTime? lastModifiedDate)
        {
            var data = _nomCache.Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value.Values;
        }

        public IChangeToken GetChangeToken()
        {
            return _nomCache.GetChangeToken();
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IAppParametersDataCache : IDataCacheItem<CachedDataInfo<Dictionary<string, AppParameter>>>
    {
    }

    public class AppParametersRemoteCache : PollingDataCacheItem<Dictionary<string, AppParameter>>, IAppParametersDataCache
    {
        private readonly IAppParametersServiceClient _appParametersServiceClient;

        public AppParametersRemoteCache(IAppParametersServiceClient appParametersServiceClient, IPollingCacheInfrastructure pollingCacheInfrastructure, ILogger<AppParametersRemoteCache> logger) : base(logger, pollingCacheInfrastructure, null)
        {
            _appParametersServiceClient = appParametersServiceClient;
        }

        protected override async Task<CachedDataInfo<Dictionary<string, AppParameter>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var source = await _appParametersServiceClient.LoadAppParametersAsync(etag, cancellationToken);

            return new CachedDataInfo<Dictionary<string, AppParameter>>()
            {
                /*Създаваме Dictionary, InvariantCultureIgnoreCase StringComparer, за да може да се търси без значение от главни малки букви */
                Value = source.Data?.ToDictionary(k => k.Code, StringComparer.InvariantCultureIgnoreCase),
                LastModifiedDate = source.ModifiedDate
            };
        }
    }
}
