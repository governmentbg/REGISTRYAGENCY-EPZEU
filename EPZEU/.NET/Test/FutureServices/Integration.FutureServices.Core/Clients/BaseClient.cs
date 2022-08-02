using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Net;

namespace Integration.FutureServices.Core.Clients
{
    internal class BaseClient
    {
        protected readonly string _baseUrl;

        public BaseClient()
        {
            _baseUrl = ConfigurationManager.AppSettings["FutureServicesURL"];
        }


        public WebResponse Get(Uri uri)
        {
            WebRequest client = WebRequest.Create(uri);
            client.Method = "GET";

            try
            {
                return client.GetResponse();
            }
            catch (WebException e)
            {
                return e.Response;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public T DeserializeDataFromResponse<T>(WebResponse response) 
        {
            using (Stream dataStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(dataStream))
            {
                // Read the content.  
                string responseFromServer = reader.ReadToEnd();

                return JsonConvert.DeserializeObject<T>(responseFromServer);
            }
        }
    }
}
