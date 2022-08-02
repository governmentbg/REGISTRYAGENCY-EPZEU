using CNSys.Data;
using EPZEU.Users.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип UserProcess.
    /// </summary>
    public interface IUsersProcessesRepository : 
        IRepository<UserProcess, long?, UserProcessesSearchCriteria>,
        IRepositoryAsync<UserProcess, long?, UserProcessesSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IUsersProcessesEntity за поддържане и съхранение на обекти от тип UserProcess.
    /// </summary>
    internal class UserProcessesRepository : RepositoryBase<UserProcess, long?, UserProcessesSearchCriteria, UsersDataContext>, IUsersProcessesRepository
    {
        #region Constructors

        public UserProcessesRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IUsersPermissionEntity

        protected async override Task<IEnumerable<UserProcess>> SearchInternalAsync(UsersDataContext context, PagedDataState state, UserProcessesSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var res = await context.UserProcessesSearchAsync(null, null, null, searchCriteria.UserIDs.ToArray(), null, null, null, state.StartIndex, state.PageSize, null,
                            (state.StartIndex == 1), cancellationToken);

            using (res.reader)
            {
                state.Count = res.count ?? state.Count;

                return res.reader.ReadToList<UserProcess>();
            }
        }

        protected override Task<IEnumerable<UserProcess>> SearchInternalAsync(UsersDataContext context, UserProcessesSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
