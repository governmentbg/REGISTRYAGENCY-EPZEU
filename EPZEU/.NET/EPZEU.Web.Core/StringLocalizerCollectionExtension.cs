using EPZEU.Web;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Localization;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class StringLocalizerCollectionExtension
    {
        public static IServiceCollection AddEPZEUWebStringLocalizer(this IServiceCollection services)
        {
            services.TryAddSingleton<IStringLocalizer, EPZEUWebStringLocalizer>();

            return services;
        }
    }
}
