using CNSys.Data;
using EPZEU.Users.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип UserAuthentication.
    /// </summary>
    public interface IUsersAuthenticationRepository : 
        IRepository<UserAuthentication, long?, UserAuthenticationSearchCriteria>,
        IRepositoryAsync<UserAuthentication, long?, UserAuthenticationSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IUsersAuthenticationEntity за поддържане и съхранение на обекти от тип UserAuthentication.
    /// </summary>
    internal class UsersAuthenticationRepository : RepositoryBase<UserAuthentication, long?, UserAuthenticationSearchCriteria, UsersDataContext>, IUsersAuthenticationRepository
    {
        #region Constructors

        public UsersAuthenticationRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IUsersAuthenticationEntity

        protected async override Task CreateInternalAsync(UsersDataContext context, UserAuthentication item, CancellationToken cancellationToken)
        {
            item.AuthenticationID = await context.UsersAuthenticationCreateAsync(
                item.UserID.Value
                , (short)item.AuthenticationType
                , item.PasswordHash
                , item.Username
                , item.CertificateID
                , cancellationToken);
        }

        protected override Task UpdateInternalAsync(UsersDataContext context, UserAuthentication item, CancellationToken cancellationToken)
        {
            return context.UsersAuthenticationUpdateAsync(item.AuthenticationID.Value, (short)item.AuthenticationType, item.PasswordHash, item.Username, item.IsLocked, item.LockedUntil, item.CertificateID, cancellationToken);
        }

        protected async override Task<IEnumerable<UserAuthentication>> SearchInternalAsync(UsersDataContext context, PagedDataState state, UserAuthenticationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<UserAuthentication> data = null;

            using(var reader = await context.UsersAuthenticationSearchAsync(searchCriteria.AuthenticationIDs?.ToArray(),
                searchCriteria.UserID, (short?)searchCriteria.AuthenticationType, searchCriteria.Username, searchCriteria.CertificateHash, cancellationToken))
            {
                data = reader.ReadToList<UserAuthentication>();
            }

            return data;
        }

        protected override Task<IEnumerable<UserAuthentication>> SearchInternalAsync(UsersDataContext context, UserAuthenticationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
