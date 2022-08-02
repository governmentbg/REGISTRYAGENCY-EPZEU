using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "TrusteeSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "TrusteeSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F9120_2_TrusteeSecIns : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091220";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }

        [XmlElement(ElementName = "Contacts")]
        public Contacts Contacts { get; set; }

        [XmlElement(ElementName = "Status")]
        public TrusteeStatus Status { get; set; }

        [XmlElement(ElementName = "ActData")]
        public BankruptcyAct ActData { get; set; }

        [XmlAttribute("InductionDate")]
        public string InductionDate { get; set; }

        [XmlAttribute("AcquittanseDate")]
        public string AcquittanseDate { get; set; }

        #region Json properties

        [XmlIgnore]
        public bool WarrantyFund { get; set; }

        #endregion

        [XmlAttribute("WarrantyFund")]
        [JsonIgnore]
        public string WarrantyFundText
        {
            get { return WarrantyFund ? "true" : "false"; }
            set { WarrantyFund = (string.Compare(value, "true", true) == 0); }
        }
    }

    [XmlType(TypeName = "TrusteesSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "TrusteesSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F912_2_TrusteesSecIns : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09122";

        [XmlElement(ElementName = "TrusteeSecIns")]
        public List<F9120_2_TrusteeSecIns> TrusteeSecInsList { get; set; }
    }
}
