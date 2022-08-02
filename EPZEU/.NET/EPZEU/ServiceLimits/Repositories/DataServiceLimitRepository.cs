using CNSys.Data;
using EPZEU.ServiceLimits.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.ServiceLimits.Repositories
{
    public interface IDataServiceLimitRepository : 
        IRepository<DataServiceLimit, int, DataServiceLimitsSearchCriteria>,
        IRepositoryAsync<DataServiceLimit, int, DataServiceLimitsSearchCriteria>
    {
    }

    internal class DataServiceLimitRepository : RepositoryBase<DataServiceLimit, int, DataServiceLimitsSearchCriteria, DataServiceLimitsDataContext>, IDataServiceLimitRepository
    {
        public DataServiceLimitRepository(IDbContextProvider dbContextProvider): base(dbContextProvider)
        {
        }

        protected async override Task<IEnumerable<DataServiceLimit>> SearchInternalAsync(DataServiceLimitsDataContext context, PagedDataState state, DataServiceLimitsSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<DataServiceLimit> result = null;

            var (reader, count) = await context.DataServiceLimitsSearchAsync(
                searchCriteria.ServiceLimitIDs,
                searchCriteria.ServiceCode,
                searchCriteria.ServiceName,
                (short?)searchCriteria.Module,
                (short?)searchCriteria.Status,
                state.StartIndex,
                state.PageSize,
                (state.StartIndex == 1),
                cancellationToken);

            using(reader)
            {
                state.Count = count ?? state.Count;
                result = await reader.ReadToListAsync<DataServiceLimit>(cancellationToken);
            }

            return result;
        }

        protected override Task<IEnumerable<DataServiceLimit>> SearchInternalAsync(DataServiceLimitsDataContext context, DataServiceLimitsSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }
    }
}
