using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ZPPCKOrganizationLimit", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ZPPCKOrganizationLimit", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1110_ZPPCKOrganizationLimit : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "011100";

        [XmlAttribute("securities")]
        public string Securities { get; set; }

        [XmlIgnore]
        public bool CessasionOfSales { get; set; }

        [XmlAttribute("cessasionOfSales")]
        [JsonIgnore]
        public string CessasionOfSalesText
        {
            get { return CessasionOfSales ? "1" : "0"; }
            set { CessasionOfSales = (value == "1"); }
        }

        [XmlIgnore]
        public bool CessasionOfDeals { get; set; }

        [XmlAttribute("cessasionOfDeals")]
        [JsonIgnore]
        public string CessasionOfDealsText
        {
            get { return CessasionOfDeals ? "1" : "0"; }
            set { CessasionOfDeals = (value == "1"); }
        }

        [XmlAttribute("cessatedTill")]
        public string CessatedTill { get; set; }
    }

    [XmlType(TypeName = "LimitSubjectOfActivity111", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "LimitSubjectOfActivity111", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F111_LimitSubjectOfActivity111 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01110";

        [XmlElement(ElementName = "ZPPCKOrganizationLimit")]
        public List<F1110_ZPPCKOrganizationLimit> ZPPCKOrganizationLimitsList { get; set; }
    }
}
