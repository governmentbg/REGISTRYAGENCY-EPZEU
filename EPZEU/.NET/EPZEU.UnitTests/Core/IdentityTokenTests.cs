using IdentityModel.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace EPZEU.UnitTests.Core
{
    [TestClass]
    public class IdentityTokenTests
    {
        private DiscoveryResponse Disco;

        public IdentityTokenTests()
        {            
            using (var httpClientHandler = new HttpClientHandler())
            {
                httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

                using (var httpClient = new HttpClient(httpClientHandler))
                {
                    //http://ws-soft53.domain/epzeu.web.identityserver
                    //https://localhost/epzeu.web.identityserver

                    var request = new DiscoveryDocumentRequest()
                    {
                        Address = "https://vm-av-epzeu-ap1.dev.local:10443/Idsrv/.well-known/openid-configuration",
                        Policy = new DiscoveryPolicy()
                        {
                            ValidateIssuerName = false
                        }
                    };

                    Disco = httpClient.GetDiscoveryDocumentAsync(request).GetAwaiter().GetResult();
                }
            }
        }

        [TestMethod]
        public async Task Test_IssueCustomGrantType()
        {
            using (var httpClientHandler = new HttpClientHandler())
            {
                httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

                using (var httpClient = new HttpClient(httpClientHandler))
                {
                    httpClient.BaseAddress = new System.Uri("https://login.dev.epzeu.dev.local/connect/token");

                    var tokenRequest = new IdentityModel.Client.TokenRequest
                    {
                        GrantType = "ra_legacy",
                        ClientId = "integration.epzeu.api.client",
                        ClientSecret = "",
                        Parameters = new Dictionary<string, string> {
                            { "scope", "payments.api" },
                            { "subject", @"ra_agency\ivanov" }
                        }
                    };

                    var res = await httpClient.RequestTokenAsync(tokenRequest);

                    Assert.IsTrue(!res.IsError);
                }
            }
        }

        [TestMethod]
        public async Task Test_IssueCustomGrantType2()
        {
            using (var httpClientHandler = new HttpClientHandler())
            {
                string clientId = null;     // TODO Set
                string clientSecret = null; // TODO Set

                httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

                using (var httpClient = new HttpClient(httpClientHandler))
                {
                    httpClient.BaseAddress = new System.Uri("https://login.dev.epzeu.dev.local/connect/token");

                    var request = new HttpRequestMessage();
                    request.Method = HttpMethod.Post;
                    request.Content =  new FormUrlEncodedContent(new Dictionary<string, string> {
                                            { "grant_type", "ra_legacy" },
                                            { "scope", "payments.api" },
                                            { "subject", @"ra_agency\ivanov" }
                                        });

                    request.SetBasicAuthentication(clientId, clientSecret);

                    var res = await httpClient.SendAsync(request);
                    var content = await res.Content.ReadAsStringAsync().ConfigureAwait(false);

                    // PARSE content 
                }
            }
        }

        [TestMethod]
        public async Task Test_IssueResourceOnwerToken()
        {
            string userAccessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM0MzhkZjNiZjk5NGRhMzFmMzlkYTU1MDkxOTI4M2U0IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NTczMDI4MDUsImV4cCI6MTU1NzMxNzIwNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QvZXB6ZXUud2ViLmlkZW50aXR5c2VydmVyIiwiYXVkIjpbImh0dHBzOi8vbG9jYWxob3N0L2VwemV1LndlYi5pZGVudGl0eXNlcnZlci9yZXNvdXJjZXMiLCJwYXltZW50cy5hcGkiXSwiY2xpZW50X2lkIjoicGF5bWVudHMuYXBpLmNsaWVudCIsInN1YiI6IjExMTkiLCJhdXRoX3RpbWUiOjE1NTczMDI4MDQsImlkcCI6ImxvY2FsIiwiY2luIjoiMTExOSIsIm5hbWUiOiLQmtC-0L3RgdGC0LDQvdGC0LjQvdC-0YEgINCf0LDQv9Cw0LTQvtC_0L7Qu9GD0YEiLCJnaXZlbl9uYW1lIjoi0JrQvtC90YHRgtCw0L3RgtC40L3QvtGBIiwiZmFtaWx5X25hbWUiOiLQn9Cw0L_QsNC00L7Qv9C-0LvRg9GBIiwicm9sZSI6IlBSX0FQUF9VVlRfUFJPUEVSVFlfRlJFRSIsImxvZ2luX3Nlc3Npb25faWQiOiIwMWRjMDIzYy1jMWViLTRlMzItYTc3Zi0wOGJkNjg4ZWM4NDIiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwicGF5bWVudHMuYXBpIl0sImFtciI6WyJwd2QiXX0.sCZHMrYZJoU4NWKGw4seWDM1m07vVzgpIFb5tbedOoe-nHlWqphQcXZUHHKduEeCzQYqKEOb9UIC3OypPwiG7TTtpamOJPkEgDMRkrqgCkUig3IF3251Dfa1--CXLzzqwTHTkAvQxtW_gFDMQBzO35-Ay8jwTxZ3YzJydhwr5EyjPTZLhCfHmfnz9pDOAbrSUdPaMDAg8xEoklUn3UEGLJzpOcJV8Ng7P9IY00jtTotgNz6ztQvyLb2w-C79mHtCXnynlxO7LERc3lj9n90Cd-sxE5SmzmASst9IA3OCIx3jDVMwNG9AHdvNkQ8xksIj4HfylJ3koD8bBcgRnGtU2A";

            using (var httpClientHandler = new HttpClientHandler())
            {
                httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

                using (var httpClient = new HttpClient(httpClientHandler))
                {
                    httpClient.BaseAddress = new System.Uri(Disco.TokenEndpoint);

                    var tokenRequest = new TokenRequest
                    {
                        GrantType = "delegation",
                        //ClientId = "reau.api.client",
                        //ClientSecret = "reau.api.client.secret",
                        ClientId = "epzeu.pr.api.client",
                        ClientSecret = "epzeu.pr.api.client.secret",
                        Parameters = new Dictionary<string, string> {
                            { "scope", "payments.api" },
                            { "token", userAccessToken }
                        }
                    };

                    var res = await httpClient.RequestTokenAsync(tokenRequest);

                    //var res1 = await httpClient.IntrospectTokenAsync(new TokenIntrospectionRequest()
                    //{                
                    //    Token = res.AccessToken,
                    //    ClientId = "epzeu.cr.api.client",
                    //    ClientSecret = "epzeu.cr.api.client.secret",
                    //    Parameters = new Dictionary<string, string> {
                    //                //{ "scope", "payments.api" },
                    //                { "grant_type", "delegation" }
                    //            }
                    //});

                    //var res = await httpClient.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest()
                    //{
                    //    ClientId = "reau.api.client",
                    //    ClientSecret = "reau.api.client.secret",
                    //    Scope = "payments.api"
                    //});

                    Assert.IsTrue(!res.IsError);
                }
            }
        }

        [TestMethod]
        public async Task Test_IssueReferenceToken()
        {
            var httpClient = new HttpClient();
            httpClient.BaseAddress = new System.Uri(Disco.TokenEndpoint);

            var res = await httpClient.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest()
            {
                ClientId = "reau.api.client",
                ClientSecret = "reau.api.client.secret",
                Scope = "payments.api"
            });

            var res1 = await httpClient.IntrospectTokenAsync(new TokenIntrospectionRequest()
            {
                Token = res.AccessToken,
                ClientId = "reau.api.client",
                ClientSecret = "reau.api.client.secret",
                Parameters = new Dictionary<string, string> {
                            { "grant_type", IdentityModel.OidcConstants.GrantTypes.ClientCredentials }
                        }
            });

            Assert.IsTrue(!res.IsError);
        }
    }
}
