using CNSys.Data;
using EPZEU.CR.Common.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Common.Repositories
{
    public class ServiceOperationSearchCriteria
    {
        public long? ServiceOperationID { get; set; }

        public string OperationID { get; set; }

        public ServiceOperationTypes? ServiceOperationType { get; set; }
    }

    /// <summary>
    /// Имплементация на IServiceOperationRepository
    /// </summary>
    public class ServiceOperationRepository : RepositoryBase<ServiceOperation, long?, ServiceOperationSearchCriteria, CommonDataContext>, IServiceOperationRepository
    {
        public ServiceOperationRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        protected async override Task<IEnumerable<ServiceOperation>> SearchInternalAsync(CommonDataContext context, ServiceOperationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            IEnumerable<ServiceOperation> res;

            using (var data = await context.ServiceOperationSearch(searchCriteria.ServiceOperationID, searchCriteria.OperationID, (int?)searchCriteria.ServiceOperationType, cancellationToken))
            {
                res = data.Read<ServiceOperationMapping>().Select(o => o.ToServiceOperation()).ToList();
            }

            return res;
        }

        public async Task GetOrCreateAsync(ServiceOperation operation, CancellationToken cancellationToken)
        {
            await DoOperationAsync(async (context, token) =>
            {
                var (serviceOperationID, isCompleted, result, nextOps) = await context.ServiceOperationCreate(operation.OperationID.ToString(), (short)operation.ServiceOperationType, token);

                operation.ServiceOperationID = serviceOperationID;
                operation.IsCompleted        = isCompleted.GetValueOrDefault();
                operation.Result             = result;
                operation.NextOperations     = nextOps;

            }, cancellationToken);
        }

        public async Task UpdateOperationAsync(ServiceOperation operation, CancellationToken cancellationToken)
        {
            await DoOperationAsync((context, token) =>
            {
                return context.ServiceOperationUpdate(operation.ServiceOperationID.Value, operation.OperationID, (short)operation.ServiceOperationType, operation.IsCompleted, operation.Result, operation.NextOperations, token);
            }, cancellationToken);
        }
    }
}
