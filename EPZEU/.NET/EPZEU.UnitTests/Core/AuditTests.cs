using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.Common;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EPZEU.UnitTests.Core
{
    [TestClass]
    public class AuditTests
    {
        IAuditService _auditService;
        IAuditServiceClient _auditServiceClient;

        public AuditTests()
        {
            EPZEUStartupBootstrapper.Run();

            var services = new ServiceCollection();
            services.AddEPZEUServiceClients()
                .AddEPZEUHttpClients(null);

            var serviceCollection = new ServiceCollection();
            var serviceProvider = serviceCollection.AddEPZEUCommonServices().BuildServiceProvider();


            _auditService = serviceProvider.GetRequiredService<IAuditService>();
            _auditServiceClient = serviceProvider.GetRequiredService<IAuditServiceClient>();
        }

        [TestMethod]
        public void CreateLogAction()
        {
            var logAction = new LogActionRequest()
            {
                ObjectType = ObjectTypes.EAUApplication,
                ActionType = ActionTypes.Preview,
                Module = Modules.EPZEU,
                Functionality = Functionalities.Audit,
                Key = "123123123",
                UserSessionID = Guid.NewGuid(),
                LoginSessionID = Guid.NewGuid(),
                UserID = 1,
                IpAddress = IPAddress,
                AdditionalData = new JObject { ["Foo"] = 8 },
                OperationID = Guid.NewGuid().ToString()
            };

            CNSys.OperationResult<LogActionResponse> response = _auditService.CreateLogAction(logAction);

            Assert.IsNotNull(response.Result?.LogActionID);
        }

        [TestMethod]
        public async Task TestAPILogActionHelper()
        {
            LogActionResponse res = null;
            try
            {
                var request = new LogActionRequest()
                {
                    ObjectType = ObjectTypes.UserProfile,
                    ActionType = ActionTypes.Login,
                    Module = Modules.EPZEU,
                    Functionality = Functionalities.Users,
                    Key = "cnsys\\vachev",
                    UserSessionID = Guid.NewGuid(),
                    LoginSessionID = Guid.NewGuid(),
                    UserID = 1,
                    IpAddress = IPAddress,
                    AdditionalData = new JObject { ["Foo"] = 8 },
                    OperationID = Guid.NewGuid().ToString()
                };
                res = await _auditServiceClient.CreateLogActionAsync(request);
            }
            catch (Exception ex)
            {
                Assert.IsTrue(false);
            }

            Assert.IsTrue(res?.LogActionID != null);
        }

        private string IPAddress
        {
            get
            {
                string localIPaddr;
                using (Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0))
                {
                    socket.Connect("8.8.8.8", 65530);
                    IPEndPoint endPoint = socket.LocalEndPoint as IPEndPoint;
                    localIPaddr = endPoint.Address.ToString();
                }

                return localIPaddr;
            }
        }
    }
}
