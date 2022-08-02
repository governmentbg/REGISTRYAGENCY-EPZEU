using EPZEU.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.IO;

namespace EPZEU.ServiceLimits.Server.Manager
{
    public partial class Program
    {
        static partial void Run(string[] args)
        {
            EPZEUStartupBootstrapper.Run();

            System.Data.Common.DbProviderFactories.RegisterFactory("Npgsql", typeof(Npgsql.NpgsqlFactory));

            var builder = Host.CreateDefaultBuilder(args);
            builder.ConfigureAppConfiguration((builder) =>
            {
                builder.AddEPZEUConfigurationRemote();
            }).UseSerilog()
            .ConfigureServices((context, services) =>
            {
                services.AddEPZEUUserServices();

                services.AddEPZEUDbContextProviderWithDefaultConnection(context.Configuration, EPZEUPrincipal.SystemLocalUserID);

                services.AddServerManager();

                services.AddNpgCacheInvalidationDispatcher((options, sp) =>
                {
                    options.ConnectionString = context.Configuration.GetEPZEUDBConnectionString().ConnectionString;
                });

                services.AddHostedService<ServiceLimitsManagerService>();
            }).RunConsoleAsync().Wait();
        }
    }
}
