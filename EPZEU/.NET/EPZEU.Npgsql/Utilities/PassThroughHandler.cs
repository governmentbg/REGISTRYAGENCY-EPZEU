using Dapper;
using Newtonsoft.Json.Linq;
using Npgsql;
using NpgsqlTypes;
using System;
using System.Data;

namespace EPZEU.Utilities
{
    public class PassThroughHandler<T> : SqlMapper.TypeHandler<T>
    {

        #region Fields

        /// <summary>Npgsql database type being handled</summary>
        private readonly NpgsqlDbType _dbType;

        #endregion

        #region Constructors

        /// <summary>Constructor</summary>
        /// <param name="dbType">Npgsql database type being handled</param>
        public PassThroughHandler(NpgsqlDbType dbType)
        {
            _dbType = dbType;
        }

        #endregion

        #region Methods

        public override void SetValue(IDbDataParameter parameter, T value)
        {
            parameter.Value = value;
            parameter.DbType = DbType.Object;
            var npgsqlParam = parameter as NpgsqlParameter;
            if (npgsqlParam != null)
            {
                npgsqlParam.NpgsqlDbType = _dbType;
            }
        }

        public override T Parse(object value)
        {
            if (value == null || value == DBNull.Value)
            {
                return default(T);
            }

            if (typeof(T) == typeof(JObject) && value is string)
            {
                dynamic jObject = JObject.Parse((string)value);

                return jObject;
            }

            if (!(value is T))
            {
                throw new ArgumentException(string.Format(
                    "Unable to convert {0} to {1}",
                    value.GetType().FullName, typeof(T).FullName), "value");
            }
            var result = (T)value;
            return result;
        }

        #endregion

    }
}
