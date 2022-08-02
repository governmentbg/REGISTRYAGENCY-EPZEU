using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "TraverseOfRecoverPlan", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "TraverseOfRecoverPlan", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F906a_TraverseOfRecoverPlan : BankruptcyRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09061";

        [XmlAttribute]
        [JsonIgnore]
        public string Visible
        {
            get { return IsVisible ? "1" : "0"; }
            set { IsVisible = (value == "1"); }
        }
    }
}
