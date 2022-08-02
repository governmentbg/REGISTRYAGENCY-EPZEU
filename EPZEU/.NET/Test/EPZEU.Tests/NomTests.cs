using EPZEU.AppParameters;
using EPZEU.Nomenclatures;
using EPZEU.Nomenclatures.Cache;
using Integration.EPZEU;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Tests
{
    [TestClass]
    public class NomTests
    {
        private INomenclaturesServiceClient _nomenclaturesServiceClient;
        private IAppParametersServiceClient _appParametersServiceClient;

        public NomTests()
        {
            var container = new Container(config =>
            {
                config.AddRegistry<EPZEUHttpClientRegistry>();
                config.AddRegistry<EPZEUServiceClientsRegistry>();
            });


            _nomenclaturesServiceClient = container.GetInstance<INomenclaturesServiceClient>();
            _appParametersServiceClient = container.GetInstance<IAppParametersServiceClient>();
        }

        [TestMethod]
        public void TestCache()
        {
            var countries = ApplicationTypeCachedCollection.Current.GetItem("en");

            Assert.IsTrue(true);
        }

        [TestMethod]
        public async Task TestClientCache()
        {
            var countries = await _nomenclaturesServiceClient.LoadCountriesAsync(null, CancellationToken.None);

            Assert.IsTrue(countries.Data.Count() > 0);
        }

        [TestMethod]
        public async Task TestAppParamsClientCache()
        {
            var appParams = await _appParametersServiceClient.LoadAppParametersAsync();

            Assert.IsTrue(appParams.Count() > 0);
        }

        [TestMethod]
        public async Task TestCRIntegration()
        {
            var countries = await ClientFactory.Default.GetNomenclatureServiceClient().GetCountriesAsync();
            var docTypes = await ClientFactory.Default.GetNomenclatureServiceClient().GetDocumentTypesAsync();
            var appDocTypes = await ClientFactory.Default.GetNomenclatureServiceClient().GetApplicationDocumentTypesAsync();

            Assert.IsNotNull(countries.Nomenclature);
            Assert.IsNotNull(docTypes.Nomenclature);
            Assert.IsNotNull(appDocTypes.Nomenclature);
        }
    }
}
