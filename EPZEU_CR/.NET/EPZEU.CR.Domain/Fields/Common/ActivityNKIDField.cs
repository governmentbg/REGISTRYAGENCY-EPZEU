using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public abstract partial class ActivityNKIDField : RecordField
    {
        [XmlAttribute("codeNkid")]
        public string CodeNkid { get; set; }

        [XmlAttribute("textNkid")]
        public string TextNkid { get; set; }

        [XmlAttribute("idNkid")]
        public string IDNkid { get; set; }
    }
}
