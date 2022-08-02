using CNSys.Data;
using System.Linq;

namespace Microsoft.Extensions.Configuration
{
    public static class ConfigurationExtensions
    {
        public static ConnectionStringSettings GetEPZEUDBConnectionString(this IConfiguration configuration)
        {
            string connectionString = configuration.GetEPZEUSection().GetValue<string>("EP_DB_CONNECTION_STRING");

            if (string.IsNullOrEmpty(connectionString))
            {
                return configuration.GetConnectionStrings().FirstOrDefault().Value;
            }
            else
            {
                Npgsql.NpgsqlConnectionStringBuilder stringBuilder = new Npgsql.NpgsqlConnectionStringBuilder(connectionString);
                stringBuilder.ApplicationName = System.Reflection.Assembly.GetEntryAssembly().GetName().Name;

                return new ConnectionStringSettings("default", stringBuilder.ToString(), "Npgsql");
            }
        }
    }
}
