using CNSys.Data;
using CNSys.IO;
using Dapper;
using System;
using System.Data;
using System.IO;

namespace EPZEU.Utilities
{
    public class NpgsqlDeferredContentStream : DeferredInitializedStream
    {
        #region Private Members

        private readonly Func<IDbContext, IDataReader> _readerGenerator;
        private Stream _innerStream;
        private IWrappedDataReader _reader;
        private IDbContext _dbContext;
        private readonly IDbContextProvider _dbContextProvider;

        #endregion

        #region Constructors

        public NpgsqlDeferredContentStream(Func<IDbContext, IDataReader> readerGenerator, IDbContextProvider dbContextProvider)
        {
            _readerGenerator = readerGenerator;
            _dbContextProvider = dbContextProvider;
        }

        #endregion

        #region Overriden Methods

        public override bool CanWrite
        {
            get { return false; }
        }

        protected override Stream InnerStream
        {
            get { return _innerStream; }
        }

        protected override void InitializeInnerStream()
        {
            _dbContext = _dbContextProvider.CreateContext();
            _dbContext.InitContextAsync().GetAwaiter().GetResult();

            _reader = _readerGenerator(_dbContext) as IWrappedDataReader;

            if (_reader.Read())
                _innerStream = (_reader.Reader as Npgsql.NpgsqlDataReader).GetStream(0);
            else
                _innerStream = new MemoryStream(Array.Empty<byte>(), false);

            base.InitializeInnerStream();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (_innerStream != null)
            {
                _innerStream.Dispose();
                _innerStream = null;
            }

            if (_reader != null && !_reader.IsClosed)
            {
                _reader.Close();
                _reader.Dispose();
            }

            /*винаги се видка Dispose, за да може, ако се вика няколко пъти на stream - а през вътрешни ExecutionContext - и то да се освободи през външния! */
            _dbContext?.Complete();
            _dbContext?.Dispose();
        }

        #endregion
    }
}
