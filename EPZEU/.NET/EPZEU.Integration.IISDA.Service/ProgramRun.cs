using EPZEU.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace EPZEU.Integration.IISDA.Service
{
    public partial class Program
    {
        static partial void Run(string[] args)
        {
            System.Data.Common.DbProviderFactories.RegisterFactory("Npgsql", typeof(Npgsql.NpgsqlFactory));

            EPZEUStartupBootstrapper.Run();

            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(builder => builder.AddEPZEUConfigurationRemote())
                .UseSerilog()
                .ConfigureServices((context, services) =>
                {
                    services.ConfigureEPZEUGlobalOptions(context.Configuration);
                    services.ConfigureIISDAOptions(context.Configuration);
                    services.AddEPZEUDbContextProviderWithDefaultConnection(context.Configuration, EPZEUPrincipal.SystemLocalUserID);
                    services.AddEPZEUNomenclatures();
                    services.AddEPZEUNomenclaturesDBCaching();
                    services.AddIISDAProcessingServices();
                    services.AddNpgCacheInvalidationDispatcher((options, sp) =>
                    {
                        options.ConnectionString = context.Configuration.GetEPZEUDBConnectionString().ConnectionString;
                    });

                })
                .UseWindowsService()
                .Build().Run();
        }
    }
}
