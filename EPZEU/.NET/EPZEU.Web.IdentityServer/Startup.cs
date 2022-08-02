using CNSys.Data;
using EPZEU.Applications.Repositories;
using EPZEU.Common.Cache;
using EPZEU.Common.Repositories;
using EPZEU.Security;
using EPZEU.Users;
using EPZEU.Web.IdentityServer.Common;
using EPZEU.Web.IdentityServer.Extensions;
using EPZEU.Web.IdentityServer.Security;
using IdentityServer4;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Primitives;
using System;

namespace EPZEU.Web.IdentityServer
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            HostingEnvironment = env;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }
        public IWebHostEnvironment HostingEnvironment { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEPZEUDbContextProviderWithDefaultConnection(Configuration, EPZEUPrincipal.AnonymousLocalUserID);

            services.AddMvc();

            services.Configure<IISOptions>(iis =>
            {
                iis.AutomaticAuthentication = false;
            });

            services.AddEPZEUDataProtection(Configuration.GetEPZEUSection().GetValue<string>("EP_ASPNETCORE_DP_KEY_CERT_THUMBPRINT"));

            services
                .ConfigureIdentityServer(HostingEnvironment, Configuration)
                .ConfigureEPZEUGlobalOptions(Configuration)
                .ConfigureEPZEUHttpClientOptions(Configuration)
                .ConfigureEPZEUUsersOptions(Configuration)
                .ConfigureEPZEUHttpAuthenticationClientsOptions(Configuration);

            services.AddEPZEUPrincipalTransformation();

            services
                .AddAuthentication(IdentityServerConstants.DefaultCookieAuthenticationScheme)
                .AddNRAAuthentication(Configuration);

            services.AddSingleton<IDataProtectorServiceProvider, DataProtectorServiceProvider>();
            services.AddSingleton<IDataSerializer<AuthenticationProperties>, PropertiesSerializer>();
            services.AddSingleton<ISecureDataFormat<AuthenticationProperties>, SecureDataFormat<AuthenticationProperties>>(sp =>
            {
                return new SecureDataFormat<AuthenticationProperties>(
                    sp.GetRequiredService<IDataSerializer<AuthenticationProperties>>(),
                    sp.GetRequiredService<IDataProtectorServiceProvider>().GetDataProtector());
            });

            services
                .AddEPZEUUserServices()
                .AddEPZEUUsersLogin()
                .AddEPZEUServiceClients()
                .AddEPZEUHttpClientsForIdentityServer(Configuration)
                .AddHttpContextEPZEUUserAccessor()
                .AddSingleton<IProfileService, CustomProfileService>()
                .AddHttpContextAccessor()
                .AddSingleton<ICookieManager, DefaultCookieManager>();

            services.AddEPZEUCMS();
            services.AddEPZEUCMSDBCaching();
            services.AddEPZEUNomenclatures();
            services.AddEPZEUNomenclaturesDBCaching();

            services.AddEPZEUAppParametersDb();

            services.AddServiceLimiterService();

            services.AddEPZEUWebStringLocalizer();

            services.AddCachePollingBackgroundService((options) =>
            {
                options.PollingInterval = Configuration.GetEPZEUSection().GetValue<TimeSpan>("GL_POLLING_INTERVAL");
            });
            services.AddNpgCacheInvalidationDispatcher((options, sp) =>
            {
                options.ConnectionString = Configuration.GetEPZEUDBConnectionString().ConnectionString;
            });

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.All;
            });

            services.TryAddSingleton(typeof(IServiceOperationRepository), typeof(ServiceOperationRepository));
            services.AddIdempotentOperationExecutor();

            // HostedServices must be added last because if they are added first and then there is an error while adding more services, the hosted service runs despite the error
            // and if the hosted service depends on some of the services that couldn't be added, 
            // it will throw an exception and only that exception will be logged (see error log in Program.cs try catch block)
            // and we will not see the first error, which is the root of the problem.
            services.AddHostedService<ApplicationAsyncConfigurationService>();

            //TODO: Velin
            //return services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IAppParameters appParameters)
        {
            app.Use((context, next) =>
            {
                // при работа зад proxy, ако има указан ForwardedSiteBasePath хедър, се добавя към Request.PathBase;
                if (context.Request.Headers.TryGetValue(HeaderNamesConstants.ForwardedSiteBasePath, out StringValues forwardedAppBasePath))
                {
                    string proxyPathBase = forwardedAppBasePath.ToString();

                    if (!proxyPathBase.StartsWith('/'))
                        proxyPathBase = '/' + proxyPathBase;

                    context.Request.PathBase = new PathString(proxyPathBase + context.Request.PathBase.Value);
                }

                return next.Invoke();
            });            

            app.UseForwardedHeaders();

            app.UseExceptionHandler("/home/apperror");

            /*Регистрира параметрите на ЕПЗЕУ за инвалидиране при промяна*/
            (Configuration as IConfigurationRoot).RegisterAppParametersSourceInEPZEUConfiguration(appParameters);

            app.UseStaticFiles();

            app.UseRequestLocalizationForIdentityServer();

            app.UseRouting();
            app.UseIdentityServer();
            
            /*Добавя се след middleware на IdentityServer - a. 
             * По тази причина, когато се прави заявка към базата данни от identityServer Endpoint - те трябва да се прави изрична имперсонация към базата данни. 
             * Например CustomProfileService
             */
            app.UseEPZEUPrincipalMiddleware();
                     
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }        
    }
}
