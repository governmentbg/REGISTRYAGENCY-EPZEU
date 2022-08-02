using Dapper;
using EPZEU.Utilities;
using EPZEU.Web.Protection;

namespace EPZEU.Web
{
    public static class EPZEUWebCoreStartupBootstrapper
    {
        public static void Run()
        {
            EPZEUWebCoreStartupRegistrator.Current.Register();
        }
    }

    internal class EPZEUWebCoreStartupRegistrator : StartupRegistrator<EPZEUWebCoreStartupRegistrator> 
    {
        protected override void RegisterInternal()
        {
            SqlMapper.SetTypeMap(typeof(DataProtectionKey), DataContextHelper.ColumnMap<DataProtectionKey>());
        }
    }
}
