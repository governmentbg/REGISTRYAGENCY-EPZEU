using EPZEU.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace EPZEU.Emails.Service
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
                    services.ConfigureEPZEUEmailOptions(context.Configuration);
                    services.AddEPZEUDbContextProviderWithDefaultConnection(context.Configuration, EPZEUPrincipal.SystemLocalUserID);
                    services.AddEPZEUEmailBaseServices();
                    services.AddEmailProcessingServices();
                    //services.AddIdempotentOperationExecutor();
                })
                .UseWindowsService()
                .Build().Run();
        }
    }
}
