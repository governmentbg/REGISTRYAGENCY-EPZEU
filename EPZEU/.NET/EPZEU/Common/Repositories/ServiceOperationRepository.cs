using CNSys.Data;
using EPZEU.Common.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Common.Repositories
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

        protected override async Task<IEnumerable<ServiceOperation>> SearchInternalAsync(CommonDataContext context, ServiceOperationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<ServiceOperation> res = new List<ServiceOperation>();

            using (Utilities.CnsysGridReader reader = await context.ServiceOperationSearchAsync(searchCriteria.ServiceOperationID, searchCriteria.OperationID, (int?)searchCriteria.ServiceOperationType, cancellationToken))
            {
                await foreach(ServiceOperationMapping item in reader.ReadAsync<ServiceOperationMapping>(cancellationToken))
                {
                    res.Add(item.ToServiceOperation());
                }
            }

            return res;
        }

        public Task GetOrCreateAsync(ServiceOperation operation, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (ctx, cancellationToken) => {
                var res = await ctx.ServiceOperationCreateAsync(operation.OperationID.ToString(), (short)operation.ServiceOperationType, cancellationToken);

                operation.ServiceOperationID = res.ServiceOperationID;
                operation.IsCompleted = res.IsCompleted.GetValueOrDefault();
                operation.Result = res.Result;
                operation.NextOperations = res.NextOperations;
            }, cancellationToken);
        }

        public Task UpdateOperationAsync(ServiceOperation operation, CancellationToken cancellationToken)
        {
            return DoOperationAsync((context, token) =>
            {
                return context.ServiceOperationUpdateAsync(
                    operation.ServiceOperationID.Value, 
                    operation.OperationID, 
                    (short)operation.ServiceOperationType, 
                    operation.IsCompleted, operation.Result, 
                    operation.NextOperations, 
                    token);
            }, cancellationToken);
        }
    }
}
