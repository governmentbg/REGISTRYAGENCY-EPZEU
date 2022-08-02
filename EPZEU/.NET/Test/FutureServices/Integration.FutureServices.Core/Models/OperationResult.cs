using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Integration.FutureServices.Core.Models
{
    public class Error
    {
        public Error(string code, string message)
        {
            Message = message;
            Code = code;
        }

        public string Message { get; set; }
        public string Code { get; set; }
    }

    public class OperationResult<T>
    {
        public bool? IsSuccessfullyCompleted { get; private set; }

        public T Result { get; private set; }
        
        public Error Error { get; private set; }

        public OperationResult(T result)
        {
            IsSuccessfullyCompleted = true;
            Result = result;
        }

        public OperationResult(string errorCode, string errorMessage)
        {
            IsSuccessfullyCompleted = false;
            Error = new Error(errorCode, errorMessage);
        }
    }
}
