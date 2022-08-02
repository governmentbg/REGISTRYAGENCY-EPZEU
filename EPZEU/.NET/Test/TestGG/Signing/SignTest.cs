using EPZEU;
using EPZEU.Signing;
using EPZEU.Signing.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace TestGG.Signing
{
    public class SignTest
    {
        public static bool CreateSignProcess()
        {
            bool result = false;

            using (var sr = new StreamReader("D:\\Test_Sign_Document.xml"))
            {
                SigningRequest request = new SigningRequest()
                {
                    Content = sr.BaseStream,
                    Format = SigningFormats.XAdES,                  
                    SignerRequests = new List<SignerRequest>()
                    {
                        new SignerRequest()
                        {
                            Ident = "5109081583",
                            Name = "Иван",
                            Order = 1
                        },
                        new SignerRequest()
                        {
                            Ident = "5209259046",
                            Name = "Пешо",
                            Order = 2
                        }
                    }
                };

                //var signSrv = Factory.Default.GetSigningProcessesService();
                //var operationResult = signSrv.CreateSigningProcess(request);

                //result = operationResult.IsSuccessfullyCompleted;
                
                //if(result)
                //{
                //    Console.WriteLine(operationResult.Result.ToString());
                //}
            }

            return result;
        }

        public async static Task<bool> CreateSignProcessByClient()
        {
            bool result = false;

            var ms = new MemoryStream();
            using (var sr = new StreamReader("D:\\BissSignedDoc.xml"))
            {
                sr.BaseStream.CopyTo(ms);
            }

            ms.Position = 0;
            SigningRequest request = new SigningRequest()
            {
                Content = ms,
                Format = SigningFormats.XAdES,    
                ContentType = "application/xml",
                FileName = "document.xml",
                SignerRequests = new List<SignerRequest>()
                    {
                        new SignerRequest()
                        {
                            Ident = "5109081583",
                            Name = "Иван",
                            Order = 1
                        },
                        new SignerRequest()
                        {
                            Ident = "5209259046",
                            Name = "Пешо",
                            Order = 2
                        }
                    }
            };

            var httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost/EPZEU.Web.Api/");
            ISigningServiceClient signClient = new SigningServiceClient(httpClient);

            //Guid g = await signClient.CreateSigningProcessAsync(request);
            //var client = container.GetInstance<ISigningServiceClient>();
            //Guid g = await client.StartSigningProcessAsync(request);

            //if (g != null)
            //{
            //    result = true;
            //    Console.WriteLine(g);
            //}

            return result;
        }

        public async static void DeleteSignProcessTest(Guid processID)
        {
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost/EPZEU.Web.Api/");

            var result = await httpClient.DeleteAsync("SigningProcesses/cb60dd6b-8632-48ae-bfef-d60b2e6abdc7", System.Threading.CancellationToken.None);
            //var client = container.GetInstance<ISigningServiceClient>();

            //await client.DeleteSigningProcessAsync(processID);
        }
    }
}
