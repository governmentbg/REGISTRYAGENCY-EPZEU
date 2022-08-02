using Dapper;
using EPZEU.Utilities;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationUsers.Repositotories
{
    internal class AppUserDataContext : BaseDataContext
    {
        public AppUserDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public async Task<int?> AppUserEnsureAsync(int p_cin, string p_display_name, bool p_is_system, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_cin", p_cin);
            parameters.Add("p_display_name", p_display_name);
            parameters.Add("p_is_system", p_is_system);
            parameters.Add("p_user_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("usr", "f_app_users_ensure", parameters, cancellationToken);

            var p_user_id = parameters.Get<int?>("p_user_id");

            return p_user_id;
        }

        public async Task<(CnsysGridReader reader, int? count)> AppUserSearchAsync(
                                                          int? p_user_id,
                                                          int? p_cin,                                                          
                                                          int? p_start_index,
                                                          int? p_page_size,
                                                          bool? p_calculate_count,
                                                          int? p_max_nor,
                                                          CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_user_id", p_user_id);
            parameters.Add("p_cin", p_cin);            
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_app_users", direction: System.Data.ParameterDirection.Output);


            var reader = await _dbConnection.SPExecuteReaderAsync("usr", "f_app_users_search", parameters, cancellationToken);
            int? p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }
    }
}
