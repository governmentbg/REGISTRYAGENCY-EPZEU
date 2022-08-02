using CNSys.Data;
using EPZEU.ServiceLimits.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.ServiceLimits.Repositories
{
    public interface IDataServiceUserLimitRepository : 
        IRepository<DataServiceUserLimit, int, DataServiceUserLimitsSearchCriteria>,
        IRepositoryAsync<DataServiceUserLimit, int, DataServiceUserLimitsSearchCriteria>
    {
    }

    internal class DataServiceUserLimitRepository : RepositoryBase<DataServiceUserLimit, int, DataServiceUserLimitsSearchCriteria, DataServiceLimitsDataContext>, IDataServiceUserLimitRepository
    {
        public DataServiceUserLimitRepository(IDbContextProvider dbContextProvider) : base(dbContextProvider)
        {

        }

        protected async override Task<IEnumerable<DataServiceUserLimit>> SearchInternalAsync(DataServiceLimitsDataContext context, PagedDataState state, DataServiceUserLimitsSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<DataServiceUserLimit> ret = null;
            var (reader, count) = await context.DataServiceUserLimitsSearchAsync(
                searchCriteria.UserLimitIDs,
                searchCriteria.ServiceLimitID,
                searchCriteria.UserID,
                (short?)searchCriteria.Status,
                state.StartIndex,
                state.PageSize,
                (state.StartIndex == 1),
                cancellationToken);

            using (reader)
            {
                state.Count = count ?? state.Count;
                ret = await reader.ReadToListAsync<DataServiceUserLimit>(cancellationToken);
            }

            return ret;
        }

        protected override Task<IEnumerable<DataServiceUserLimit>> SearchInternalAsync(DataServiceLimitsDataContext context, DataServiceUserLimitsSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }
    }
}
