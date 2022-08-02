using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Integration.FutureServices.Core.Models
{
    public enum ProxiesDocumentKinds
    {
        /// <summary>
        /// Пълномошно
        /// </summary>
        Proxies = 1
    }

    public class ProxiesRegisterRequest
    {
        public ProxiesDocumentKinds? DocumentKind { get; set; }

        public string DocumentNumber { get; set; }
    }

    public class ProxiesRegisterResponse
    {
        public ProxiesDocumentKinds? DocumentKind { get; set; }

        public string DocumentNumber { get; set; }

        public bool? ProxyDocumentExist { get; set; }

        public string ProxyDocumentGuid { get; set; }
    }
}
