using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    internal class IISDAServicesDataContext : BaseDataContext
    {
        public IISDAServicesDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public Task IISDAServiceCreateAsync(
            int p_iisda_service_id,
            int p_service_number,
            string p_name,
            string p_short_description,
            string p_description,
            DateTime p_read_date,
            bool p_is_discontinued,
            bool p_has_epayment,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_iisda_service_id", p_iisda_service_id);
            parameters.Add("p_service_number", p_service_number);
            parameters.Add("p_name", p_name);
            parameters.Add("p_short_description", p_short_description);
            parameters.Add("p_description", p_description);
            parameters.Add("p_read_date", p_read_date);
            parameters.Add("p_is_discontinued", p_is_discontinued);
            parameters.Add("p_has_epayment", p_has_epayment);

            return _dbConnection.SPExecuteAsync("nom", "f_d_iisda_services_create", parameters, cancellationToken);
        }

        public Task IISDAServiceUpdateAsync(
            int p_iisda_service_id,
            int p_service_number,
            string p_name,
            string p_short_description,
            string p_description,
            DateTime p_read_date,
            bool p_is_discontinued,
            bool p_has_epayment,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_iisda_service_id", p_iisda_service_id);
            parameters.Add("p_service_number", p_service_number);
            parameters.Add("p_name", p_name);
            parameters.Add("p_short_description", p_short_description);
            parameters.Add("p_description", p_description);
            parameters.Add("p_read_date", p_read_date);
            parameters.Add("p_is_discontinued", p_is_discontinued);
            parameters.Add("p_has_epayment", p_has_epayment);

            return _dbConnection.SPExecuteAsync("nom", "f_d_iisda_services_update", parameters, cancellationToken);
        }

        public Task IISDAServiceMarkAsReadAsync(
            int p_iisda_service_id,
            DateTime p_read_date,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_iisda_service_id", p_iisda_service_id);
            parameters.Add("p_read_date", p_read_date);

            return _dbConnection.SPExecuteAsync("nom", "f_d_iisda_services_markasread", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? p_count, DateTime? p_last_updated_on)> IISDAServicesSearchAsync(
            int? p_language_id,
            int p_start_index,
            int p_page_size,
            bool p_calculate_count,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_language_id", p_language_id);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_services", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_d_iisda_services_search", parameters, cancellationToken);

            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }
    }
}
