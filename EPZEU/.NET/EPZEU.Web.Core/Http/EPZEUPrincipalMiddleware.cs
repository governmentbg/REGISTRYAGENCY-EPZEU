using EPZEU.Security;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Http
{
    public class EPZEUPrincipalMiddleware
    {
        private readonly RequestDelegate _next;

        public EPZEUPrincipalMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext context)
        {
            /*TODO да се преправи dbContext .... Set in current thread. Used in DbContext*/
            Thread.CurrentPrincipal = context.User is EPZEUPrincipal ?
                context.User :
                new EPZEUPrincipal(context.User, EPZEUPrincipal.AnonymousLocalUserID.ToString());

            return _next(context);
        }
    }
}