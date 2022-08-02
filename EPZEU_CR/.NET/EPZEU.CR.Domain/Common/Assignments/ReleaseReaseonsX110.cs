using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "ReleaseReaseonsX110")]
    public class ReleaseReaseonsX110
    {
        [XmlAttribute]
        public string ReleaseReasonText { get; set; }

        public long ReleaseReasonID { get; set; }

        public string ReleaseReasonNote { get; set; }
    }
}