using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PledgeAddemption", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PledgeAddemption", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F225_PledgeAddemption : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02250";

        #region Json Properties

        [XmlIgnore]
        public bool Addempted { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlAttribute("addempted")]
        public string AddemptedText
        {
            get { return Addempted ? "1" : "0"; }
            set { Addempted = (value == "1"); }
        }

        #endregion
    }
}