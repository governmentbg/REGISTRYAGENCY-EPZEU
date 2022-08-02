using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ForeignTraderRegistration", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ForeignTraderRegistration", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02200_ForeignTraderRegistration : Record
    {
        #region Private members

        private string _name = "";

        private string _legalForm = "";

        private string _register = "";

        private string _entryNumber = "";

        private string _foreignRegisterCode = "";

        private string _foreignLegalFormCode = "";

        #endregion

        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002200";

        [XmlAttribute("Name")]
        public string Name
        {
            get { return string.IsNullOrEmpty(_name) ? "" : _name; }
            set { _name = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        [XmlAttribute("LegalForm")]
        public string LegalForm
        {
            get { return string.IsNullOrEmpty(_legalForm) ? "" : _legalForm; }
            set { _legalForm = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        [XmlAttribute("Register")]
        public string Register
        {
            get { return string.IsNullOrEmpty(_register) ? "" : _register; }
            set { _register = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        [XmlAttribute("EntryNumber")]
        public string EntryNumber
        {
            get { return string.IsNullOrEmpty(_entryNumber) ? "" : _entryNumber; }
            set { _entryNumber = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        [XmlAttribute("ForeignRegisterCode")]
        public string ForeignRegisterCode
        {
            get { return string.IsNullOrEmpty(_foreignRegisterCode) ? "" : _foreignRegisterCode; }
            set { _foreignRegisterCode = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

        [XmlAttribute("ForeignLegalFormCode")]
        public string ForeignLegalFormCode
        {
            get { return string.IsNullOrEmpty(_foreignLegalFormCode) ? "" : _foreignLegalFormCode; }
            set { _foreignLegalFormCode = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }
    }

    [XmlType(TypeName = "ForeignTraderCountry", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ForeignTraderCountry", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02201_ForeignTraderCountry : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002201";

        #region Json Properties

        [XmlIgnore]
        public bool IsEUCountry { get; set; }

        [XmlIgnore]
        public bool OtherCountr { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("Country")]
        public string Country { get; set; }

        [XmlAttribute("CountryCode")]
        public string CountryCode { get; set; }

        [XmlAttribute("CountryCodeBRIS")]
        public string CountryCodeBRIS { get; set; }


        [XmlAttribute("IsEUCountry")]
        [JsonIgnore]
        public string IsEUCountryText
        {
            get { return IsEUCountry ? "1" : "0"; }
            set { IsEUCountry = (value == "1"); }
        }

        [XmlAttribute("OtherCountr")]
        [JsonIgnore]
        public string OtherCountrText
        {
            get { return OtherCountr ? "1" : "0"; }
            set { OtherCountr = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "ForeignTraderWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ForeignTraderWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02203_ForeignTraderWayOfRepresentation : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002203";

        #region Json Properties

        [XmlIgnore]
        public bool Jointly { get; set; }

        [XmlIgnore]
        public bool Severally { get; set; }

        [XmlIgnore]
        public bool OtherWay { get; set; }

        [XmlIgnore]
        public bool RepresentSelected { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("jointly")]
        [JsonIgnore]
        public string JointlyText
        {
            get { return Jointly ? "1" : "0"; }
            set { Jointly = (value == "1"); }
        }

        [XmlAttribute("severally")]
        [JsonIgnore]
        public string SeverallyText
        {
            get { return Severally ? "1" : "0"; }
            set { Severally = (value == "1"); }
        }

        [XmlAttribute("otherWay")]
        [JsonIgnore]
        public string OtherWayText
        {
            get { return OtherWay ? "1" : "0"; }
            set { OtherWay = (value == "1"); }
        }

        [XmlText]
        public string Text { get; set; }

        #endregion
    }

    [XmlType(TypeName = "AddemptionOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AddemptionOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02204_AddemptionOfForeignTrader : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002204";

        #region Json Properties

        [XmlIgnore]
        public bool Checked { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlAttribute("CheckedText")]
        public string CheckedText
        {
            get { return Checked ? "1" : "0"; }
            set { Checked = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "ForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0220_ForeignTrader : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002202";

        [XmlText]
        public string Text { get; set; }
    }

    [XmlType(TypeName = "ForeignTraders", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ForeignTraders", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F022_ForeignTraders : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00220";

        [XmlElement(ElementName = "ForeignTraderRegistration")]
        public F02200_ForeignTraderRegistration ForeignTraderRegistration { get; set; }

        [XmlElement(ElementName = "ForeignTraderCountry")]
        public F02201_ForeignTraderCountry ForeignTraderCountry { get; set; }

        [XmlElement(ElementName = "ForeignTraderWayOfRepresentation")]
        public F02203_ForeignTraderWayOfRepresentation ForeignTraderWayOfRepresentation { get; set; }

        [XmlElement(ElementName = "AddemptionOfForeignTrader")]
        public F02204_AddemptionOfForeignTrader AddemptionOfForeignTrader { get; set; }

        [XmlElement(ElementName = "ForeignTrader")]
        public List<F0220_ForeignTrader> ForeignTraderList { get; set; }
    }
}