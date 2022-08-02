using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "FormOfTransforming701", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "FormOfTransforming701", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F701_FormOfTransforming701 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "07010";

        [XmlIgnore]
        public bool Influx { get; set; }
        [XmlIgnore]
        public bool Fusion { get; set; }
        [XmlIgnore]
        public bool Division { get; set; }
        [XmlIgnore]
        public bool Separation { get; set; }
        [XmlIgnore]
        public bool ChangeLegalForm { get; set; }
        [XmlIgnore]
        public bool TransferringProperty { get; set; }
        [XmlIgnore]
        public bool ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC { get; set; }
        [XmlIgnore]
        public bool ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany { get; set; }

        [XmlAttribute("Influx")]
        [JsonIgnore]
        public string InfluxText
        {
            get { return Influx ? "1" : "0"; }
            set { Influx = (value == "1"); }
        }

        [XmlAttribute("Fusion")]
        [JsonIgnore]
        public string FusionText
        {
            get { return Fusion ? "1" : "0"; }
            set { Fusion = (value == "1"); }
        }

        [XmlAttribute("Division")]
        [JsonIgnore]
        public string DivisionText
        {
            get { return Division ? "1" : "0"; }
            set { Division = (value == "1"); }
        }

        [XmlAttribute("Separation")]
        [JsonIgnore]
        public string SeparationText
        {
            get { return Separation ? "1" : "0"; }
            set { Separation = (value == "1"); }
        }

        [XmlAttribute("ChangeLegalForm")]
        [JsonIgnore]
        public string ChangeLegalFormText
        {
            get { return ChangeLegalForm ? "1" : "0"; }
            set { ChangeLegalForm = (value == "1"); }
        }

        [XmlAttribute("TransferringProperty")]
        [JsonIgnore]
        public string TransferringPropertyText
        {
            get { return TransferringProperty ? "1" : "0"; }
            set { TransferringProperty = (value == "1"); }
        }

        [XmlAttribute("ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC")]
        [JsonIgnore]
        public string ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLCText
        {
            get { return ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC ? "1" : "0"; }
            set { ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC = (value == "1"); }
        }

        [XmlAttribute("ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany")]
        [JsonIgnore]
        public string ConversionOfBulgarianPLCIntoBulgarianEuropeanCompanyText
        {
            get { return ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany ? "1" : "0"; }
            set { ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany = (value == "1"); }
        }
    }
}
