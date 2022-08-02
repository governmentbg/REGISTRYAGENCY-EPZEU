using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "BuyBackDecision", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BuyBackDecision", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F034_BuyBackDecision : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00340";

        #region Json Properties

        [XmlIgnore]
        public bool Cheked { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlText]
        public override string Text
        {
            get { return Cheked ? "1" : "0"; }
            set { Cheked = (value == "1"); }
        }

        #endregion
    }
}
