using IdentityServer4.Endpoints.Results;
using IdentityServer4.Extensions;
using IdentityServer4.Hosting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace EPZEU.Web.IdentityServer.Common
{
    /// <summary>
    /// Имплементация на IEndpointHandler за обработка на RegisterAuthentication към Identity Server.
    /// </summary>
    public class RegisterAuthenticationEndpoint : IEndpointHandler
    {
        private readonly ILogger Logger;
        private readonly IAuthenticationSchemeProvider SchemeProvider;

        public RegisterAuthenticationEndpoint(ILogger<RegisterAuthenticationEndpoint> logger, IAuthenticationSchemeProvider schemeProvider)
        {
            Logger = logger;
            SchemeProvider = schemeProvider;
        }

        public async Task<IEndpointResult> ProcessAsync(HttpContext context)
        {
            if (!HttpMethods.IsGet(context.Request.Method))
            {
                Logger.LogWarning($"Invalid HTTP method for {nameof(RegisterAuthenticationEndpoint)} endpoint.");
                return new StatusCodeResult(HttpStatusCode.MethodNotAllowed);
            }

            var values = context.Request.Query.AsNameValueCollection();
            string returnUrl = values["returnUrl"];
            string scheme = values["scheme"];

            if (string.IsNullOrEmpty(scheme) || string.IsNullOrEmpty(returnUrl))
            {
                Logger.LogWarning($"Trying to request {nameof(RegisterAuthenticationEndpoint)} endpoint with invalid params.");
                return new StatusCodeResult(HttpStatusCode.BadRequest);
            }

            if (context.EPZEUUser() == null)
            {
                Logger.LogWarning($"Trying to request {nameof(RegisterAuthenticationEndpoint)} endpoint with anonymous user.");
                return new StatusCodeResult(HttpStatusCode.BadRequest);
            }

            var providers = await SchemeProvider.GetAllSchemesAsync();
            var provider = providers.SingleOrDefault(p => p.Name.Equals(scheme, StringComparison.OrdinalIgnoreCase));

            if (provider == null)
            {
                var userdisplay = context.User.GetDisplayName();

                Logger.LogWarning($"User {userdisplay} tried to add authentication for scheme {scheme}.");
                return new StatusCodeResult(HttpStatusCode.BadRequest);
            }

            var props = new AuthenticationProperties
            {
                Items = {
                        { "returnUrl", returnUrl },
                        { "scheme", provider.Name },
                        { "addauthentication", bool.TrueString }
                    }
            };

            await context.ChallengeAsync(provider.Name, props);

            return new EmptyEndpointResult();
        }
    }

    public class EmptyEndpointResult : IEndpointResult
    {
        public Task ExecuteAsync(HttpContext context)
        {
            return Task.CompletedTask;
        }
    }
}
