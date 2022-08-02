using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Common.Certificates;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(Namespace = Namespaces.ApplicationsNamespace)]
    public class RequestForEntryByPeriodCertificate : RequestForCertificateBase
    {
        [XmlIgnore]
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.EntryByPeriodCertificate; }
        }

        [XmlElement(Order = 1)]
        public RequestForCertificate Certificate { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }
    }
}