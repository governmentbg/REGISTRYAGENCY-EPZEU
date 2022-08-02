using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ReasonForEntry529", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReasonForEntry529", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F529_ReasonForEntry529 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05290";

        #region Json Properties

        [XmlIgnore]
        public bool Article63 { get; set; }

        [XmlIgnore]
        public bool Article6 { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("Article63")]
        [JsonIgnore]
        public string Article63Text
        {
            get { return Article63 ? "1" : "0"; }
            set { Article63 = (value == "1"); }
        }

        [XmlAttribute("Article6")]
        [JsonIgnore]
        public string Article6Text
        {
            get { return Article6 ? "1" : "0"; }
            set { Article6 = (value == "1"); }
        }

        #endregion
    }
}
