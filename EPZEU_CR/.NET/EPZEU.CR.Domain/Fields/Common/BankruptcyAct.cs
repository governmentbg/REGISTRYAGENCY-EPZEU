using Integration.EPZEU.Models.Nomenclatures;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    [XmlType(TypeName = "ActData")]
    public partial class BankruptcyAct
    {
        /// <summary>
        /// идентификатор на акта по несъстоятелност (от BPS)
        /// </summary>
        [XmlElement("ActSeqID")]
        public string ActSeqID { get; set; }

        /// <summary>
        /// идентификатор на съда постановил акта (от BPS)
        /// </summary>
        [XmlElement("CourtSeqID")]
        public string CourtSeqID { get; set; }

        /// <summary>
        /// идентификатор на делото по несъстоятелност (от BPS)
        /// </summary>
        [XmlElement("CaseSeqID")]
        public string CaseSeqID { get; set; }

        /// <summary>
        /// Номер на делото по несъстоятелност
        /// Полето не е задължително
        /// </summary>
        [XmlElement("CaseNumber")]
        public string CaseNumber { get; set; }

        /// <summary>
        /// Година на акта
        /// </summary>
        [XmlElement("CaseYear")]
        public string CaseYear { get; set; }

        /// <summary>
        /// Дата на акт
        /// Полето е задължително
        /// </summary>
        [XmlElement("ActDate")]
        public string ActDate { get; set; }

        /// <summary>
        /// Номер на акта
        /// Полето не е задължително
        /// </summary>
        [XmlElement("ActNumber")]
        public string ActNumber { get; set; }

        /// <summary>
        ///  Вид на акта
        ///  Полето е задължително
        /// </summary>
        [XmlElement("Type")]
        public BankruptcyActType Type { get; set; }


        /// <summary>
        /// Съд постановил акта
        /// </summary>
        [XmlElement("BankruptcyCourt")]
        public Court BankruptcyCourt { get; set; }

        /// <summary>
        /// Правно основание за вписване на обстоятелството
        /// </summary>
        [XmlElement("Merit")]
        public BankruptcyMerit Merit { get; set; }

        /// <summary>
        /// Изпълнение на акта
        /// </summary>
        [XmlElement("Execution")]
        public BankruptcyExecution Execution { get; set; }

        /// <summary>
        /// Оповестяване на акта
        /// </summary>
        [XmlElement("ProclaimMetod")]
        public BankruptcyProClaim ProclaimMetod { get; set; }

        /// <summary>
        /// срок за обжалване
        /// </summary>
        [XmlElement("ComplaintTerm", IsNullable = true)]
        public int? ComplaintTerm { get; set; }
    }
}
