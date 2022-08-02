using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Поле запис за седалище.
    /// </summary>
    public abstract partial class SeatRecordField : RecordField
    {        
        /// <summary>
        /// Адрес.
        /// </summary>
        public Address Address { get; set; }
               
        /// <summary>
        /// Контакти.
        /// </summary>
        public Contacts Contacts { get; set; }
    }
}
