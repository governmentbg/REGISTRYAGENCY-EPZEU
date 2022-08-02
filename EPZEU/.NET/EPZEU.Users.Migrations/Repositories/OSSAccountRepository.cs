using CNSys.Data;
using EPZEU.Users.Migrations.Common;
using EPZEU.Users.Migrations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EPZEU.Users.Migrations.Repositories
{
    /// <summary>
    /// интерфейс за поддържане и съхранение на обекти от тип Account в базата на OSS.
    /// </summary>
    public interface IOSSAccountRepository :
       IRepository<Account, int?, AccountSearchCriteria>,
       IRepositoryAsync<Account, int?, AccountSearchCriteria>
    {
        List<OSSApplication> GetApplicationsForMigration(int ossUserID, int count);

        void ComplateApplicationsMigration(List<long> serviceInstanceIDs, int epzeuUserCIN, string epzeuUserDisplayName);
    }

    /// <summary>
    /// Реализация на интерфейс IOSSAccountRepository за поддържане и съхранение на обекти от тип Account в базата на OSS.
    /// </summary>
    internal class OSSAccountRepository: RepositoryBase<Account, int?, AccountSearchCriteria, OSSDataContext>, IOSSAccountRepository
    {
        #region Constructors

        public OSSAccountRepository(IOSSDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override void CreateInternal(OSSDataContext context, Account item)
        {
            throw new NotImplementedException();
        }

        protected override void UpdateInternal(OSSDataContext context, Account item)
        {
            throw new NotImplementedException();
        }

        protected override void DeleteInternal(OSSDataContext context, Account item)
        {
            throw new NotImplementedException();
        }

        protected override void DeleteInternal(OSSDataContext context, int? key)
        {
            throw new NotImplementedException();
        }

        protected override Account ReadInternal(OSSDataContext context, int? key)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<Account> SearchInternal(OSSDataContext dataContext, PagedDataState state, AccountSearchCriteria searchCriteria)
        {
            List<Account> accounts = null;
            

            using (var res = dataContext.AccountSearch(                                                                  
                                                                  searchCriteria.Username,
                                                                  searchCriteria.Password))
            {                
                accounts = res.Read<Account>().ToList();                
                state.Count = accounts.Count;
            }
            
            return accounts;

        }

        protected override IEnumerable<Account> SearchInternal(OSSDataContext dataContext, AccountSearchCriteria searchCriteria)
        {
            return SearchInternal(dataContext, PagedDataState.CreateMaxPagedDataState(), searchCriteria);
        }

        #endregion

        #region IOSSAccountRepository

        public List<OSSApplication> GetApplicationsForMigration(int ossUserID, int count)
        {
            List<OSSApplication> applications = null;

            DoOperation((dataContext) =>
            {
                using (var res = dataContext.GetApplicationsForMigration(ossUserID, count))
                {
                    applications = res.Read<OSSApplication>().ToList();
                }
            });

            return applications;
        }

        public void ComplateApplicationsMigration(List<long> serviceInstanceIDs, int epzeuUserCIN, string epzeuUserDisplayName)
        {
            DoOperation((dataContext) =>
            {
                var serviceInstanceIDsString = string.Join(",", serviceInstanceIDs);

                dataContext.ComplateApplicationsMigration(serviceInstanceIDsString, epzeuUserCIN, epzeuUserDisplayName);
            });
        }

        #endregion
    }
}
