using System;

namespace EPZEU.ServiceLimits.AspNetCore.Mvc
{
    /// <summary>
    /// Атрибута указва да не се прилага лимит на предоставяната услуга.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class NoopServiceLimiterAttribute : Attribute, IServiceLimiterFilter

    {
    }
}
