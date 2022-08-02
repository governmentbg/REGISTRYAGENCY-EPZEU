using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PartialEraseDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PartialEraseDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F325a_PartialEraseDistraint : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03251";

        [XmlAttribute("Description3251")]
        public string description { get; set; }

        #region Json Properties

        [XmlIgnore]
        public bool Checked { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlText]
        public string Text
        {
            get { return Checked ? "1" : "0"; }
            set { Checked = (value == "1"); }
        }

        #endregion
    }
}
