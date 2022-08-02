using System;

namespace EPZEU.ServiceLimits.AspNetCore.Mvc
{
    /// <summary>
    /// Прилага базовия лимит за лимитиране.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class DefaultBaseDataServiceLimiterAttribute : ServiceLimiterAttribute
    {
        public DefaultBaseDataServiceLimiterAttribute()
        {
            ServiceCode = null;
        }
    }
}
