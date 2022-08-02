using System.Xml.Serialization;

namespace IISDA.AdministrativeServices
{
    public partial class AdmServiceDataType
    {
        [XmlIgnore]
        public RegulatoryActLegalBasisType[] LegalBasisCollection
        {
            get { return LegalBasis; }
            set { LegalBasis = value; }
        }
    }
}
