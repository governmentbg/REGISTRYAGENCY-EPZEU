using Dapper;
using EPZEU.Utilities;
using System;
using System.Data;
using System.Data.Common;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Audit.Repositories
{
    /// <summary>
    /// Клас капсулиращ работата по извикване на процедурите от базата данни за аодит.
    /// </summary>
    internal class LogActionDataContext : BaseDataContext
    {
        public LogActionDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        #region Log Action
        public async Task<long?> LogActionCreateAsync(
                       DateTime? p_log_action_date,
                       short? p_object_type_id,
                       short? p_action_type_id,
                       short? p_module_id,
                       short? p_functionality_id,
                       string p_key,
                       Guid? p_user_session_id,
                       Guid? p_login_session_id,
                       int? p_user_id,
                       int? p_user_cin,
                       IPAddress p_ip_address,
                       object p_additional_data,
                       string p_operation_id,
                       CancellationToken cancellationToken)
        {
            long? p_log_action_id = null;

            var parameters = new DynamicParameters();

            parameters.Add("p_log_action_date", p_log_action_date);
            parameters.Add("p_object_type_id", p_object_type_id);
            parameters.Add("p_action_type_id", p_action_type_id);
            parameters.Add("p_module_id", p_module_id);
            parameters.Add("p_functionality_id", p_functionality_id);
            parameters.Add("p_key", p_key);
            parameters.Add("p_user_session_id", p_user_session_id);
            parameters.Add("p_login_session_id", p_login_session_id);
            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_user_cin", p_user_cin);
            parameters.Add("p_ip_address", p_ip_address);
            parameters.Add("p_additional_data", p_additional_data);
            parameters.Add("p_operation_id", p_operation_id);
            parameters.Add("p_log_action_id", p_log_action_id, DbType.Int64, ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("audit", "f_log_actions_create", parameters, cancellationToken);

            p_log_action_id = parameters.Get<long?>("p_log_action_id");

            return p_log_action_id;
        }

        #endregion
    }
}
