using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "AcquisitionEnterprise", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AcquisitionEnterprise", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F6020_AcquisitionEnterprise : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "060200";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "AcquisitionEnterprises", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AcquisitionEnterprises", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F602_AcquisitionEnterprises : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "06020";

        [XmlElement(ElementName = "AcquisitionEnterprise")]
        public List<F6020_AcquisitionEnterprise> AcquisitionEnterpriseList { get; set; }
    }
}
