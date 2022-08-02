using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ResumeOfLiquidation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ResumeOfLiquidation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F506_ResumeOfLiquidation : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05060";

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
