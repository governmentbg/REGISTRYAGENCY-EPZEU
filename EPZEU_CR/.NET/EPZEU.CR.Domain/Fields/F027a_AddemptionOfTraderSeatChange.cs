using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "AddemptionOfTraderSeatChange", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AddemptionOfTraderSeatChange", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F027a_AddemptionOfTraderSeatChange : SeatRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00271";

        [XmlIgnore]
        public bool IsTraderAddempted { get; set; }

        [XmlAttribute("IsTraderAddemptedText")]
        [JsonIgnore]
        public string IsTraderAddemptedText
        {
            get { return IsTraderAddempted ? "1" : "0"; }
            set { IsTraderAddempted = (value == "1"); }
        }

        public ForeignAuthority ForeignAuthority { get; set; }
    }
}