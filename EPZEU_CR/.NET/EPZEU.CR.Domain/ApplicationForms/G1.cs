using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlType(TypeName = "ActCompany")]
    public class ActCompany
    {
        public Person Subject { get; set; }

        #region Overriden Elements
       
        //public override string UniqueID { get { return Subject.IndentType.ToString() + Subject.Indent; } }

        #endregion
    }

    [XmlType(TypeName = "ActsCompanies")]
    public class ActsCompanies 
    {
        [XmlElement(ElementName = "ActCompany")]
        public List<ActCompany> ActsCompaniesList { get; set; }
    }

    [XmlRoot(ElementName = "G1", Namespace = Namespaces.ApplicationsNamespace)]
	public class G1 : ApplicationFormGBase<G1Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.G1; }
        }

        [XmlElement(Order = 21)]
        public ActsCompanies ActsCompanies { get; set; }
    }

    
    [XmlType(TypeName = "G1Fields", Namespace = Namespaces.FieldsNamespace)]
	public class G1Fields : ApplicationFormGFieldsBase
    {
        #region Fields


        #endregion
    }
}