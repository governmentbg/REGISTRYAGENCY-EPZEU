using CNSys.Data;
using EPZEU.Nomenclatures.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип Service.
    /// </summary>
    public interface IServiceRepository : 
        IRepository<Service, long?, ServiceSearchCriteria>,
        IRepositoryAsync<Service, long?, ServiceSearchCriteria>,
        ISearchCollectionInfo2<Service, ServiceSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IServiceEntity за поддържане и съхранение на обекти от тип Service.
    /// </summary>
    internal class ServiceRepository : RepositoryBase<Service, long?, ServiceSearchCriteria, ServiceDataContext>, IServiceRepository
    {
        #region Constructors

        public ServiceRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override void CreateInternal(ServiceDataContext context, Service item)
        {
            throw new NotImplementedException();
        }

        protected override void UpdateInternal(ServiceDataContext context, Service item)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<Service> SearchInternal(ServiceDataContext dataContext, PagedDataState state, ServiceSearchCriteria searchCriteria)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<Service> SearchInternal(ServiceDataContext context, ServiceSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        public Task<CollectionInfo<Service>> SearchInfoAsync(ServiceSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<Service>> SearchInfoAsync(PagedDataState state, ServiceSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<Service> data = null;
                var res = await dc.ServiceSearchAsync(
                                                    searchCriteria.ServiceIDs,
                                                    searchCriteria.RegisterIDs,
                                                    searchCriteria.Statuses,
                                                    searchCriteria.Name,
                                                    searchCriteria.AppTypeIDs,
                                                    searchCriteria.LanguageID,
                                                    searchCriteria.LoadDecsription,
                                                    searchCriteria.LoadShortDescription,
                                                    searchCriteria.LoadSeparateValueI18N,
                                                    searchCriteria.LoadOnlyUntranslated,
                                                    state.StartIndex,
                                                    state.PageSize,
                                                    (state.StartIndex == 1),
                                                    innerToken);
                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<Service>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                    lastUpdated = res.p_last_updated_on;
                }

                return new CollectionInfo<Service>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };

            }, cancellationToken);
        }

        #endregion
    }
}
