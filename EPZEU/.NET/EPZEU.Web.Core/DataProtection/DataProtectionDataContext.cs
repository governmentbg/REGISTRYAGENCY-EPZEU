using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;

namespace EPZEU.Web.Protection
{
    public class DataProtectionDataContext : BaseDataContext
    {
        public DataProtectionDataContext(DbConnection dbConnection) : base(dbConnection)
        {                     
        }

        public CnsysGridReader DataProtectionKeysSearch()
        {
            var parameters = new DynamicParameters();
            parameters.Add("p_ref_data", direction: System.Data.ParameterDirection.Output);

            var result = _dbConnection.SPExecuteReader("aspnetcore", "f_data_protection_keys_search", parameters);

            return result;
        }

        public void DataProtectionKeysCreate(string p_id, string p_keyxml, DateTime p_creationDate, DateTime p_activationDate, DateTime p_expirationDate)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_id", p_id);
            parameters.Add("p_keyxml", p_keyxml);
            parameters.Add("p_creation_date", p_creationDate);
            parameters.Add("p_activation_date", p_activationDate);
            parameters.Add("p_expiration_date", p_expirationDate);

            _dbConnection.SPExecute("aspnetcore", "f_data_protection_keys_create", parameters);
        }
    }
}
