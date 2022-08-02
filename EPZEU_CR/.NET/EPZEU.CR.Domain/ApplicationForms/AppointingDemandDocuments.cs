using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Common.Assignments;
using EPZEU.CR.Domain.Fields;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    public abstract class AppointingDemandDocuments : ApplicationFormBase
    {
        #region Properties
        
        [XmlAttribute]
        public long AssignmentID { get; set; }

        [XmlElement(Order = 10, ElementName = "UIC")]
        public UIC UIC { get; set; }

        [XmlElement(Order = 20)]
        public OutgoingNumberX108 OutgoingNumberX108 { get; set; }

        [XmlElement(Order = 30)]
        public AssignedExperts AssignedExperts { get; set; }

        [XmlElement(Order = 40)]
        public ReleaseReaseonsX110 ReleaseReaseonsX110 { get; set; }

        [XmlElement(Order = 50)]
        public AssignmentCorrectionNumber AssignmentCorrectionNumber { get; set; }

        [XmlElement(Order = 1090)]
        public ApplicantsTypeX109 ApplicantsTypeX109 { get; set; }

        [XmlElement(Order = 1140)]
        public RenewAssignmentExchange RenewAssignmentExchange { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }

        #endregion
    }
}