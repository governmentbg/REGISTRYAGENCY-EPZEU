using Dapper;
using EPZEU.Utilities;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Common.Repositories
{
    public class CommonDataContext : BaseDataContext
    {
        public CommonDataContext(DbConnection dbConnection) : base(dbConnection)
        { }

        public async Task<(long? serviceOperationID, bool? isCompleted, string result, string nextOps)> ServiceOperationCreate(string operationID, short serviceOperationTypeID,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_operation_id", operationID);
            parameters.Add("p_operation_type_id", serviceOperationTypeID);
            parameters.Add("p_service_operation_id_out", direction: ParameterDirection.Output);
            parameters.Add("p_is_completed_out", direction: ParameterDirection.Output);
            parameters.Add("p_result_out", direction: ParameterDirection.Output);
            parameters.Add("p_next_ops", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("sys", "f_service_operations_create", parameters, cancellationToken);

            var serviceOperationID = parameters.Get<long?>("p_service_operation_id_out");
            var isCompleted = parameters.Get<bool?>("p_is_completed_out");
            var result = parameters.Get<string>("p_result_out");
            var nextOps = parameters.Get<string>("p_next_ops");

            return (serviceOperationID, isCompleted, result, nextOps);
        }

        public Task ServiceOperationUpdate(long serviceOperationID, string operationID, short operationTypeID, bool isCompleted, string result, string nextOps, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_service_operation_id", serviceOperationID);
            parameters.Add("p_operation_id", operationID);
            parameters.Add("p_operation_type_id", operationTypeID);
            parameters.Add("p_is_completed", isCompleted);
            parameters.Add("p_result", result);
            parameters.Add("p_next_ops", nextOps);

            return _dbConnection.SPExecuteAsync("sys", "f_service_operations_update", parameters, cancellationToken);
        }

        public Task<CnsysGridReader> ServiceOperationSearch(long? serviceOperationID, string operationID, int? operationTypeID, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_service_operation_id", serviceOperationID);
            parameters.Add("p_operation_id", operationID);
            parameters.Add("p_operation_type_id", operationTypeID);
            parameters.Add("ref_service_operations", direction: System.Data.ParameterDirection.Output);

            /*TODO: да се цитират схемите, в който са функциите.*/
            return _dbConnection.SPExecuteReaderAsync("sys", "f_service_operations_search", parameters, cancellationToken);            
        }
    }
}
