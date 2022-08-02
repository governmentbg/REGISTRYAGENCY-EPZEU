using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SoleCapitalOwner", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SoleCapitalOwner", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F023_SoleCapitalOwner : RecordField
    { 
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00230";

        public Person Subject { get; set; }
    }
}