using CNSys.Caching;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Utilities.Caching
{
    public class DbDataCacheItem<TData> : DataCacheItem<CachedDataInfo<TData>>
    {
        private readonly IDbCacheInvalidationDispatcher _npgNotificationDispatcher;
        private readonly Func<DateTime?, CancellationToken, Task<CachedDataInfo<TData>>> _valueGeneratorFunc = null;
        private readonly string[] _dependencyTableNames;

        public DbDataCacheItem(
            ILogger logger,
            IDbCacheInvalidationDispatcher npgNotificationDispatcher,
            Func<DateTime?, CancellationToken, Task<CachedDataInfo<TData>>> valueGeneratorFunc,
            string[] dependencyTableNames) : base(logger)
        {
            _npgNotificationDispatcher = npgNotificationDispatcher;
            _valueGeneratorFunc = valueGeneratorFunc;
            _dependencyTableNames = dependencyTableNames;
        }

        protected override async Task<GeneratorResult> GenerateValueAsync(CancellationToken cancellationToken)
        {
            /*Първо създаваме changeToken - a, ако случайно се промнят данните, то ведната да се презаредят.*/
            var changeToken = new CompositeChangeToken(_dependencyTableNames.Select((tableName) => { return new NpgDbChangeToken(tableName, _npgNotificationDispatcher); }).ToList());

            var data = await GenerateCacheDataInfoAsync(null, cancellationToken);

            return new DataCacheItem<CachedDataInfo<TData>>.GeneratorResult(data, changeToken);
        }

        protected virtual Task<CachedDataInfo<TData>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            if (_valueGeneratorFunc != null)
                return _valueGeneratorFunc(etag, cancellationToken);
            else
                throw new NotImplementedException("valueGeneratorFunc is not provided!");
        }
    }
}
