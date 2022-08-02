using CNSys.Data;
using Dapper;
using EPZEU.Security;
using EPZEU.Users.Migrations;
using EPZEU.Users.Migrations.Common;
using EPZEU.Users.Migrations.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// Статичен клас за екстеншъни свързани с мигрирането на потребители.
    /// </summary>
    public static class UserMigrationsCollectionExtensions
    {
        /// <summary>
        /// Добавя услуги за мигрирането на потребители.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddUserMigrationServices(this IServiceCollection services)
        {
            services.TryAddSingleton(typeof(IOSSDbContextProvider), typeof(OSSDbContextProvider));

            services.TryAddSingleton(typeof(IAccountMigrationProcessRepository), typeof(AccountMigrationProcessRepository));

            services.TryAddSingleton(typeof(IOSSAccountRepository), typeof(OSSAccountRepository));

            services.TryAddSingleton(typeof(IAccountMigrationProcessService), typeof(AccountMigrationProcessService));

            return services;
        }

        public static ConnectionStringSettings GetOSSDBConnectionString(this IConfiguration configuration)
        {
            string connectionString = configuration.GetEPZEUSection().GetValue<string>("EP_USR_OSS_DB_CONNECTION_STRING");

            return new ConnectionStringSettings("oss", connectionString, "Oracle.ManagedDataAccess.Client");
        }

        public static IServiceCollection AddEPZEUDbContextProviderWithDefaultAndOSSConnection(this IServiceCollection services, IConfiguration configuration, int defaultUserID, int ossDefaultUserID)
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

                var ossConnectionStringSettings = configuration.GetOSSDBConnectionString();

                options.ConnectionStrings.Add("oss", ossConnectionStringSettings);

                IEPZEUUserAccessor userAccessor = sp.GetService<IEPZEUUserAccessor>();
                options.ConnectionInitializer = (context, token) =>
                {
                    var userClientID = userAccessor?.User?.ClientID;

                    if (context.Connection is Oracle.ManagedDataAccess.Client.OracleConnection)
                    {                        
                        (context.Connection as Oracle.ManagedDataAccess.Client.OracleConnection).ClientId = ossDefaultUserID.ToString();
                    }
                    else
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("p_userid", !string.IsNullOrEmpty(userClientID) ? int.Parse(userClientID) : defaultUserID);

                        context.Connection.Execute(string.Format("{0}.\"{1}\"", "sys", "f_currentuser_set"), parameters, commandType: CommandType.StoredProcedure);
                    }

                    return Task.CompletedTask;
                };
            });
            services.AddDbContextOperationExecutor();
            return services;
        }
    }
}
