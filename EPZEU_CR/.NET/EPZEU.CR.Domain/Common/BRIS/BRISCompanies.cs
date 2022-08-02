using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.BRIS
{
    [XmlType(TypeName = "BRISCompany")]
    public class BRISCompany
    {
        [XmlElement("BRISCompanyData")]
        public Person BRISCompanyData { get; set; }
    }

    [XmlType(TypeName = "BRISCompanies")]
    public class BRISCompanies
    {
        [XmlElement(ElementName = "BRISCompany")]
        public List<BRISCompany> BRISCompanyList { get; set; }
    }
}
