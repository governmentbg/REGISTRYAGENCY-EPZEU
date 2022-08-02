using EPZEU.Users.Migrations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace EPZEU.Web.Api.Private
{
    public partial class Program
    {
        static partial void Run(string[] args)
        {
            System.Data.Common.DbProviderFactories.RegisterFactory("Npgsql", typeof(Npgsql.NpgsqlFactory));
            System.Data.Common.DbProviderFactories.RegisterFactory("Oracle.ManagedDataAccess.Client", typeof(Oracle.ManagedDataAccess.Client.OracleClientFactory));

            EPZEUStartupBootstrapper.Run();
            UsersMigrationsStartupBootstrapper.Run();
            SigningModuleDapperBootstrapper.Run();
            EPZEUWebCoreStartupBootstrapper.Run();
            CreateWebHostBuilder(args).Build().Run();
        }
        public static IHostBuilder CreateWebHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .UseSerilog()
                .ConfigureAppConfiguration(builder =>
                {

                    builder.AddEPZEUConfigurationFromDb();
                });
        }
    }
}
