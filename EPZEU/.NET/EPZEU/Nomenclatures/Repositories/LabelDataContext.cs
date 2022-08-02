using Dapper;
using EPZEU.Utilities;
using System;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    /// <summary>
    /// Клас, капсулиращ работата по извикването на процедурите от базата данни, свързани с 
    /// </summary>
    internal class LabelDataContext : BaseDataContext
    {
        public LabelDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public void LabelTranslationCreate(int p_label_id,
                                             int p_language_id,
                                             string p_value)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_label_id", p_label_id);
            parameters.Add("p_language_id", p_language_id);
            parameters.Add("p_value", p_value);

            _dbConnection.SPExecute("nom", "f_d_labels_i18n_create", parameters);
        }

        public void LabelUpdate(int p_label_id,
                                    string p_code,
                                    string p_value,
                                    string p_description,
                                    ref int? p_label_ver_id)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_label_id", p_label_id);
            parameters.Add("p_code", p_code);
            parameters.Add("p_value", p_value);
            parameters.Add("p_description", p_description);
            parameters.Add("p_label_ver_id", p_label_ver_id, DbType.Int64, ParameterDirection.Output);

            _dbConnection.SPExecute("nom", "f_d_labels_update", parameters);
        }

        public void LabelTranslationUpdate(int p_label_id,
                                    int p_language_id,
                                    string p_value)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_label_id", p_label_id);
            parameters.Add("p_language_id", p_language_id);
            parameters.Add("p_value", p_value);

            _dbConnection.SPExecute("nom", "f_d_labels_i18n_update", parameters);
        }

        public async Task<(CnsysGridReader reader, int? p_count, DateTime?  p_last_updated_on)> LabelSearchAsync(int[] p_label_ids,
                                            int? p_lang_id,
                                            string p_code,
                                            string p_value,
                                            bool? p_load_description,
                                            bool? p_load_separate_value_i18n,
                                            bool? p_load_only_untranslated,
                                            int? p_start_index,
                                            int? p_page_size,
                                            bool? p_calculate_count,
                                            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_label_ids", p_label_ids);
            parameters.Add("p_lang_id", p_lang_id);
            parameters.Add("p_code", p_code);
            parameters.Add("p_value", p_value);
            parameters.Add("p_load_description", p_load_description);
            parameters.Add("p_load_separate_value_i18n", p_load_separate_value_i18n);
            parameters.Add("p_load_only_untranslated", p_load_only_untranslated);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_labels", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_d_labels_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }
    }
}
