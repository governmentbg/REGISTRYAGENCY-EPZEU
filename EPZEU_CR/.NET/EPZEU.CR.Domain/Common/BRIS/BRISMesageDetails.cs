using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.BRIS
{
    [XmlType(TypeName = "BRISMesageDetails")]
    public class BRISMesageDetails
    {
        [XmlAttribute("CountryCode")]
        public string CountryCode { get; set; }

        [XmlAttribute("CountryCodeBRIS")]
        public string CountryCodeBRIS { get; set; }

        [XmlAttribute("CountryName")]
        public string CountryName { get; set; }

        [XmlAttribute("ForeignRegisterCode")]
        public string ForeignRegisterCode { get; set; }

        [XmlAttribute("MessageTime")]
        public string MessageTime { get; set; }

        [XmlAttribute("MessageURL")]
        public string MessageURL { get; set; }
    }
}
