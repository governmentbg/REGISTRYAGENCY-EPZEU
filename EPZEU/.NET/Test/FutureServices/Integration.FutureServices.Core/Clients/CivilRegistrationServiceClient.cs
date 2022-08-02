using Integration.FutureServices.Core.Models;
using System;
using System.Net;

namespace Integration.FutureServices.Core.Clients
{
    public interface ICivilRegistrationServiceClient
    {
        OperationResult<CivilRegistrationResponse> CheckCivilRegistration(CivilRegistrationRequest request);
    }

    internal class CivilRegistrationServiceClient : BaseClient, ICivilRegistrationServiceClient
    {
        public OperationResult<CivilRegistrationResponse> CheckCivilRegistration(CivilRegistrationRequest request)
        {
            OperationResult<CivilRegistrationResponse> result = null;
            string query = $"?IdentType={(request.IdentType.HasValue ? ((int)request.IdentType.Value).ToString() : "")}&Ident={request.Ident}";
            Uri uri = new Uri(string.Format("{0}CivilRegistration{1}", _baseUrl, query));

            using (WebResponse response = Get(uri))
            {
                HttpStatusCode code = ((HttpWebResponse)response).StatusCode;

                if (code == HttpStatusCode.OK)
                {
                    CivilRegistrationResponse civilRegistrationResponse = DeserializeDataFromResponse<CivilRegistrationResponse>(response);
                    result = new OperationResult<CivilRegistrationResponse>(civilRegistrationResponse);
                }
                else
                {
                    Error error = DeserializeDataFromResponse<Error>(response);
                    result = new OperationResult<CivilRegistrationResponse>(error.Code, error.Message);
                }
            }

            return result;
        }
    }
}
