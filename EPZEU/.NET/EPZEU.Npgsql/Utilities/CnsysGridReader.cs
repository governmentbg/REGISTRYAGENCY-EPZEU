using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Utilities
{
    public class CnsysGridReader : IDisposable
    {
        private DbDataReader _reader = null;
        private bool _isFirstCall = true;

        public CnsysGridReader(IDataReader reader)
        {
            _reader = (DbDataReader)reader;
        }

        public List<T> ReadToList<T>()
        {
            return Read<T>().ToList();
        }

        public ValueTask<List<T>> ReadToListAsync<T>(CancellationToken cancellationToken)
        {
            return ReadAsync<T>(cancellationToken).ToListAsync();
        }

        public IEnumerable<T> Read<T>()
        {
            if (!_isFirstCall)
            {
                _reader.NextResult();
            }
            else
            {
                _isFirstCall = false;
            }

            return _reader.Parse<T>();
        }

        public async IAsyncEnumerable<T> ReadAsync<T>([EnumeratorCancellation] CancellationToken cancellationToken)
        {
            if (!_isFirstCall)
            {
                _reader.NextResult();
            }
            else
            {
                _isFirstCall = false;
            }

            if (await _reader.ReadAsync(cancellationToken))
            {
                var parser = _reader.GetRowParser<T>();

                do
                {
                    yield return parser(_reader);

                } while (await _reader.ReadAsync(cancellationToken));
            }
              
        }

        public void Dispose()
        {
            if (_reader != null)
            {
                if (!_reader.IsClosed)
                    _reader.Close();

                _reader.Dispose();
            }
            _reader = null;
        }
    }
}
