using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "OutgoingNumberX108")]
    public class OutgoingNumberX108
    {
        public OutgoingNumber Parts { get; set; }

        [XmlAttribute]
        public AppointingExpertType AppointingExpertType { get; set; }
    }
}