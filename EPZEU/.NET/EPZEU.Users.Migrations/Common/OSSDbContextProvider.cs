using CNSys.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.Users.Migrations.Common
{
    public interface IOSSDbContextProvider : IDbContextProvider
    { }

    internal class OSSDbContextProvider : IOSSDbContextProvider
    {
        public readonly string OSSConnectionStringName = "oss";

        private IDbContextProvider ContextProvider;

        public OSSDbContextProvider(IDbContextProvider contextProvider)
        {
            ContextProvider = contextProvider;
        }

        public IDbContext CreateContext(string connectionStringName = null)
        {
            if (string.IsNullOrEmpty(connectionStringName))
            {
                return ContextProvider.CreateContext(OSSConnectionStringName);
            }
            else
            {
                return ContextProvider.CreateContext(connectionStringName);
            }
        }
    }
}
