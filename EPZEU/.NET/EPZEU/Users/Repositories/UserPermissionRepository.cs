using CNSys.Data;
using EPZEU.Users.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип UserPermission.
    /// </summary>
    public interface IUsersPermissionRepository : 
        IRepository<UserPermission, long?, UserPermissionSearchCriteria>,
        IRepositoryAsync<UserPermission, long?, UserPermissionSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IUsersPermissionEntity за поддържане и съхранение на обекти от тип UserPermission.
    /// </summary>
    internal class UserPermissionRepository : RepositoryBase<UserPermission, long?, UserPermissionSearchCriteria, UsersDataContext>, IUsersPermissionRepository
    {
        #region Constructors

        public UserPermissionRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IUsersPermissionEntity

        protected async override Task<IEnumerable<UserPermission>> SearchInternalAsync(UsersDataContext context, PagedDataState state, UserPermissionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<UserPermission> data = null;
            using(var reader = await context.UserPermissionsSearchAsync(searchCriteria.UserIDs?.ToArray(), cancellationToken))
            {
                data = reader.ReadToList<UserPermission>();
            }
            return data;
        }

        protected override Task<IEnumerable<UserPermission>> SearchInternalAsync(UsersDataContext context, UserPermissionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
