using EPZEU.Nomenclatures;
using EPZEU.ServiceLimits.Models;
using EPZEU.ServiceLimits.Repositories;
using EPZEU.Users;
using EPZEU.Utilities;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EPZEU.Utilities.Caching;

namespace EPZEU.ServiceLimits.Cache
{
    public interface IServiceLimitsCache : ILoadable
    {
        IEnumerable<DataServiceLimit> GetDataServiceLimits();

        IEnumerable<DataServiceUserLimit> GetDataServiceUserLimits();

        IChangeToken GetChangeToken();
    }

    internal class ServiceLimitCacheItem
    {
        public List<DataServiceLimit> DataServiceLimits { get; set; }

        public List<DataServiceUserLimit> DataServiceUserLimits { get; set; }
    }

    internal class ServiceLimitsDbCache : DbDataCacheItem<ServiceLimitCacheItem>, IServiceLimitsCache
    {
        private readonly IDataServiceLimitRepository _dataServiceLimitRepository;
        private readonly IDataServiceUserLimitRepository _dataServiceUserLimitRepository;
        private readonly IUsersService _usersService;

        #region Construcotrs

        public ServiceLimitsDbCache(
            ILogger<ServiceLimitsDbCache> logger,
            IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher,
            IDataServiceLimitRepository dataServiceLimitRepository,
            IDataServiceUserLimitRepository dataServiceUserLimitRepository,
            IUsersService usersService)
            : base(logger, dbCacheInvalidationDispatcher, null, new string[] { "public.data_service_limits", "public.data_service_user_limits" })
        {
            _dataServiceLimitRepository = dataServiceLimitRepository;
            _dataServiceUserLimitRepository = dataServiceUserLimitRepository;
            _usersService = usersService;
        }

        #endregion

        protected async override Task<CachedDataInfo<ServiceLimitCacheItem>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            ServiceLimitCacheItem ret = new ServiceLimitCacheItem();

            /*взимаме всички конфигурирани лимити за услуги, независимо дали са активни или не.*/
            ret.DataServiceLimits = (await _dataServiceLimitRepository.SearchAsync(new DataServiceLimitsSearchCriteria(), cancellationToken)).ToList();

            ret.DataServiceUserLimits = (await _dataServiceUserLimitRepository.SearchAsync(new DataServiceUserLimitsSearchCriteria() { Status = DataServiceLimitStatus.Active }, cancellationToken)).ToList();

            var dataServiceLimitsLookup = ret.DataServiceLimits.ToDictionary((item) => item.ServiceLimitID.Value);


            var userIDs = ret.DataServiceUserLimits.Select(item => item.UserID.Value).ToList();

            var users = (await _usersService.SearchUsersAsync(new Users.Models.UserSearchCriteria() { UserIDs = userIDs }, cancellationToken))
                .ToDictionary((item) => item.UserID.Value);


            foreach (var dataServiceUserLimit in ret.DataServiceUserLimits)
            {
                dataServiceUserLimit.ServiceLimit = dataServiceLimitsLookup[dataServiceUserLimit.ServiceLimitID.Value];
                dataServiceUserLimit.User = users[dataServiceUserLimit.UserID.Value];
            }

            return new CachedDataInfo<ServiceLimitCacheItem>()
            {
                Value = ret
            };
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return this.EnsureCreatedAsync(cancellationToken);
        }

        public IEnumerable<DataServiceLimit> GetDataServiceLimits()
        {
            var data = Get();

            return data.Value.DataServiceLimits;
        }

        public IEnumerable<DataServiceUserLimit> GetDataServiceUserLimits()
        {
            var data = Get();

            return data.Value.DataServiceUserLimits;
        }
    }
}
