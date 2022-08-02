using CNSys.Security;
using EPZEU.Integration.IISDA;
using EPZEU.Security;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.UnitTests.Integration
{
    [TestClass]
    public class IISDATests
    {
        private readonly ServiceProvider Provider;

        public IISDATests()
        {
            var services = new ServiceCollection();

            var options = Options.Create(new IntegrationIISDAOptions()
            {
                EP_INTGR_IISDA_ADM_SERVICES_API = "https://vm-iisda-app1.dev.local:19001/AdmServices.IntegrationServices/AdmServicesService.svc",
                EP_INTGR_IISDA_ADM_SERVICES_INTERVAL = new System.TimeSpan(0, 30, 0),
                EP_INTGR_IISDA_RA_BATCH_NUMBER = "933"
            });

            Provider = services
                .AddEPZEUNomenclatures()
                .AddEPZEUNomenclaturesDBCaching()
                .AddIISDAProcessingServices()
                .AddSingleton(options)
                .AddMemoryCache()
                .AddNpgCacheInvalidationDispatcher((о, sp) =>
                {
                    //TODO atanas трябва да се промени
                    о.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["defaultRWConnectionString"].ConnectionString;
                })
                .BuildServiceProvider();

            EPZEUStartupBootstrapper.Run();
        }

        [TestMethod]
        public async Task Test_IISDA_Integration()
        {
            using (var mti = new ManagedThreadImpersonation(new GenericDataSourceUser(EPZEUPrincipal.SystemLocalUserID.ToString(), Thread.CurrentPrincipal)))
            {
                var s = Provider.GetRequiredService<IIISDAServicesProcessor>();

                await s.ReadAndProcessItemsFromIISDAAsync(CancellationToken.None);

                Assert.IsTrue(true);
            }
        }
    }
}
