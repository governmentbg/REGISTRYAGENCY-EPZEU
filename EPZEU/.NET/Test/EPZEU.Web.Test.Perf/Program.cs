using CNSys.Data;
using Dapper;
using EPZEU.Audit;
using EPZEU.Common;
using EPZEU.Nomenclatures.Repositories;
using EPZEU.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Threading.Tasks;

namespace EPZEU.Web.Test.Perf
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Data.Common.DbProviderFactories.RegisterFactory("Npgsql", typeof(Npgsql.NpgsqlFactory));

            Host.CreateDefaultBuilder(args)
              .ConfigureAppConfiguration((hostingContext, config) =>
              {

                  config.SetBasePath(System.IO.Directory.GetCurrentDirectory())
                  .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                  .AddEnvironmentVariables();
              })
              .ConfigureLogging((hostingContext, logging) =>
              {
                  logging.AddConfiguration((IConfiguration)hostingContext.Configuration.GetSection("Logging"));
                  logging.AddConsole();
                  logging.AddDebug();
                  logging.AddEventSourceLogger();
              })
              //.GetEPZEUDBConnectionString()
              .ConfigureServices((hostContext, services) =>
              {
                  services
                    .AddMemoryCache()
                    .AddEPZEUDbContextProviderWithDefaultConnection(hostContext.Configuration)
                    .AddDbContextProviderWithDefaultConnection(hostContext.Configuration, (options, sp) =>
                    {
                        if (options.ConnectionStrings.Count == 0)
                        {
                            var connectionStringSettings = hostContext.Configuration.GetEPZEUDBConnectionString();

                            connectionStringSettings.Name = "default";

                            options.ConnectionStrings.Add("default", connectionStringSettings);

                            options.DefaultConnectionStringName = "default";
                        }

                        IEPZEUUserAccessor userAccessor = sp.GetService<IEPZEUUserAccessor>();
                        options.ConnectionInitializer = (context, token) =>
                        {
                            var userClientID = userAccessor?.User?.ClientID;

                            if (!string.IsNullOrEmpty(userClientID))
                            {
                                var parameters = new DynamicParameters();
                                parameters.Add("p_userid", !string.IsNullOrEmpty(userClientID) ? int.Parse(userClientID) : 1);

                                context.Connection.Execute(string.Format("{0}.\"{1}\"", "sys", "f_currentuser_set"), parameters, commandType: CommandType.StoredProcedure);
                            }

                            return Task.CompletedTask;
                        };
                    })
                    .AddDbContextOperationExecutor()
                    .AddEPZEUNomenclatures()
                    .ConfigureEPZEUGlobalOptions(hostContext.Configuration)
                    .ConfigureEPZEUHttpClientOptions(hostContext.Configuration)
                    .ConfigureEPZEUHttpAuthenticationClientsOptions(hostContext.Configuration)
                    .AddEPZEUHttpClients(hostContext.Configuration)
                    .AddTransientWithHttpClient<IAuditServiceClient, AuditServiceClient>(EPZEUHttpClientNames.EPZEUApi)
                    .AddHostedService<LoadTestService>();
              })
              .UseWindowsService()
              .Build().Run();
        }
    }
}
