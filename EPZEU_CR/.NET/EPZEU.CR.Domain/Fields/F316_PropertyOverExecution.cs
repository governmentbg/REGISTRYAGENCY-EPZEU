using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PropertyOverExecution", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PropertyOverExecution", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F316_PropertyOverExecution : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03160";

        #region Json Properties

        [XmlIgnore]
        public bool WholeCompany { get; set; }

        [XmlIgnore]
        public bool PartOfCompany { get; set; }

        [XmlAttribute("AssetsOfCompany")]
        public string AssetsOfCompany { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("WholeCompany")]
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
