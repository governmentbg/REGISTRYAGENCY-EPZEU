using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CMS.Repositories
{
    /// <summary>
    /// Клас, капсулиращ работата по извикването на процедурите от базата данни, свързани със страници
    /// </summary>
    internal class PageDataContext : BaseDataContext
    {
        public PageDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public async Task<(CnsysGridReader reader, DateTime? p_last_updated_on)> PageSearchAsync(int[] p_pages_ids, int? p_parent_id, int? p_type, int? p_register_id, int? p_lang_id, 
            bool? p_load_content, bool? p_load_separate_value_i18n, bool? p_load_only_untranslated, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_pages_ids", p_pages_ids);
            parameters.Add("p_parent_id", p_parent_id);
            parameters.Add("p_type", p_type);
            parameters.Add("p_register_id", p_register_id);
            parameters.Add("p_lang_id", p_lang_id);
            parameters.Add("p_load_content", p_load_content);
            parameters.Add("p_load_separate_value_i18n", p_load_separate_value_i18n);
            parameters.Add("p_load_only_untranslated", p_load_only_untranslated);

            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("cms", "f_pages_search", parameters, cancellationToken);

            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_last_updated_on);
        }
    }
}
