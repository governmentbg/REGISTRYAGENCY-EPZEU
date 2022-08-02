using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    internal class SpecialAccessUserTypeDataContext : BaseDataContext
    {
        public SpecialAccessUserTypeDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public async Task<(CnsysGridReader reader, int? p_count)> SpecialAccessUserTypeSearchAsync(int[] p_special_access_user_types_ids,
                                            int? p_start_index,
                                            int? p_page_size,
                                            bool? p_calculate_count,
                                            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("p_special_access_user_types_ids", p_special_access_user_types_ids);

            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);

            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("p_ref_special_access_user_types", direction: System.Data.ParameterDirection.Output);

            var result = await _dbConnection.SPExecuteReaderAsync("usr", "f_n_s_special_access_user_types_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");

            return (result, p_count);
        }
    }
}
