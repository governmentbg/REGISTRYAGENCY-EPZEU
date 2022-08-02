using EPZEU.Web.Api;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class MvcCoreMvcBuilderExtensions
    {
        /// <summary>
        /// Закача позволените контролери за публичното API.
        /// </summary>
        public static IMvcBuilder ConfigurePublicApiControllerFeatureProvider(this IMvcBuilder builder)
        {
            return builder
                .ConfigureApplicationPartManager(sa => sa.FeatureProviders.Add(new DefaultApiControllerFeatureProvider(DefaultApiControllerFeatureProvider.ControllerNamespaces.PublicOnlyNamespacePattern)));
        }

        /// <summary>
        /// Закача позволените контролери за private API.
        /// </summary>
        public static IMvcBuilder ConfigurePrivateApiControllerFeatureProvider(this IMvcBuilder builder)
        {
            return builder
                .ConfigureApplicationPartManager(sa => sa.FeatureProviders.Add(new DefaultApiControllerFeatureProvider(DefaultApiControllerFeatureProvider.ControllerNamespaces.PublicAndPrivateNamespacePattern)));
        }
    }
}
