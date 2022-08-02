using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "FormOfTransforming801", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "FormOfTransforming801", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F801_FormOfTransforming801 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08010";

        [XmlIgnore]
        public bool Influx { get; set; }

        [XmlIgnore]
        public bool Fusion { get; set; }

        [XmlIgnore]
        public bool Division { get; set; }

        [XmlIgnore]
        public bool Separation { get; set; }


        [XmlAttribute("Influx")]
        [JsonIgnore]
        public string InfluxText
        {
            get { return Influx ? "1" : "0"; }
            set { Influx = (value == "1"); }
        }

        [XmlAttribute("Fusion")]
        [JsonIgnore]
        public string FusionText
        {
            get { return Fusion ? "1" : "0"; }
            set { Fusion = (value == "1"); }
        }

        [XmlAttribute("Division")]
        [JsonIgnore]
        public string DivisionText
        {
            get { return Division ? "1" : "0"; }
            set { Division = (value == "1"); }
        }

        [XmlAttribute("Separation")]
        [JsonIgnore]
        public string SeparationText
        {
            get { return Separation ? "1" : "0"; }
            set { Separation = (value == "1"); }
        }
    }
}
