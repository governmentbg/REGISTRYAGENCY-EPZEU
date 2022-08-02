using System;
using System.Data.Common;

namespace EPZEU.Utilities
{
    public class BaseDataContext : IDisposable
    {
        protected DbConnection _dbConnection;


        public BaseDataContext(DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public void Dispose()
        {
        }
    }
}
