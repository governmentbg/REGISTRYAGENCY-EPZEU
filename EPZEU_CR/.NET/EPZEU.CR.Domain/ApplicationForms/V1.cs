using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V1", Namespace = Namespaces.ApplicationsNamespace)]
	public class V1 : ApplicationFormVBase<V1Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V1; }
        }
    }

    
    [XmlType(TypeName = "V1Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V1Fields : ApplicationFormVFieldsBase
    {
        #region Fields

        [XmlElement(Order = 600)]
        public F600_TransferringTypeOfTradeEnterprise TransferringTypeOfTradeEnterprise { get; set; }

        [XmlElement(Order = 601)]
        public F601_TransferringEnterprise TransferringEnterprise { get; set; }

        [XmlElement(Order = 602)]
        public F602_AcquisitionEnterprises AcquisitionEnterprises { get; set; }

        #endregion
    }
}