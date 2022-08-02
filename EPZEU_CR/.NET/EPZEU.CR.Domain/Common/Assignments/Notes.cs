using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "Note")]
    public class Note
    {
        [XmlText]
        public string Text { get; set; }
    }

    [XmlType(TypeName = "Notes")]
    public class Notes
    {
        [XmlElement(ElementName = "Note")]
        public List<Note> NoteList { get; set; }
    }
}