using Dapper;
using EPZEU.Utilities;
using System;
using System.Data;
using System.Data.Common;

namespace EPZEU.Users.Migrations.Repositories
{
    internal class MigrationDataContext : BaseDataContext
    {
        public MigrationDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        #region AccountMigrationProcess

        public void AccountMigrationProcessCreate(int? p_user_cin,
                                      short? p_register_id,
                                      string p_migr_username,
                                      int? p_migr_user_id,
                                      int? p_migr_client_id,
                                      decimal? p_migr_amount,
                                      short? p_status,
                                      DateTime? p_migration_date,
                                      ref int? p_account_migr_process_id

            )
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_user_cin", p_user_cin);
            parameters.Add("p_register_id", p_register_id);
            parameters.Add("p_migr_username", p_migr_username);
            parameters.Add("p_migr_user_id", p_migr_user_id);
            parameters.Add("p_migr_client_id", p_migr_client_id);
            parameters.Add("p_migr_amount", p_migr_amount);
            parameters.Add("p_status", p_status);
            parameters.Add("p_migration_date", p_migration_date);
            parameters.Add("p_account_migr_process_id", p_account_migr_process_id, DbType.Int32, ParameterDirection.Output);

            _dbConnection.SPExecute("usr", "f_account_migr_process_create", parameters);

            p_account_migr_process_id = parameters.Get<int?>("p_account_migr_process_id");
        }

        public void AccountMigrationProcessUpdate(int? p_account_migr_process_id,
                                      short? p_status)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_account_migr_process_id", p_account_migr_process_id);
            parameters.Add("p_status", p_status);            

            _dbConnection.SPExecute("usr", "f_account_migr_process_update", parameters);
        }

        public CnsysGridReader AccountMigrationProcessSearch(int? p_account_migr_process_id,
                                                             int? p_user_cin,                                                 
                                                             string p_migr_username,
                                                             short? p_register)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_account_migr_process_id", p_account_migr_process_id);
            parameters.Add("p_user_cin", p_user_cin);            
            parameters.Add("p_migr_username", p_migr_username);
            parameters.Add("p_register", p_register);
            parameters.Add("p_ref_accounts", direction: System.Data.ParameterDirection.Output);

            var result = _dbConnection.SPExecuteReader("usr", "f_account_migr_process_search", parameters);
           
            return result;
        }

        #endregion
    }
}
