using CNSys.Data;
using EPZEU.Applications.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Applications.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип Application.
    /// </summary>
    public interface IApplicationRepository :
        IRepository<Application, long?, ApplicationSearchCriteria>,
        IRepositoryAsync<Application, long?, ApplicationSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationEntity за поддържане и съхранение на обекти от тип Application.
    /// </summary>
    internal class ApplicationRepository : RepositoryBase<Application, long?, ApplicationSearchCriteria, ApplicationDataContext>, IApplicationRepository
    {
        #region Constructors

        public ApplicationRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override async Task CreateInternalAsync(ApplicationDataContext context, Application item, CancellationToken cancellationToken)
        {

            var applicationID = await context.ApplicationCreateAsync(item.ApplicantCIN,
                                      (short?)item.Register,
                                      (short?)item.ApplicationTypeID,
                                      item.IncomingNumber,
                                      item.RegistrationDate,
                                      item.ApplicationDisplayUrl,
                                      item.ResultHTML,
                                      cancellationToken);

            item.ApplicationID = applicationID;
        }

        protected override Task UpdateInternalAsync(ApplicationDataContext context, Application item, CancellationToken cancellationToken)
        {
            return context.ApplicationUpdateAsync(item.IncomingNumber,
                                      item.ResultHTML, cancellationToken);
        }

        protected override void DeleteInternal(ApplicationDataContext context, Application item)
        {
            throw new NotImplementedException();
        }

        protected override void DeleteInternal(ApplicationDataContext context, long? key)
        {
            throw new NotImplementedException();
        }

        protected override Application ReadInternal(ApplicationDataContext context, long? key)
        {
            throw new NotImplementedException();
        }

        protected override async Task<IEnumerable<Application>> SearchInternalAsync(ApplicationDataContext dataContext, PagedDataState state, ApplicationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<Application> applications = null;

            var res = await dataContext.ApplicationSearchAsync(
                                                                  searchCriteria.FromRegistrationDate,
                                                                  searchCriteria.ToRegistrationDate,
                                                                  searchCriteria.IncomingNumbers != null && searchCriteria.IncomingNumbers.Count > 0 ? searchCriteria.IncomingNumbers.ToArray() : null,
                                                                  searchCriteria.ApplicationTypeID,
                                                                  searchCriteria.ApplicantCIN,
                                                                  (short?)searchCriteria.Register,
                                                                  state.StartIndex,
                                                                  state.PageSize,
                                                                  true,
                                                                  searchCriteria.MaxNumberOfRecords,
                                                                  cancellationToken);

            using (res.reader)
            {
                state.Count = res.count ?? state.Count;
                applications = await res.reader.ReadToListAsync<Application>(cancellationToken);
            }

            return applications;

        }

        protected override Task<IEnumerable<Application>> SearchInternalAsync(ApplicationDataContext dataContext, ApplicationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(dataContext, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
