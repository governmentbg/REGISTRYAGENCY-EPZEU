using EPZEU.Net.Http.Authentication;
using EPZEU.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Http
{
    internal class HttpContextEPZEUUserAccessor : IEPZEUUserAccessor, IClaimsPrincipalAccessor, IEPZEUUserImpersonation
    {
        private static AsyncLocal<EPZEUPrincipal> _impersonatedUser = new AsyncLocal<EPZEUPrincipal>();

        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpContextEPZEUUserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

         public EPZEUPrincipal User { get => _impersonatedUser.Value??(_httpContextAccessor?.HttpContext?.User as EPZEUPrincipal); }

        public Guid? UserSessionID => _httpContextAccessor?.HttpContext?.GetUserSessionID();

        public IPAddress RemoteIpAddress => _httpContextAccessor?.HttpContext?.Connection?.RemoteIpAddress;

        public ClaimsPrincipal ClaimsPrincipal => _httpContextAccessor?.HttpContext?.User;

        public Task<string> GetTokenAsync()
        {
            return _httpContextAccessor.HttpContext.GetTokenAsync("access_token");
        }

        public EPZEUUserImpersonationControl Impersonate(EPZEUPrincipal user)
        {
            var oldUser = _impersonatedUser.Value;

            _impersonatedUser.Value = user;

            return new EPZEUUserImpersonationControl(() =>
            {
                _impersonatedUser.Value = oldUser;
            });
        }
    }
}
