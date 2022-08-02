using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "AdministrativeBody", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AdministrativeBody", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01221_AdministrativeBody : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001221";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "AdministrativeBoardMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AdministrativeBoardMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01220_AdministrativeBoardMandate : Mandate
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001220";
    }

    [XmlType(TypeName = "AdministrativeBoard", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AdministrativeBoard", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F012b_AdministrativeBoard : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00122";

        public F01220_AdministrativeBoardMandate AdministrativeBoardMandate { get; set; }

        [XmlElement(ElementName = "AdministrativeBody")]
        public List<F01221_AdministrativeBody> AdministrativeBodyList { get; set; }
    }
}