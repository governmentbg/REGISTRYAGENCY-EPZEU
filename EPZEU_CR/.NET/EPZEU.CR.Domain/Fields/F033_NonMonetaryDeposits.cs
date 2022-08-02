using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "NonMonetaryDeposit", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "NonMonetaryDeposit", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0330_NonMonetaryDeposit : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "003300";

        #region Properties

        [XmlElement(ElementName = "Description033")]
        public string Description { get; set; }

        public string Value { get; set; }

        public OutgoingNumber OutgoingNumber { get; set; }

        #endregion
    }

    [XmlType(TypeName = "NonMonetaryDeposits", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "NonMonetaryDeposits", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F033_NonMonetaryDeposits : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00330";

        [XmlElement(ElementName = "NonMonetaryDeposit")]
        public List<F0330_NonMonetaryDeposit> NonMonetaryDepositsList { get; set; }
    }
}