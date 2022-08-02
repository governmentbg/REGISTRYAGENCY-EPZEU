using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    public class ApplicationTypeDataContext : BaseDataContext
    {
        public ApplicationTypeDataContext(DbConnection dbConnection) : base(dbConnection)
        { 
        }

        public async Task<(CnsysGridReader reader, int? p_count, DateTime? p_last_updated_on)> ApplicationTypeSearchAsync(short[] p_ids,
                                            short? p_language_id,
                                            string p_app_type,
                                            string p_name,
                                            bool? p_load_separate_value_i18n,
                                            int? p_start_index,
                                            int? p_page_size,
                                            bool? p_calculate_count,
                                            int? p_register_id,
                                            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_ids", p_ids);
            parameters.Add("p_language_id", p_language_id);
            parameters.Add("p_app_type", p_app_type);
            parameters.Add("p_name", p_name);
            parameters.Add("p_load_separate_value_i18n", p_load_separate_value_i18n);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_register_id", p_register_id);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_application_types", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_s_application_types_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }

        public CnsysGridReader ApplicationTypeSearch(short[] p_ids,
                                           short? p_language_id,
                                           string p_app_type,
                                           string p_name,
                                           bool? p_load_separate_value_i18n,
                                           int? p_start_index,
                                           int? p_page_size,
                                           bool? p_calculate_count,
                                           int? p_register_id,
                                           ref int? p_count,
                                           ref DateTime? p_last_updated_on)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_ids", p_ids);
            parameters.Add("p_language_id", p_language_id);
            parameters.Add("p_app_type", p_app_type);
            parameters.Add("p_name", p_name);
            parameters.Add("p_load_separate_value_i18n", p_load_separate_value_i18n);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_register_id", p_register_id);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_application_types", direction: System.Data.ParameterDirection.Output);

            var result = _dbConnection.SPExecuteReader("nom", "f_s_application_types_search", parameters);
            p_count = parameters.Get<int?>("p_count");
            p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return result;
        }
    }
}
