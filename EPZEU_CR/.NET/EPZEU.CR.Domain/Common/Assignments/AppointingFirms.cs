using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "AppointingFirm")]
    public class AppointingFirm
    {
        public Person Firm { get; set; }

        public Address Address { get; set; }

        [XmlAttribute]
        public string FirmGuid { get; set; }
    }

    [XmlType(TypeName = "AppointingFirms")]
    public class AppointingFirms
    {
        [XmlElement(ElementName = "AppointingFirm")]
        public List<AppointingFirm> AppointingFirmList { get; set; }
    }
}