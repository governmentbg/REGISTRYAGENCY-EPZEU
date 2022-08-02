using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public abstract partial class TextRecordField : RecordField
    {
        [XmlText]
        public virtual string Text { get; set; }
    }
}
