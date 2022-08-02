using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Code
{
    public static class CnsysLoggerExtention
    {
        public static void LogException(this ILogger logger, Exception ex)
        {
            logger.LogError(ex.ToString());
        }
    }

    public enum LevelTypes
    {
        Trace = 1,
        Debug = 2,
        Info = 3,
        Warn = 4,
        Error = 5,
        Fatal = 6
    }

    public class LogMessage
    {
        public DateTime StartTime { get; set; }

        public string Level { get; set; }

        public LevelTypes? LevelType
        {
            get
            {
                if (string.IsNullOrEmpty(Level))
                    return null;

                switch (Level.ToLower())
                {
                    case "trace":
                        return LevelTypes.Trace;
                    case "debug":
                        return LevelTypes.Debug;
                    case "info":
                        return LevelTypes.Info;
                    case "warn":
                        return LevelTypes.Warn;
                    case "error":
                        return LevelTypes.Error;
                    case "fatal":
                        return LevelTypes.Fatal;
                    default:
                        throw new ArgumentException("Cannot determine LevelType.");
                }
            }
        }

        public string LoggerName { get; set; }

        public List<LogMessageData> Data { get; set; }
    }

    public class LogMessageData
    {
        public string Name { get; set; }

        public string Message { get; set; }

        public string StackTrace { get; set; }
    }
}
