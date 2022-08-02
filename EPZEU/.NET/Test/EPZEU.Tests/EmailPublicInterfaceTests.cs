using System;
using System.Threading.Tasks;
using EPZEU.Emails;
using EPZEU.Emails.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;

namespace EPZEU.Tests
{
    [TestClass]
    public class EmailPublicInterfaceTests
    {
        private IEmailNotificationServiceClient _emailNotificationServiceClient;

        public EmailPublicInterfaceTests()
        {
            EPZEUEmailsStartupBootstrapper.Run();

            var container = new Container(config =>
            {
                config.AddRegistry<EPZEUHttpClientRegistry>();
                config.AddRegistry<EPZEUServiceClientsRegistry>();
            });

            _emailNotificationServiceClient = container.GetInstance<IEmailNotificationServiceClient>();
        }

        [TestMethod]
        public async Task TestAPICreateNotificationEmailHelper()
        {
            var request = new EmailNotificationRequest()
            {
                Priority = EmailPriority.Normal,
                SeparateMailPerRecipient = false,
                Transliterate = false,
                TemplateID = 1,
                Parameters = new System.Collections.Generic.Dictionary<string, string>() {
                { "paramName", "Ivaylo" } },
                Recipients = new EmailRecipient[] {
                    new EmailRecipient() { Address = "I.Gechev@cnsys.bg", DisplayName = "Ivaylo", Type = (short)AddressTypes.To },
                }
            };
            try
            {
                var res = await _emailNotificationServiceClient.CreateEmailNotificationAsync(request);

                Console.ReadLine();
            }
            catch (Exception ex)
            {
                Assert.IsTrue(false);
            }

            Assert.IsTrue(true);
        }
    }
}
