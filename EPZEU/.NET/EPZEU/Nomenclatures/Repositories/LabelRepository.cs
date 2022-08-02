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
    /// Интерфейс за поддържане и съхранение на обекти от тип Label.
    /// </summary>
    public interface ILabelRepository :
        IRepository<Label, long?, LabelSearchCriteria>,
        IRepositoryAsync<Label, long?, LabelSearchCriteria>,
        ISearchCollectionInfo2<Label, LabelSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс ILabelEntity за поддържане и съхранение на обекти от тип Label.
    /// </summary>
    internal class LabelRepository : RepositoryBase<Label, long?, LabelSearchCriteria, LabelDataContext>, ILabelRepository
    {
        #region Constructors

        public LabelRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override void UpdateInternal(LabelDataContext context, Label item)
        {
            int? labelVersionID = null;

            context.LabelUpdate(item.LabelID,
                                    item.Code,
                                    item.Value,
                                    item.Description,
                                    ref labelVersionID);
        }

        protected override IEnumerable<Label> SearchInternal(LabelDataContext dataContext, PagedDataState state, LabelSearchCriteria searchCriteria)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<Label> SearchInternal(LabelDataContext context, LabelSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        public Task<CollectionInfo<Label>> SearchInfoAsync(LabelSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<Label>> SearchInfoAsync(PagedDataState state, LabelSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<Label> data = null;
                var res = await dc.LabelSearchAsync(
                                                    searchCriteria.LabelIDs,
                                                    searchCriteria.LanguageID,
                                                    searchCriteria.Code,
                                                    searchCriteria.Value,
                                                    searchCriteria.LoadDecsription,
                                                    searchCriteria.LoadSeparateValueI18N,
                                                    searchCriteria.LoadOnlyUntranslated,
                                                    state.StartIndex,
                                                    state.PageSize,
                                                    (state.StartIndex == 1),
                                                    innerToken);

                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<Label>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                    lastUpdated = res.p_last_updated_on;
                }

                return new CollectionInfo<Label>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };

            }, cancellationToken);
        }

        #endregion
    }
}
