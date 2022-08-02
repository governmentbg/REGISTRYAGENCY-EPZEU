using CNSys.Data;
using EPZEU.Users.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип UserLoginSession.
    /// </summary>
    public interface IUserLoginSessionRepository : 
        IRepository<UserLoginSession, int?, UserLoginSessionSearchCriteria>,
        IRepositoryAsync<UserLoginSession, int?, UserLoginSessionSearchCriteria>
    {
    }
    /// <summary>
    /// Реализация на интерфейс IUserLoginSessionEntity за поддържане и съхранение на обекти от тип UserLoginSession.
    /// </summary>
    internal class UserLoginSessionRepository : RepositoryBase<UserLoginSession, int?, UserLoginSessionSearchCriteria, UsersDataContext>, IUserLoginSessionRepository
    {
        #region Constructors

        public UserLoginSessionRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IUsersAuthenticationEntity

        protected override Task CreateInternalAsync(UsersDataContext context, UserLoginSession item, CancellationToken cancellationToken)
        {
            return context.UserLoginSessionCreateAsync(item.LoginSessionID.Value, item.UserSessionID.Value,
                item.UserID.Value, item.LoginDate.Value, item.LogoutDate, item.IpAddress, (short)item.AuthenticationType, item.CertificateID, item.OperationID.Value, cancellationToken);
        }

        protected override Task UpdateInternalAsync(UsersDataContext context, UserLoginSession item, CancellationToken cancellationToken)
        {
            return context.UserLoginSessionUpdateAsync(item.LoginSessionID.Value, item.UserSessionID.Value, item.UserID.Value, item.LoginDate.Value, item.LogoutDate, item.IpAddress, (short)item.AuthenticationType, item.CertificateID, item.OperationID.Value, cancellationToken);
        }

        protected async override Task<IEnumerable<UserLoginSession>> SearchInternalAsync(UsersDataContext context, PagedDataState state, UserLoginSessionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var res = await context.UsersLoginSessionSearchAsync(searchCriteria.LoginSessionIDs,
                searchCriteria.UserSessionID,
                searchCriteria.UserID,
                searchCriteria.LoginDateFrom,
                searchCriteria.LoginDateTo,
                searchCriteria.IPAddress,
                (short?)searchCriteria.AuthenticationType,
                state.StartIndex,
                state.PageSize,
                null,
                (state.StartIndex == 1),
                cancellationToken);

            state.Count = res.count ?? state.Count;

            using (res.reader)
            {
                return res.reader.ReadToList<UserLoginSession>();
            }
        }

        protected override Task<IEnumerable<UserLoginSession>> SearchInternalAsync(UsersDataContext context, UserLoginSessionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
