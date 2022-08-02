using IdentityModel.Client;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Net.Http
{
    public interface IHttpRequestAuthenticator
    {
        Task SetAuthenticationTokenAsync(HttpRequestMessage message, IndentityServiceTokenRequest options);
    }

    public class HttpRequestAuthenticator : IHttpRequestAuthenticator
    {
        private IIndentityServiceTokenRequestClient _identityServerClient;

        public HttpRequestAuthenticator(IIndentityServiceTokenRequestClient identityServerClient)
        {
            _identityServerClient = identityServerClient ?? throw new ArgumentNullException(nameof(identityServerClient));
        }

        public async Task SetAuthenticationTokenAsync(HttpRequestMessage message, IndentityServiceTokenRequest options)
        {
            var token = await _identityServerClient.RequestClientCredentialsTokenAsync(options, CancellationToken.None);
            message.SetBearerToken(token);
        }
    }
}
