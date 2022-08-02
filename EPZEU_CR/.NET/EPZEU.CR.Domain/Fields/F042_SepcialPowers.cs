using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SpecialPower", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SpecialPower", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0420_SpecialPower : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "004200";

        public string ProcuratorName { get; set; }

        // право да отчуждава недвижими имоти на търговеца
        [XmlIgnore]
        public bool? RightToAlienate { get; set; }

        // право да обременява с тежести недвижими имоти на търговеца
        [XmlIgnore]
        public bool? RightToBurden { get; set; }

        [XmlAttribute("rightToAlienate")]
        [JsonIgnore]
        public string RightToAlienateText
        {
            get { return RightToAlienate.HasValue && RightToAlienate.Value ? "1" : "0"; }
            set { RightToAlienate = (value == "1"); }
        }

        [XmlAttribute("rightToBurden")]
        [JsonIgnore]
        public string RightToBurdenText
        {
            get { return RightToBurden.HasValue && RightToBurden.Value ? "1" : "0"; }
            set { RightToBurden = (value == "1"); }
        }
    }

    [XmlType(TypeName = "SepcialPowers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SepcialPowers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F042_SepcialPowers : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00420";

        [XmlElement(ElementName = "SpecialPower")]
        public List<F0420_SpecialPower> SepcialPowersList { get; set; }
    }
}
