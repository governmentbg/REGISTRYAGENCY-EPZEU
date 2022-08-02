using EPZEU.Common;
using EPZEU.Nomenclatures;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.UnitTests.Core
{
    [TestClass]
    public class NomenclaturesTests
    {
        private INomenclaturesServiceClient _nomenclaturesServiceClient;
        private IAppParametersServiceClient _appParametersServiceClient;

        public NomenclaturesTests()
        {
            var services = new ServiceCollection();
            var provider = services
                .AddEPZEUServiceClients()
                .AddEPZEUHttpClients(null)
                .BuildServiceProvider();            

            var gg = provider.GetServices<INomenclaturesServiceClient>();

            _nomenclaturesServiceClient = provider.GetRequiredService<INomenclaturesServiceClient>();
            _appParametersServiceClient = provider.GetRequiredService<IAppParametersServiceClient>();
        }

        [TestMethod]
        public void TestCache()
        {
            Assert.IsTrue(true);
        }

        [TestMethod]
        public async Task TestClientCache()
        {
            var countries = await _nomenclaturesServiceClient.LoadCountriesAsync(null, CancellationToken.None);

            Assert.IsTrue(countries.Data.Count() > 0);
        }       
    }
}
