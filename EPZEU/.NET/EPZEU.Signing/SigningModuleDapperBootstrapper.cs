using Dapper;
using EPZEU.Signing.Models;
using EPZEU.Utilities;
using NpgsqlTypes;
using System.Net;
using System.Text.Json;

namespace EPZEU
{
    public static class SigningModuleDapperBootstrapper
    {
        public static void Run()
        {
            SigningModuleDapperRegistrator.Current.Register();
        }
    }

    internal class SigningModuleDapperRegistrator : StartupRegistrator<SigningModuleDapperRegistrator>
    {
        protected override void RegisterInternal()
        {
            SqlMapper.AddTypeHandler(new PassThroughHandler<IPAddress>(NpgsqlDbType.Inet));
            SqlMapper.AddTypeHandler(new PassThroughHandler<JsonElement>(NpgsqlDbType.Jsonb));
            SqlMapper.AddTypeHandler(new NpgCustomParameterValueTypeHandler());

            SqlMapper.SetTypeMap(typeof(SigningProcess), DataContextHelper.ColumnMap<SigningProcess>());
            SqlMapper.SetTypeMap(typeof(Signer), DataContextHelper.ColumnMap<Signer>());
        }
    }
}
