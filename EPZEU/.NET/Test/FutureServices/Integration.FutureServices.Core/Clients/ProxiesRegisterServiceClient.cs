using Integration.FutureServices.Core.Models;
using System;
using System.IO;
using System.Net;

namespace Integration.FutureServices.Core.Clients
{
    public interface IProxiesRegisterServiceClient
    {
        OperationResult<ProxiesRegisterResponse> CheckProxyDocument(ProxiesRegisterRequest request);

        Stream DownloadProxyDocument(string proxyDocumentGuid);
    }

    internal class ProxiesRegisterServiceClient : BaseClient, IProxiesRegisterServiceClient
    {
        public OperationResult<ProxiesRegisterResponse> CheckProxyDocument(ProxiesRegisterRequest request)
        {
            OperationResult<ProxiesRegisterResponse> result = null;
            string query = $"?DocumentKind={(request.DocumentKind.HasValue ? ((int)request.DocumentKind.Value).ToString() : "")}&DocumentNumber={request.DocumentNumber}";
            Uri uri = new Uri(string.Format("{0}ProxiesRegister{1}", _baseUrl, query));

            using (WebResponse response = Get(uri))
            {
                HttpStatusCode code = ((HttpWebResponse)response).StatusCode;

                if (code == HttpStatusCode.OK)
                {
                    ProxiesRegisterResponse civilRegistrationResponse = DeserializeDataFromResponse<ProxiesRegisterResponse>(response);
                    result = new OperationResult<ProxiesRegisterResponse>(civilRegistrationResponse);
                }
                else
                {
                    Error error = DeserializeDataFromResponse<Error>(response);
                    result = new OperationResult<ProxiesRegisterResponse>(error.Code, error.Message);
                }
            }

            return result;
        }

        public Stream DownloadProxyDocument(string proxyDocumentGuid)
        {
            Uri uri = new Uri(string.Format("{0}ProxiesRegister/Documents/{1}", _baseUrl, proxyDocumentGuid.ToString()));

            using (WebResponse response = Get(uri))
            {
                return response.GetResponseStream();
            }
        }
    }
}
