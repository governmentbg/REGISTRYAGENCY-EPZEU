using Dapper;
using EPZEU.Utilities;
using EPZEU.CR.ApplicationProcesses.Models;
using NpgsqlTypes;
using Npgsql;
using EPZEU.CR.ApplicationUsers;

namespace EPZEU.CR
{
    public static class EPZEUCRStartupBootstrapper
    {
        public static void Run()
        {
            EPZEUCRStartupRegistrator.Current.Register();
        }
    }

    public class EPZEUCRStartupRegistrator : StartupRegistrator<EPZEUCRStartupRegistrator>
    {
        protected override void RegisterInternal()
        {
            NpgsqlConnection.GlobalTypeMapper.UseJsonNet();

            SqlMapper.AddTypeHandler(new NpgCustomParameterValueTypeHandler());

            SqlMapper.SetTypeMap(typeof(ApplicationType), DataContextHelper.ColumnMap<ApplicationType>());            

            SqlMapper.SetTypeMap(typeof(ApplicationProcess), DataContextHelper.ColumnMap<ApplicationProcess>());
            SqlMapper.SetTypeMap(typeof(ApplicationProcessContent), DataContextHelper.ColumnMap<ApplicationProcessContent>());
            SqlMapper.SetTypeMap(typeof(Application), DataContextHelper.ColumnMap<Application>());
            SqlMapper.SetTypeMap(typeof(ApplicationDocument), DataContextHelper.ColumnMap<ApplicationDocument>());
            SqlMapper.SetTypeMap(typeof(AppUser), DataContextHelper.ColumnMap<AppUser>());
        }
    }
}
