using System;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;
using System.Text.Json.Serialization;
using System.Globalization;
using System.Collections.Generic;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SupervisingBoardSupporter", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisingBoardSupporter", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01430_SupervisingBoardSupporter : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001430";

        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "SupervisingBoardSupporters", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisingBoardSupporters", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F014v_SupervisingBoardSupporters : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00143";

        [XmlElement(ElementName = "SupervisingBoardSupporter")]
        public List<F01430_SupervisingBoardSupporter> SupervisingBoardSupporterList { get; set; }
    }
}
