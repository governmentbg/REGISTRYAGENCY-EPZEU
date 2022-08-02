using EPZEU.Common;
using EPZEU.Signing;
using EPZEU.Signing.Configuration;
using EPZEU.Signing.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionSigningModuleExtension
    {
        public static IServiceCollection AddSigningModuleServices(this IServiceCollection services, IConfiguration config)
        {
            services.ConfigureEPZEU<SignModuleGlobalOptions>(config);
            services.TryAddSingleton<IActionDispatcher, DefaultActionDispatcher>();
            services.TryAddSingleton<ISigningProcessesRepository, SigningProcessesRepository>();
            services.TryAddSingleton<ISignersRepository, SignersRepository>();
            services.TryAddScoped<IDocumentSigningtUtilityService, DocumentSigningUtilityService>();
            services.TryAddScoped<ISigningProcessesService, SigningProcessesService>();

            services.TryAddScoped<ITestSignService, TestSignService>();
            services.TryAddScoped<IBTrustProcessorService, BTrustProcessorService>();
            services.TryAddScoped<IEvrotrustProcessorService, EvrotrustProcessorService>();

            return services;
        }
    }
}
