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
    /// Интерфейс за поддържане и съхранение на обекти от тип Language.
    /// </summary>
    public interface ILanguageRepository : 
        IRepository<Language, long?, LanguageSearchCriteria>,
        IRepositoryAsync<Language, long?, LanguageSearchCriteria>,
        ISearchCollectionInfo2<Language, LanguageSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс ILanguageEntity за поддържане и съхранение на обекти от тип Language.
    /// </summary>
    internal class LanguageRepository : RepositoryBase<Language, long?, LanguageSearchCriteria, LanguageDataContext>, ILanguageRepository
    {
        #region Constructors

        public LanguageRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override void CreateInternal(LanguageDataContext context, Language item)
        {
            int? langID = null;
            context.LanguageCreate(item.Code, item.Name, item.IsActive, ref langID);
            item.LanguageID = langID.Value;
        }

        protected override void UpdateInternal(LanguageDataContext context, Language item)
        {
            context.LanguageUpdate(item.LanguageID,
                                    item.Code,
                                    item.Name,
                                    item.IsActive);
        }

        protected override void DeleteInternal(LanguageDataContext context, Language item)
        {
            throw new NotImplementedException();
        }

        protected override void DeleteInternal(LanguageDataContext context, long? key)
        {
            throw new NotImplementedException();
        }

        protected override Language ReadInternal(LanguageDataContext context, long? key)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<Language> SearchInternal(LanguageDataContext dataContext, PagedDataState state, LanguageSearchCriteria searchCriteria)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<Language> SearchInternal(LanguageDataContext context, LanguageSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        public Task<CollectionInfo<Language>> SearchInfoAsync(LanguageSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<Language>> SearchInfoAsync(PagedDataState state, LanguageSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<Language> data = null;
                var res = await dc.LanguageSearchAsync(searchCriteria.LanguageID,
                                                        searchCriteria.Code,
                                                        searchCriteria.Name,
                                                        searchCriteria.IsActive,
                                                        state.StartIndex,
                                                        state.PageSize,
                                                        (state.StartIndex == 1),
                                                        innerToken);

                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<Language>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                    lastUpdated = res.p_last_updated_on;
                }

                return new CollectionInfo<Language>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };

            }, cancellationToken);
        }
        #endregion
    }
}
