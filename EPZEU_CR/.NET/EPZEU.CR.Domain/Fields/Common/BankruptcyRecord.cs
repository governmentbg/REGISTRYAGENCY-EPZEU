using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public abstract partial class BankruptcyRecord : Record
    {
        [XmlElement("Title")]
        public string Title { get; set; }

        /// <summary>
        /// Данни за акта на съда по несъстоятелността
        /// </summary>
        [XmlElement("ActData")]
        public BankruptcyAct ActData { get; set; }
    }
}
