using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "DistraintData", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DistraintData", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F321_DistraintData : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03210";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        public Address Address { get; set; }

        public Price Price { get; set; }

        [XmlAttribute("AssetsOfCompany")]
        public string AssetsOfCompany { get; set; }

        #region Json Properties

        [XmlIgnore]
        public bool Court { get; set; }

        [XmlIgnore]
        public bool LegalExecutor { get; set; }

        [XmlIgnore]
        public bool ADV { get; set; }

        [XmlIgnore]
        public bool IncomingAmount { get; set; }

        [XmlIgnore]
        public bool RemainingAmount { get; set; }

        [XmlIgnore]
        public bool EnterprisesLikeCombination { get; set; }

        [XmlIgnore]
        public bool SeparateAssets { get; set; }
        #endregion

        #region Xml Properties

        [XmlAttribute("Court")]
        [JsonIgnore]
        public string CourtText
        {
            get { return Court ? "1" : "0"; }
            set { Court = (value == "1"); }
        }

        [XmlAttribute("LegalExecutor")]
        [JsonIgnore]
        public string LegalExecutorText
        {
            get { return LegalExecutor ? "1" : "0"; }
            set { LegalExecutor = (value == "1"); }
        }

        [XmlAttribute("ADV")]
        [JsonIgnore]
        public string ADVText
        {
            get { return ADV ? "1" : "0"; }
            set { ADV = (value == "1"); }
        }

        [XmlAttribute("CourtLegalExecutor")]
        public string CourtLegalExecutor { get; set; }

        [XmlAttribute("CaseNumber")]
        public string CaseNumber { get; set; }

        [XmlAttribute("IncomingAmount")]
        [JsonIgnore]
        public string IncomingAmountText
        {
            get { return IncomingAmount ? "1" : "0"; }
            set { IncomingAmount = (value == "1"); }
        }

        [XmlAttribute("RemainingAmount")]
        [JsonIgnore]
        public string RemainingAmountText
        {
            get { return RemainingAmount ? "1" : "0"; }
            set { RemainingAmount = (value == "1"); }
        }

        [XmlAttribute("EnterprisesLikeCombination")]
        [JsonIgnore]
        public string EnterprisesLikeCombinationText
        {
            get { return EnterprisesLikeCombination ? "1" : "0"; }
            set { EnterprisesLikeCombination = (value == "1"); }
        }

        [XmlAttribute("SeparateAssets")]
        [JsonIgnore]
        public string SeparateAssetsText
        {
            get { return SeparateAssets ? "1" : "0"; }
            set { SeparateAssets = (value == "1"); }
        }

        #endregion
    }
}
