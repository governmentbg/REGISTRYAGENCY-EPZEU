using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace EPZEU.Web.Mvc.Filters
{
    /// <summary>
    /// Exception filter с прихващане, логване на грешка, и връщане на съотвения StatusCode
    /// </summary>
    public class StatusCodeResultExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public StatusCodeResultExceptionFilterAttribute()
        {
        }

        public int StatusCode { get; set; }

        public override void OnException(ExceptionContext context)
        {
            base.OnException(context);

            var exception = context.Exception;

            var logger = (ILogger)context.HttpContext.RequestServices.GetService(typeof(ILogger<StatusCodeResultExceptionFilterAttribute>));

            if (logger != null)
                logger.LogException(exception);

            context.ExceptionHandled = true;
            context.Result = new ContentResult() { StatusCode = StatusCode };
        }
    }
}
