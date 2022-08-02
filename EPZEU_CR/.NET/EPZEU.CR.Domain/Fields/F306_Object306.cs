using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Object306", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Object306", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F306_Object306 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03060";

        #region Json Properties

        [XmlIgnore]
        public bool ForGivingAmount { get; set; }

        [XmlIgnore]
        public bool ForGive { get; set; }

        [XmlIgnore]
        public bool ForDoingActivity { get; set; }

        [XmlIgnore]
        public bool ForNotDoingActivity { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("ForGivingAmount")]
        [JsonIgnore]
        public string ForGivingAmountText
        {
            get { return ForGivingAmount ? "1" : "0"; }
            set { ForGivingAmount = (value == "1"); }
        }

        [XmlAttribute("ForGive")]
        [JsonIgnore]
        public string ForGiveText
        {
            get { return ForGive ? "1" : "0"; }
            set { ForGive = (value == "1"); }
        }

        [XmlAttribute("ForDoingActivity")]
        [JsonIgnore]
        public string ForDoingActivityText
        {
            get { return ForDoingActivity ? "1" : "0"; }
            set { ForDoingActivity = (value == "1"); }
        }

        [XmlAttribute("ForNotDoingActivity")]
        [JsonIgnore]
        public string ForNotDoingActivityText
        {
            get { return ForNotDoingActivity ? "1" : "0"; }
            set { ForNotDoingActivity = (value == "1"); }
        }

        #endregion
    }
}
