using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SecuredClaimSubject", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SecuredClaimSubject", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F208_SecuredClaimSubject : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02080";

        #region Json Properties

        [XmlIgnore]
        public bool GivingMoney { get; set; }

        [XmlIgnore]
        public bool GivingThing { get; set; }

        [XmlIgnore]
        public bool DoingActions { get; set; }

        [XmlIgnore]
        public bool NotDoingActions { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlAttribute("GivingMoney")]
        public string GivingMoneyText
        {
            get { return GivingMoney ? "1" : "0"; }
            set { GivingMoney = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("GivingThing")]
        public string GivingThingText
        {
            get { return GivingThing ? "1" : "0"; }
            set { GivingThing = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("DoingActions")]
        public string DoingActionsText
        {
            get { return DoingActions ? "1" : "0"; }
            set { DoingActions = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("NotDoingActions")]
        public string NotDoingActionsText
        {
            get { return NotDoingActions ? "1" : "0"; }
            set { NotDoingActions = (value == "1"); }
        }

        #endregion
    }
}