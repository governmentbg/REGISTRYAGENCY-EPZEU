using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "BranchClosure", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BranchClosure", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F055_BranchClosure : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00550";

        [XmlAttribute("Company")]
        public string Company { get; set; }

        [XmlAttribute("Seat")]
        public string Seat { get; set; }

        [XmlAttribute("SubUIC")]
        public string SubUIC { get; set; }

        [XmlIgnore]
        public bool Closed { get; set; }

        [XmlAttribute("closed")]
        [JsonIgnore]
        public string ClosedText
        {
            get { return Closed ? "1" : "0"; }
            set { Closed = (value == "1"); }
        }
    }
}
