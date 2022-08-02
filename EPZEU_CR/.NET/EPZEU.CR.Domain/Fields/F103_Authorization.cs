using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Authorization", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Authorization", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F103_Authorization : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01030";

        #region Json Properties

        [XmlIgnore]
        public bool Deprived { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("deprived")]
        [JsonIgnore]
        public string DeprivedText
        {
            get { return Deprived ? "1" : "0"; }
            set { Deprived = (value == "1"); }
        }

        #endregion

        [XmlElement(ElementName = "Description103")]
        public string Description { get; set; }
    }
}
