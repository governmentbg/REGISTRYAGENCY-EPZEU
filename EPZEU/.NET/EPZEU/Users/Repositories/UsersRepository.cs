using CNSys.Data;
using EPZEU.Users.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Users.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип User.
    /// </summary>
    public interface IUsersRepository : 
        IRepository<User, long?, UserSearchCriteria>,
        IRepositoryAsync<User, long?, UserSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IUsersEntity за поддържане и съхранение на обекти от тип User.
    /// </summary>
    internal class UsersRepository : RepositoryBase<User, long?, UserSearchCriteria, UsersDataContext>, IUsersRepository
    {
        #region Constructors

        public UsersRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        protected async override Task<IEnumerable<User>> SearchInternalAsync(UsersDataContext context, PagedDataState state, UserSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<User> data = null;
            var (reader, count) = await context.UsersSearchAsync(searchCriteria.UserIDs?.ToArray(), searchCriteria.CIN,
                            searchCriteria.Email, searchCriteria.Username,
                            searchCriteria.Firstname, searchCriteria.Middlename, searchCriteria.Familyname,
                            searchCriteria.AccessType?.Cast<short>().ToArray(), searchCriteria.UserStatuses?.Cast<short>().ToArray(),
                            searchCriteria.DateFrom, searchCriteria.DateTo,
                            (short?)searchCriteria.AuthenticationType, null, null,
                            state.StartIndex, state.PageSize, null,
                            (state.StartIndex == 1), cancellationToken);

            using(reader)
            {
                state.Count = count ?? state.Count;
                data = reader.ReadToList<User>();
            }

            return data;
        }

        protected override Task<IEnumerable<User>> SearchInternalAsync(UsersDataContext context, UserSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }
    }   
}