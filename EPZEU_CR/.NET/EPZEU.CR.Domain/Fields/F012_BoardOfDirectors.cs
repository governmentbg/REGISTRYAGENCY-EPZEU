using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Director", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Director", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01201_Director : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001201";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "BoardOfDirectorsMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BoardOfDirectorsMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01200_BoardOfDirectorsMandate : Mandate
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001200";
    }

    [XmlType(TypeName = "BoardOfDirectors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BoardOfDirectors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F012_BoardOfDirectors : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00120";

        public F01200_BoardOfDirectorsMandate BoardOfDirectorsMandate { get; set; }

        [XmlElement(ElementName = "Director")]
        public List<F01201_Director> DirectorList { get; set; }
    }
}