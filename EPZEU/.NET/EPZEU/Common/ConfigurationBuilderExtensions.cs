using EPZEU.Common.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System.Threading;

namespace Microsoft.Extensions.Configuration
{
    public static class ConfigurationBuilderExtensions
    {
        public static IConfigurationBuilder AddEPZEUConfigurationFromDb(this IConfigurationBuilder builder)
        {
            var configuration = builder.Build();

            var services = new ServiceCollection();

            services.AddDbContextProviderWithDefaultConnection(configuration);
            services.AddEPZEUAppParametersDb();

            using (var serviceProvider = services.BuildServiceProvider())
            {
                var entity = serviceProvider.GetRequiredService<IAppParameterRepository>();

                builder.AddEPZEUConfiguration(entity.SearchInfoAsync(new AppParameterSearchCriteria(), CancellationToken.None).GetAwaiter().GetResult().Data);
            }
            return builder;
        }
    }
}
