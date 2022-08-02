using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SuspendProceedingsSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SuspendProceedingsSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F906_2_SuspendProceedingsSecIns : BankruptcyRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09062";

        [XmlAttribute]
        [JsonIgnore]
        public string Visible
        {
            get { return IsVisible ? "1" : "0"; }
            set { IsVisible = (value == "1"); }
        }

        [XmlElement(ElementName = "SuspendReson")]
        public BankruptcySuspendReason SuspendReson { get; set; }
    }
}
