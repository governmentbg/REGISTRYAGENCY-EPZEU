using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StoppingEntry", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StoppingEntry", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F705_StoppingEntry : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "07050";

        private List<string> successors = new List<string>();
        private List<string> transformingCompanies = new List<string>();

        [XmlAttribute("IncomingNumber")]
        public string IncomingNumber { get; set; }

        [XmlAttribute("JudicialCode")]
        public string JudicialCode { get; set; }

        [XmlAttribute("AppType")]
        public string AppType { get; set; }

        [XmlIgnore]
        public List<string> TransformingCompanies
        {
            get { return transformingCompanies; }
            set { transformingCompanies = value; }
        }

        [XmlIgnore]
        public List<string> Successors
        {
            get { return successors; }
            set { successors = value; }
        }

        [XmlIgnore]
        public bool HasTransformation { get; set; }
    }
}
