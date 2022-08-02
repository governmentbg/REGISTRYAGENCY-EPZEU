using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;

namespace EPZEU.Web.IdentityServer
{
    public partial class Program
    {
        static partial void Run(string[] args)
        {
            System.Data.Common.DbProviderFactories.RegisterFactory("Npgsql", typeof(Npgsql.NpgsqlFactory));

            /*Това се слага, за да може да се правят Http2 заявки без да има ssl връзка.
             Има предложение да се махне нуждата от ключа, но се за сега трябва да го има. 
             https://github.com/dotnet/corefx/issues/41621
             */
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            EPZEUIdsrvStartupBootstrapper.Run();

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
