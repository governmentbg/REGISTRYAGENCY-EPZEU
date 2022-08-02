using Dapper;
using EPZEU.Utilities;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Common.Repositories
{
    public class CommonDataContext : BaseDataContext
    {
        public CommonDataContext(DbConnection dbConnection) : base(dbConnection)
        { }

        public async Task<(long? ServiceOperationID, bool? IsCompleted, string Result, string NextOperations)> ServiceOperationCreateAsync(string operationID, short serviceOperationTypeID, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_operation_id", operationID);
            parameters.Add("p_operation_type_id", serviceOperationTypeID);
            parameters.Add("p_service_operation_id_out", direction: ParameterDirection.Output);
            parameters.Add("p_is_completed_out", direction: ParameterDirection.Output);
            parameters.Add("p_result_out", direction: ParameterDirection.Output);
            parameters.Add("p_next_ops", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("sys", "f_service_operations_create", parameters, cancellationToken);

            return (
                parameters.Get<long?>("p_service_operation_id_out"),
                parameters.Get<bool?>("p_is_completed_out"),
                parameters.Get<string>("p_result_out"),
                parameters.Get<string>("p_next_ops"));
        }

        public Task<int> ServiceOperationUpdateAsync(long serviceOperationID, string operationID, short operationTypeID, bool isCompleted, string result, string nextOps, CancellationToken cancellationToken)
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

        public Task<CnsysGridReader> ServiceOperationSearchAsync(long? serviceOperationID, string operationID, int? operationTypeID, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_service_operation_id", serviceOperationID);
            parameters.Add("p_operation_id", operationID);
            parameters.Add("p_operation_type_id", operationTypeID);
            parameters.Add("ref_service_operations", direction: System.Data.ParameterDirection.Output);

            return _dbConnection.SPExecuteReaderAsync("sys", "f_service_operations_search", parameters, cancellationToken);            
        }
    }
}
