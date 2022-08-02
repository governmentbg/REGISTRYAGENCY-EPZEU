namespace Microsoft.Extensions.Configuration
{
    public static class ConfigurationEPZEUNetExtensions
    {
        public const string EPZEUSectionName = "EPZEU";

        public static IConfiguration GetEPZEUSection(this IConfiguration configuration)
        {
            return configuration.GetSection(EPZEUSectionName);
        }
    }
}
