using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using CNSys.Core.BL.Core;
using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StructureMap;

namespace EPZEU.Tests
{
    [TestClass]
    public class LogActionTests
    {
        IAuditService _auditService;
        IAuditServiceClient _auditServiceClient;

        public LogActionTests()
        {
            EPZEUStartupBootstrapper.Run();

            var container = new Container(config =>
            {
                config.AddRegistry<DefaultDIRegistry>();
                config.AddRegistry<EPZEUHttpClientRegistry>();
                config.AddRegistry<EPZEUServiceClientsRegistry>();
            });

            _auditService = container.GetInstance<IAuditService>();
            _auditServiceClient = container.GetInstance<IAuditServiceClient>();
        }

        [TestMethod]
        public void CreateLogAction()
        {
            var logAction = new LogAction()
            {
                ObjectType = ObjectTypes.EAUApplication,
                ActionType = ActionTypes.Preview,
                Module = Modules.EPZEU,
                Functionality = Functionalities.Audit,
                Key = "123123123",
                UserSessionID = Guid.NewGuid(),
                LoginSessionID = Guid.NewGuid(),
                UserID = 1,
                IpAddress = System.Net.IPAddress.Parse(IPAddress),
                AdditionalData = new JObject { ["Foo"] = 8 }
            };

            OperationResult<LogActionResponse> response = _auditService.CreateLogAction(logAction);

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
                    AdditionalData = JsonConvert.SerializeObject(new JObject { ["Foo"] = 8 })
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
