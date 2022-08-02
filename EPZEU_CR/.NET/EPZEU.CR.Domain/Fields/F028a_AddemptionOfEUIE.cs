using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "AddemptionOfEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AddemptionOfEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F028a_AddemptionOfEUIE : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00281";

        [XmlIgnore]
        public bool Cheked { get; set; }

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return Cheked ? "1" : "0"; }
            set { Cheked = (value == "1"); }
        }
    }
}