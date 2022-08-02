using CNSys.Data;
using Dapper;
using EPZEU.Common.Cache;
using EPZEU.Common.Repositories;
using EPZEU.Nomenclatures;
using EPZEU.Nomenclatures.Cache;
using EPZEU.Nomenclatures.Repositories;
using EPZEU.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Data;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class EPZEUDbConfigurationExtensions
    {
        public static IServiceCollection AddEPZEUDbContextProviderWithDefaultConnection(this IServiceCollection services, IConfiguration configuration, int? defaultUserID = null)
        {
            services.AddDbContextProviderWithDefaultConnection(configuration, (options, sp) =>
            {
                if (options.ConnectionStrings.Count == 0)
                {
                    var connectionStringSettings = configuration.GetEPZEUDBConnectionString();

                    connectionStringSettings.Name = "default";

                    options.ConnectionStrings.Add("default", connectionStringSettings);

                    options.DefaultConnectionStringName = "default";
                }

                IEPZEUUserAccessor userAccessor = sp.GetService<IEPZEUUserAccessor>();
                options.ConnectionInitializer = (context, token) =>
                {
                    var userClientID = userAccessor?.User?.ClientID;

                    if (!string.IsNullOrEmpty(userClientID) || defaultUserID.HasValue)
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("p_userid", !string.IsNullOrEmpty(userClientID) ? int.Parse(userClientID) : defaultUserID.Value);

                        context.Connection.Execute(string.Format("{0}.\"{1}\"", "sys", "f_currentuser_set"), parameters, commandType: CommandType.StoredProcedure);
                    }

                    return Task.CompletedTask;
                };
            });
            services.AddDbContextOperationExecutor();
            return services;
        }

        /// <summary>
        /// Добавяне на IAppParameters с достъп през базата данни.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUAppParametersDb(
            this IServiceCollection services)
        {
            services.TryAddSingleton<IAppParameterRepository, AppParameterRepository>();
            services.TryAddSingleton<IAppParametersDataCache, AppParametersDbCache>();
            services.TryAddSingleton<IAppParameters, AppParameters>();

            return services;
        }

        public static IServiceCollection AddEPZEULanguagesDb(
            this IServiceCollection services)
        {
            services.TryAddSingleton<ILanguageRepository, LanguageRepository>();
            services.TryAddSingleton<ILanguagesCache, LanguagesDbCache>();
            services.TryAddSingleton<ILanguages, Languages>();

            return services;
        }
    }
}
