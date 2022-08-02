using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Common
{
    /// <summary>
    /// Конфигурация на X509 сертификати.
    /// </summary>
    public class X509Config
    {
        public X509Config()
        {
        }

        /// <summary>
        /// Конфигурации за отделни издатели на сертификати.
        /// </summary>
        public IssuerConfig[] IssuerConfigs { get; set; }
    }

    /// <summary>
    /// Конфигурация за даден издател на сертификати.
    /// </summary>
    public class IssuerConfig
    {
        /// <summary>
        /// Име.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Настройки.
        /// </summary>
        public CertificateProperty[] CertificateProperties { get; set; }
    }

    /// <summary>
    /// Опция от конфикурацията на даден издател на сертификати.
    /// </summary>
    public class CertificateProperty
    {
        /// <summary>
        /// Име.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Поле.
        /// </summary>
        public string Field { get; set; }

        /// <summary>
        /// Шаблон.
        /// </summary>
        public List<Pattern> Patterns { get; set; }
    }

    /// <summary>
    /// Шаблон.
    /// </summary>
    public class Pattern
    {
        /// <summary>
        /// Приоритет.
        /// </summary>
        public int Priority { get; set; }

        /// <summary>
        /// Стойност.
        /// </summary>
        public string Value { get; set; }
    }
}
