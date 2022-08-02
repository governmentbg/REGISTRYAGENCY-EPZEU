using System;
using System.Net;

namespace EPZEU.Security
{
    /// <summary>
    /// Имплементация на IEPZEUUserAccessor за системен потребител.
    /// </summary>
    public class EPZEUSystemUserAccessor : IEPZEUUserAccessor
    {
        public EPZEUPrincipal User
        {
            get => SystemUser;
            set => throw new NotImplementedException();
        }

        public static EPZEUPrincipal SystemUser { get; } = new EPZEUPrincipal(Principal.Anonymous, EPZEUPrincipal.SystemLocalUserID.ToString());

        public Guid? UserSessionID => throw new NotImplementedException();

        public IPAddress RemoteIpAddress => throw new NotImplementedException();
    }
}
