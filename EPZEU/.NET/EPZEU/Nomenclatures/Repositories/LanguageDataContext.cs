using Dapper;
using EPZEU.Utilities;
using System;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    internal class LanguageDataContext : BaseDataContext
    {
        public LanguageDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public void LanguageCreate(
                                    string p_code,
                                    string p_name,
                                    bool p_is_active,
                                    ref int? p_language_id)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_code", p_code);
            parameters.Add("p_name", p_name);
            parameters.Add("p_is_active", p_is_active);
            parameters.Add("p_language_id", p_language_id, DbType.Int64, ParameterDirection.Output);

            _dbConnection.SPExecute("nom", "f_d_languages_create", parameters);

            p_language_id = parameters.Get<int?>("p_language_id");
        }

        public void LanguageUpdate(int p_language_id,
                                   string p_code,
                                   string p_name,
                                   bool p_is_active)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_language_id", p_language_id);
            parameters.Add("p_code", p_code);
            parameters.Add("p_name", p_name);
            parameters.Add("p_is_active", p_is_active);

            _dbConnection.SPExecute("nom", "f_d_languages_update", parameters);
        }

        public async Task<(CnsysGridReader reader, int? p_count, DateTime? p_last_updated_on)> LanguageSearchAsync(
                                                int? p_language_id,
                                                string p_code,
                                                string p_name,
                                                bool? p_is_active,
                                                int? p_start_index,
                                                int? p_page_size,
                                                bool? p_calculate_count,
                                                CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_language_id", p_language_id);
            parameters.Add("p_code", p_code);
            parameters.Add("p_name", p_name);
            parameters.Add("p_is_active", p_is_active);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_labels", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_d_languages_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }
    }
}

