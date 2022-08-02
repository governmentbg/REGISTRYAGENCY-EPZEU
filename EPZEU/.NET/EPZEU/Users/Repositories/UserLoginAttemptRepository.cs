using CNSys.Data;
using EPZEU.Users.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип UserLoginAttempt.
    /// </summary>
    public interface IUserLoginAttemptRepository : 
        IRepository<UserLoginAttempt, int?, UserLoginAttemptSearchCriteria>,
        IRepositoryAsync<UserLoginAttempt, int?, UserLoginAttemptSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IUserLoginAttemptEntity за поддържане и съхранение на обекти от тип UserLoginAttempt.
    /// </summary>
    internal class UserLoginAttemptRepository : RepositoryBase<UserLoginAttempt, int?, UserLoginAttemptSearchCriteria, UsersDataContext>, IUserLoginAttemptRepository
    {
        #region Constructors

        public UserLoginAttemptRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IUsersAuthenticationEntity


        protected async override Task CreateInternalAsync(UsersDataContext context, UserLoginAttempt item, CancellationToken cancellationToken)
        {
            item.AttemptID = await context.UserLoginAttemptCreateAsync((short?)item.AuthenticationType, item.LoginName, item.AdditionalData, item.FailedLoginAttempts, cancellationToken);
        }

        protected override Task UpdateInternalAsync(UsersDataContext context, UserLoginAttempt item, CancellationToken cancellationToken)
        {
            return context.UserLoginAttemptUpdateAsync(item.AttemptID.Value, (short)item.AuthenticationType, item.LoginName, item.AdditionalData, item.FailedLoginAttempts, cancellationToken);
        }

        protected override Task DeleteInternalAsync(UsersDataContext context, int? key, CancellationToken cancellationToken)
        {
            if (key == null)
                throw new System.ArgumentNullException();

            return context.UserLoginAttemptDeleteAsync(key.Value, cancellationToken);
        }

        protected override Task DeleteInternalAsync(UsersDataContext context, UserLoginAttempt item, CancellationToken cancellationToken)
        {
            return DeleteInternalAsync(context, item.AttemptID, cancellationToken);
        }

        protected async override Task<IEnumerable<UserLoginAttempt>> SearchInternalAsync(UsersDataContext context, PagedDataState state, UserLoginAttemptSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<UserLoginAttempt> data = null;

            using(var reader = await context.UsersLoginAttemptSearchAsync(searchCriteria.AttemptIDs?.ToArray(), searchCriteria.LoginName, cancellationToken))
            {
                data = reader.ReadToList<UserLoginAttempt>();
            }

            return data;
        }

        protected override Task<IEnumerable<UserLoginAttempt>> SearchInternalAsync(UsersDataContext context, UserLoginAttemptSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
