using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Description", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Description", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F311_Description : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03110";

        #region Json Properties
        [XmlIgnore]
        public bool WholeCompany { get; set; }

        [XmlIgnore]
        public bool PartOfCompany { get; set; }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string WholeCompanyText
        {
            get { return WholeCompany ? "1" : "0"; }
            set { WholeCompany = (value == "1"); }
        }

        [XmlAttribute("PartOfCompany")]
        [JsonIgnore]
        public string PartOfCompanyText
        {
            get { return PartOfCompany ? "1" : "0"; }
            set { PartOfCompany = (value == "1"); }
        }

        #endregion

    }
}
