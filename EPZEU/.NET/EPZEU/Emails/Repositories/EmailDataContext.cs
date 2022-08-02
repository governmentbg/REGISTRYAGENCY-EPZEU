using Dapper;
using EPZEU.Emails.Models;
using EPZEU.Utilities;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Emails.Repositories
{
    /// <summary>
    /// Клас капсулиращ работата по извикване на процедурите в базата данни свързани с електронните писма.
    /// </summary>
    internal class EmailDataContext : BaseDataContext
    {
        public EmailDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        #region Email

        public async Task<int?> EmailCreateAsync(
                                short? p_priority,
                                int? p_try_count,
                                string p_subject,
                                string p_body,
                                bool? p_is_body_html,
                                string p_sending_provider_name,
                                EmailRecipientDB[] p_recipients,
                                string p_OperationID,
                                CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_priority", p_priority);
            parameters.Add("p_try_count", p_try_count);
            parameters.Add("p_subject", p_subject);
            parameters.Add("p_body", p_body);
            parameters.Add("p_is_body_html", p_is_body_html);
            parameters.Add("p_sending_provider_name", p_sending_provider_name);
            parameters.Add("p_email_id", DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("p_recipients", p_recipients);
            parameters.Add("p_operation_id", p_OperationID);

            await _dbConnection.SPExecuteAsync("eml", "f_emails_create", parameters, cancellationToken);

            var p_email_id = parameters.Get<int?>("p_email_id");

            return p_email_id;
        }

        public async Task<(CnsysGridReader reader, int? count)> EmailSearchAsync(short? p_priority,
                                            short? p_status,
                                            bool? p_is_do_not_process_before_expired,
                                            int? p_start_index,
                                            int? p_page_size,
                                            bool? p_calculate_count,
                                            string p_operation_id,
                                            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_priority", p_priority);
            parameters.Add("p_status", p_status);
            parameters.Add("p_is_do_not_process_before_expired", p_is_do_not_process_before_expired);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_operation_id", p_operation_id);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_emails", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("eml", "f_emails_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");

            return (result, p_count);
        }

        public async Task<bool?> EmailSendAttemptAsync(int p_email_id, 
                                    bool p_is_send,
                                    CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_email_id", p_email_id);
            parameters.Add("p_is_send", p_is_send);
            parameters.Add("p_is_failed", DbType.Boolean, direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("eml", "f_emails_send_attempt", parameters, cancellationToken);

            return parameters.Get<bool?>("p_is_failed");
        }

        public Task<CnsysGridReader> GetPendingAsync(int? p_MaxFetched, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_MaxFetched", p_MaxFetched);

            var result = _dbConnection.SPExecuteReaderAsync("eml", "f_emails_get_pending", parameters, cancellationToken);

            return result;
        }

        #endregion

        #region Email Template

        public async Task<(CnsysGridReader reader, int? count)> EmailTemplateSearchAsync(int? p_start_index,
                                                 int? p_page_size,
                                                 bool? p_calculate_count,
                                                 CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_templates", direction: System.Data.ParameterDirection.Output);

            var reader = await _dbConnection.SPExecuteReaderAsync("eml", "f_n_s_email_templates_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }

        #endregion
    }
}
