using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PledgePropertyDescription", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PledgePropertyDescription", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F213_PledgePropertyDescription : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02130";

        #region Json Properties

        [XmlIgnore]
        public bool CorporateShare { get; set; }

        [XmlIgnore]
        public bool PartOfCorporateShare { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlElement("CorporateShare")]
        public string CorporateShareText
        {
            get { return CorporateShare ? "1" : "0"; }
            set { CorporateShare = (value == "1"); }
        }

        [JsonIgnore]
        [XmlElement("PartOfCorporateShare")]
        public string PartOfCorporateShareText
        {
            get { return PartOfCorporateShare ? "1" : "0"; }
            set { PartOfCorporateShare = (value == "1"); }
        }

        public string SharesCount { get; set; }

        public string Nominal { get; set; }

        public string Capital { get; set; }

        #endregion
    }
}