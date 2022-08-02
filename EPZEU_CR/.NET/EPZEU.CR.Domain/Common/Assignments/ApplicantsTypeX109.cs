using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "ApplicantsTypeX109")]
    public class ApplicantsTypeX109
    {
        public AppointingApplicantType AppointingApplicantType { get; set; }

        [XmlAttribute("AppointingApplicantType")]
        public string AppointingApplicantTypeText
        {
            get { return this.AppointingApplicantType.ToString(); }
        }
    }
}