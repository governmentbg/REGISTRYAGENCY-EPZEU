using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public abstract partial class BankruptcyRecordField : RecordField
    {
        [XmlElement("Title")]
        public string Title { get; set; }

        [XmlIgnore]
        public bool IsVisible { get; set; }

        /// <summary>
        /// Данни за акта на съда по несъстоятелността
        /// </summary>
        [XmlElement("ActData")]
        public BankruptcyAct ActData { get; set; }
    }
}
