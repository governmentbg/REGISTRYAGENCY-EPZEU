using Dapper;
using EPZEU.Users.Models;
using EPZEU.Utilities;
using System;
using System.Data;
using System.Data.Common;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// DataContext за достъп до базата по функционалности на потребителите.
    /// </summary>
    internal class UsersDataContext : BaseDataContext
    {
        public UsersDataContext(DbConnection dbConnection) : base(dbConnection)
        {
            
        }

        public async Task<(CnsysGridReader reader, int? count)> UsersSearchAsync(
            int[] p_users_ids,
            int? p_cin,
            string p_email,
            string p_username,
            string p_first_name,
            string p_middle_name,
            string p_family_name,
            short[] p_special_access_user_type,
            short[] p_status,
            DateTime? p_date_from,
            DateTime? p_date_to,
            short? p_authentication_type,
            string p_organization,
            bool? p_bulletin_acceptance,
            int? p_start_index,
            int? p_page_size,
            int? p_max_nor,
            bool? p_calculate_count,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_users_ids", p_users_ids);
            parameters.Add("p_cin", p_cin);
            parameters.Add("p_email", p_email);
            parameters.Add("p_username", p_username);
            parameters.Add("p_first_name", p_first_name);
            parameters.Add("p_middle_name", p_middle_name);
            parameters.Add("p_family_name", p_family_name);
            parameters.Add("p_special_access_user_type", p_special_access_user_type);
            parameters.Add("p_status", p_status);
            parameters.Add("p_date_from", p_date_from);
            parameters.Add("p_date_to", p_date_to);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_organization", p_organization);
            parameters.Add("p_bulletin_acceptance", p_bulletin_acceptance);            
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_max_nor", p_max_nor);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_users", direction: System.Data.ParameterDirection.Output);

            var reader = await _dbConnection.SPExecuteReaderAsync("usr", "f_users_search", parameters, cancellationToken);

            int? count = parameters.Get<int?>("p_count");
            return (reader, count);
        }

        public Task<CnsysGridReader> UsersAuthenticationSearchAsync(
            long[] p_authentication_id,
            int? p_user_id,
            short? p_authentication_type,
            string p_username,
            string p_certificate_hash,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_authentication_id", p_authentication_id);
            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_username", p_username);
            parameters.Add("p_certificate_hash", p_certificate_hash);
            
            parameters.Add("p_user_authentications", direction: System.Data.ParameterDirection.Output);

            return _dbConnection.SPExecuteReaderAsync("usr", "f_user_authentications_search", parameters, cancellationToken);
        }

        public async Task<int?> UsersAuthenticationCreateAsync(            
            int p_user_id,
            short p_authentication_type,
            string p_password_hash,
            string p_username,
            int? p_certificate_id,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            
            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_password_hash", p_password_hash);
            parameters.Add("p_username", p_username);
            parameters.Add("p_certificate_id", p_certificate_id);
            parameters.Add("p_authentication_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("usr", "f_user_authentications_create", parameters, cancellationToken);

            var p_authentication_id = parameters.Get<int?>("p_authentication_id");

            return p_authentication_id;
        }

        public Task UsersAuthenticationUpdateAsync(
            long p_authentication_id,
            short p_authentication_type,
            string p_password_hash,
            string p_username,
            bool p_is_locked,
            DateTime? p_locked_until,
            int? p_certificate_id,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_authentication_id", p_authentication_id, DbType.Int32);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_password_hash", p_password_hash);
            parameters.Add("p_username", p_username);
            parameters.Add("p_is_locked", p_is_locked);
            parameters.Add("p_locked_until", p_locked_until, DbType.DateTimeOffset);
            parameters.Add("p_certificate_id", p_certificate_id);            

            return _dbConnection.SPExecuteAsync("usr", "f_user_authentications_update", parameters, cancellationToken);
        }

        public Task<CnsysGridReader> UserPermissionsSearchAsync(int[] p_users_ids, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_users_ids", p_users_ids);
            parameters.Add("p_users_permission_ids", direction: System.Data.ParameterDirection.Output);

            return _dbConnection.SPExecuteReaderAsync("usr", "f_user_permissions_search", parameters, cancellationToken);
        }

        #region User Login Attempts 

        public async Task<int?> UserLoginAttemptCreateAsync(
            short? p_authentication_type,
            string p_login_name,
            string p_additional_data,
            int p_failed_login_attempts,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_login_name", p_login_name);
            parameters.Add("p_additional_data", p_additional_data);
            parameters.Add("p_failed_login_attempts", p_failed_login_attempts);
            parameters.Add("p_attempt_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("usr", "f_user_failed_login_attempts_create", parameters, cancellationToken);

            int? p_attempt_id = parameters.Get<int?>("p_attempt_id");

            return p_attempt_id;
        }

        public Task UserLoginAttemptUpdateAsync(
            int p_attempt_id,
            short p_authentication_type,
            string p_login_name,
            string p_additional_data,
            int p_failed_login_attempts,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_attempt_id", p_attempt_id);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_login_name", p_login_name);
            parameters.Add("p_additional_data", p_additional_data);
            parameters.Add("p_failed_login_attempts", p_failed_login_attempts);            

            return _dbConnection.SPExecuteAsync("usr", "f_user_failed_login_attempts_update", parameters, cancellationToken);
        }

        public Task UserLoginAttemptDeleteAsync(
            int p_attempt_id,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_attempt_id", p_attempt_id);

            return _dbConnection.SPExecuteAsync("usr", "f_user_failed_login_attempts_delete", parameters, cancellationToken);
        }

        public Task<CnsysGridReader> UsersLoginAttemptSearchAsync(
            long[] p_attempt_id,
            string p_login_name,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_attempt_id", p_attempt_id);
            parameters.Add("p_login_name", p_login_name);
            parameters.Add("p_failed_login_attempts", direction: System.Data.ParameterDirection.Output);

            return _dbConnection.SPExecuteReaderAsync("usr", "f_user_failed_login_attempts_search", parameters, cancellationToken);
        }

        #endregion

        #region User Login Sessions 

        public Task UserLoginSessionCreateAsync(
            Guid p_login_session_id,
            Guid p_user_session_id,
            int p_user_id,
            DateTime p_login_date, 
            DateTime? p_logout_date,
            IPAddress p_ip_address,
            short p_authentication_type,
            int? p_certificate_id,
            Guid p_operation_id,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            
            parameters.Add("p_login_session_id", p_login_session_id);
            parameters.Add("p_user_session_id", p_user_session_id);
            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_login_date", p_login_date);
            parameters.Add("p_logout_date", p_logout_date);
            parameters.Add("p_ip_address", p_ip_address);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_certificate_id", p_certificate_id);
            parameters.Add("p_operation_id", p_operation_id);

            return _dbConnection.SPExecuteAsync("usr", "f_login_sessions_create", parameters, cancellationToken);
        }

        public Task UserLoginSessionUpdateAsync(
            Guid p_login_session_id,
            Guid p_user_session_id,
            int p_user_id,
            DateTime p_login_date,
            DateTime? p_logout_date,
            IPAddress p_ip_address,
            short p_authentication_type,
            int? p_certificate_id,
            Guid p_operation_id,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_login_session_id", p_login_session_id);
            parameters.Add("p_user_session_id", p_user_session_id);
            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_login_date", p_login_date);
            parameters.Add("p_logout_date", p_logout_date);
            parameters.Add("p_ip_address", p_ip_address);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_certificate_id", p_certificate_id);
            parameters.Add("p_operation_id", p_operation_id);

            return _dbConnection.SPExecuteAsync("usr", "f_login_sessions_update", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? count)> UsersLoginSessionSearchAsync(
            Guid[] p_login_session_ids,
            Guid? p_user_session_id,
            int? p_user_id,
            DateTime? p_login_date_from,
            DateTime? p_login_date_to,
            IPAddress p_ip_address,
            short? p_authentication_type,
            int? p_start_index,
            int? p_page_size,
            int? p_max_nor,
            bool? p_calculate_count,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_login_session_ids", p_login_session_ids);
            parameters.Add("p_user_session_id", p_user_session_id);
            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_login_date_from", p_login_date_from);
            parameters.Add("p_login_date_to", p_login_date_to);
            parameters.Add("p_ip_address", p_ip_address);
            parameters.Add("p_authentication_type", p_authentication_type);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_max_nor", p_max_nor);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_login_sessions", direction: System.Data.ParameterDirection.Output);

            var reader = await _dbConnection.SPExecuteReaderAsync("usr", "f_login_sessions_search", parameters, cancellationToken);

            int? p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }

        #endregion

        #region User Processes

        public async Task<(CnsysGridReader reader, int? count)> UserProcessesSearchAsync(
            int[] p_process_ids,
            string[] p_process_guids,
            int? p_process_type,
            int[] p_user_ids,
            DateTime? p_invalid_after_from,
            DateTime? p_invalid_after_to,
            short? p_status,
            int? p_start_index,
            int? p_page_size,
            int? p_max_nor,
            bool? p_calculate_count,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_process_ids", p_process_ids);
            parameters.Add("p_process_guids", p_process_guids);
            parameters.Add("p_process_type", p_process_type);
            parameters.Add("p_user_ids", p_user_ids);
            parameters.Add("p_invalid_after_from", p_invalid_after_from);
            parameters.Add("p_invalid_after_to", p_invalid_after_to);
            parameters.Add("p_status", p_status);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_max_nor", p_max_nor);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_user_processes", direction: System.Data.ParameterDirection.Output);


            var reader = await _dbConnection.SPExecuteReaderAsync("usr", "f_user_processes_search", parameters, cancellationToken);

            int? p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }

        #endregion
    }
}
