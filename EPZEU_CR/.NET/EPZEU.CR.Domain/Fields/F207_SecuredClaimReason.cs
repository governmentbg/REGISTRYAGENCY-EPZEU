using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SecuredClaimReason", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SecuredClaimReason", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F207_SecuredClaimReason : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02070";

        [XmlIgnore]
        public bool Contract { get; set; }

        [XmlIgnore]
        public bool CourtOrder { get; set; }

        [XmlIgnore]
        public bool AdministrativeAct { get; set; }

        [XmlIgnore]
        public bool OtherSource { get; set; }

        [XmlIgnore]
        public DateTime? Date { get; set; }


        [JsonIgnore]
        [XmlAttribute("Contract")]
        public string ContractText
        {
            get { return Contract ? "1" : "0"; }
            set { Contract = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("CourtOrder")]
        public string CourtOrderText
        {
            get { return CourtOrder ? "1" : "0"; }
            set { CourtOrder = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("AdministrativeAct")]
        public string AdministrativeActText
        {
            get { return AdministrativeAct ? "1" : "0"; }
            set { AdministrativeAct = (value == "1"); }
        }

        [JsonIgnore]
        [XmlAttribute("OtherSource")]
        public string OtherSourceText
        {
            get { return OtherSource ? "1" : "0"; }
            set { OtherSource = (value == "1"); }
        }

        [XmlElement(ElementName = "Description207")]
        public string Description { get; set; }

        [JsonIgnore]
        public string ReasonDate
        {
            get { return Date.HasValue ? Date.Value.ToString("dd.MM.yyyy") : ""; }
            set
            {
                DateTime tmpDate;

                if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out tmpDate))
                    Date = tmpDate;
                else
                    Date = null;
            }
        }
    }
}
