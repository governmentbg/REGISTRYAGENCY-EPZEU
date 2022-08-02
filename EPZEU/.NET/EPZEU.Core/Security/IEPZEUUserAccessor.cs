
using System;
using System.Net;

namespace EPZEU.Security
{
    /// <summary>
    /// Интерфейс, чрез който се достъпват данни за текущия потребител.
    /// </summary>
    public interface IEPZEUUserAccessor
    {
        /// <summary>
        /// Връща данни за текушия потребител.
        /// </summary>
        EPZEUPrincipal User { get; }
        /// <summary>
        /// Връща текущата потребителска сесия.
        /// </summary>
        Guid? UserSessionID { get; }

        /// <summary>
        /// Връща IP адреса на потребителя, от който се прави заявката.
        /// </summary>
        IPAddress RemoteIpAddress { get; }
    }
}
