using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Utilities
{
    public class EPZEUOperationException : Exception
    {
        public EPZEUOperationException()
            : base()
        {
        }

        public EPZEUOperationException(string message)
            : base(message)
        {
        }

        public EPZEUOperationException(string message, Exception inner) :
            base(message, inner)
        {
        }
    }
}
