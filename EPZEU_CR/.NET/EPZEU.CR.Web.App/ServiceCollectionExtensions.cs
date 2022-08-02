
using EPZEU.CR.ApplicationProcesses.MessageHandlers;
using EPZEU.CR.Web.App.Code;
using EPZEU.CR.Web.App.FieldViews;
using EPZEU.CR.Web.App.FieldViews.Common;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
using Rebus.Config;
using Rebus.Routing.TypeBased;
using Rebus.ServiceProvider;
using Microsoft.Extensions.Hosting;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRebus(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            var epzeuConfiguration = configuration.GetEPZEUSection();

            services.AutoRegisterHandlersFromAssemblyOf<ApplicationSendMessageHandler>();

            services.AddHostedService<RebusHostingService>();

            string queueName = epzeuConfiguration.GetValue<string>("CR_PORTAL_QUEUE_NAME");

            bool disableLocalQueues = epzeuConfiguration.GetValue<bool>("GL_EPZEU_QUEUES_DISABLE_LOCAL");

            //създаваме схема САМО в режим на разработка !
            bool initAQSchema = false;
            bool forceBlobStore = false;
            string tableName = "";

            #region Development environment

            if (hostingEnvironment.IsDevelopmentLocal() && !disableLocalQueues)
            {
                var hostName = System.Net.Dns.GetHostName();

                forceBlobStore = true;
                initAQSchema = true;
                tableName = $"T{ hostName.Substring(hostName.Length - 2, 2)}_{queueName}";

                queueName = $"Q{ hostName.Substring(hostName.Length - 2, 2)}_{queueName}";
            }

            #endregion

            return services.AddRebus((rconfig, sp) => rconfig
                   .Options(options =>
                   {
                       options.UseOracleAQRetryStrategy();
                   })
                   .Logging((lconfig) =>
                   {
                       lconfig.MicrosoftExtensionsLogging(sp.GetRequiredService<ILoggerFactory>());
                   })
                   .Transport(t => t.UseOracleAQ(epzeuConfiguration.GetValue<string>("GL_EPZEU_QUEUES_CONN_STRING_DOTNET"),
                        new OracleAQTransportOptions() { InitAQSchema = initAQSchema, TableName = tableName, ForceBlobStore = forceBlobStore, InputQueueName = queueName }))
                   .Routing(r => r.TypeBased()
                                       .Map<ApplicationSendMessage>(queueName)));
        }

        public static IServiceCollection AddEPZEUCRWebServices(
            this IServiceCollection services)
        {
            services.TryAddSingleton<IFieldViewFactory, FieldViewFactory>();
            services.TryAddSingleton<IFieldViewHelper, FieldViewHelper>();           
            services.TryAddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>();

            services.TryAddSingleton(serviceProvider =>
            {
                var provider = serviceProvider.GetRequiredService<ObjectPoolProvider>();

                var policy = new StringBuilderPooledObjectPolicy() { InitialCapacity = 2 * 1024, MaximumRetainedCapacity = 8 * 1024 };

                return provider.Create(policy);
            });

            return services;
        }
    }
}