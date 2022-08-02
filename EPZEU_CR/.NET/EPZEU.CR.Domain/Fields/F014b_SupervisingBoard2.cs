using System;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;
using System.Text.Json.Serialization;
using System.Globalization;
using System.Collections.Generic;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Supervisor2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Supervisor2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01421_Supervisor2 : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001421";

        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "SupervisingBoardMandate2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisingBoardMandate2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01420_SupervisingBoardMandate2 : Mandate
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001420";
    }

    [XmlType(TypeName = "SupervisingBoard2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisingBoard2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F014b_SupervisingBoard2 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00142";

        [XmlElement(ElementName = "SupervisingBoardMandate2")]
        public F01420_SupervisingBoardMandate2 SupervisingBoard2Mandate { get; set; }

        [XmlElement(ElementName = "Supervisor2")]
        public List<F01421_Supervisor2> Supervisor2List { get; set; }
    }
}
