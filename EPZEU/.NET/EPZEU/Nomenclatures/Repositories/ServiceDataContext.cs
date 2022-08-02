using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    internal class ServiceDataContext : BaseDataContext
    {
        public ServiceDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public async Task<(CnsysGridReader reader, int? p_count, DateTime? p_last_updated_on)> ServiceSearchAsync(int[] p_services_ids,
                                            short[] p_register_ids,
                                            int[] p_statuses,
                                            string p_name,
                                            short[] p_app_type_ids,
                                            int? p_lang_id,
                                            bool? p_load_description,
                                            bool? p_load_short_description,
                                            bool? p_load_separate_value_i18n,
                                            bool? p_load_only_untranslated,
                                            int? p_start_index,
                                            int? p_page_size,
                                            bool? p_calculate_count,
                                            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_services_ids", p_services_ids);
            parameters.Add("p_register_ids", p_register_ids);
            parameters.Add("p_statuses", p_statuses);
            parameters.Add("p_name", p_name);
            parameters.Add("p_app_type_ids", p_app_type_ids); 
            parameters.Add("p_lang_id", p_lang_id);
            parameters.Add("p_load_description", p_load_description);
            parameters.Add("p_load_short_description", p_load_short_description);
            parameters.Add("p_load_separate_value_i18n", p_load_separate_value_i18n);
            parameters.Add("p_load_only_untranslated", p_load_only_untranslated);

            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_services", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_d_service_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }
    }
}
