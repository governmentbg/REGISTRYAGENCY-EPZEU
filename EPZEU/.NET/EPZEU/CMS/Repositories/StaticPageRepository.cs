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
    /// Интерфейс за поддържане и съхранение на обекти от тип StaticPage.
    /// </summary>
    public interface IStaticPageRepository :
        IRepository<StaticPage, long?, StaticPageSearchCriteria>,
        IRepositoryAsync<StaticPage, long?, StaticPageSearchCriteria>,
        ISearchCollectionInfo2<StaticPage, StaticPageSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IStaticPageEntity за поддържане и съхранение на обекти от тип StaticPage.
    /// </summary>
    internal class StaticPageRepository : RepositoryBase<StaticPage, long?, StaticPageSearchCriteria, StaticPageDataContext>, IStaticPageRepository
    {
        #region Constructors

        public StaticPageRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override IEnumerable<StaticPage> SearchInternal(StaticPageDataContext context, StaticPageSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        public Task<CollectionInfo<StaticPage>> SearchInfoAsync(StaticPageSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<StaticPage>> SearchInfoAsync(PagedDataState state, StaticPageSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<StaticPage> data = null;

                var res = await dc.StaticPageSearchAsync(searchCriteria.ModuleID, innerToken);
                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<StaticPage>(innerToken);
                    lastUpdated = res.p_last_updated_on;
                }

                state.Count = data?.Count ?? 0;

                return new CollectionInfo<StaticPage>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };
            }, cancellationToken);
        }

        #endregion
    }
}


