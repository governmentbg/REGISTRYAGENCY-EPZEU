using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Utilities
{
    public static class DbConnectionExtensions
    {
        #region SPExecute 

        public static void SPExecute(this IDbConnection connection, string procName, DynamicParameters parameters = null)
        {
            SPExecute(connection, null, procName, parameters);
        }

        public static Task<int> SPExecuteAsync(this IDbConnection connection, string procName, DynamicParameters parameters, CancellationToken cancellationToken)
        {
            return SPExecuteAsync(connection, null, procName, parameters, cancellationToken);
        }

        public static void SPExecute(this IDbConnection connection, string schema, string procName, DynamicParameters parameters = null)
        {
            if (!string.IsNullOrWhiteSpace(schema))
            {
                schema = string.Format("\"{0}\".", schema);
            }
            else schema = "";

            connection.Execute(string.Format("{0}\"{1}\"", schema, procName), parameters, commandType: CommandType.StoredProcedure);
        }

        public static Task<int> SPExecuteAsync(this IDbConnection connection, string schema, string procName, DynamicParameters parameters, CancellationToken cancellationToken)
        {
            if (!string.IsNullOrWhiteSpace(schema))
            {
                schema = string.Format("\"{0}\".", schema);
            }
            else schema = "";

            return connection.ExecuteAsync(new CommandDefinition(
                commandText: string.Format("{0}\"{1}\"", schema, procName),
                parameters: parameters,
                commandType: CommandType.StoredProcedure,
                cancellationToken: cancellationToken
                ));
        }

        #endregion

        #region SpExecute Scalar

        public static object SPExecuteScalar(this IDbConnection connection, string procName, DynamicParameters parameters = null)
        {
            return connection.ExecuteScalar(string.Format("\"{0}\"", procName), parameters, commandType: CommandType.StoredProcedure);
        }

        public static Task<object> SPExecuteScalarAsync(this IDbConnection connection, string procName, DynamicParameters parameters, CancellationToken cancellationToken)
        {
            return connection.ExecuteScalarAsync(new CommandDefinition(
                commandText: string.Format("\"{0}\"", procName),
                parameters: parameters,
                commandType: CommandType.StoredProcedure,
                cancellationToken: cancellationToken
                ));
        }

        #endregion

        #region SPExecuteReader

        public static CnsysGridReader SPExecuteReader(this DbConnection connection, string schema, string procName, DynamicParameters parameters = null)
        {
            if (!string.IsNullOrWhiteSpace(schema))
            {
                schema = string.Format("\"{0}\".", schema);
            }
            else schema = "";

            var reader = connection.ExecuteReader(string.Format("{0}\"{1}\"", schema, procName), parameters, commandType: CommandType.StoredProcedure);
            return new CnsysGridReader(DereferenceCursors(connection, reader));
        }

        public static async Task<CnsysGridReader> SPExecuteReaderAsync(this DbConnection connection, string schema, string procName, DynamicParameters parameters, CancellationToken cancellationToken)
        {
            if (!string.IsNullOrWhiteSpace(schema))
            {
                schema = string.Format("\"{0}\".", schema);
            }
            else schema = "";

            var reader = await connection.ExecuteReaderAsync(new CommandDefinition(
                commandText: string.Format("{0}\"{1}\"", schema, procName),
                parameters: parameters,
                commandType: CommandType.StoredProcedure,
                cancellationToken: cancellationToken
                ));

            return new CnsysGridReader(await DereferenceCursorsAsync(connection, (DbDataReader)reader, cancellationToken));
        }

        public static CnsysGridReader SPExecuteReader(this DbConnection connection, string procName, DynamicParameters parameters = null)
        {
            var reader = connection.ExecuteReader(string.Format("\"{0}\"", procName), parameters, commandType: CommandType.StoredProcedure);

            return new CnsysGridReader(DereferenceCursors(connection, reader));
        }

        public static async Task<CnsysGridReader> SPExecuteReaderAsync(this DbConnection connection, string procName, DynamicParameters parameters, CancellationToken cancellationToken)
        {

            var reader = (DbDataReader)await connection.ExecuteReaderAsync(new CommandDefinition(
                commandText: string.Format("\"{0}\"", procName),
                parameters: parameters,
                commandType: CommandType.StoredProcedure,
                cancellationToken: cancellationToken
                ));

            return new CnsysGridReader(await DereferenceCursorsAsync(connection, reader, cancellationToken));
        }

        public static IDataReader SPExecuteReader(this DbConnection connection, string schema, string procName, DynamicParameters parameters = null, CommandBehavior behavior = CommandBehavior.Default)
        {
            if (!string.IsNullOrWhiteSpace(schema))
            {
                schema = string.Format("\"{0}\".", schema);
            }
            else schema = "";

            CommandDefinition commandDefinition = new CommandDefinition(string.Format("{0}\"{1}\"", schema, procName), parameters, null, null, CommandType.StoredProcedure, CommandFlags.None);

            return connection.ExecuteReader(commandDefinition, behavior);
        }

        //TODO: Не работи с Dapper.StrongName 2.0.30
        //public static Task<IDataReader> SPExecuteReaderAsync(this DbConnection connection, string schema, string procName, DynamicParameters parameters, CommandBehavior behavior, CancellationToken cancellationToken)
        //{
        //    if (!string.IsNullOrWhiteSpace(schema))
        //    {
        //        schema = string.Format("\"{0}\".", schema);
        //    }
        //    else schema = "";

        //    CommandDefinition commandDefinition = new CommandDefinition(string.Format("{0}\"{1}\"", schema, procName), parameters, null, null, CommandType.StoredProcedure, CommandFlags.None, cancellationToken);

        //    return connection.ExecuteReaderAsync(commandDefinition, behavior);
        //}


        #endregion

        private static IDataReader DereferenceCursors(DbConnection connection, IDataReader reader)
        {
            try
            {
                List<int> cursorIndexes = new List<int>();

                for (int i = 0; i < reader.FieldCount; i++)
                {
                    if (reader.GetDataTypeName(i) == "refcursor")
                    {
                        cursorIndexes.Add(i);
                    }
                }

                if (cursorIndexes.Count > 0)
                {
                    var fetchCommand = new StringBuilder();

                    while (reader.Read())
                    {
                        foreach (var curIndex in cursorIndexes)
                        {
                            if (reader.IsDBNull(curIndex)) continue;
                            fetchCommand.AppendFormat("FETCH ALL IN \"{0}\";", reader.GetString(curIndex));
                        }
                    }

                    reader.Dispose();

                    try
                    {
                        reader = connection.ExecuteReader(fetchCommand.ToString(), commandType: CommandType.Text);
                    }
                    catch (PostgresException ex)
                    {
                        if (ex.SqlState == "34000")
                        {
                            throw new InvalidOperationException("Cursor dereferencing requires a containing transaction. Please add one, or consider using TABLE return values instead as these are generally more efficient than cursors when using Npgsql to access PostgreSQL.");
                        }
                        throw;
                    }
                }

                return reader;
            }
            catch
            {
                if (reader != null)
                {
                    reader.Dispose();
                }
                throw;
            }
        }

        private static async Task<IDataReader> DereferenceCursorsAsync(DbConnection connection, DbDataReader reader, CancellationToken cancellationToken)
        {
            try
            {
                List<int> cursorIndexes = new List<int>();

                for (int i = 0; i < reader.FieldCount; i++)
                {
                    if (reader.GetDataTypeName(i) == "refcursor")
                    {
                        cursorIndexes.Add(i);
                    }
                }

                if (cursorIndexes.Count > 0)
                {
                    var fetchCommand = new StringBuilder();

                    while (await reader.ReadAsync(cancellationToken))
                    {
                        foreach (var curIndex in cursorIndexes)
                        {
                            if (reader.IsDBNull(curIndex)) continue;
                            fetchCommand.AppendFormat("FETCH ALL IN \"{0}\";", reader.GetString(curIndex));
                        }
                    }

                    reader.Dispose();

                    try
                    {
                        reader = (DbDataReader)await connection.ExecuteReaderAsync(new CommandDefinition(
                            commandText: fetchCommand.ToString(),
                            commandType: CommandType.Text,
                            cancellationToken: cancellationToken
                            ));
                    }
                    catch (PostgresException ex)
                    {
                        if (ex.SqlState == "34000")
                        {
                            throw new InvalidOperationException("Cursor dereferencing requires a containing transaction. Please add one, or consider using TABLE return values instead as these are generally more efficient than cursors when using Npgsql to access PostgreSQL.");
                        }
                        throw;
                    }
                }

                return reader;
            }
            catch
            {
                if (reader != null)
                {
                    reader.Dispose();
                }
                throw;
            }
        }

    }
}
