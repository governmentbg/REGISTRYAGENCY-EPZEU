using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Common.Repositories
{
    /// <summary>
    /// Клас капсулиращ работата по извикване на процедурите в базата данни свързани с конфигурационни параметри на системата.
    /// </summary>
    internal class AppParameterDataContext : BaseDataContext
    {
        public AppParameterDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

    public async Task<(CnsysGridReader reader, int? p_count, DateTime? p_last_updated_on)> AppParameterSearchAsync(int[] p_app_param_ids,
                                            int? p_functionality_id,
                                            int? p_module_id,
                                            string p_code,
                                            string p_description,
                                            bool? p_is_system,
                                            int? p_start_index,
                                            int? p_page_size,
                                            bool? p_calculate_count,
                                            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_app_param_ids", p_app_param_ids);
            parameters.Add("p_functionality_id", p_functionality_id);
            parameters.Add("p_module_id", p_module_id);
            parameters.Add("p_code", p_code);
            parameters.Add("p_description", p_description);
            parameters.Add("p_is_system", p_is_system);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_params", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("public", "f_app_parameters_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }
    }
}
