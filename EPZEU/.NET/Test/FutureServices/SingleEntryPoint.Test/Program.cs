using Integration.EPZEU;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;

namespace SingleEntryPoint.Test
{
    class Program
    {
        private static IServiceProvider serviceProvider = null;
        private static string serverUrl = string.Format("http://{0}:8000/", System.Net.Dns.GetHostEntry("").HostName);

        static void Main(string[] args)
        {
            using (var host = BuildWebHost(args))
            {
                serviceProvider = host.Services;

                AcceptApplicationsResult acceptApplicationsResult = Accept(serviceProvider);
                if (acceptApplicationsResult.IsApplicationAccept.GetValueOrDefault())
                {
                    //Стартира сървъра.
                    host.Start();

                    Console.WriteLine("Use Ctrl-C to shutdown the host...");
                    host.WaitForShutdown();
                }
                else
                {
                    Console.WriteLine(acceptApplicationsResult.ErrorMessage);
                }
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
          new WebHostBuilder()
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseKestrel()
          .UseIIS()
          .UseStartup<Startup>()
          .UseUrls(serverUrl)
          .Build();

        #region Tests

        private static AcceptApplicationsResult Accept(IServiceProvider serviceProvider)
        {
            IApplicationServiceClient applicationServiceClient = (IApplicationServiceClient)serviceProvider.GetService(typeof(IApplicationServiceClient));
            List<(string ApplicationKey, Stream ApplicationContent)> appRequests = new List<(string ApplicationKey, Stream ApplicationContent)>();
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "App_Data", "G2.xml");


            using (StreamReader sr = new StreamReader(filePath))
            using (MemoryStream ms = new MemoryStream())
            {
                sr.BaseStream.CopyTo(ms);
                ms.Position = 0;

                appRequests.Add((Guid.NewGuid().ToString(), ms));

                string callBackUrl = string.Format("{0}{1}", serverUrl, "Notification/post");
                var acceptAppResultTask = applicationServiceClient.AcceptApplicationsAsync(appRequests, appRequests[0].ApplicationKey, 1, callBackUrl);
                    
                var acceptAppResult = acceptAppResultTask.GetAwaiter().GetResult();

                return acceptAppResult;
            }
        }

        #endregion
    }
}
