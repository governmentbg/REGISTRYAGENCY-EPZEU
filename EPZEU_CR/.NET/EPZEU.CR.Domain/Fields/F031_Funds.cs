using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Funds", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Funds", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F031_Funds : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00310";

        #region Private properties

        private bool isInEuro;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool IsInEuro
        {
            get { return isInEuro; }
            set { isInEuro = value; }
        }

        #endregion

        #region Xml Properties

        [XmlAttribute("euro")]
        [JsonIgnore]
        public string EuroText
        {
            get { return isInEuro ? "1" : "0"; }
            set { isInEuro = (value == "1"); }
        }

        #endregion
    }
}