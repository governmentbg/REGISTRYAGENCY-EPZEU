using IdentityModel.Client;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace SingleEntryPoint.Test.Common
{
    internal class AuthenticationTokenHelper
    {
        private readonly string _identityTokenApi;
        private readonly AuthenticationConfiguration _authenticationConfiguration;

        public AuthenticationTokenHelper(IConfiguration configuration)
        {
            _identityTokenApi = configuration.GetSection("IdentityTokenApi").Value;

            _authenticationConfiguration = new AuthenticationConfiguration();
            configuration.Bind("Authentication", _authenticationConfiguration);
        }

        public async Task<string> GetAuthenticationToken()
        {
            string token;
            using (var httpClientHandler = GetHttpClientHandler())
            {
                using (var httpClient = new HttpClient(httpClientHandler))
                {
                    httpClient.BaseAddress = new System.Uri(_identityTokenApi);

                    var res = await httpClient.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest()
                    {
                        ClientId = _authenticationConfiguration.ClientId,
                        ClientSecret = _authenticationConfiguration.ClientSecret,
                        Scope = _authenticationConfiguration.Scope
                    });
                    token = res.AccessToken;
                }
            }
            return token;
        }

        private HttpClientHandler GetHttpClientHandler()
        {
            var httpClientHandler = new HttpClientHandler();
            httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

            return httpClientHandler;
        }

        public HttpClient CreateRegisterApiClient(string authToken, string basUrl)
        {
            var httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(basUrl);
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", authToken);

            return httpClient;
        }
    }
}
