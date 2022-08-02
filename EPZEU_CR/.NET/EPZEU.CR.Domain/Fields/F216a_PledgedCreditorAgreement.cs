using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PledgedCreditorAgreement", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "PledgedCreditorAgreement", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F216a_PledgedCreditorAgreement : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02161";

        #region Json Properties

        [XmlIgnore]
        public bool Article_8_Para_3_Of_SPA { get; set; }

        [XmlIgnore]
        public bool Article_32_Para_5_Of_SPA { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlAttribute("Article_8_Para_3_Of_SPA")]
        public string Article_8_Para_3_Of_SPAText
        {
            get { return Article_8_Para_3_Of_SPA ? "1" : "0"; }
            set { Article_8_Para_3_Of_SPA = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("Article_32_Para_5_Of_SPA")]
        public string Article_32_Para_5_Of_SPAText
        {
            get { return Article_32_Para_5_Of_SPA ? "1" : "0"; }
            set { Article_32_Para_5_Of_SPA = (value == "1"); }
        }


        #endregion
    }
}
