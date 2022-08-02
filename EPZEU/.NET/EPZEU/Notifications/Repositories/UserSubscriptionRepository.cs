using CNSys.Data;
using EPZEU.Notifications.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Notifications.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип UserSubscription.
    /// </summary>
    public interface IUserSubscriptionRepository :
        IRepository<UserSubscription, int?, UserSubscriptionSearchCriteria>,
        IRepositoryAsync<UserSubscription, int?, UserSubscriptionSearchCriteria>
    {
        Task DeleteUserSubscriptionsAsync(int? userCIN, List<string> userSubscriptionIDs, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс IUserSubscriptionRepository за поддържане и съхранение на обекти от тип UserSubscription.
    /// </summary>
    internal class UserSubscriptionRepository : RepositoryBase<UserSubscription, int?, UserSubscriptionSearchCriteria, UserSubscriptionDataContext>, IUserSubscriptionRepository
    {
        #region Constructors

        public UserSubscriptionRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected async override Task CreateInternalAsync(UserSubscriptionDataContext context, UserSubscription item, CancellationToken cancellationToken)
        {
            int? res = await context.UserSubscriptionCreateAsync(item.UserCIN, (short?)item.Register, (short?)item.Type, item.Value, cancellationToken);

            item.UserSubscriptionID = res.HasValue ? res.Value.ToString() : null;
        }

        protected async override Task<UserSubscription> ReadInternalAsync(UserSubscriptionDataContext context, int? key, CancellationToken cancellationToken)
        {
            return (await SearchInternalAsync(context, new UserSubscriptionSearchCriteria { UserSubscriptionIDs = new List<string>() { key.Value.ToString() } }, cancellationToken)).SingleOrDefault();
        }

        protected async override Task<IEnumerable<UserSubscription>> SearchInternalAsync(UserSubscriptionDataContext context, PagedDataState state, UserSubscriptionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<UserSubscription> result = null;
            var (reader, count) = await context.UserSubscriptionSearchAsync(
                   searchCriteria.UserSubscriptionIDs?.Select(id => Convert.ToInt32(id)).ToArray(),
                   searchCriteria.UserCIN,
                   (short?)searchCriteria.Register,
                   (short?)searchCriteria.Type,
                   searchCriteria.Values?.ToArray(),
                   searchCriteria.LoadOption?.LoadUserData,
                   state.StartIndex,
                   state.PageSize,
                   state.StartIndex == 1,
                   cancellationToken);

            using (reader)
            {
                state.Count = count ?? state.Count;
                result = await reader.ReadToListAsync<UserSubscription>(cancellationToken);

                if (searchCriteria.LoadOption?.LoadUserData == true)
                {
                    var users = await reader.ReadToListAsync<User>(cancellationToken);

                    foreach(var uSubscr in result)
                    {
                        uSubscr.User = users.Single(u => u.CIN == uSubscr.UserCIN);
                    }
                }
            }

            return result;
        }

        protected override Task<IEnumerable<UserSubscription>> SearchInternalAsync(UserSubscriptionDataContext context, UserSubscriptionSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, searchCriteria.ExtractState(), searchCriteria, cancellationToken);
        }

        #endregion

        #region IUserSubscriptionRepository

        public Task DeleteUserSubscriptionsAsync(int? userCIN, List<string> userSubscriptionIDs, CancellationToken cancellationToken)
        {
            return DoOperationAsync((dbCtx, token) =>
            {
                return dbCtx.UserSubscriptionDeleteAsync(userCIN, userSubscriptionIDs?.Select(id => Convert.ToInt32(id)).ToArray(), token);
            }, cancellationToken);
        }

        #endregion
    }
}
