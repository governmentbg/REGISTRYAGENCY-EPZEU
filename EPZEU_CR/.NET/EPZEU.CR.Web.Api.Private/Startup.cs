using EPZEU.Common;
using EPZEU.Common.Cache;
using EPZEU.CR.Web.Api.Private.Code;
using EPZEU.Security;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Utilities;
using EPZEU.Web.Models;
using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Text.Json;

namespace EPZEU.CR.Web.Api.Private
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

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHostedService<ApplicationAsyncConfigurationService>();
            services.AddEPZEUDbContextProviderWithDefaultConnection(Configuration, EPZEUPrincipal.AnonymousLocalUserID);

            services.AddMemoryCache();
            services.AddEPZEUServiceClients();
            services.AddHttpContextEPZEUUserAccessor();
            services.AddEPZEUAppParametersRemote(Configuration);
            services.AddEPZEUCMSRemoteCachingServices();
            services.AddEPZEUNomenclaturesRemoteCachingServices();
            services.AddEPZEUHttpClients(Configuration);
            //services.AddEPZEUUIHttpClients();
            //services.AddEPZEUUIServiceClients();

            services.AddRemoteTRRULNCNomenclatures(EPZEUHttpClientNames.TRRULNCApi);
            services.AddTRRULNCServices(EPZEUHttpClientNames.TRRULNCApi);
            services.AddTRRULNCHttpClients(Configuration);

            ///*подменя инфраструктурата за полване към ТРРЮЛНЦ*/
            //services.AddSingleton<Integration.EPZEU.Caching.IPollingCacheInfrastructure, TRRULNCPollingInfrastructure>();

            services.AddEPZEUCRCommonServices();
            services.AddApplicationConverter();
            services.AddHttpContextAccessor();

            services.AddEPZEUDataProtection(Configuration.GetEPZEUSection().GetValue<string>("CR_ASPNETCORE_DP_KEY_CERT_THUMBPRINT"));

            services
                .AddMvc(options =>
                {
                    options.CacheProfiles.Add("Nomenclaturs", new CacheProfile() { Duration = 60 });
                    options.CacheProfiles.Add("NoCache", new CacheProfile() { Location = ResponseCacheLocation.None, NoStore = true });

                    options.Filters.Add(new RequireHttpsAttribute()); //TODO SSL е задължителен
                    options.Filters.Add(typeof(ApiExceptionFilterAttribute));
                    options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ApiError), Microsoft.AspNetCore.Http.StatusCodes.Status400BadRequest));
                    options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ApiError), Microsoft.AspNetCore.Http.StatusCodes.Status500InternalServerError));
                    options.Filters.Add(new ResponseCacheAttribute() { CacheProfileName = "NoCache" });
                    options.Filters.Add(new DefaultBaseDataServiceLimiterAttribute());
                })
               .AddJsonOptions(configure =>
               {
                   configure.JsonSerializerOptions.Converters.Add(new SystemTextIsoTimeSpanConverter());
                   configure.JsonSerializerOptions.Converters.Add(new SystemTextAdditionalDataConverter());
                   configure.JsonSerializerOptions.Converters.Add(new EPZEUJsonEnumConverterFactory(JsonNamingPolicy.CamelCase));
                   configure.JsonSerializerOptions.IgnoreNullValues = true;
                   configure.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                   configure.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
               });

            services
                .ConfigureEPZEUGlobalOptions(Configuration)
                .ConfigureEPZEUHttpClientOptions(Configuration)
                .ConfigureEPZEUHttpAuthenticationClientsOptions(Configuration);

            services.AddServiceLimiterService();

            services.AddEPZEUWebStringLocalizer();

            services.AddEPZEUAuthentication(Configuration);

            services.AddCachePollingBackgroundService((options) =>
            {
                options.PollingInterval = Configuration.GetEPZEUSection().GetValue<TimeSpan>("GL_POLLING_INTERVAL");
            });

            services.AddEPZEUCRHttpClients(Configuration);
            services.AddEPZEUCRServiceClients();

            services.AddRebus(Configuration, HostingEnvironment);

            services.AddEPZEUSwaggerGen(Configuration, HostingEnvironment, "v1");
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAppParameters appParameters)
        {
            /*Регистрира параметрите на ЕПЗЕУ за инвалидиране при промяна*/
            (Configuration as IConfigurationRoot).RegisterAppParametersSourceInEPZEUConfiguration(appParameters);

            app.UseRouting();

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
