using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A17", Namespace = Namespaces.ApplicationsNamespace)]
	public class A17 : ApplicationFormABase<A17Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A17; }
        }
    }

    
    [XmlType(TypeName = "A17Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A17Fields : ApplicationFormAFieldsBase
    {
        #region Fields


        [XmlElement(Order = 103)]
        public F0103_Representatives103 Representatives103 { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 135)]
        public F013g_BoardOfTrusties13g BoardOfTrusties13g { get; set; }

        [XmlElement(Order = 152)]
        public F015b_VerificationCommission15b VerificationCommission15b { get; set; }

        [XmlElement(Order = 253)]
        public F025v_SourcesOfInitialFinancing25v SourcesOfInitialFinancing25v { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }
       

        #endregion
    }
}