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
    /// Критерии за търсене за работа с видове потребители със специален достъп.
    /// </summary>
    public class SpecialAccessUserTypeSearchCriteria {
        public int[] SpecialAccessUserTypeIds { get; set; }
    }

    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип SpecialAccessUserType.
    /// </summary>
    public interface ISpecialAccessUserTypeRepository :
            IRepository<SpecialAccessUserType, long?, SpecialAccessUserTypeSearchCriteria>,
            IRepositoryAsync<SpecialAccessUserType, long?, SpecialAccessUserTypeSearchCriteria>,
            ISearchCollectionInfo2<SpecialAccessUserType, SpecialAccessUserTypeSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс ISpecialAccessUserTypeRepository за поддържане и съхранение на обекти от тип SpecialAccessUserType.
    /// </summary>
    internal class SpecialAccessUserTypeRepository : RepositoryBase<SpecialAccessUserType, long?, SpecialAccessUserTypeSearchCriteria, SpecialAccessUserTypeDataContext>, ISpecialAccessUserTypeRepository
    {
        #region Constructors

        public SpecialAccessUserTypeRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override void CreateInternal(SpecialAccessUserTypeDataContext context, SpecialAccessUserType item)
        {
            throw new NotImplementedException();
        }

        protected override void UpdateInternal(SpecialAccessUserTypeDataContext context, SpecialAccessUserType item)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<SpecialAccessUserType> SearchInternal(SpecialAccessUserTypeDataContext dataContext, PagedDataState state, SpecialAccessUserTypeSearchCriteria searchCriteria)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<SpecialAccessUserType> SearchInternal(SpecialAccessUserTypeDataContext context, SpecialAccessUserTypeSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        public Task<CollectionInfo<SpecialAccessUserType>> SearchInfoAsync(SpecialAccessUserTypeSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<SpecialAccessUserType>> SearchInfoAsync(PagedDataState state, SpecialAccessUserTypeSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                List<SpecialAccessUserType> data = null;
                var res = await dc.SpecialAccessUserTypeSearchAsync(
                                                    searchCriteria.SpecialAccessUserTypeIds,
                                                    state.StartIndex,
                                                    state.PageSize,
                                                    (state.StartIndex == 1),
                                                    innerToken);
                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<SpecialAccessUserType>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                }

                return new CollectionInfo<SpecialAccessUserType>()
                {
                    Data = data,
                    LastUpdatedOn = DateTime.Now // Table nomenclature_changes (from where we take last_updated_on for other nomenclatures is in the nom scheme. This nomenclature is in the usr scheme. 
                };
            }, cancellationToken);
        }
        #endregion
    }
}