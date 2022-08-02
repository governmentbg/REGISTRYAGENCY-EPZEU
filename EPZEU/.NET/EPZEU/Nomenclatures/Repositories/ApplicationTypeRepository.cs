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
    /// Критерии за търсене за работа с типове на заявленията
    /// </summary>
    public class ApplicationTypeSearchCriteria
    {
        /// <summary>
        /// Уникален идентификатор на език 
        /// </summary>
        public short? LanguageID { get; set; }

        /// <summary>
        /// Тип на заявлението.
        /// </summary>
        public string AppType { get; set; }

        /// <summary>
        /// Име
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Уникален идентификатор на регистър
        /// </summary>
        public int? RegisterID { get; set; }
    }

    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип ApplicationType.
    /// </summary>
    public interface IApplicationTypeRepository : 
        IRepository<ApplicationType, long?, ApplicationTypeSearchCriteria>,
        IRepositoryAsync<ApplicationType, long?, ApplicationTypeSearchCriteria>,
        ISearchCollectionInfo2<ApplicationType, ApplicationTypeSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationTypeEntity за поддържане и съхранение на обекти от тип ApplicationType.
    /// </summary>
    internal class ApplicationTypeRepository : RepositoryBase<ApplicationType, long?, ApplicationTypeSearchCriteria, ApplicationTypeDataContext>, IApplicationTypeRepository
    {
        #region Constructors

        public ApplicationTypeRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }


        public Task<CollectionInfo<ApplicationType>> SearchInfoAsync(ApplicationTypeSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<ApplicationType>> SearchInfoAsync(PagedDataState state, ApplicationTypeSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                List<ApplicationType> data = null;
                DateTime? lastUpdatedOn = null;

                var res = await dc.ApplicationTypeSearchAsync(
                                            null,
                                            searchCriteria.LanguageID,
                                            searchCriteria.AppType,
                                            searchCriteria.Name,
                                            false,
                                            state.StartIndex,
                                            state.PageSize,
                                            (state.StartIndex == 1),
                                            searchCriteria.RegisterID,
                                            innerToken);
                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<ApplicationType>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                    lastUpdatedOn = res.p_last_updated_on;
                }

                return new CollectionInfo<ApplicationType>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdatedOn.GetValueOrDefault()
                };
            }, cancellationToken);
        }

        #endregion

        #region CRUD

        protected override IEnumerable<ApplicationType> SearchInternal(ApplicationTypeDataContext dataContext, PagedDataState state, ApplicationTypeSearchCriteria searchCriteria)
        {
            int? count = null;
            List<ApplicationType> appTypes = null;
            DateTime? lastUpdatedOn = null;

            using (var res = dataContext.ApplicationTypeSearch(
                                        null,
                                        searchCriteria.LanguageID,
                                        searchCriteria.AppType,
                                        searchCriteria.Name,
                                        false,
                                        state.StartIndex,
                                        state.PageSize,
                                        (state.StartIndex == 1),
                                        searchCriteria.RegisterID,
                                        ref count, 
                                        ref lastUpdatedOn))
            {
                appTypes = res.Read<ApplicationType>().ToList();

                state.Count = count ?? state.Count;

                return appTypes;
            }
        }

        protected override IEnumerable<ApplicationType> SearchInternal(ApplicationTypeDataContext context, ApplicationTypeSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        #endregion
    }
}
