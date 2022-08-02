using Integration.FutureServices.Core.Models;
using System;
using System.Net;

namespace Integration.FutureServices.Core.Clients
{
    public interface IAddressRegisterServiceClient
    {
        OperationResult<AddressRegisterResponse> CheckIsAddressExist(AddressRegisterRequest request);
    }

    internal class AddressRegisterServiceClient : BaseClient, IAddressRegisterServiceClient
    {
        public OperationResult<AddressRegisterResponse> CheckIsAddressExist(AddressRegisterRequest request)
        {
            OperationResult<AddressRegisterResponse> result = null;
            string query = $"?DistrictEkatte={request.DistrictEkatte}&MunicipalityEkatte={request.MunicipalityEkatte}&SettlementEKATTE={request.SettlementEKATTE}&AreaEkatte={request.AreaEkatte}&HousingEstate={request.HousingEstate}&Street={request.Street}&StreetNumber={request.StreetNumber}&Block={request.Block}&Entrance={request.Entrance}&Floor={request.Floor}&Apartment={request.Apartment}";
            Uri uri = new Uri(string.Format("{0}AddressRegister{1}", _baseUrl, query));

            using (WebResponse response = Get(uri))
            {
                HttpStatusCode code = ((HttpWebResponse)response).StatusCode;

                if (code == HttpStatusCode.OK)
                {
                    AddressRegisterResponse addressResponse = DeserializeDataFromResponse<AddressRegisterResponse>(response);
                    result = new OperationResult<AddressRegisterResponse>(addressResponse);
                }
                else
                {
                    Error error = DeserializeDataFromResponse<Error>(response);
                    result = new OperationResult<AddressRegisterResponse>(error.Code, error.Message);
                }
            }

            return result;
        }
    }
}
