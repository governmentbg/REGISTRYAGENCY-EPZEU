using Dapper;
using Npgsql;
using NpgsqlTypes;
using System.Data;

namespace EPZEU.Utilities
{
    public class NpgCustomParameterValue
    {
        public NpgCustomParameterValue(NpgsqlDbType? npgsqlDbType, object value)
        {
            NpgsqlDbType = npgsqlDbType;
            Value = value;
        }

        public NpgsqlDbType? NpgsqlDbType { get; set; }
        public object Value { get; set; }
    }

    public class NpgCustomParameterValueTypeHandler : SqlMapper.TypeHandler<NpgCustomParameterValue>
    {
        public override void SetValue(IDbDataParameter parameter, NpgCustomParameterValue value)
        {
            var npgsqlParam = (NpgsqlParameter)parameter;

            if (value.NpgsqlDbType.HasValue)
                npgsqlParam.NpgsqlDbType = value.NpgsqlDbType.Value;

            parameter.Value = value.Value;
        }

        public override NpgCustomParameterValue Parse(object value)
        {
            return new NpgCustomParameterValue(null, value);
        }
    }
}
