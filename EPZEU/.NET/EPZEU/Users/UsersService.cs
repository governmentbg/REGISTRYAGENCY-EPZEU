using EPZEU.Users.Models;
using EPZEU.Users.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users
{
    /// <summary>
    /// Предоставя метод за търсене на потребители.
    /// </summary>
    public interface IUsersService
    {
        /// <summary>
        /// Търсене на потребители.
        /// </summary>
        /// <param name="usersSearchCriteria"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<IEnumerable<User>> SearchUsersAsync(UserSearchCriteria usersSearchCriteria, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Имплементация на IUsersService интерфейса.
    /// </summary>
    public class UsersService : IUsersService
    {
        public UsersService(IUsersRepository usersRepository,
            IUsersPermissionRepository usersPermissionRepository)
        {
            UsersRepository = usersRepository;
            UsersPermissionRepository = usersPermissionRepository;
        }

        #region Properties

        private IUsersRepository UsersRepository { get; set; }
        private IUsersPermissionRepository UsersPermissionRepository { get; set; }

        #endregion

        #region IUsersService

        public async Task<IEnumerable<User>> SearchUsersAsync(UserSearchCriteria usersSearchCriteria, CancellationToken cancellationToken)
        {
            var users = await UsersRepository.SearchAsync(usersSearchCriteria, cancellationToken);

            if (users.Any())
            {
                if (usersSearchCriteria.LoadUserPermissions)
                {
                    var userPermissions = (await UsersPermissionRepository.SearchAsync(new UserPermissionSearchCriteria()
                    {
                        UserIDs = users.Select(u => u.UserID.Value).ToList()
                    }, cancellationToken)).ToList();

                    foreach (var user in users)
                    {
                        user.UserPermissions = userPermissions.Where(up => up.UserID == user.UserID).ToList();
                    }
                }
            }

            return users;
        }
        #endregion
    }
}
