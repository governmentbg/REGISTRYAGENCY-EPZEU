using CNSys.Data;
using Dapper;
using EPZEU.Utilities;
using System;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationProcesses.Repositories
{
    internal class ApplicationProcessDataContext : BaseDataContext
    {
        public ApplicationProcessDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        #region ApplicationProcess

        public async Task<long?> ApplicationProcessCreateAsync(string p_uic,
                                             int? p_applicant_id,
                                             short? p_status,
                                             long? p_main_application_id,
                                             short? p_main_application_type_id,
                                             Guid? p_signing_guid,
                                             long? p_parent_application_process_id,
                                             string p_incoming_number,
                                             string p_error_message,
                                             string p_additional_data,
                                             CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_uic", p_uic);
            parameters.Add("p_applicant_id", p_applicant_id);
            parameters.Add("p_status", p_status);
            parameters.Add("p_main_application_id", p_main_application_id);
            parameters.Add("p_main_application_type_id", p_main_application_type_id);
            parameters.Add("p_signing_guid", p_signing_guid);
            parameters.Add("p_parent_application_process_id", p_parent_application_process_id);
            parameters.Add("p_incoming_number", p_incoming_number);
            parameters.Add("p_error_message", p_error_message);
            parameters.Add("p_additional_data", new NpgCustomParameterValue(NpgsqlTypes.NpgsqlDbType.Jsonb, (object)p_additional_data ?? DBNull.Value));
            parameters.Add("p_application_process_id", direction: ParameterDirection.Output);


            await _dbConnection.SPExecuteAsync("ap", "f_application_processes_create", parameters, cancellationToken);

            long? p_application_process_id = parameters.Get<long?>("p_application_process_id");

            return p_application_process_id;
        }

        public Task ApplicationProcessUpdateAsync(long? p_application_process_id,
                                         string p_uic,
                                         int? p_applicant_id,
                                         short? p_status,
                                         long? p_main_application_id,
                                         short? p_main_application_type_id,
                                         Guid? p_signing_guid,
                                         long? p_parent_application_process_id,
                                         string p_incoming_number,
                                         string p_error_message,
                                         string p_additional_data,
                                         CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_uic", p_uic);
            parameters.Add("p_applicant_id", p_applicant_id);
            parameters.Add("p_status", p_status);
            parameters.Add("p_main_application_id", p_main_application_id);
            parameters.Add("p_main_application_type_id", p_main_application_type_id);
            parameters.Add("p_signing_guid", p_signing_guid);
            parameters.Add("p_parent_application_process_id", p_parent_application_process_id);
            parameters.Add("p_incoming_number", p_incoming_number);
            parameters.Add("p_error_message", p_error_message);
            parameters.Add("p_additional_data", new NpgCustomParameterValue(NpgsqlTypes.NpgsqlDbType.Jsonb, (object)p_additional_data ?? DBNull.Value));

            return _dbConnection.SPExecuteAsync("ap", "f_application_processes_update", parameters, cancellationToken);
        }

        public Task ApplicationProcessDeleteAsync(long? p_application_process_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_id", p_application_process_id);

            return _dbConnection.SPExecuteAsync("ap", "f_application_processes_delete", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? count)> ApplicationProcessSearchAsync(
                                                    long? p_application_process_id,
                                                    int? p_applicant_cin,
                                                    short? p_application_type,
                                                    bool? p_is_parent,
                                                    Guid? p_signing_giud,
                                                    bool? p_load_applications,
                                                    bool? p_load_application_documents,
                                                    bool? p_load_application_contents,
                                                    bool? p_load_child_application_processes,
                                                    bool? p_load_with_lock,
                                                    int? p_start_index,
                                                    int? p_page_size,
                                                    bool? p_calculate_count,
                                                    int? p_max_nor,
                                                    CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_applicant_cin", p_applicant_cin);
            parameters.Add("p_application_type", p_application_type);
            parameters.Add("p_is_parent", p_is_parent);
            parameters.Add("p_signing_giud", p_signing_giud);
            parameters.Add("p_load_applications", p_load_applications);
            parameters.Add("p_load_application_documents", p_load_application_documents);
            parameters.Add("p_load_application_contents", p_load_application_contents);
            parameters.Add("p_load_child_application_processes", p_load_child_application_processes);
            parameters.Add("p_load_with_lock", p_load_with_lock);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_application_processes", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_application", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_application_documents", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_application_contents", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_application_contents", direction: System.Data.ParameterDirection.Output);


            var reader = await _dbConnection.SPExecuteReaderAsync("ap", "f_application_processes_search", parameters, cancellationToken);

            int? p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }

        #endregion

        #region ApplicationProcessContent

        public async Task<long?> ApplicationProcessContentCreateAsync(long? p_application_process_id,
                                                    short? p_type,
                                                    CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_type", p_type);
            parameters.Add("p_application_process_content_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("ap", "f_application_process_contents_create", parameters, cancellationToken);

            long? p_application_process_content_id = parameters.Get<long?>("p_application_process_content_id");

            return p_application_process_content_id;
        }

        public Task<int> ApplicationProcessContentUpdate(long? p_application_process_content_id,
                                                    long? p_application_process_id,
                                                    short? p_type,
                                                    CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_content_id", p_application_process_content_id);
            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_type", p_type);

            return _dbConnection.SPExecuteAsync("ap", "f_application_process_contents_update", parameters, cancellationToken);
        }

        public Task<int> ApplicationProcessContentUpload(long? p_application_process_content_id,
                                                    byte[] p_content,
                                                    int? p_offset,
                                                    int? p_length,
                                                    CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_content_id", p_application_process_content_id);
            parameters.Add(name: "p_content", value: p_content, size: p_length.Value);
            parameters.Add("p_offset", p_offset);

            return _dbConnection.SPExecuteAsync("ap", "f_application_process_contents_upload", parameters, cancellationToken);
        }

        public static Stream CreateApplicationProcessContenReadStream(long applicationProcessContentID, IDbContextProvider dbContextProvider)
        {
            return new NpgsqlDeferredContentStream((context) =>
            {
                using (ApplicationProcessDataContext dataContext = new ApplicationProcessDataContext(context.Connection as DbConnection))
                {
                    return dataContext.ApplicationProcessContenReadChunked(applicationProcessContentID);
                }
            }, dbContextProvider);
        }

        private IDataReader ApplicationProcessContenReadChunked(long p_application_process_content_id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("p_application_process_content_id", p_application_process_content_id);
            var result = _dbConnection.SPExecuteReader("ap", "f_application_process_contents_read", parameters, CommandBehavior.SequentialAccess);

            return result;
        }

        public Task<int> ApplicationProcessContentDelete(long? p_application_process_content_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("p_application_process_content_id", p_application_process_content_id);

            return _dbConnection.SPExecuteAsync("ap", "f_application_process_contents_delete", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? count)> ApplicationProcessContentSearch(long? p_application_process_id,
                                                               long[] p_application_ids,
                                                               short? p_type,
                                                               int? p_start_index,
                                                               int? p_page_size,
                                                               bool? p_calculate_count,
                                                               int? p_max_nor,
                                                               CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_application_ids", p_application_ids);
            parameters.Add("p_type", p_type);

            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_application_process_contents", direction: System.Data.ParameterDirection.Output);

            var reader = await _dbConnection.SPExecuteReaderAsync("ap", "f_application_process_contents_search", parameters, cancellationToken);

            int? p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }

        #endregion

        #region Application

        public async Task<long?> ApplicationCreateAsync(long? p_application_process_id,
                                          short? p_application_type_id,
                                          long? p_application_content_id,
                                          short? p_order,
                                          string p_additional_data,
                                          CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_application_type_id", p_application_type_id);
            parameters.Add("p_application_content_id", p_application_content_id);
            parameters.Add("p_order", p_order);
            parameters.Add("p_additional_data", new NpgCustomParameterValue(NpgsqlTypes.NpgsqlDbType.Jsonb, (object)p_additional_data ?? DBNull.Value));
            parameters.Add("p_application_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("ap", "f_applications_create", parameters, cancellationToken);

            long? p_application_id = parameters.Get<long?>("p_application_id");
            return p_application_id;
        }

        public Task<int> ApplicationUpdateAsync(long? p_application_id,
                                      long? p_application_process_id,
                                      short? p_application_type_id,
                                      long? p_application_content_id,
                                      string p_additional_data,
                                      short? p_order,
                                      CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_id", p_application_id);
            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_application_type_id", p_application_type_id);
            parameters.Add("p_application_content_id", p_application_content_id);
            parameters.Add("p_order", p_order);
            parameters.Add("p_additional_data", new NpgCustomParameterValue(NpgsqlTypes.NpgsqlDbType.Jsonb, (object)p_additional_data ?? DBNull.Value));

            return _dbConnection.SPExecuteAsync("ap", "f_applications_update", parameters, cancellationToken);
        }

        public Task<int> ApplicationDeleteAsync(long? p_application_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_id", p_application_id);


            return _dbConnection.SPExecuteAsync("ap", "f_applications_delete", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? count)> ApplicationSearchAsync(long? p_application_process_id,
                                                    long[] p_application_ids,
                                                    bool? p_load_application_documents,
                                                    bool? p_load_application_content,
                                                    int? p_start_index,
                                                    int? p_page_size,
                                                    bool? p_calculate_count,
                                                    int? p_max_nor,
                                                    CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_process_id", p_application_process_id);
            parameters.Add("p_application_ids", p_application_ids);
            parameters.Add("p_load_application_documents", p_load_application_documents);
            parameters.Add("p_load_application_content", p_load_application_content);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);

            parameters.Add("p_count", direction: ParameterDirection.Output);
            parameters.Add("ref_applications", direction: ParameterDirection.Output);
            parameters.Add("ref_application_documents", direction: ParameterDirection.Output);
            parameters.Add("ref_application_content", direction: ParameterDirection.Output);

            var reader = await _dbConnection.SPExecuteReaderAsync("ap", "f_applications_search", parameters, cancellationToken);
            int? p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }

        public async Task<bool> HasUserDocumentDraftAccessAsync(string p_doc_guid,
                                               int p_cin,
                                               bool p_is_user_identifiable,
                                               CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("p_doc_guid", p_doc_guid);
            parameters.Add("p_cin", p_cin);
            parameters.Add("p_is_user_identifiable", p_is_user_identifiable); 

            parameters.Add("p_has_access", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("ap", "f_has_user_doc_draft_access", parameters, cancellationToken);

            bool? p_has_access = parameters.Get<bool?>("p_has_access");
            return p_has_access.GetValueOrDefault();
        }

        #endregion

        #region Application Content

        public async Task<long?> ApplicationDocumentCreate(string p_name,
                                                 string p_backoffice_guid,
                                                 long? p_application_id,
                                                 string p_document_type_id,
                                                 bool? p_is_original,
                                                 long? p_rejected_application_process_id,
                                                 string p_html_template_content,
                                                 Guid? p_signing_guid,
                                                 string p_incoming_number,
                                                 CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_name", p_name);
            parameters.Add("p_backoffice_guid", p_backoffice_guid);
            parameters.Add("p_application_id", p_application_id);
            parameters.Add("p_document_type_id", p_document_type_id);
            parameters.Add("p_is_original", p_is_original);
            parameters.Add("p_rejected_application_process_id", p_rejected_application_process_id);
            parameters.Add("p_html_template_content", p_html_template_content);
            parameters.Add("p_signing_guid", p_signing_guid);
            parameters.Add("p_incoming_number", p_incoming_number);

            parameters.Add("p_application_document_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("ap", "f_application_documents_create", parameters, cancellationToken);

            long? p_application_document_id = parameters.Get<long?>("p_application_document_id");
            return p_application_document_id;
        }

        public Task<int> ApplicationDocumentUpdateAsync(long? p_application_document_id,
                                             string p_name,
                                             string p_backoffice_guid,
                                             long? p_application_id,
                                             string p_document_type_id,
                                             bool? p_is_original,
                                             long? p_rejected_application_process_id,
                                             string p_html_template_content,
                                             Guid? p_signing_guid,
                                             string p_incoming_number,
                                             CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_document_id", p_application_document_id);
            parameters.Add("p_name", p_name);
            parameters.Add("p_backoffice_guid", p_backoffice_guid);
            parameters.Add("p_application_id", p_application_id);
            parameters.Add("p_document_type_id", p_document_type_id);
            parameters.Add("p_is_original", p_is_original);
            parameters.Add("p_rejected_application_process_id", p_rejected_application_process_id);
            parameters.Add("p_html_template_content", p_html_template_content);
            parameters.Add("p_signing_guid", p_signing_guid);
            parameters.Add("p_incoming_number", p_incoming_number);

            return _dbConnection.SPExecuteAsync("ap", "f_application_documents_update", parameters, cancellationToken);
        }

        public Task<int> ApplicationDocumentDeleteAsync(long p_application_document_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("p_application_document_id", p_application_document_id);

            return _dbConnection.SPExecuteAsync("ap", "f_application_documents_delete", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? count)> ApplicationDocumentSearchAsync(
                                                            long[] p_application_ids,
                                                            long[] p_application_document_ids,
                                                            string[] p_application_document_guids,
                                                            Guid? p_signing_guid,
                                                            int? p_start_index,
                                                            int? p_page_size,
                                                            bool? p_calculate_count,
                                                            int? p_max_nor,
                                                            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_application_ids", p_application_ids);
            parameters.Add("p_application_document_ids", p_application_document_ids);
            parameters.Add("p_application_document_guids", p_application_document_guids);
            parameters.Add("p_signing_guid", p_signing_guid);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_application_documents", direction: System.Data.ParameterDirection.Output);


            var reader = await _dbConnection.SPExecuteReaderAsync("ap", "f_application_documents_search", parameters, cancellationToken);

            int? p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }


        #endregion
    }
}
