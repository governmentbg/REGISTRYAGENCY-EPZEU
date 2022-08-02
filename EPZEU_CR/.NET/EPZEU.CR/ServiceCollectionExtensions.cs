using CNSys.Data;
using Dapper;
using EPZEU.CR.ApplicationFormProviders;
using EPZEU.CR.ApplicationFormValidators;
using EPZEU.CR.ApplicationProcesses;
using EPZEU.CR.ApplicationProcesses.Repositories;
using EPZEU.CR.Applications;
using EPZEU.CR.ApplicationUsers.Repositotories;
using EPZEU.CR.Common;
using EPZEU.CR.Common.Repositories;
using EPZEU.CR.Reports;
using EPZEU.CR.Security;
using EPZEU.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Data;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddEPZEUDbContextProviderWithDefaultConnection(this IServiceCollection services, IConfiguration configuration, int? defaultUserID = null)
        {
            services.AddDbContextProviderWithDefaultConnection(configuration, (options, sp) =>
            {
                if (options.ConnectionStrings.Count == 0)
                {
                    Npgsql.NpgsqlConnectionStringBuilder stringBuilder = new Npgsql.NpgsqlConnectionStringBuilder(configuration.GetEPZEUSection().GetValue<string>("CR_DB_CONNECTION_STRING"));
                    stringBuilder.ApplicationName = System.Reflection.Assembly.GetEntryAssembly().GetName().Name;

                    options.ConnectionStrings.Add("default", new ConnectionStringSettings("default", stringBuilder.ToString(), "Npgsql"));
                    options.DefaultConnectionStringName = "default";
                }

                IEPZEUUserAccessor userAccessor = sp.GetService<IEPZEUUserAccessor>();
                options.ConnectionInitializer = (context, token) =>
                {
                    var userClientID = userAccessor?.User?.ClientID;

                    if (!string.IsNullOrEmpty(userClientID) || defaultUserID.HasValue)
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("p_userid", !string.IsNullOrEmpty(userClientID) ? int.Parse(userClientID) : defaultUserID.Value);

                        context.Connection.Execute(string.Format("{0}.\"{1}\"", "sys", "f_currentuser_set"), parameters, commandType: CommandType.StoredProcedure);
                    }

                    return Task.CompletedTask;
                };
            });
            services.AddDbContextOperationExecutor();
            return services;
        }

        public static IServiceCollection AddEPZEUCRCommonServices(this IServiceCollection services)
        {
            services.TryAddSingleton(typeof(IApplicationDocumentRepository), typeof(ApplicationDocumentRepository));
            services.TryAddSingleton(typeof(IApplicationRepository), typeof(ApplicationRepository));
            services.TryAddSingleton(typeof(IApplicationProcessContentRepository), typeof(ApplicationProcessContentRepository));
            services.TryAddSingleton(typeof(IApplicationProcessRepository), typeof(ApplicationProcessEntity));
            services.TryAddScoped(typeof(IApplicationProcessService), typeof(ApplicationProcessService));

            services.TryAddScoped(typeof(IApplicationFormProviderFactory), typeof(ApplicationFormProviderFactory));
            services.TryAddScoped(typeof(IApplicationValidatorFactory), typeof(ApplicationValidatorFactory));

            services.TryAddScoped(typeof(IDeedReportService), typeof(DeedReportService));
            services.TryAddSingleton(typeof(IApplicationDocumentRepository), typeof(ApplicationDocumentRepository));
            services.TryAddSingleton(typeof(IDataSourceUserMapper), typeof(EPZEUCRDataSourceUserMapper));
            services.TryAddSingleton(typeof(IAppUserRepository), typeof(AppUserRepository));
            services.TryAddScoped(typeof(IApplicationService), typeof(ApplicationService));
            services.TryAddSingleton(typeof(IServiceOperationRepository), typeof(ServiceOperationRepository));
            services.TryAddSingleton(typeof(IActionDispatcher), typeof(DefaultActionDispatcher));
            services.TryAddScoped(typeof(IStatisticReportService), typeof(StatisticReportService)); 

            services.AddIdempotentOperationExecutor();

            return services;
        }
    }
}
