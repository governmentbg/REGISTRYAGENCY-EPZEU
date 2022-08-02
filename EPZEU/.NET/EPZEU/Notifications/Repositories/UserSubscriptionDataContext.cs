using Dapper;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Notifications.Repositories
{ 
    internal class UserSubscriptionDataContext : BaseDataContext
    {
        public UserSubscriptionDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        #region UserSubscription

        public async Task<int?> UserSubscriptionCreateAsync(int? p_user_cin,
                                      short? p_register_id,
                                      short? p_type_id,
                                      string p_value,
                                      CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_user_cin", p_user_cin);
            parameters.Add("p_register_id", p_register_id);
            parameters.Add("p_type", p_type_id);
            parameters.Add("p_value", p_value);          
            parameters.Add("p_usr_subsr_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("usr", "f_user_subscriptions_create", parameters, cancellationToken);

            return parameters.Get<int?>("p_usr_subsr_id");
        }

        public Task<int> UserSubscriptionDeleteAsync(int? p_user_cin, int[] p_usr_subsr_ids, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_user_cin", p_user_cin);
            parameters.Add("p_usr_subsr_ids", p_usr_subsr_ids);

            return _dbConnection.SPExecuteAsync("usr", "f_user_subscriptions_delete", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? count)> UserSubscriptionSearchAsync(int[] p_usr_subsr_ids,
                                                     int? p_user_cin, 
                                                     short? p_register,
                                                     short? p_type,
                                                     string[] p_values,
                                                     bool? p_load_user_data,                                                    
                                                     int? p_start_index,
                                                     int? p_page_size,
                                                     bool? p_calculate_count,                                                  
                                                     CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_usr_subsr_ids", p_usr_subsr_ids);
            parameters.Add("p_user_cin", p_user_cin);
            parameters.Add("p_register", p_register);
            parameters.Add("p_type", p_type);
            parameters.Add("p_values", p_values);
            parameters.Add("p_load_user_data", p_load_user_data);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            
            /*TODO: няма ли да е по прегледно да го няма System.Data.*/
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_user_subscriptions", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_users_data", direction: System.Data.ParameterDirection.Output);

            /*TODO: да се цитират схемите, в който са функциите.*/
            var reader = await _dbConnection.SPExecuteReaderAsync("usr", "f_user_subscriptions_search", parameters, cancellationToken);

            return (reader, parameters.Get<int?>("p_count"));
        }

        #endregion
    }
}
