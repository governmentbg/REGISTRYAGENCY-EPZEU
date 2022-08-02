using System;
using System.Configuration;
using System.Web;
using System.Linq;
using System.Collections.Generic;

namespace EPZEU.Web
{
    /// <summary>
    /// Имплементация на IHttpModule за изчитане на клиентския сертификат и зареждането му в сървърна променлива.
    /// </summary>
    public class ClientCertificateHttpModule : IHttpModule
    {
        public static string CertContentKeyServerVarName = ConfigurationManager.AppSettings.Get("CertPublicKeyServerVarName") ?? "CERT_CONTENT";
        public static List<string> EnabledUrls = ConfigurationManager.AppSettings.Get("ClientCertificateHttpModule:EnabledUrls")?.Split(' ').ToList();

        public void Init(HttpApplication context)
        {
            context.BeginRequest += BeginRequest;
        }

        private void BeginRequest(object sender, EventArgs e)
        {
            var app = sender as HttpApplication;
            var requestUrl = app.Context.Request.Url.AbsolutePath;

            if (EnabledUrls != null && !EnabledUrls.Contains(requestUrl))
                return;

            var clientCert = app.Context.Request.ClientCertificate;

            if (!string.IsNullOrEmpty(clientCert?.Subject))
            {
                var serverVars = app.Context.Request.ServerVariables;

                var cpk = serverVars.Get(CertContentKeyServerVarName);

                if (string.IsNullOrEmpty(cpk))
                {
                    serverVars.Set(CertContentKeyServerVarName, Convert.ToBase64String(clientCert.Certificate));
                }
            }
        }

        public void Dispose()
        {
        }
    }
}
