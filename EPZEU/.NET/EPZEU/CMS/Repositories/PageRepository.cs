using CNSys.Data;
using EPZEU.CMS.Models;
using EPZEU.Nomenclatures.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CMS.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип Page.
    /// </summary>
    public interface IPageRepository :
        IRepository<Page, long?, PageSearchCriteria>,
        IRepositoryAsync<Page, long?, PageSearchCriteria>,
        ISearchCollectionInfo2<Page, PageSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IPageEntity за поддържане и съхранение на обекти от тип Page.
    /// </summary>
    internal class PageRepository : RepositoryBase<Page, long?, PageSearchCriteria, PageDataContext>, IPageRepository
    {
        #region Constructors

        public PageRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        public Task<CollectionInfo<Page>> SearchInfoAsync(PageSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<Page>> SearchInfoAsync(PagedDataState state, PageSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<Page> data = null;

                var res = await dc.PageSearchAsync(searchCriteria.PageIDs, searchCriteria.ParentID, (int?)searchCriteria.Type, (int?)searchCriteria.RegisterID, searchCriteria.LangID, 
                    searchCriteria.LoadContent, searchCriteria.LoadSeparateValueI18n, searchCriteria.LoadOnlyUntranslated, innerToken);
                using (res.reader)
                {
                    data =  await res.reader.ReadToListAsync<Page>(innerToken);
                    lastUpdated = res.p_last_updated_on;
                }

                state.Count = data?.Count ?? 0;

                return new CollectionInfo<Page>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };
            }, cancellationToken);
        }

        #endregion
    }
}