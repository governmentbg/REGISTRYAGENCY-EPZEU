using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(Namespace = Namespaces.ApplicationsNamespace)]
    public class IncomingRequestForCorrection : ApplicationFormBase
    {
        #region Properties

        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.RequestForCorrection; }
        }

        [XmlElement(Order = 10)]
        public UIC UIC { get; set; }

        [XmlElement(Order = 100)]
        public RequestForCorrection RequestForCorrection { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }

        #endregion
    }

    #region RequestForCorrection

    [XmlType(TypeName = "RequestForCorrection")]
    public class RequestForCorrection
    {
        public Person Subject { get; set; }

        [XmlAttribute]
        public string IncomingNumber { get; set; }

        [XmlAttribute]
        public string RegNumber { get; set; }

        public OutgoingNumber OutgoingNumber { get; set; }

        [XmlAttribute]
        public string Description { get; set; }
    }

    #endregion
}
