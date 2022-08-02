using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Pb.Lyft.Ratelimit;
using Polly;
using Polly.CircuitBreaker;
using System;
using System.Net;
using System.Threading.Tasks;

namespace EPZEU.ServiceLimits.AspNetCore
{
    public class LyftServieRateLimiter : IServiceLimiter
    {
        private readonly GrpcChannel _channel;
        private readonly RateLimitService.RateLimitServiceClient _rateLimiter;
        private readonly string _domain;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly IAsyncPolicy _rateLimiterPolicy;

        public LyftServieRateLimiter(IConfiguration configuration, ILoggerFactory loggerFactory, ILogger<LyftServieRateLimiter> logger)
        {
            _configuration = configuration.GetEPZEUSection();

            _domain = _configuration["GL_SERVICE_LIMIT_DOMAIN"];

            UriBuilder uriBuilder = null;

            var limitServer = _configuration["GL_SERVICE_LIMIT_SERVER"];
            var parts = limitServer.Split(':');

            if (parts.Length == 2)
                uriBuilder = new UriBuilder(Uri.UriSchemeHttp, parts[0], int.Parse(parts[1]));
            else if (parts.Length == 1)
                uriBuilder = new UriBuilder(Uri.UriSchemeHttp, parts[0]);
            else
                throw new FormatException(string.Format("The format of the GL_SERVICE_LIMIT_SERVER parameter is invalid. It must be host:port or host but is {0}", limitServer));

            _channel = GrpcChannel.ForAddress(uriBuilder.ToString(), new GrpcChannelOptions() { LoggerFactory = loggerFactory });

            _rateLimiter = new RateLimitService.RateLimitServiceClient(_channel);

            _logger = logger;

            _rateLimiterPolicy = Policy.Handle<Exception>().CircuitBreakerAsync(3, new TimeSpan(0, 0, 13), OnBreak, OnReset);
        }
        public async Task<bool> ShouldRateLimitAsync(StringValues serviceCodes, int? userCIN, IPAddress userIPAddress)
        {
            if (_configuration.GetValue<int>("GL_SERVICE_LIMIT_DISABLED") > 0)
                return false;

            try
            {
                return await _rateLimiterPolicy.ExecuteAsync(async () =>
                {
                    var request = new RateLimitRequest()
                    {
                        Domain = _domain
                    };

                    string entryValue = userCIN.HasValue ? string.Format("CIN:{0}", userCIN) : string.Format("IP:{0}", userIPAddress);

                    foreach (var serviceCode in serviceCodes)
                    {
                        var descriptor = new RateLimitDescriptor();

                        request.Descriptors.Add(descriptor);

                        var entry = new RateLimitDescriptor.Types.Entry();

                        descriptor.Entries.Add(entry);

                        entry.Key = serviceCode;
                        entry.Value = entryValue;
                    }

                    var response = await _rateLimiter.ShouldRateLimitAsync(request);

                    return response.OverallCode == RateLimitResponse.Types.Code.OverLimit;
                });
            }
            catch(BrokenCircuitException)
            {
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);

                /*Ако има проблем с извикването на услугата за лимитиране, не ограничаваме заявките*/
                return false;
            }
        }

        private void OnBreak(Exception exception, TimeSpan duration)
        {
            _logger.LogCritical("Rate Limiting CircuitBreaker was broken");
        }

        private void OnReset()
        {
            _logger.LogCritical("Rate Limiting CircuitBreaker was reset.");
        }
    }
}
