using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "AssignmentCorrectionNumber")]
    public class AssignmentCorrectionNumber
    {
        [XmlAttribute]
        public string Value { get; set; }

        [XmlIgnore]
        public ApplicationStatuses ApplicationStatuses { get; set; }
    }
}