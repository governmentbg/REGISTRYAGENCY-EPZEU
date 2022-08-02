using EPZEU.Web.Swagger;
using IdentityModel.Client;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        private const string ASSEMBLY_DOCUMENTATION_SEARCH_PATTERN = @"^(Payments|EPZEU|Integration.EPZEU){1}.*";

        public static IServiceCollection AddEPZEUSwaggerGen(
            this IServiceCollection services,
            IConfiguration configuration,
            IWebHostEnvironment hostingEnvironment,
            string version,
            string assemblyDocumentationSearchPattern = ASSEMBLY_DOCUMENTATION_SEARCH_PATTERN)
        {
            var ret = services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(version, new OpenApiInfo { Title = hostingEnvironment.ApplicationName, Version = version });

                #region Include Xml Comments 

                DirectoryInfo di = new DirectoryInfo(AppDomain.CurrentDomain.BaseDirectory);
                var xmlFileNames = di.GetFiles("*.xml")
                                    .Where(x => Regex.IsMatch(x.Name, assemblyDocumentationSearchPattern, RegexOptions.IgnoreCase) == true)
                                    .Select(t => Regex.Replace(t.Name, ".xml", "", RegexOptions.IgnoreCase));

                var dllFileNames = di.GetFiles("*.dll")
                                    .Where(x => Regex.IsMatch(x.Name, assemblyDocumentationSearchPattern, RegexOptions.IgnoreCase) == true)
                                    .Select(t => Regex.Replace(t.Name, ".dll", "", RegexOptions.IgnoreCase));

                foreach (string regexFilteredXmlFileName in xmlFileNames)
                {
                    if (dllFileNames.Any(t => string.Compare(t, regexFilteredXmlFileName) == 0))
                    {
                        options.IncludeXmlComments(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, $"{regexFilteredXmlFileName}.xml"));
                    }
                }

                #endregion

                var disco = new DiscoveryCache(configuration.GetEPZEUSection().GetValue<string>("GL_IDSRV_URL").ToLower(), () => { return new HttpClient(); });
                var discoRes = disco.GetAsync().ConfigureAwait(false).GetAwaiter().GetResult();
                if (discoRes.IsError)
                    throw new Exception($"Unable to get IDSRV configuration: {discoRes.Error}");

                /*В момента се взима apiNamew за scope. Да се взима от scopes, като се преработи.*/
                var apiName = configuration.GetEPZEUSection().GetSection("Authentication").GetValue<string>("ApiName");

                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri(discoRes.AuthorizeEndpoint, UriKind.Absolute),
                            TokenUrl = new Uri(discoRes.TokenEndpoint, UriKind.Absolute),
                            Scopes = new Dictionary<string, string> {
                                {apiName, apiName }
                            }
                        }
                    }
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
                        },
                        new List<string>()
                    }
                 });

                options.SchemaGeneratorOptions.UseAllOfToExtendReferenceSchemas = true;

                #region Add Custom Schema for TimeSpan

                //https://swagger.io/docs/specification/data-models/data-types/#string
                //https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14
                Func<OpenApiSchema> timeSpanMapper = () => new OpenApiSchema() { Type = "string", Format = "duration" };

                options.MapType<TimeSpan>(timeSpanMapper);
                options.MapType<TimeSpan?>(timeSpanMapper);

                #endregion

                options.OperationFilter<AuthorizeCheckOperationFilter>();
                
            });

            services.AddIPFiltering((options) =>
            {
                /*По подразбиране няма ограничения*/
                options.DefaultBlockLevel = ZNetCS.AspNetCore.IPFiltering.DefaultBlockLevel.None;

                configuration.GetSection("Swagger").GetSection("IPFiltering").Bind(options);
            });

            services.AddSingleton<IApiDescriptionProvider, ApiDescriptionFilterProvider>();

            return ret;
        }
    }
}
