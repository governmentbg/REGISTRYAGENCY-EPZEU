using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ManageOrganizationAssets112", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ManageOrganizationAssets112", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F112_ManageOrganizationAssets112 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01120";

        #region Json Properties

        [XmlIgnore]
        public bool CessationOfByingSecurities { get; set; }

        [XmlIgnore]
        public bool CessationOfByingStakes { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("cessationOfByingSecurities")]
        [JsonIgnore]
        public string CessationOfByingSecuritiesText
        {
            get { return CessationOfByingSecurities ? "1" : "0"; }
            set { CessationOfByingSecurities = (value == "1"); }
        }

        [XmlAttribute("cessationOfByingStakes")]
        [JsonIgnore]
        public string CessationOfByingStakesText
        {
            get { return CessationOfByingStakes ? "1" : "0"; }
            set { CessationOfByingStakes = (value == "1"); }
        }

        #endregion
    }
}
