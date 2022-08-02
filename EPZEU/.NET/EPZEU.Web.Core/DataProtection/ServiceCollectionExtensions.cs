using System;
using EPZEU.Web.DataProtection;
using EPZEU.Web.Protection;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DataProtectionServiceCollectionExtensions
    {
        /// <summary>
        /// Добавя DataProtection към списъка с услугите. Конфигурира го с съхранение на ключовете в базата данни.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="certificateThumbPrint">ThumbPrint на сертифкат.</param>
        /// <returns></returns>
        public static IDataProtectionBuilder AddEPZEUDataProtection(this IServiceCollection services, string certificateThumbPrint)
        {
            string thumbPrint = certificateThumbPrint.NormalizeThumbprint();

            var ret = services.AddDataProtection();

            if (!string.IsNullOrEmpty(thumbPrint))
                ret.ProtectKeysWithCertificate(thumbPrint);

            services.TryAddSingleton<IDataProtectionRepository, DataProtectionRepository>();

            services.AddOptions<KeyManagementOptions>().Configure<IServiceProvider>((options, sp) =>
            {
                options.XmlRepository = new DataProtectionKeysXmlRepository(sp.GetRequiredService<IDataProtectionRepository>());
            });

            services.TryAddSingleton(typeof(IDataProtectorService), typeof(GenericDataProtectorService));

            return ret;
        }
    }
}
