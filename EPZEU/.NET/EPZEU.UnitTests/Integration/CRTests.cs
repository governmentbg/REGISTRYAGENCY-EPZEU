using System;
using System.Threading;
using System.Threading.Tasks;
///using Integration.EPZEU;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EPZEU.UnitTests.Integration
{
    [TestClass]
    public class CRTests
    {
        [TestMethod]
        public async Task TestCR_ServiceClients()
        {
            //var countries = await ClientFactory.Default.GetNomenclatureServiceClient().GetCountriesAsync(null, CancellationToken.None);
            //var docTypes = await ClientFactory.Default.GetNomenclatureServiceClient().GetDocumentTypesAsync(null, CancellationToken.None);
            //var appDocTypes = await ClientFactory.Default.GetNomenclatureServiceClient().GetApplicationDocumentTypesAsync(null, CancellationToken.None);

            //Assert.IsNotNull(countries.Data);
            //Assert.IsNotNull(docTypes.Data);
            //Assert.IsNotNull(appDocTypes.Data);
        }
    }
}
