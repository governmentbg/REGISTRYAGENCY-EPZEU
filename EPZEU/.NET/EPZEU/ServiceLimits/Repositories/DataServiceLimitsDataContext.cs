using Dapper;
using EPZEU.Utilities;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.ServiceLimits.Repositories
{
    internal class DataServiceLimitsDataContext : BaseDataContext
    {
        public DataServiceLimitsDataContext(DbConnection dbConnection) : base(dbConnection)
        {

        }

        public async Task<(CnsysGridReader reader, int? count)> DataServiceLimitsSearchAsync(
            int[] p_service_limit_ids, 
            string p_service_code, 
            string p_service_name,
            short? p_module_id,
            int? p_status,
            int? p_start_index,
            int? p_page_size,
            bool? p_calculate_count,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_service_limit_ids", p_service_limit_ids);
            parameters.Add("p_service_code", p_service_code);
            parameters.Add("p_service_name", p_service_name);
            parameters.Add("p_module_id", p_module_id);
            parameters.Add("p_status", p_status);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("public", "f_data_service_limits_search", parameters, cancellationToken);

            int? p_count = parameters.Get<int?>("p_count");

            return (result, p_count);
        }

        public async Task<(CnsysGridReader reader, int? count)> DataServiceUserLimitsSearchAsync(
           int[] p_user_limit_ids,
           int? p_service_limit_id,
           int? p_user_id, 
           int? p_status,
           int? p_start_index,
           int? p_page_size,
           bool? p_calculate_count,
           CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_user_limit_ids", p_user_limit_ids);
            parameters.Add("p_service_limit_id", p_service_limit_id);
            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_status", p_status);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("public", "f_data_service_user_limits_search", parameters, cancellationToken);

            int? p_count = parameters.Get<int?>("p_count");

            return (result, p_count);
        }
    }
}
