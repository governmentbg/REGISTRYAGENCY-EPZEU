using Dapper;
using EPZEU.Users.Migrations.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.Users.Migrations
{
    public static class UsersMigrationsStartupBootstrapper
    {
        public static void Run()
        {
            UsersMigrationsStartupRegistrator.Current.Register();
        }
    }

    public class UsersMigrationsStartupRegistrator : StartupRegistrator<UsersMigrationsStartupRegistrator>
    {
        protected override void RegisterInternal()
        {            
            SqlMapper.SetTypeMap(typeof(Account), DataContextHelper.ColumnMap<Account>());
            SqlMapper.SetTypeMap(typeof(AccountMigrationProcess), DataContextHelper.ColumnMap<AccountMigrationProcess>());
            SqlMapper.SetTypeMap(typeof(OSSApplication), DataContextHelper.ColumnMap<OSSApplication>());
        }
    }
}
