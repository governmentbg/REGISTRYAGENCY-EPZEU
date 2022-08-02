using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "FormOfTransforming801a", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "FormOfTransforming801a", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F801a_FormOfTransforming801a : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08011";

        [XmlIgnore]
        public bool Influx801a { get; set; }
        [XmlIgnore]
        public bool Fusion801a { get; set; }
        [XmlIgnore]
        public bool ConversionToCoop { get; set; }
        [XmlIgnore]
        public bool ConversionToEUCoop { get; set; }

        /// <summary>
        /// вливане с участие на кооперации със седалище в държава – членка на ЕС или други държави – страни по споразумението за ЕИП
        /// </summary>
        [XmlAttribute("Influx801a")]
        [JsonIgnore]
        public string Influx801aText
        {
            get { return Influx801a ? "1" : "0"; }
            set { Influx801a = (value == "1"); }
        }

        /// <summary>
        /// сливане с участие на кооперации със седалище в държава – членка на ЕС или други държави – страни по споразумението за ЕИП
        /// </summary>
        [XmlAttribute("Fusion801a")]
        [JsonIgnore]
        public string Fusion801aText
        {
            get { return Fusion801a ? "1" : "0"; }
            set { Fusion801a = (value == "1"); }
        }

        /// <summary>
        /// преобразуване на ЕКД със седалище в Р. България в кооперация със седалище в Р. България
        /// </summary>
        [XmlAttribute("ConversionToCoop")]
        [JsonIgnore]
        public string ConversionToCoopText
        {
            get { return ConversionToCoop ? "1" : "0"; }
            set { ConversionToCoop = (value == "1"); }
        }

        /// <summary>
        /// преобразуване на кооперация със седалище в Р. България в ЕКД със седалище в Р. България
        /// </summary>
        [XmlAttribute("ConversionToEUCoop")]
        [JsonIgnore]
        public string ConversionToEUCoopText
        {
            get { return ConversionToEUCoop ? "1" : "0"; }
            set { ConversionToEUCoop = (value == "1"); }
        }
    }
}
