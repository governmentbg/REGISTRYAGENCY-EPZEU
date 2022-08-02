using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Trustee", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Trustee", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F9120_Trustee : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091200";

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

    [XmlType(TypeName = "Trustees", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Trustees", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F912_Trustees : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09120";

        [XmlElement(ElementName = "Trustee")]
        public List<F9120_Trustee> TrusteeList { get; set; }
    }
}
