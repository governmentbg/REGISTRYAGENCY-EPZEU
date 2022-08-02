using CNSys;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Видове лице: 0 = Физическо лице; 1 = Юридическо лице.
    /// </summary>
    public enum PersonType
    {
        /// <summary>
        /// Физическо лице;
        /// </summary>
        Person,

        /// <summary>
        /// Юридическо лице;
        /// </summary>
        Subject
    }

    /// <summary>
    /// Човек.
    /// </summary>
    public partial class Person
    {
        #region Private members
        
        private string competentAuthorityForRegistration = "";

        private string registrationNumber = "";

        private string foreignRegisterCode = "";

        private string foreignLegalFormCode = "";

        private string countryCode = "";

        private string countryCodeBRIS = "";

        private string legalForm = "";

        private string position = "";

        private string nameAndLegalFormText = "";

        private bool isForeignTrader;

        private IndentTypes indentType = IndentTypes.Undefined;

        private PersonType? type = PersonType.Person;

        #endregion

        #region Properties

        /// <summary>
        /// Идентификатор.
        /// </summary>
        public string Indent { get; set; }

        /// <summary>
        /// Име.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Вид идентификатор.
        /// </summary>
        [EmptyCheckIgnore]
        public IndentTypes? IndentType
        {
            get { return indentType; }
            set
            {
                if (value.HasValue)
                {
                    indentType = value.Value;
                }
                else
                {
                    indentType = IndentTypes.Undefined;
                }
            }
        }

        /// <summary>
        /// Идентификатор на държава.
        /// </summary>
        [XmlElement(IsNullable = true)]
        public long? CountryID { get; set; }

        /// <summary>
        /// Име на държава.
        /// </summary>
        public string CountryName { get; set; }

        //TODO: Това е зафикс за версия трябва да се намери глобално решение
        /// <summary>
        /// Xsi Тип.
        /// </summary>
        [XmlAttribute(Namespace = "http://www.w3.org/2001/XMLSchema-instance", AttributeName = "type")]
        [JsonIgnore]
        public string XsiType
        {
            get { return type == PersonType.Subject ? "f:" + PersonType.Subject.ToString() : null; }
            set { type = !string.IsNullOrEmpty(value) && value.Replace("f:", "") == PersonType.Subject.ToString() ? PersonType.Subject : PersonType.Person; }
        }

        /// <summary>
        /// Компетентна власт за регистрация.
        /// </summary>
        [XmlAttribute("CompetentAuthorityForRegistration")]
        public string CompetentAuthorityForRegistration
        {
            get { return string.IsNullOrEmpty(competentAuthorityForRegistration) ? "" : competentAuthorityForRegistration; }
            set { competentAuthorityForRegistration = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Номер на регистрация.
        /// </summary>
        [XmlAttribute("RegistrationNumber")]
        public string RegistrationNumber
        {
            get { return string.IsNullOrEmpty(registrationNumber) ? "" : registrationNumber; }
            set { registrationNumber = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Код на чуждестранен регистър
        /// </summary>
        [XmlAttribute("ForeignRegisterCode")]
        public string ForeignRegisterCode
        {
            get { return string.IsNullOrEmpty(foreignRegisterCode) ? "" : foreignRegisterCode; }
            set { foreignRegisterCode = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Код на чуждестранна правна форма.
        /// </summary>
        [XmlAttribute("ForeignLegalFormCode")]
        public string ForeignLegalFormCode
        {
            get { return string.IsNullOrEmpty(foreignLegalFormCode) ? "" : foreignLegalFormCode; }
            set { foreignLegalFormCode = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Код на държава.
        /// </summary>
        [XmlAttribute("CountryCode")]
        public string CountryCode
        {
            get { return string.IsNullOrEmpty(countryCode) ? "" : countryCode; }
            set { countryCode = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Код на държава от BRIS
        /// </summary>
        [XmlAttribute("CountryCodeBRIS")]
        public string CountryCodeBRIS
        {
            get { return string.IsNullOrEmpty(countryCodeBRIS) ? "" : countryCodeBRIS; }
            set { countryCodeBRIS = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Правна форма.
        /// </summary>
        [XmlAttribute("LegalForm")]
        public string LegalForm
        {
            get { return string.IsNullOrEmpty(legalForm) ? "" : legalForm; }
            set { legalForm = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Позиция.
        /// </summary>
        [XmlAttribute("Position")]
        public string Position
        {
            get { return string.IsNullOrEmpty(position) ? "" : position; }
            set { position = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        /// <summary>
        /// Флаг указващ дали е чуждестранен търговец.
        /// </summary>
        [XmlIgnore]
        public bool? IsForeignTrader
        {
            get { return isForeignTrader; }
            set { isForeignTrader = value.GetValueOrDefault(); }
        }

        /// <summary>
        /// Текст за име и правна форма.
        /// </summary>
        [XmlIgnore]
        public string NameAndLegalFormText
        {
            get { return nameAndLegalFormText; }
            set { nameAndLegalFormText = value; }
        }

        /// <summary>
        /// Текст за флаг указващ дали е чуждестранен търговец.
        /// </summary>
        [XmlAttribute("IsForeignTraderText")]
        [JsonIgnore]
        [EmptyCheckIgnore]
        public string IsForeignTraderText
        {
            get { return isForeignTrader ? "1" : "0"; }
            set { isForeignTrader = (value == "1"); }
        }

        /// <summary>
        /// Тип.
        /// </summary>
        [XmlIgnore]
        public PersonType? Type
        {
            get { return type; }
            set { type = value; }
        }

        #endregion
    }

    /// <summary>
    /// Субект.
    /// </summary>
    //Този обет се използва при десерилизация на бокта F01501_ControllingBoardPerson
    [XmlType(TypeName = "Subject", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class Subject : Person
    { }
}