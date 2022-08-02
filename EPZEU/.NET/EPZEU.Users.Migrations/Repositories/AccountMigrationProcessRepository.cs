using CNSys.Data;
using EPZEU.Users.Migrations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EPZEU.Users.Migrations.Repositories
{
    /// <summary>
    /// интерфейс за поддържане и съхранение на обекти от тип AccountMigrationProcess.
    /// </summary>
    public interface IAccountMigrationProcessRepository :
        IRepository<AccountMigrationProcess, int?, AccountMigrationProcessSearchCriteria>,
        IRepositoryAsync<AccountMigrationProcess, int?, AccountMigrationProcessSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IAccountMigrationProcessRepository за поддържане и съхранение на обекти от тип AccountMigrationProcess.
    /// </summary>
    internal class AccountMigrationProcessRepository : RepositoryBase<AccountMigrationProcess, int?, AccountMigrationProcessSearchCriteria, MigrationDataContext>, IAccountMigrationProcessRepository
    {
        #region Constructors

        public AccountMigrationProcessRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override void CreateInternal(MigrationDataContext context, AccountMigrationProcess item)
        {
            int? migrationProcessID = null;

            context.AccountMigrationProcessCreate(
                                      item.UserCIN,
                                      (short?)item.Register,
                                      item.MigrantUsername,
                                      item.MigrantUserID,
                                      item.MigrantClientID,
                                      item.MigrantAmount,
                                      (short?)item.Status,
                                      item.MigrationData,
                                      ref migrationProcessID);

            item.MigrationProcessID = migrationProcessID;
        }

        protected override void UpdateInternal(MigrationDataContext context, AccountMigrationProcess item)
        {
            context.AccountMigrationProcessUpdate(
                                      item.MigrationProcessID,
                                      (short?)item.Status);
        }

        protected override void DeleteInternal(MigrationDataContext context, AccountMigrationProcess item)
        {
            throw new NotImplementedException();
        }

        protected override void DeleteInternal(MigrationDataContext context, int? key)
        {
            throw new NotImplementedException();
        }

        protected override AccountMigrationProcess ReadInternal(MigrationDataContext context, int? key)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<AccountMigrationProcess> SearchInternal(MigrationDataContext dataContext, PagedDataState state, AccountMigrationProcessSearchCriteria searchCriteria)
        {           
            List<AccountMigrationProcess> migrationProcesses = null;

            using (var res = dataContext.AccountMigrationProcessSearch(
                                                                  searchCriteria.MigrationProcessID,
                                                                  searchCriteria.UserCIN,
                                                                  searchCriteria.MigrantUsername,
                                                                  (short?)searchCriteria.Register))
            {
                migrationProcesses = res.Read<AccountMigrationProcess>().ToList();

                state.Count = migrationProcesses.Count;
            }

            return migrationProcesses;

        }

        protected override IEnumerable<AccountMigrationProcess> SearchInternal(MigrationDataContext dataContext, AccountMigrationProcessSearchCriteria searchCriteria)
        {
            return SearchInternal(dataContext, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        #endregion
    }
}
