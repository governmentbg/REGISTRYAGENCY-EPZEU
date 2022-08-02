using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ForeignCompanyData", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ForeignCompanyData", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0223_ForeignCompanyData : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002230";

        public ForeignCompanyBaseData CompanyData { get; set; }
    }

    [XmlType(TypeName = "EUIEAddempted", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "EUIEAddempted", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02231_EUIEAddempted : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002231";

        [XmlIgnore]
        public bool Addempted { get; set; }

        [XmlText]
        [JsonIgnore]
        public string AddemptedText
        {
            get { return Addempted ? "1" : "0"; }
            set { Addempted = (value == "1"); }
        }
    }

    [XmlType(TypeName = "RepresentersWayOfManagement", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "RepresentersWayOfManagement", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02232_RepresentersWayOfManagement : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002232";

        private string _text { get; set; }

        #region Json Properties

        [XmlIgnore]
        public bool Jointly { get; set; }

        [XmlIgnore]
        public bool Severally { get; set; }

        [XmlIgnore]
        public bool OtherWay { get; set; }

        [XmlIgnore]
        public bool RepresentSelected
        {
            get
            {
                return (this.Jointly || this.OtherWay || this.Severally);
            }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        public string Text
        {
            get { return string.IsNullOrEmpty(_text) ? "" : _text; }
            set { _text = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }

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

        #endregion
    }

    [XmlType(TypeName = "PowerOfLiquidators", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PowerOfLiquidators", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02233_PowerOfLiquidators : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002233";

        [XmlIgnore]
        private string _text { get; set; }

        [XmlText]
        public string Text
        {
            get { return string.IsNullOrEmpty(_text) ? "" : _text; }
            set { _text = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }
    }

    [XmlType(TypeName = "PowerOfTrustees", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PowerOfTrustees", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02234_PowerOfTrustees : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002234";

        [XmlIgnore]
        private string _text { get; set; }

        [XmlText]
        public string Text
        {
            get { return string.IsNullOrEmpty(_text) ? "" : _text; }
            set { _text = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }
    }

    [XmlType(TypeName = "EuropeanEconomicInterestRepresenter", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "EuropeanEconomicInterestRepresenter", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02235_EuropeanEconomicInterestRepresenter : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002235";

        private string _representerName { get; set; }

        public EuropeanEconomicInterestRepresenterTypes RepresenterType { get; set; }

        public string RepresenterName
        {
            get { return string.IsNullOrEmpty(_representerName) ? "" : _representerName; }
            set { _representerName = string.IsNullOrEmpty(value) ? "" : value.Trim(); }
        }
    }

    [XmlType(TypeName = "EuropeanEconomicInterestGrouping", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "EuropeanEconomicInterestGrouping", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0223_EuropeanEconomicInterestGrouping : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00223";

        #region Json Properties

        [XmlIgnore]
        public List<F02235_EuropeanEconomicInterestRepresenter> EuropeanEconomicInterestRepresenterRegularList { get; set; }

        [XmlIgnore]
        public List<F02235_EuropeanEconomicInterestRepresenter> EuropeanEconomicInterestRepresenterLiquidatorList { get; set; }

        [XmlIgnore]
        public List<F02235_EuropeanEconomicInterestRepresenter> EuropeanEconomicInterestRepresenterTrusteeList { get; set; }

        #endregion

        public F0223_ForeignCompanyData ForeignCompanyData { get; set; }

        public F02231_EUIEAddempted EUIEAddempted { get; set; }

        public F02232_RepresentersWayOfManagement RepresentersWayOfManagement { get; set; }

        public F02233_PowerOfLiquidators PowerOfLiquidators { get; set; }

        public F02234_PowerOfTrustees PowerOfTrustees { get; set; }

        [XmlElement(ElementName = "EuropeanEconomicInterestRepresenter")]
        public List<F02235_EuropeanEconomicInterestRepresenter> EuropeanEconomicInterestRepresenterList { get; set; }
    }
}