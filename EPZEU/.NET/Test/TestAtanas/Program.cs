using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Debugging;
using System;
using System.IO;

namespace TestAtanas
{
    public partial class Program
    {
        static partial void Run(string[] args);

        public static void Main(string[] args)
        {
            ConfigurationBuilder configurationBuilder = new ConfigurationBuilder();

            var configuration = configurationBuilder
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();

            if (configuration.GetValue<bool>("Serilog:EnableSelfLogToConsole"))
                SelfLog.Enable(TextWriter.Synchronized(Console.Error));

            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console(Serilog.Events.LogEventLevel.Warning)
            .CreateLogger();

            try
            {
                Run(args);
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}
