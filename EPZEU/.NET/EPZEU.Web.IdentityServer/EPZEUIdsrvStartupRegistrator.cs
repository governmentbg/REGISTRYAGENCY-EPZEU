using EPZEU.Utilities;

namespace EPZEU.Web.IdentityServer
{
    public static class EPZEUIdsrvStartupBootstrapper
    {
        public static void Run()
        {
            EPZEUStartupBootstrapper.Run();

            EPZEUWebCoreStartupBootstrapper.Run();

            EPZEUIdsrvStartupRegistrator.Current.Register();
        }
    }
    public class EPZEUIdsrvStartupRegistrator : StartupRegistrator<EPZEUIdsrvStartupRegistrator>
    {
        protected override void RegisterInternal()
        {
            
        }
    }
}
