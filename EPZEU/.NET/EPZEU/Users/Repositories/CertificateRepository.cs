using CNSys.Data;
using EPZEU.Users.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип Certificate.
    /// </summary>
    public interface ICertificateRepository :
        IRepository<Certificate, long?, CertificateSearchCriteria>,
        IRepositoryAsync<Certificate, long?, CertificateSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс ICertificateRepository за поддържане и съхранение на обекти от тип Certificate.
    /// </summary>
    internal class CertificateRepository : RepositoryBase<Certificate, long?, CertificateSearchCriteria, CertificateDataContext>, ICertificateRepository
    {
        #region Constructors

        public CertificateRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        protected async override Task<IEnumerable<Certificate>> SearchInternalAsync(CertificateDataContext context, PagedDataState state, CertificateSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<Certificate> data = null;

            using(var reader = await context.CertificatesSearchAsync(searchCriteria.CertificateIDs?.ToArray(), searchCriteria.CertHash, searchCriteria.CertSerialNumber, searchCriteria.LoadContent, cancellationToken))
            {
                data = reader.ReadToList<Certificate>();
            }

            return data;
        }

        protected override Task<IEnumerable<Certificate>> SearchInternalAsync(CertificateDataContext context, CertificateSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }
    }
}