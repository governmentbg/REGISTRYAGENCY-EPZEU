using Dapper;
using Dapper.Oracle;
using EPZEU.Users.Migrations.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using static Dapper.SqlMapper;

namespace EPZEU.Users.Migrations.Repositories
{
    public class OSSDataContext : BaseDataContext
    {
        public OSSDataContext(DbConnection dbConnection) : base(dbConnection)
        {
            SqlMapper.SetTypeMap(typeof(OSSApplication), DataContextHelper.ColumnMap<OSSApplication>());
            SqlMapper.SetTypeMap(typeof(Account), DataContextHelper.ColumnMap<Account>());
        }

        public CnsysGridReader AccountSearch(string username, string password)
        {
            var parameters = new OracleDynamicParameters();                
            parameters.Add("p_Username", username);
            parameters.Add("p_Password", password);            
            parameters.Add("p_Userdata", dbType: OracleMappingType.RefCursor, direction: ParameterDirection.Output);

            var result = SPExecuteReader(_dbConnection, "pkg_oss_migration.p_user_search", parameters);
        
            return result;
        }

        public CnsysGridReader GetApplicationsForMigration(int? ossUserID, int? count)
        {
            var parameters = new OracleDynamicParameters();
            parameters.Add("p_OSSUserID", ossUserID);
            parameters.Add("p_Count", count);
            parameters.Add("c_Data", dbType: OracleMappingType.RefCursor, direction: ParameterDirection.Output);

            var result = SPExecuteReader(_dbConnection, "pkg_oss_migration.p_get_apps_for_migration", parameters);

            return result;
        }

        public void ComplateApplicationsMigration(string serviceInstanceIDs, int epzeuUserCIN, string epzeuUserDisplayName)
        {
            var parameters = new OracleDynamicParameters();
            parameters.Add("p_ServiceInstanceIDs", serviceInstanceIDs);
            parameters.Add("p_EpzeuUserCIN", epzeuUserCIN);
            parameters.Add("p_EpzeuDisplayName", epzeuUserDisplayName);

            SPExecute(_dbConnection, "pkg_oss_migration.p_complate_apps_migration", parameters);
        }

        #region Helpers

        public static CnsysGridReader SPExecuteReader(DbConnection connection, string procName, IDynamicParameters parameters = null)
        {
            var reader = connection.ExecuteReader(procName, parameters, commandType: CommandType.StoredProcedure);

            return new CnsysGridReader(reader);
        }

        public static void SPExecute(IDbConnection connection, string procName, IDynamicParameters parameters = null)
        {
            connection.Execute(procName, parameters, commandType: CommandType.StoredProcedure);
        }


        #endregion
    }
}
