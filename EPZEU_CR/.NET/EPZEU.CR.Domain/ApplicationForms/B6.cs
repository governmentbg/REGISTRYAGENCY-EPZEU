using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "B6", Namespace = Namespaces.ApplicationsNamespace)]
	public class B6 : ApplicationFormBBase<B6Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.B6; }
        }
    }

    
    [XmlType(TypeName = "B6Fields", Namespace = Namespaces.FieldsNamespace)]
	public class B6Fields : ApplicationFormBFieldsBase
    {
        #region Fields

        [XmlElement(Order = 501)]
        public F501_TermsOfLiquidation TermsOfLiquidation { get; set; }

        [XmlElement(Order = 502)]
        public F502_Liquidators Liquidators { get; set; }

        [XmlElement(Order = 503)]
        public F503_Representative503 Representative503 { get; set; }

        [XmlElement(Order = 504)]
        public F504_ContinuingTradeActivity ContinuingTradeActivity { get; set; }

        #endregion
    }
}