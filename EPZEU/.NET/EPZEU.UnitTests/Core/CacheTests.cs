using System;
using System.Threading.Tasks;
using EPZEU.Common;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EPZEU.UnitTests.Core
{
    [TestClass]
    public class CacheTests
    {
        UserAccessTokenCache userAccessTokenCache;

        public CacheTests()
        { 

            var serviceCollection = new ServiceCollection();
            var provider = serviceCollection
                .AddMemoryCache()
                .AddEPZEUServiceClients()
                .AddEPZEUHttpClients(null)
                .AddSingleton<UserAccessTokenCache>()
                .BuildServiceProvider();            

            userAccessTokenCache = provider.GetRequiredService<UserAccessTokenCache>();
        }

        [TestMethod]
        public async Task TestCache()
        {
            var token1 = await userAccessTokenCache.GetValueAsync("100", "epzeu.api");
            var token2 = await userAccessTokenCache.GetValueAsync("100", "epzeu.api");

            Assert.AreEqual(token1, token2);

            await Task.Delay(20000); // 20sek

            var token3 = await userAccessTokenCache.GetValueAsync("100", "epzeu.api");

            Assert.IsTrue(true);
        }
    }

    public class UserAccessTokenCache
    {
        private IMemoryCache Cache { get; set; }

        public UserAccessTokenCache(IMemoryCache memoryCache)
        {
            Cache = memoryCache;
        }

        public Task<string> GetValueAsync(string userID, string apiScope)
        {

            return Cache.GetOrCreateAsync(userID, async (entry) =>
            {
                entry.SetSize(5);

                //entry.AbsoluteExpiration = DateTime.Now.AddSeconds(expiresInSeconds);
                return $"{userID}.{apiScope}";

            });
        }
    }

    //public class UserAccessTokenCache
    //{
    //    private HttpClient IdentityHttpClient { get; set; }
    //    private IOptionsMonitor<EPZEUApiClientOptions> OptionsProvider { get; set; }
    //    private IMemoryCache Cache { get; set; }

    //    public UserAccessTokenCache(HttpClient httpClient, IMemoryCache memoryCache, IOptionsMonitor<EPZEUApiClientOptions> optionsProvider)
    //    {
    //        IdentityHttpClient = httpClient;
    //        OptionsProvider = optionsProvider;
    //        Cache = memoryCache;
    //    }

    //    #region Public Methods

    //    public Task<string> GetValueAsync(string userID, string apiScope)
    //    {
    //        return Cache.GetOrCreateAsync(userID, async (entry) =>
    //        {
    //            var (expiresInSeconds, accessToken) = await GenerateValueAsync(userID, apiScope);

    //            entry.AbsoluteExpiration = DateTime.Now.AddSeconds(expiresInSeconds);
    //            return accessToken;

    //        });
    //    }

    //    #endregion

    //    private async Task<ValueTuple<int, string>> GenerateValueAsync(string userID, string apiScope)
    //    {
    //        //string userAccessToken = Security.EPZEUPrincipal.CurrentPrincipal()?.AccessToken;

    //        string userAccessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU5MWExZjhjMmIyOTQzNTNjMWIyYWIwZTE1Mzk4ZDIzIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1Mzg3Mjc2NzksImV4cCI6MTUzODc0MjA3OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QvZXB6ZXUud2ViLmlkZW50aXR5c2VydmVyIiwiYXVkIjpbImh0dHBzOi8vbG9jYWxob3N0L2VwemV1LndlYi5pZGVudGl0eXNlcnZlci9yZXNvdXJjZXMiLCJlcHpldS5jci5hcGkiXSwiY2xpZW50X2lkIjoiZXB6ZXUuY3IuYXBpLmNsaWVudCIsInN1YiI6IjEwNjE4IiwiYXV0aF90aW1lIjoxNTM4NzI3Njc4LCJpZHAiOiJsb2NhbCIsImNpbiI6IjExMTkiLCJuYW1lIjoidi5hY2hldkBjbnN5cy5iZyIsImxvZ2luX3Nlc3Npb25faWQiOiJjZWM3N2I1Zi1mOTJhLTQ4NWItYTcxMC1lN2IwNjY0MDg0NjQiLCJ1c2VyX3Nlc3Npb25faWQiOiJiYzllNjAzYzNhYTk0MjA0ODQ0YTdlYTZjMWUxNjZjZSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlcHpldS5jci5hcGkiXSwiYW1yIjpbInB3ZCJdfQ.GEHsTXQn1KLu31aA_8DANA57UJ3ooQ1XfxYSNxiYfMKanzRJ6QTegpPWQ_qefMlEVC6sWWJ1liwvcWbb-sFSAAc4hCfQVTJW3g09S8NgD2O0Bb8kwNgSVLDdeRiKh4QOAItkKQrbc67PVmJQ3XWUTqGPzOxH5wCl--lppDVVBbY50SnkUPYrYRDx1_L3bAICsZItjPzcrsBOZlOURXiKH_2YFxg3qkb7yUmXU9Nf-V23_9N7l0JIXe5VyXVFWroTSfdeZYKKdSM7TPnka_OFbJqiXMIAfHN3-yiPnSCHEIEl2LFCqE0B_IoSe6GOqrMVdFhKShYUrAA0o31l0Alzdg";

    //        var options = OptionsProvider.Get(apiScope);

    //        var tokenRequest = new TokenRequest
    //        {
    //            GrantType = "delegation",
    //            ClientId = options.ClientID,
    //            ClientSecret = options.ClientSecret,
    //            Parameters = new Dictionary<string, string> {
    //                        { "scope", apiScope },
    //                        { "token", userAccessToken }
    //                    }
    //        };

    //        var tokenResponse = await IdentityHttpClient.RequestTokenAsync(tokenRequest);
    //        return (tokenResponse.ExpiresIn, tokenResponse.AccessToken);
    //    }
    //}
}
