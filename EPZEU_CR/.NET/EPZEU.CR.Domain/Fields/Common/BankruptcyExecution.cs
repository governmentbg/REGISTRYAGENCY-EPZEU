using System;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    [XmlType("Execution")]
    public partial class BankruptcyExecution
    {
        /// <summary>
        /// показва дали актът подлежи на незабавно изпълнение
        /// </summary>
        [XmlElement("ImmediateExecution")]
        public bool ImmediateExecution { get; set; }

        [XmlElement("EffectiveDate", IsNullable = true)]
        public DateTime? EffectiveDate { get; set; }
    }
}
