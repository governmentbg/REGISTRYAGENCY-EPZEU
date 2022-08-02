using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "DiscontinuanceOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DiscontinuanceOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F022a_DiscontinuanceOfForeignTrader : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00221";

        #region Json Properties

        [XmlIgnore]
        public bool FinishingOfLiquidation { get; set; }

        [XmlIgnore]
        public bool StopOfLiquidation { get; set; }

        [XmlIgnore]
        public bool ContinuationOfActivity { get; set; }

        [XmlIgnore]
        public bool BeginOfLiquidation { get; set; }

        [XmlIgnore]
        public bool StopForeignerTrader { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("FinishingOfLiquidation")]
        [JsonIgnore]
        public string FinishingOfLiquidationText
        {
            get { return FinishingOfLiquidation ? "1" : "0"; }
            set { FinishingOfLiquidation = (value == "1"); }
        }

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

        [XmlAttribute("StopForeignerTrader")]
        [JsonIgnore]
        public string StopForeignerTraderText
        {
            get { return StopForeignerTrader ? "1" : "0"; }
            set { StopForeignerTrader = (value == "1"); }
        }

        #endregion
    }
}