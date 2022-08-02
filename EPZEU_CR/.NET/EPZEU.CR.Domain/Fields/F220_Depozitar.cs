using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    public abstract partial class DepozitarDistraintData : Record
    {
        #region Json Properties

        [XmlIgnore]
        public bool ReasonCourt { get; set; }

        [XmlIgnore]
        public bool ReasonCourtExecuter { get; set; }

        [XmlIgnore]
        public bool ReasonADV { get; set; }

        [XmlIgnore]
        public bool IncomingDistraint { get; set; }

        #endregion

        #region Xml Properties

        public Person Subject { get; set; }

        public Address Address { get; set; }

        [JsonIgnore]
        [XmlAttribute("ReasonCourt")]
        public string ReasonCourtText
        {
            get { return ReasonCourt ? "1" : "0"; }
            set { ReasonCourt = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("ReasonCourtExecuter")]
        public string ReasonCourtExecuterText
        {
            get { return ReasonCourtExecuter ? "1" : "0"; }
            set { ReasonCourtExecuter = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("ReasonADV")]
        public string ReasonADVText
        {
            get { return ReasonADV ? "1" : "0"; }
            set { ReasonADV = (value == "1"); }
        }

        public string Court { get; set; }

        public string CaseNo { get; set; }

        [JsonIgnore]
        [XmlAttribute("IncomingDistraint")]
        public string IncomingDistraintText
        {
            get { return IncomingDistraint ? "1" : "0"; }
            set { IncomingDistraint = (value == "1"); }
        }

        public string PartValue { get; set; }

        public string PartCount { get; set; }

        #endregion
    }

    [XmlType(TypeName = "DepozitarDistraintDetails", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DepozitarDistraintDetails", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F2200_DepozitarDistraintDetails : DepozitarDistraintData
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "022000";
    }

    [XmlType(TypeName = "DepozitarDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DepozitarDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F22001_DepozitarDistraint : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "022001";

        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "DepozitarReminderDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DepozitarReminderDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F22002_DepozitarReminderDistraint : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "022002";

        [XmlIgnore]
        public bool ReminderDistraint { get; set; }

        [JsonIgnore]
        [XmlAttribute("ReminderDistraint")]
        public string ReminderDistraintText
        {
            get { return ReminderDistraint ? "1" : "0"; }
            set { ReminderDistraint = (value == "1"); }
        }

        public string Value { get; set; }

        public string Currency { get; set; }
    }

    [XmlType(TypeName = "Depozitar", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Depozitar", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F220_Depozitar : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02200";

        [XmlElement(ElementName = "DepozitarDistraintDetails")]
        public F2200_DepozitarDistraintDetails DepozitarDistraintDetails { get; set; }

        [XmlElement(ElementName = "DepozitarReminderDistraint")]
        public F22002_DepozitarReminderDistraint DepozitarReminderDistraint { get; set; }

        [XmlElement(ElementName = "DepozitarDistraint")]
        public List<F22001_DepozitarDistraint> DepozitarDistraintList { get; set; }
    }
}