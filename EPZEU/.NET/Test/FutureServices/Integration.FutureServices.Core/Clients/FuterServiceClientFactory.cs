using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Integration.FutureServices.Core.Clients
{
    public static class FuterServiceClientFactory
    {
        public static IProxiesRegisterServiceClient GetProxiesRegisterServiceClient()
        {
            return new ProxiesRegisterServiceClient();
        }

        public static IAddressRegisterServiceClient GetAddressRegisterServiceClient()
        {
            return new AddressRegisterServiceClient();
        }

        public static ICivilRegistrationServiceClient GetCivilRegistrationServiceClient()
        {
            return new CivilRegistrationServiceClient();
        }
    }
}
