using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StopOfLiquidation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StopOfLiquidation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F505_StopOfLiquidation : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05050";

        [XmlIgnore]
        public bool StoppingOfLiquidation { get; set; }

        [XmlIgnore]
        public bool CessationOfLiquidation { get; set; }

        [XmlAttribute("StoppingOfLiquidation")]
        [JsonIgnore]
        public string StoppingOfLiquidationText
        {
            get { return StoppingOfLiquidation ? "1" : "0"; }
            set { StoppingOfLiquidation = (value == "1"); }
        }

        [XmlAttribute("CessationOfLiquidation")]
        [JsonIgnore]
        public string CessationOfLiquidationText
        {
            get { return CessationOfLiquidation ? "1" : "0"; }
            set { CessationOfLiquidation = (value == "1"); }
        }
    }
}
