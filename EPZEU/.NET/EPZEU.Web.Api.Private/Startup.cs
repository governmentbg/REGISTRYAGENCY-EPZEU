using EPZEU.Common;
using EPZEU.Common.Cache;
using EPZEU.Security;
using EPZEU.Users.Migrations.Common;
using EPZEU.Utilities;
using EPZEU.Web.Api.Code;
using EPZEU.Web.Models;
using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Text.Json;

namespace EPZEU.Web.Api.Private
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment HostingEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHostedService<ApplicationAsyncConfigurationService>();

            services.AddEPZEUDbContextProviderWithDefaultAndOSSConnection(Configuration, EPZEUPrincipal.AnonymousLocalUserID, OSSDBUsers.SystemLocalUserID);

            services.AddMemoryCache();

            services.AddSignModuleHttpClient();
            services.AddBSecureDsslServiceClient();
            services.AddBTrustRemoteServiceClient();
            services.AddEvrotrustRemoteServiceClient();
            services.AddSigningModuleServices(Configuration);
            services.AddEPZEUCommonServices();
            services.AddHttpContextAccessor();
            services.AddHttpContextEPZEUUserAccessor();

            services.AddEPZEUAppParametersDb();
            services.AddEPZEUNomenclatures();
            services.AddEPZEUNomenclaturesDBCaching();

            services.AddEPZEUCMS();
            services.AddEPZEUCMSDBCaching();

            services.AddRemoteTRRULNCNomenclatures(EPZEUHttpClientNames.TRRULNCApi);

            services.AddPRRegisterHttpClients(Configuration);

            services.AddTRRULNCHttpClients(Configuration);
          
            // PropertyRegister integration
            services.AddPropertyRegisterNomenclatures(Configuration, Configuration.GetEPZEUSection().GetValue<string>("PR_WEB_API"));

            services.AddPaymentsHttpClients(Configuration);
            services.AddPaymentServices();
            services.AddUserMigrationServices();

            if (HostingEnvironment.IsDevelopment() || HostingEnvironment.IsDevelopmentLocal())
            {
                services.AddCors();
            }

            services
                .ConfigureEPZEUGlobalOptions(Configuration)
                .ConfigureEPZEUHttpClientOptions(Configuration)
                .ConfigureEPZEUHttpAuthenticationClientsOptions(Configuration);

            services.AddMvc(options =>
            {
                options.CacheProfiles.Add("Nomenclaturs", new CacheProfile() { Duration = 60 });
                options.CacheProfiles.Add("NoCache", new CacheProfile() { Location = ResponseCacheLocation.None, NoStore = true });

                options.Filters.Add(typeof(ApiExceptionFilterAttribute));
                options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ApiError), Microsoft.AspNetCore.Http.StatusCodes.Status400BadRequest));
                options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ApiError), Microsoft.AspNetCore.Http.StatusCodes.Status500InternalServerError));
                options.Filters.Add(new ResponseCacheAttribute() { CacheProfileName = "NoCache" });
            })
            .AddJsonOptions(configure =>
            {
                configure.JsonSerializerOptions.Converters.Add(new SystemTextIsoTimeSpanConverter());
                configure.JsonSerializerOptions.Converters.Add(new EPZEUJsonEnumConverterFactory(JsonNamingPolicy.CamelCase));
                configure.JsonSerializerOptions.IgnoreNullValues = true;
                configure.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                configure.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
            })
            .ConfigurePrivateApiControllerFeatureProvider();

            services.AddEPZEUAuthentication(Configuration);

            services.AddEPZEUWebStringLocalizer();

            services.AddCachePollingBackgroundService((options) =>
            {
                options.PollingInterval = Configuration.GetEPZEUSection().GetValue<TimeSpan>("GL_POLLING_INTERVAL");
            });
            services.AddNpgCacheInvalidationDispatcher((options, sp) =>
            {
                options.ConnectionString = Configuration.GetEPZEUDBConnectionString().ConnectionString;
            });

            services.AddRebus(Configuration, HostingEnvironment);

            services.AddEPZEUPRHttpClients(Configuration);
            services.AddEPZEUCRHttpClients(Configuration);
            //TODO:Add client name
            services.AddEPZEUCRServiceClients();
            services.AddSingleton(typeof(UnicodeFontProvider), (provider) => provider.GetService<UnicodeFontProvider>());
            services.AddLoginSessionsServices(Configuration);

            services.AddEPZEUSwaggerGen(Configuration, HostingEnvironment, "v1");
            services.ConfigureEPZEUApiSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptions<GlobalOptions> globalOptions, IAppParameters appParameters)
        {
            if (env.IsDevelopment() || env.IsDevelopmentLocal())
            {
                app.UseDeveloperExceptionPage();
            }

            /*Регистрира параметрите на ЕПЗЕУ за инвалидиране при промяна*/
            (Configuration as IConfigurationRoot).RegisterAppParametersSourceInEPZEUConfiguration(appParameters);

            if (env.IsDevelopment() || env.IsDevelopmentLocal())
            {
                /*Добавяме CORS само за целите на разработката*/
                app.UseCors(builder =>
                {
                    builder.AllowAnyOrigin();
                });
            }

            app.UseRouting();

            //Локализира сайта.
            app.UseEPZEURequestLocalization();

            app.UseAuthenticationWithEPZEUPrincipal();

            app.UseSerilogUserIdentityContext();

            app.UseEndpoints(endpoints =>
            {
                // Add a new endpoint that uses the SwaggerMiddleware
                endpoints.MapEPZEUSwagger();

                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}

