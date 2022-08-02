using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ReinstatementDisallowPetition", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementDisallowPetition", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911a0_ReinstatementDisallowPetition : BankruptcyRecord
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091110";

        [XmlElement(ElementName = "Petitioner")]
        public Person Petitioner { get; set; }

        [XmlElement(ElementName = "SenderType")]
        public BankruptcySenderType SenderType { get; set; }

        [XmlElement(ElementName = "InscribedAct")]
        public bool InscribedAct { get; set; }
    }

    [XmlType(TypeName = "ReinstatementsDisallowPetition", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementsDisallowPetition", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911a_ReinstatementsDisallowPetition : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09111";

        [XmlElement(ElementName = "ReinstatementDisallowPetition")]
        public List<F911a0_ReinstatementDisallowPetition> ReinstatementDisallowPetitionList { get; set; }
    }
}