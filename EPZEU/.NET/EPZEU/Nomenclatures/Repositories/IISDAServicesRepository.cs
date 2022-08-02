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
    /// Критерии за търсене за работа с ИИСДА услуги
    /// </summary>
    public class IISDAServiceSearchCriteria
    {
        public int? LanguageID { get; set; } 
    }

    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип IISDAService.
    /// </summary>
    public interface IIISDAServicesRepository : 
        IRepository<IISDAService, int?, IISDAServiceSearchCriteria>,
        IRepositoryAsync<IISDAService, int?, IISDAServiceSearchCriteria>,
        ISearchCollectionInfo2<IISDAService, IISDAServiceSearchCriteria>
    {
        /// <summary>
        /// Маркира услугата като прочетена
        /// </summary>
        /// <param name="item">услуга</param>
        /// <param name="cancellationToken"></param>
        Task MarkAsReadAsync(IISDAService item, CancellationToken cancellationToken);        
    }

    /// <summary>
    /// Реализация на интерфейс IIISDAServicesEntity за поддържане и съхранение на обекти от тип IISDAService.
    /// </summary>
    internal class IISDAServicesRepository : RepositoryBase<IISDAService, int?, IISDAServiceSearchCriteria, IISDAServicesDataContext>, IIISDAServicesRepository
    {
        #region Constructors

        public IISDAServicesRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IISDAServicesEntity


        protected override Task CreateInternalAsync(IISDAServicesDataContext context, IISDAService item, CancellationToken cancellationToken)
        {
            return context.IISDAServiceCreateAsync(item.IIISDAServiceID, item.ServiceNumber, item.Name, item.ShortDescription, item.Description, item.ReadDate.Value, item.IsDiscontinued, item.HasEPayment, cancellationToken);
        }

        protected override Task UpdateInternalAsync(IISDAServicesDataContext context, IISDAService item, CancellationToken cancellationToken)
        {
            return context.IISDAServiceUpdateAsync(item.IIISDAServiceID, item.ServiceNumber, item.Name, item.ShortDescription, item.Description, item.ReadDate.Value, item.IsDiscontinued, item.HasEPayment, cancellationToken);
        }

        protected override IEnumerable<IISDAService> SearchInternal(IISDAServicesDataContext dataContext, PagedDataState state, IISDAServiceSearchCriteria searchCriteria)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<IISDAService> SearchInternal(IISDAServicesDataContext context, IISDAServiceSearchCriteria searchCriteria)
        {
            return SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        public Task MarkAsReadAsync(IISDAService item, CancellationToken cancellationToken)
        {
            return DoOperationAsync((ctx, token) => 
            { 
                return ctx.IISDAServiceMarkAsReadAsync(item.IIISDAServiceID, item.ReadDate.Value, token);
            }, cancellationToken);
        }

        public Task<CollectionInfo<IISDAService>> SearchInfoAsync(IISDAServiceSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<IISDAService>> SearchInfoAsync(PagedDataState state, IISDAServiceSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {            
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<IISDAService> data = null;
                var res = await dc.IISDAServicesSearchAsync(searchCriteria.LanguageID, state.StartIndex, state.PageSize, (state.StartIndex == 1), innerToken);
                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<IISDAService>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                    lastUpdated = res.p_last_updated_on;
                }

                return new CollectionInfo<IISDAService>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };

            }, cancellationToken);
        }

        #endregion
    }
}
