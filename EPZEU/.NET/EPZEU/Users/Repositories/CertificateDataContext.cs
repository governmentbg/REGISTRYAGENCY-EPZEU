using Dapper;
using EPZEU.Utilities;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Клас капсулиращ работата по извикване на процедурите в базата данни свързани със сертификатите на потребителите.
    /// </summary>
    internal class CertificateDataContext : BaseDataContext
    {
        public CertificateDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        public Task<CnsysGridReader> CertificatesSearchAsync(
            int[] p_certificate_ids,
            string p_cert_hash,
            string p_cert_sernum,
            bool p_load_content,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_certificate_ids", p_certificate_ids);
            parameters.Add("p_cert_hash", p_cert_hash);
            parameters.Add("p_cert_sernum", p_cert_sernum);
            parameters.Add("p_load_content", p_load_content);
            parameters.Add("p_ref_certificates", direction: System.Data.ParameterDirection.Output);

            return _dbConnection.SPExecuteReaderAsync("usr", "f_certificates_search", parameters, cancellationToken);
        }
    }
}
