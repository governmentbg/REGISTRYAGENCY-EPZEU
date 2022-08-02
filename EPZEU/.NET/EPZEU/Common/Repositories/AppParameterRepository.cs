using CNSys.Data;
using EPZEU.Common.Models;
using EPZEU.Nomenclatures.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Common.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип AppParameter.
    /// </summary>
    public interface IAppParameterRepository :
        IRepository<AppParameter, long?, AppParameterSearchCriteria>,
        IRepositoryAsync<AppParameter, long?, AppParameterSearchCriteria>,
        ISearchCollectionInfo2<AppParameter, AppParameterSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IAppParameterEntity за поддържане и съхранение на обекти от тип EmailMessage.
    /// </summary>
    internal class AppParameterRepository : RepositoryBase<AppParameter, long?, AppParameterSearchCriteria, AppParameterDataContext>, IAppParameterRepository
    {
        #region Constructors

        public AppParameterRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }


        #endregion

        #region CRUD

        protected override IEnumerable<AppParameter> SearchInternal(AppParameterDataContext context, AppParameterSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        public Task<CollectionInfo<AppParameter>> SearchInfoAsync(AppParameterSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<AppParameter>> SearchInfoAsync(PagedDataState state, AppParameterSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
             {
                 DateTime? lastUpdated = null;
                 List<AppParameter> data = null;

                 var res = await dc.AppParameterSearchAsync(
                                                     searchCriteria.AppParamIDs,
                                                     searchCriteria.FunctionalityID,
                                                     searchCriteria.ModuleID,
                                                     searchCriteria.Code,
                                                     searchCriteria.Description,
                                                     searchCriteria.IsSystem,
                                                     state.StartIndex,
                                                     state.PageSize,
                                                     (state.StartIndex == 1),
                                                     innerToken);
                 using (res.reader)
                 {
                     data = await res.reader.ReadToListAsync<AppParameter>(innerToken);
                     lastUpdated = res.p_last_updated_on;
                     state.Count = res.p_count ?? state.Count;
                 }

                 return new CollectionInfo<AppParameter>()
                 {
                     Data = data,
                     LastUpdatedOn = lastUpdated.GetValueOrDefault()
                 };
             }, cancellationToken);
        }

        #endregion
    }
}
