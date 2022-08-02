using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "EuropeanHoldingCompanyAsShareholder", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "EuropeanHoldingCompanyAsShareholder", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02320_EuropeanHoldingCompanyAsShareholder : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002320";

        public Person Subject { get; set; }

        public Address Address { get; set; }
    }

    [XmlType(TypeName = "EuropeanHoldingCompanysAsShareholders", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "EuropeanHoldingCompanysAsShareholders", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F023b_EuropeanHoldingCompanysAsShareholders : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00232";

        [XmlElement(ElementName = "EuropeanHoldingCompanyAsShareholder")]
        public List<F02320_EuropeanHoldingCompanyAsShareholder> EuropeanHoldingCompanyAsShareholderList { get; set; }
    }
}