using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "WayOfEstablishingEuropeanCompany", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "WayOfEstablishingEuropeanCompany", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F070_WayOfEstablishingEuropeanCompany : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00700";

        #region Json Properties

        [XmlIgnore]
        public bool FromAcquisition { get; set; }

        [XmlIgnore]
        public bool FromMerge { get; set; }

        [XmlIgnore]
        public bool FromHolding { get; set; }

        [XmlIgnore]
        public bool FromSubsidiary { get; set; }

        [XmlIgnore]
        public bool FromConvert { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("fromacquisition")]
        [JsonIgnore]
        public string FromAcquisitionText
        {
            get { return FromAcquisition ? "1" : "0"; }
            set { FromAcquisition = (value == "1"); }
        }

        [XmlAttribute("frommerge")]
        [JsonIgnore]
        public string FromMergeText
        {
            get { return FromMerge ? "1" : "0"; }
            set { FromMerge = (value == "1"); }
        }

        [XmlAttribute("fromholding")]
        [JsonIgnore]
        public string FromHoldingText
        {
            get { return FromHolding ? "1" : "0"; }
            set { FromHolding = (value == "1"); }
        }

        [XmlAttribute("fromsubsidiary")]
        [JsonIgnore]
        public string FromSubsidiaryText
        {
            get { return FromSubsidiary ? "1" : "0"; }
            set { FromSubsidiary = (value == "1"); }
        }

        [XmlAttribute("fromconvert")]
        [JsonIgnore]
        public string FromConvertText
        {
            get { return FromConvert ? "1" : "0"; }
            set { FromConvert = (value == "1"); }
        }

        #endregion
    }
}
