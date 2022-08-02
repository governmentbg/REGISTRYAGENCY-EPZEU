using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Reason403", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Reason403", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F403_Reason403 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "04030";

        #region Json Properties

        [XmlIgnore]
        public bool Court { get; set; }

        [XmlIgnore]
        public bool LegalExecutor { get; set; }

        [XmlIgnore]
        public bool ADV { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("Court")]
        [JsonIgnore]
        public string CourtText
        {
            get { return Court ? "1" : "0"; }
            set { Court = (value == "1"); }
        }

        [XmlAttribute("LegalExecutor")]
        [JsonIgnore]
        public string LegalExecutorText
        {
            get { return LegalExecutor ? "1" : "0"; }
            set { LegalExecutor = (value == "1"); }
        }

        [XmlAttribute("ADV")]
        [JsonIgnore]
        public string ADVText
        {
            get { return ADV ? "1" : "0"; }
            set { ADV = (value == "1"); }
        }

        [XmlAttribute("CourtLegalExecutor")]
        public string CourtLegalExecutor { get; set; }

        [XmlAttribute("CaseNumber")]
        public string CaseNumber { get; set; }

        #endregion
    }
}