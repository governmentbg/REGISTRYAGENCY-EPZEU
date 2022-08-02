using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    public class DocumentDataContext : BaseDataContext
    {
        public DocumentDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public async Task<(CnsysGridReader reader, int? p_count, DateTime? p_last_updated_on)> ApplicationDocumentTemplateFieldSearchAsync(string[] p_keys,                                                                         
                                           int? p_start_index,
                                           int? p_page_size,
                                           bool? p_calculate_count,
                                           CancellationToken cancellationToken
                                           )
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_keys", p_keys);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_template_fields", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_s_document_template_fields_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }

        public async Task<(CnsysGridReader reader, int? p_count, DateTime? p_last_updated_on)> ApplicationDocumentTemplateSearchAsync(int[] p_doc_template_ids,
                                           string[] p_document_type_ids,
                                           int? p_start_index,
                                           int? p_page_size,
                                           bool? p_calculate_count,
                                           CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_doc_template_ids", p_doc_template_ids);
            parameters.Add("p_document_type_ids", p_document_type_ids);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_doc_templates", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_d_document_templates_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_count, p_last_updated_on);
        }

        public async Task<(CnsysGridReader reader, string p_content, DateTime? p_last_updated_on)> ApplicationDocumentTemplateContentReadAsync(int? p_template_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_template_id", p_template_id);
          
            parameters.Add("p_content", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);
           
            var result = await _dbConnection.SPExecuteReaderAsync("nom", "f_d_document_templates_content_read", parameters, cancellationToken);
            var p_content = parameters.Get<string>("p_content");
            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_content, p_last_updated_on);
        }
    }
}
