using AutoMapper;
using EPZEU.Common;
using EPZEU.Common.Cache;
using EPZEU.CR.Web.App.Code;
using EPZEU.CR.Web.App.Models.ApplicationProcesses.Mapping;
using EPZEU.CR.Web.App.Models.Applications.Mapping;
using EPZEU.CR.Web.App.Models.Deeds.Mapping;
using EPZEU.Security;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Utilities;
using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Text.Json;
using FluentValidation.AspNetCore;
using CNSys.Caching;
using EPZEU.Web.Models;

namespace EPZEU.CR.Web.App
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

            services.AddEPZEUDbContextProviderWithDefaultConnection(Configuration, EPZEUPrincipal.AnonymousLocalUserID);

            services.AddMemoryCache();
            services.AddEPZEUServiceClients();
            services.AddHttpContextEPZEUUserAccessor();
            services.AddEPZEUAppParametersRemote(Configuration);
            services.AddEPZEUCMSRemoteCachingServices();
            services.AddEPZEUNomenclaturesRemoteCachingServices();
            services.AddEPZEUHttpClients(Configuration);
            services.AddEPZEUUIHttpClients();
            services.AddEPZEUUIServiceClients();
            services.AddApplicationConverter();

            services.AddRemoteTRRULNCNomenclatures(EPZEUHttpClientNames.TRRULNCApi);
            services.AddTRRULNCServices(EPZEUHttpClientNames.TRRULNCApi);
            services.AddTRRULNCHttpClients(Configuration);
                
            services.AddEPZEUCRCommonServices();
            services.AddEPZEUCRWebServices();
            services.AddHttpContextAccessor();

            services.AddEPZEUDataProtection(Configuration.GetEPZEUSection().GetValue<string>("CR_ASPNETCORE_DP_KEY_CERT_THUMBPRINT"));

            services.AddSingleton<IFieldViewsNomenclaturesEnsurer, FieldViewsNomenclaturesEnsurer>();

            // Auto Mapper Configurations
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfile());
                mc.AddProfile(new ReportsAutoMapperProfile());
                mc.AddProfile(new ApplicationsAutoMapperProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);

            //Конфигурира максималния размер на мултипарт заявка (качване на файлове) на 5МB.
            services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = Configuration.GetEPZEUSection().GetValue<int>("GL_DOCUMENT_MAX_FILE_SIZE") * 1024;
            });

            services
                .AddSingleton<IActionContextAccessor, ActionContextAccessor>()
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
                    options.Filters.Add(new ValidateModelAttribute());
                    options.ValueProviderFactories.Insert(0, new LZQueryStringValueProviderFactory());
                })
                .AddFluentValidation()
                .AddJsonOptions(configure =>
                 {
                     configure.JsonSerializerOptions.Converters.Add(new SystemTextIsoTimeSpanConverter());
                     configure.JsonSerializerOptions.Converters.Add(new SystemTextAdditionalDataConverter());
                     configure.JsonSerializerOptions.Converters.Add(new EPZEUJsonEnumConverterFactory(JsonNamingPolicy.CamelCase));
                     configure.JsonSerializerOptions.IgnoreNullValues = true;
                     configure.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                     configure.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                 })
                .AddXmlSerializerFormatters(); //Сетва се за да може да се връща и Xml форматиран резултат в зависимост от Accept Header-a. 
                                               //Добавено е след AddNewtonsoftJson, за да се прихваща първо json форматера, ако не е задеден конкретен Accept Header.

            services.AddValidators();

            services
                .ConfigureEPZEUGlobalOptions(Configuration)
                .ConfigureEPZEUHttpClientOptions(Configuration)
                .ConfigureEPZEUHttpAuthenticationClientsOptions(Configuration)
                .ConfigureFileUploadProtectionOptions(Configuration);

            services.AddServiceLimiterService();

            services.AddEPZEUWebStringLocalizer();

            services.AddEPZEUAuthentication(Configuration);

            services.AddCachePollingBackgroundService((options) =>
            {
                options.PollingInterval = Configuration.GetEPZEUSection().GetValue<TimeSpan>("GL_POLLING_INTERVAL");
            });

            services.AddEPZEUCRHttpClients(Configuration);
            services.AddEPZEUCRServiceClients();

            services.AddPaymentsHttpClients(Configuration);
            services.AddPaymentServices();

            services.AddRebus(Configuration, HostingEnvironment);

            services.AddEPZEUSwaggerGen(Configuration, HostingEnvironment, "v1");

            #region Swagger PostConfigure

            services.PostConfigure<Swashbuckle.AspNetCore.SwaggerGen.SwaggerGenOptions>(config =>
            {
                config.CustomSchemaIds((type) =>
                {
                    if (type == typeof(EPZEU.CR.Web.App.Models.Deeds.Deed))
                        return "DeedVM";
                    else if (type == typeof(EPZEU.CR.Web.App.Models.Deeds.SubDeed))
                        return "SubDeedVM";
                    else if (type == typeof(EPZEU.CR.Web.App.Models.Deeds.CompanyInfo))
                        return "CompanyInfoVM";
                    else
                        return type.Name;
                });
            });

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAppParameters appParameters)
        {
            if (env.IsDevelopment() || env.IsDevelopmentLocal())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            /*Регистрира параметрите на ЕПЗЕУ за инвалидиране при промяна*/
            (Configuration as IConfigurationRoot).RegisterAppParametersSourceInEPZEUConfiguration(appParameters);

            app.UseStaticFiles();

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
                endpoints.MapFallbackToController("Index", "Home");
            });
        }
    }
}
