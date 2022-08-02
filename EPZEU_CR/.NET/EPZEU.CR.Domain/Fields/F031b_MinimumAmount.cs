using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "MinimumAmount", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "MinimumAmount", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F031b_MinimumAmount : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00312";

        #region Private members

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