using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;

namespace EPZEU.Common
{
    /// <summary>
    /// Интерфейс на клас подпомагащ работата със сертификати.
    /// </summary>
    public interface ICertificateHelper
    {
        /// <summary>
        /// Извличане на данни за собственика на сертификата.
        /// </summary>
        /// <param name="issuer">Издател на сертификата.</param>
        /// <param name="subject">Собственик на сертификата.</param>
        /// <param name="certificateContent">Съдържание на сертификата.</param>
        /// <returns></returns>
        PersonInfo ExtractPersonInfo(string issuer, string subject, byte[] certificateContent, bool loadOrganizationIdentifier);
    }

    /// <summary>
    /// Имплементация на интерфейс ICertificateHelper
    /// </summary>
    public class CertificateHelper : ICertificateHelper
    {
        private const string DefaultIssuerConfigName = "Default";
        private const string GivenNameProperty = "GivenName";
        private const string SurnameProperty = "Surname";
        private const string CommonNameProperty = "CommonName";
        private const string IdentifierProperty = "Identifier";
        private const string OrganizationIdentifierProperty = "OrganizationIdentifier";
        private const string SubjectFieldName = "Subject";

        private IOptionsMonitor<X509ConfigOptions> X509ConfigOptions { get; set; }
        private readonly Lazy<Dictionary<string, Regex[]>> _certPropertiesRegex = null;

        public CertificateHelper(IOptionsMonitor<X509ConfigOptions> options)
        {
            X509ConfigOptions = options;
            _certPropertiesRegex = new Lazy<Dictionary<string, Regex[]>>(() => 
            {
                Dictionary<string, Regex[]> cacheValue = new Dictionary<string, Regex[]>();

                if (X509ConfigOptions != null 
                    && X509ConfigOptions.CurrentValue != null 
                    && X509ConfigOptions.CurrentValue.X509Configuration != null 
                    && X509ConfigOptions.CurrentValue.X509Configuration.IssuerConfigs != null)
                {
                    for (int i = 0; i < X509ConfigOptions.CurrentValue.X509Configuration.IssuerConfigs.Count(); i++)
                    {
                        IssuerConfig currIssuer = X509ConfigOptions.CurrentValue.X509Configuration.IssuerConfigs[i];

                        if (currIssuer.CertificateProperties != null)
                        {
                            for (int j = 0; j < currIssuer.CertificateProperties.Count(); j++)
                            {
                                CertificateProperty currCertProp = currIssuer.CertificateProperties[j];

                                string key = CreateCertRegexCacheKey(currIssuer.Name, currCertProp.Name);
                                currCertProp.Patterns.Sort((a, b) => a.Priority > b.Priority ? 1 : -1);

                                cacheValue.Add(key, currCertProp.Patterns.Select(p => new Regex(p.Value, RegexOptions.IgnoreCase)).ToArray());
                            }
                        }
                    }
                }

                return cacheValue;
            }, true);
        }

        public PersonInfo ExtractPersonInfo(string issuer, string subject, byte[] certificateContent, bool loadOrganizationIdentifier)
        {
            // TODO TRIR-3416. After old certificates (which don't comply with the new regulatory standards) expire, 
            // we must through exception if we can't extract information with these regular expressions!
            var issuerConfig = GetIssuerConfig(issuer);
            // TODO check if we can optimise this. The issue: we serialize certificateContent for every property which has to be taken from field which is different from "subject".
            // We assume that almost 100% of the time the field is going to be "subject", so this is not a serious problem.
            // The optimisation (serialize certificateContent no more than once) is going to be only for case when more than 1 property has to be taken from field which is different from "subject".
            var givenName = GetPropertyValue(GivenNameProperty, subject, issuerConfig, certificateContent);
            var surname = GetPropertyValue(SurnameProperty, subject, issuerConfig, certificateContent);
            var commonName = GetPropertyValue(CommonNameProperty, subject, issuerConfig, certificateContent);
            var identifier = GetPropertyValue(IdentifierProperty, subject, issuerConfig, certificateContent);
            var organizationIdentifier = loadOrganizationIdentifier ? GetPropertyValue(OrganizationIdentifierProperty, subject, issuerConfig, certificateContent) : null;
            var names = ((String.IsNullOrEmpty(givenName) == false) && (String.IsNullOrEmpty(surname) == false)) ? (givenName + " " + surname) : commonName;

            if (String.IsNullOrEmpty(names))
                throw new Exception("Could not extract names!");

            var ret = new PersonInfo()
            {
                Identifier = identifier,
                Names = names,
                OrganizationIdentifier=organizationIdentifier
            };

            return ret;
        }

        private IssuerConfig GetIssuerConfig(string issuer)
        {
            var ret = X509ConfigOptions.CurrentValue.X509Configuration.IssuerConfigs.FirstOrDefault(i => i.Name == issuer);
            if (ret == null)
                ret = X509ConfigOptions.CurrentValue.X509Configuration.IssuerConfigs.First(i => i.Name == DefaultIssuerConfigName);

            return ret;
        }

        private string GetPropertyValue(string propertyName, string subject, IssuerConfig issuerConfig, byte[] certificateContent)
        {
            CertificateProperty property = issuerConfig.CertificateProperties.First(c => c.Name == propertyName);
            string cacheKey = CreateCertRegexCacheKey(issuerConfig.Name, property.Name);

            string rawDataToParseFrom = null;
            if (property.Field == SubjectFieldName)
                rawDataToParseFrom = subject;
            else
                rawDataToParseFrom = GetFieldFromCertificate(certificateContent, property.Field);

            return GetPropertyValue(cacheKey, property.Name, rawDataToParseFrom);
        }

        private string GetPropertyValue(string certPropCacheKey, string propName, string rawData)
        {
            string res = null;

            if(_certPropertiesRegex.Value.ContainsKey(certPropCacheKey))
            {
                Regex[] arrRegex = _certPropertiesRegex.Value[certPropCacheKey];

                for (int i = 0; i < arrRegex.Count(); i++)
                {
                    Match m = arrRegex[i].Match(rawData);

                    if (m.Success)
                    {
                        Group g = m.Groups[propName];
                        res = g.Value;
                        break;
                    }
                }
            }

            return res;
        }

        private string GetFieldFromCertificate(byte[] certificateContent, string field)
        {
            X509Certificate2 inCert = new X509Certificate2(certificateContent);

            var certPropertyInfo = inCert.GetType().GetProperty(field);
            string ret;

            if (certPropertyInfo == null)
            {
                //Полето е extension на сертификат обекта
                X509Extension extension = inCert.Extensions[field];
                AsnEncodedData asndata = new AsnEncodedData(extension.Oid, extension.RawData);

                ret = asndata.Format(true);
            }
            else
            {
                //Полето е Property на сертификат обекта
                ret = inCert.GetType().GetProperty(field).GetValue(inCert).ToString();
            }

            return ret;
        }

        private string CreateCertRegexCacheKey(string issuer, string propName)
        {
            return string.Concat(issuer, "_", propName);
        }
    }

    /// <summary>
    /// Данни за собственика на сертификата.
    /// </summary>
    public class PersonInfo
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public string Identifier { get; set; }
        /// <summary>
        /// Имена
        /// </summary>
        public string Names { get; set; }

        /// <summary>
        /// Идентификатор на юридическо лице, с което физическото лице е асоциирано
        /// </summary>
        public string OrganizationIdentifier { get; set; }
    }
}
