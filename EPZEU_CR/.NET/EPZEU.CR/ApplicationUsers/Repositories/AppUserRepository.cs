using CNSys.Data;
using EPZEU.CR.ApplicationProcesses.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationUsers.Repositotories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип AppUser.
    /// </summary>
    public interface IAppUserRepository : IRepositoryAsync<AppUser, int?, AppUserSearchCriteria>
    {
        /// <summary>
        /// Актуализира данни за потребител.
        /// </summary>
        /// <param name="user">потребител</param>
        /// <param name="cancellationToken"></param>
        Task EnsureAppUserAsync(AppUser user, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Критерии за търсене на съдържание на потребител.
    /// </summary>
    public class AppUserSearchCriteria : EpzeuCRSearchCriteriaBase
    {
        /// <summary>
        /// Уникален идентификатор на локалната връзка на потребителския профил.
        /// </summary>       
        public int? UserID { get; set; }

        /// <summary>
        /// КИН на потребителския профил.
        /// </summary>     
        public int? CIN { get; set; }
    }

    /// <summary>
    /// Реализация на интерфейс IAppUserEntity за поддържане и съхранение на обекти от тип AppUser.
    /// </summary>
    internal class AppUserRepository : RepositoryBase<AppUser, int?, AppUserSearchCriteria, AppUserDataContext>, IAppUserRepository
    {
        #region Constructors

        public AppUserRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        public Task EnsureAppUserAsync(AppUser user, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (ctx, token) => { 
                int? userId = await ctx.AppUserEnsureAsync(user.CIN, user.DisplayName, user.IsSystem, token);
                user.UserID = userId.Value;
            }, cancellationToken);
        }

        protected async override Task<IEnumerable<AppUser>> SearchInternalAsync(AppUserDataContext context, PagedDataState state, AppUserSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var res = await context.AppUserSearchAsync(
                    searchCriteria.UserID,
                    searchCriteria.CIN,
                    state.StartIndex,
                    state.PageSize,
                    state.StartIndex == 1,
                    searchCriteria.MaxNumberOfRecords,
                    cancellationToken);

            List<AppUser> contents = null;

            using (res.reader)
            {
                state.Count = res.count ?? state.Count;
                contents = res.reader.ReadToList<AppUser>();
            }

            return contents;
        }

        protected override Task<IEnumerable<AppUser>> SearchInternalAsync(AppUserDataContext context, AppUserSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }
    }

}
