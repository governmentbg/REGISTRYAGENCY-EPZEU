using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Common.Assignments;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "AppointingDemand", Namespace = Namespaces.ApplicationsNamespace)]
    public class AppointingDemand : ApplicationFormBase
    {
        [XmlIgnore]
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.AppointingExpert; }
        }

        #region Properties

        [XmlAttribute]
        public string UIC { get; set; }

        [XmlElement(Order = 10, ElementName = "UIC")]
        public UIC UICElement { get; set; }

        [XmlElement(Order = 1010)]
        public AppointingFirms AppointingFirms { get; set; }

        [XmlElement(Order = 1020)]
        public AppointingType AppointingType { get; set; }

        [XmlElement(Order = 1030)]
        public Notes Notes { get; set; }

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
