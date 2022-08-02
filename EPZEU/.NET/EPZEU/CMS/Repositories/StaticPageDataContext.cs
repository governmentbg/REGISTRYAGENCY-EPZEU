using Dapper;
using EPZEU.Utilities;
using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CMS.Repositories
{
    /// <summary>
    /// Клас, капсулиращ работата по извикването на процедурите от базата данни, свързани със статични страници
    /// </summary>
    internal class StaticPageDataContext : BaseDataContext
    {
        public StaticPageDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public async Task<(CnsysGridReader reader, DateTime? p_last_updated_on)> StaticPageSearchAsync(int? p_module_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_module_id", p_module_id);
            parameters.Add("p_last_updated_on", direction: System.Data.ParameterDirection.Output);


            var result = await _dbConnection.SPExecuteReaderAsync("cms", "f_n_s_static_pages_search", parameters, cancellationToken);

            var p_last_updated_on = parameters.Get<DateTime?>("p_last_updated_on");

            return (result, p_last_updated_on);
        }
    }
}
