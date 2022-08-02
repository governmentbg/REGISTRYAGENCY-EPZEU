using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace EPZEU.Web.Mvc.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class SkipValidateModelAttribute : ActionFilterAttribute
    {
    }
}
