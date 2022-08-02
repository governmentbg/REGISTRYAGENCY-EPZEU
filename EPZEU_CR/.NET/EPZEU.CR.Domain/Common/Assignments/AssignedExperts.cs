using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "AssignedExpert")]
    public class AssignedExpert
    {
        [XmlAttribute]
        public string Name { get; set; }
        [XmlAttribute]
        public string EGN { get; set; }

        public Address Address { get; set; }

        [XmlAttribute]
        public string Email { get; set; }

        [XmlAttribute]
        public bool AgreementForMail { get; set; }

        [XmlAttribute]
        public string Specialty { get; set; }

        [XmlAttribute]
        public string Abilities { get; set; }

        [XmlAttribute]
        public string Phone { get; set; }

        [XmlElement(IsNullable = true, ElementName = "ExpertID")]
        public long? ExpertID { get; set; }

        [XmlAttribute]
        public string ExpertGuid { get; set; }

        [XmlAttribute]
        public string PreferedChanel { get; set; }

        private string _IndividualNumber { get; set; }

        [XmlAttribute]
        public string IndividualNumber
        {
            get { return _IndividualNumber; }
            set { _IndividualNumber = value; }
        }
    }

    [XmlType(TypeName = "AssignedExperts")]
    public class AssignedExperts
    {
        [XmlElement(ElementName = "AssignedExpert")]
        public List<AssignedExpert> AssignedExpertList { get; set; }
    }
}