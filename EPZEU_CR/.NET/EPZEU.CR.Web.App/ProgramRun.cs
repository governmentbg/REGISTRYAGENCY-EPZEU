using EPZEU.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;

namespace EPZEU.CR.Web.App
{
    public partial class Program
    {
        static partial void Run(string[] args)
        {
            System.Data.Common.DbProviderFactories.RegisterFactory("Npgsql", typeof(Npgsql.NpgsqlFactory));

            /*���� �� �����, �� �� ���� �� �� ������ Http2 ������ ��� �� ��� ssl ������.
             ��� ����������� �� �� ����� ������� �� �����, �� �� �� ���� ������ �� �� ���. 
             https://github.com/dotnet/corefx/issues/41621
             */
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            EPZEUCRStartupBootstrapper.Run();
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

                    builder.AddEPZEUConfigurationRemote();
                });
        }
    }
}
