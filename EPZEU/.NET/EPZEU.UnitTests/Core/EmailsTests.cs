using EPZEU.Emails;
using EPZEU.Emails.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace EPZEU.UnitTests.Core
{
    [TestClass]
    public class EmailTests
    {
        IEmailService _emailService;
        IEmailNotificationService _emailNotificationService;
        IEmailNotificationServiceClient _emailNotificationServiceClient;

        public EmailTests()
        {
            EPZEUStartupBootstrapper.Run();

            var services = new ServiceCollection();
            services.AddEPZEUServiceClients()
                .AddEPZEUHttpClients(null);


            var serviceCollection = new ServiceCollection();
            var serviceProvider = serviceCollection.AddEPZEUCommonServices().BuildServiceProvider();

            _emailService = serviceProvider.GetRequiredService<IEmailService>();
            _emailNotificationService = serviceProvider.GetRequiredService<IEmailNotificationService>();
            _emailNotificationServiceClient = serviceProvider.GetRequiredService<IEmailNotificationServiceClient>();
        }

        [TestMethod]
        public void TestCreateNotificationEmail()
        {
            EmailNotificationRequest request = new EmailNotificationRequest()
            {
                Priority = EmailPriority.Normal,
                SeparateMailPerRecipient = false,
                Transliterate = false,
                TemplateID = 1,
                Parameters = new System.Collections.Generic.Dictionary<string, string>(),
                Recipients = new EmailRecipient[] {
                    new EmailRecipient() { Address = "I.Gechev@cnsys.bg", DisplayName = "Ivaylo", Type = (short)AddressTypes.To },
                }
            };
            _emailNotificationService.CreateEmailNotificationAsync(request);

            Assert.IsTrue(true);
        }

        [TestMethod]
        public void TestCreateEmail()
        {
            EmailMessage email = new EmailMessage()
            {
                Body = "<html><body><p>Тяло на имейла</p></body></html>",
                Subject = "Заглавие на имейл",
                IsBodyHtml = true,
                Priority = EmailPriority.Normal,
                TryCount = 10,
                SendingProviderName = "public",
                Recipients = new EmailRecipient[] {
                    new EmailRecipient() { Address = "I.Gechev@cnsys.bg", DisplayName = "Ivaylo", Type = (short)AddressTypes.To },
                }
            };

            _emailService.CreateEmail(email);

            Assert.IsTrue(true);
        }

        [TestMethod]
        public void TestGetPendingEmails()
        {
            var emails = _emailService.GetPendingEmails(10);

            Assert.IsTrue(true);
        }

        [TestMethod]
        public void TestEmailSendAttempt()
        {
            var emails = _emailService.GetPendingEmails(1);
            if (emails != null && emails.Count > 1)
            {
                _emailService.EmailSendAttempt(emails[0].EmailID.Value, false);
            }

            Assert.IsTrue(true);
        }


        [TestMethod]
        public void TestEmailSending()
        {
            try
            {
                var interval = TimeSpan.Parse(ConfigurationManager.AppSettings["Emails:Interval"]);
                var maxPendingEmailsCount = Int32.Parse(ConfigurationManager.AppSettings["Emails:MaxPendingCount"]);

                //(new EmailSenderEngine(interval, maxPendingEmailsCount)).Start();

                Console.ReadLine();
            }
            catch (Exception ex)
            {
                Assert.IsTrue(true);
            }
        }


        [TestMethod]
        public void TestEmailCreateAndSending()
        {
            try
            {
                TestCreateEmail();
                var interval = TimeSpan.Parse(ConfigurationManager.AppSettings["Emails:Interval"]);
                var maxPendingEmailsCount = Int32.Parse(ConfigurationManager.AppSettings["Emails:MaxPendingCount"]);

                //(new EmailSenderEngine(interval, maxPendingEmailsCount)).Start();

                Console.ReadLine();
            }
            catch (Exception ex)
            {
                Assert.IsTrue(true);
            }
        }

        [TestMethod]
        public async Task TestAPICreateNotificationEmailHelper()
        {
            EmailNotificationResponse res = null;

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
                res = await _emailNotificationServiceClient.CreateEmailNotificationAsync(request);
            }
            catch (Exception ex)
            {
                Assert.IsTrue(false);
            }

            Assert.IsTrue(res?.EmailIDs != null && res?.EmailIDs.Count > 0);
        }
    }
}
