using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "WayOfEstablishingEuropeanCooperativeSociety", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "WayOfEstablishingEuropeanCooperativeSociety", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F070a_WayOfEstablishingEuropeanCooperativeSociety : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00701";

        #region Json Properties

        [XmlIgnore]
        public bool ThroughInitialFormation { get; set; }

        [XmlIgnore]
        public bool ThroughAcquisitionOrMerge { get; set; }

        [XmlIgnore]
        public bool ByConvertingCooperativeSocietyIntoEuropeanCooperativeSociety { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("throughInitialFormation")]
        [JsonIgnore]
        public string ThroughInitialFormationText
        {
            get { return ThroughInitialFormation ? "1" : "0"; }
            set { ThroughInitialFormation = (value == "1"); }
        }

        [XmlAttribute("throughAcquisitionOrMerge")]
        [JsonIgnore]
        public string ThroughAcquisitionOrMergeText
        {
            get { return ThroughAcquisitionOrMerge ? "1" : "0"; }
            set { ThroughAcquisitionOrMerge = (value == "1"); }
        }

        [XmlAttribute("byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety")]
        [JsonIgnore]
        public string ByConvertingCooperativeSocietyIntoEuropeanCooperativeSocietyText
        {
            get { return ByConvertingCooperativeSocietyIntoEuropeanCooperativeSociety ? "1" : "0"; }
            set { ByConvertingCooperativeSocietyIntoEuropeanCooperativeSociety = (value == "1"); }
        }

        #endregion
    }
}
