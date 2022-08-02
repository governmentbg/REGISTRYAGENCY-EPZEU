using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Serilog;
using Serilog.Core;
using SingleEntryPoint.Test.Common;
using System.IO;
using Integration.EPZEU;
using System;

namespace SingleEntryPoint.Test
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            Logger = new LoggerConfiguration()
                    .ReadFrom.Configuration(Configuration, "Serilog")
                    .CreateLogger();
        }

        public IConfigurationRoot Configuration { get; private set; }
        public Logger Logger { get; private set; }

        public void ConfigureServices(IServiceCollection services)
        {
            //Конфигурация.
            services.AddSingleton<IConfiguration>(Configuration);

            //Конфигурация на Serilog.
            services.AddLogging(lb =>
            {
                lb.AddSerilog(Logger);
            });

            //Добавяме AuthenticationTokenHelper.
            services.AddTransient<AuthenticationTokenHelper>();

            services.AddTRRULNCServices("integration.epzeu.api");
            services.AddTRRULNCHttpClients(Configuration);

            services
               .ConfigureEPZEUGlobalOptions(Configuration)
               .ConfigureEPZEUHttpClientOptions(Configuration)
               .ConfigureEPZEUHttpAuthenticationClientsOptions(Configuration);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            services.AddMvc()
            .AddJsonOptions(a =>
            {
                a.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                a.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                a.SerializerSettings.Formatting = Formatting.Indented;
                a.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(a => a.Run(async context =>
                {
                    var feature = context.Features.Get<IExceptionHandlerPathFeature>();
                    var exception = feature.Error;

                    var result = JsonConvert.SerializeObject(new { error = exception.Message });
                    context.Response.ContentType = "application/json";
                    await context.Response.Body.WriteAsync(System.Text.Encoding.UTF8.GetBytes(result));
                }));
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "App_Data")),
                RequestPath = "/App_Data"
            });

            app.UseCors("AllowAllOrigins");

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}");
            });
        }
    }
}
