using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "DiscontinuanceOfTheEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DiscontinuanceOfTheEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0224_DiscontinuanceOfTheEUIE : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00224";

        #region Json Properties

        [XmlIgnore]
        public bool StopOfLiquidation { get; set; }

        [XmlIgnore]
        public bool ContinuationOfActivity { get; set; }

        [XmlIgnore]
        public bool BeginOfLiquidation { get; set; }

        [XmlIgnore]
        public bool StopEUIE { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("StopOfLiquidation")]
        [JsonIgnore]
        public string StopOfLiquidationText
        {
            get { return StopOfLiquidation ? "1" : "0"; }
            set { StopOfLiquidation = (value == "1"); }
        }

        [XmlAttribute("ContinuationOfActivity")]
        [JsonIgnore]
        public string ContinuationOfActivityText
        {
            get { return ContinuationOfActivity ? "1" : "0"; }
            set { ContinuationOfActivity = (value == "1"); }
        }

        [XmlAttribute("BeginOfLiquidation")]
        [JsonIgnore]
        public string BeginOfLiquidationText
        {
            get { return BeginOfLiquidation ? "1" : "0"; }
            set { BeginOfLiquidation = (value == "1"); }
        }

        [XmlAttribute("StopEUIE")]
        [JsonIgnore]
        public string StopEUIEText
        {
            get { return StopEUIE ? "1" : "0"; }
            set { StopEUIE = (value == "1"); }
        }

        #endregion
    }
}