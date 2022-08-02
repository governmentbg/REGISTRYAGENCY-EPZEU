using CNSys;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "J1", Namespace = Namespaces.ApplicationsNamespace)]
    public class J1 : ApplicationFormBase
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.J1; }
        }

        [XmlElement(Order = 10)]
        public UIC UIC { get; set; }

        [XmlElement(Order = 100)]
        public IncomingNumber IncomingNumber { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }
    }


    public class IncomingNumber
    {
        public string IncomingNo { get; set; }
        public string OutgoingNo { get; set; }
        public string OutgoingNoAB { get; set; }
        public string Indent { get; set; }
        public string Name { get; set; }
        [XmlIgnore]
        public List<DeedSummary> Deeds { get; set; }
    }

}