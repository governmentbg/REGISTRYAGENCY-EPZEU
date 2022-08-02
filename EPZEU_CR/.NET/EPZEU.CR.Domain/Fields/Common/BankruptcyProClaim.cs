using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// начин на оповестяване
    /// </summary>
    public enum ProclaimMethod
    {
        Undefined = 0,
        InscribeInCR = 1, //вписване в ТР
        NotifyParties = 2 //уведомяване на страните
    }

    [XmlType(TypeName = "ProclaimMetod")]
    public partial class BankruptcyProClaim
    {
        [XmlElement("ID")]
        public ProclaimMethod ID { get; set; }

        [XmlElement("Name")]
        public string Name
        {
            get
            {
                string result = null;

                switch (ID)
                {
                    case ProclaimMethod.InscribeInCR:
                        result = "CR_APP_00026_L";
                        break;
                    case ProclaimMethod.NotifyParties:
                        result = "CR_APP_00027_L";
                        break;
                    default:
                        result = string.Empty;
                        break;
                }

                return result;
            }
        }
    }
}
