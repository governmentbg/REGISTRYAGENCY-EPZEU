
using System;

namespace Microsoft.Extensions.Logging
{
    public static class ILoggerExtensions
    {
        /// <summary>
        /// Логване на изключение.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="ex"></param>
        public static void LogException(this ILogger logger, Exception ex)
        {
            logger.LogError(ex, ex.Message);
        }
    }
}
