using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common
{
    /// <summary>
    /// Данни за контакт със заявител.
    /// </summary>
    [XmlType(TypeName = "ApplicantExchange", Namespace = Namespaces.ApplicationsNamespace)]
    public class ApplicantExchange
    {
        #region Private members

        private string _email { get; set; }

        private bool agree;

        private bool notAgree;

        #endregion

        #region Json Properties

        /// <summary>
        /// Флаг указващ, че е съгласен.
        /// </summary>
        [XmlIgnore]
        public bool Agree
        {
            get { return agree; }
            set { agree = value; }
        }

        /// <summary>
        /// Флаг указващ, че не е съгласен.
        /// </summary>
        [XmlIgnore]
        public bool NotAgree
        {
            get { return notAgree; }
            set { notAgree = value; }
        }

        /// <summary>
        /// NRA_Art_100_1.
        /// </summary>
        [XmlIgnore]
        public bool? NRA_Art_100_1 { get; set; }

        /// <summary>
        /// NRA_Art_100_2.
        /// </summary>
        [XmlIgnore]
        public bool? NRA_Art_100_2 { get; set; }

        #endregion

        #region Properties

        /// <summary>
        /// Гуид на адресат.
        /// </summary>
        [XmlAttribute]
        public string AddresseeGuid { get; set; }

        /// <summary>
        /// Имейл.
        /// </summary>
        public string Email
        {
            get { return _email; }
            set { _email = string.IsNullOrWhiteSpace(value) ? value : value.Replace(" ", ""); }
        }

        /// <summary>
        /// Адрес.
        /// </summary>
        public Address Address { get; set; }

        /// <summary>
        /// Адресат.
        /// </summary>
        public string Addressee { get; set; }

        /// <summary>
        /// Текст за флаг указващ, че е съгласен.
        /// </summary>
        [XmlElement("Agree")]
        [JsonIgnore]
        public string AgreeText
        {
            get { return agree ? "1" : "0"; }
            set { agree = (value == "1"); }
        }

        /// <summary>
        /// Текст за флаг указващ, че не е съгласен.
        /// </summary>
        [XmlElement("NotAgree")]
        [JsonIgnore]
        public string NotAgreeText
        {
            get { return notAgree ? "1" : "0"; }
            set { notAgree = (value == "1"); }
        }

        /// <summary>
        /// NRA_Art_100_1_Text.
        /// </summary>
        [XmlAttribute("NRA_Art_100_1")]
        [JsonIgnore]
        public string NRA_Art_100_1_Text
        {
            get { return NRA_Art_100_1.HasValue && NRA_Art_100_1.Value ? "1" : "0"; }
            set { NRA_Art_100_1 = (value == "1"); }
        }

        /// <summary>
        /// NRA_Art_100_2_Text.
        /// </summary>
        [XmlAttribute("NRA_Art_100_2")]
        [JsonIgnore]
        public string NRA_Art_100_2_Text
        {
            get { return NRA_Art_100_2.HasValue && NRA_Art_100_2.Value ? "1" : "0"; }
            set { NRA_Art_100_2 = (value == "1"); }
        }

        #endregion
    }
}
