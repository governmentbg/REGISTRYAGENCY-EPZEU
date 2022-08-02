using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Web.Models
{
    /// <summary>
    /// Видове нива.: 1 = Trace; 2 = Debug; 3 = Info; 4 = Warn; 5 = Error; 6 = Fatal;
    /// </summary>
    public enum LevelTypes
    {
        /// <summary>
        /// Trace
        /// </summary>
        Trace = 1,

        /// <summary>
        /// Debug
        /// </summary>
        Debug = 2,

        /// <summary>
        /// Info
        /// </summary>
        Info = 3,

        /// <summary>
        /// Warn
        /// </summary>
        Warn = 4,

        /// <summary>
        /// Error
        /// </summary>
        Error = 5,

        /// <summary>
        /// Fatal
        /// </summary>
        Fatal = 6
    }

    /// <summary>
    /// Съобщение за грешка, което трябва да се запише.
    /// </summary>
    public class LogMessage
    {
        /// <summary>
        /// Дата, на която е възникнала грешката.
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// Ниво.
        /// </summary>
        public string Level { get; set; }

        /// <summary>
        /// Тип ниво.
        /// </summary>
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

        /// <summary>
        /// Име на регистратора.
        /// </summary>
        public string LoggerName { get; set; }

        /// <summary>
        /// Данни.
        /// </summary>
        public List<LogMessageData> Data { get; set; }
    }

    /// <summary>
    /// Съдържание на съобщението, което се записва.
    /// </summary>
    public class LogMessageData
    {
        /// <summary>
        /// Име.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Съобщение.
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Описва къде в кода е възникнала грешката.
        /// </summary>
        public string StackTrace { get; set; }
    }
}
