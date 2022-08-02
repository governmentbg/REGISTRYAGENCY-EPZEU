using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ContinuingTradeActivity", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ContinuingTradeActivity", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F504_ContinuingTradeActivity : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05040";

        [XmlIgnore]
        public bool Continue { get; set; }

        [XmlIgnore]
        public bool Restore { get; set; }

        [XmlAttribute("Continue")]
        [JsonIgnore]
        public string ContinueText
        {
            get { return Continue ? "1" : "0"; }
            set { Continue = (value == "1"); }
        }

        [XmlAttribute("Restore")]
        [JsonIgnore]
        public string RestoreText
        {
            get { return Restore ? "1" : "0"; }
            set { Restore = (value == "1"); }
        }
    }
}
