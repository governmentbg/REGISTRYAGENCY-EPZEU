using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Web.DataProtection;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace EPZEU.CR.Web.App.Code
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class ReportPagedContextLimiterAttribute : ContextServiceLimiterAttribute
    {
        private static string[] _excludeKeysList = new string[] { "page", "pagesize", "count" };
        public ReportPagedContextLimiterAttribute()
        {
            ServiceCode = "CR_REPORT_LIMIT";
        }

        protected override ISet<KeyValuePair<string, string>> CreateContextValue(ResourceExecutingContext context)
        {
            HashSet<KeyValuePair<string, string>> ret = new HashSet<KeyValuePair<string, string>>();

            foreach (var item in context.HttpContext.Request.Query)
            {
                if (Array.IndexOf(_excludeKeysList, item.Key.ToLower()) < 0)
                    ret.Add(new KeyValuePair<string, string>(item.Key, item.Value));
            }

            return ret;
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class ReportUICContextLimiterAttribute : ContextServiceLimiterAttribute
    {
        public ReportUICContextLimiterAttribute()
        {
            ServiceCode = "CR_REPORT_LIMIT";
        }

        protected override ISet<KeyValuePair<string, string>> CreateContextValue(ResourceExecutingContext context)
        {
            HashSet<KeyValuePair<string, string>> ret = null;
            
            var routeData = context.HttpContext.GetRouteData();

            if (routeData.Values.TryGetValue("uic", out object routedUic))
            {
                var dataProtectionService = context.HttpContext.RequestServices.GetRequiredService<IDataProtectorService>();

                string companyName = null;

                string uicExtracted = dataProtectionService.ExtractUicWithCtx(routedUic.ToString(), ref companyName);

                ret = new HashSet<KeyValuePair<string, string>>(1);

                ret.Add(new KeyValuePair<string, string>("uic", uicExtracted));
            }

            return ret;
        }
    }
}
