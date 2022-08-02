using EPZEU.Nomenclatures.Cache;
using EPZEU.Operations;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Tests
{
    [TestClass]
    public class IntegrationTests
    {
        IOperationServiceClient _operationServiceClient;

        public IntegrationTests()
        {            
            var container = new Container(config =>
            {
                config.AddRegistry<EPZEUHttpClientRegistry>();
                config.AddRegistry<EPZEUServiceClientsRegistry>();
            });

            _operationServiceClient = container.GetInstance<IOperationServiceClient>();
        }

        [TestMethod]
        public async Task Test_IISDA_Integration()
        {
            var s = EPZEU.Integration.IISDA.Factory.Default.GetIISDAServicesProcessor();

            await s.ReadAndProcessItemsFromIISDAAsync();

            Assert.IsTrue(true);
        }

        [TestMethod]
        public async Task Test_OperationServiceClient()
        {
            var operID = await _operationServiceClient.CreateAsync();

            Assert.IsTrue(true);
        }

    }
}
