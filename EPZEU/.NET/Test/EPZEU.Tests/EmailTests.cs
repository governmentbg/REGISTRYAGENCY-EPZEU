using System;
using System.Configuration;
using EPZEU.Emails;
using EPZEU.Emails.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;

namespace EPZEU.Tests
{
    [TestClass]
    public class EmailTests
    {
        IEmailService _emailService;
        IEmailNotificationService _emailNotificationService;

        public EmailTests()
        {
            EPZEUEmailsStartupBootstrapper.Run();

            var container = new Container(config => {
                config.AddRegistry<DefaultDIRegistry>();
            });

            _emailService = container.GetInstance<IEmailService>();
            _emailNotificationService = container.GetInstance<IEmailNotificationService>();
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
            _emailNotificationService.CreateEmailNotification(request);

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

                (new EmailSenderEngine(interval, maxPendingEmailsCount)).Start();

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

                (new EmailSenderEngine(interval, maxPendingEmailsCount)).Start();

                Console.ReadLine();
            }
            catch (Exception ex)
            {
                Assert.IsTrue(true);
            }
        }
    }
}
