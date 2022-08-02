using Microsoft.Extensions.Primitives;
using System.Net;
using System.Threading.Tasks;

namespace EPZEU.ServiceLimits.AspNetCore
{
    public interface IServiceLimiter
    {
        Task<bool> ShouldRateLimitAsync(StringValues serviceCodes, int? userCIN, IPAddress userIPAddress);
    }
}
