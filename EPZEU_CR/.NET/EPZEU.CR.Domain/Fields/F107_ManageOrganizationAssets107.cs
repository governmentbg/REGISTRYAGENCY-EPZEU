using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ManageOrganizationAssets107", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ManageOrganizationAssets107", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F107_ManageOrganizationAssets107 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01070";

        [XmlIgnore]
        public bool Limited { get; set; }

        [XmlAttribute("limited")]
        [JsonIgnore]
        public string LimitedText
        {
            get { return Limited ? "1" : "0"; }
            set { Limited = (value == "1"); }
        }

        [XmlIgnore]
        public bool Forbidden { get; set; }

        [XmlAttribute("forbidden")]
        [JsonIgnore]
        public string ForbiddenText
        {
            get { return Forbidden ? "1" : "0"; }
            set { Forbidden = (value == "1"); }
        }
    }
}
