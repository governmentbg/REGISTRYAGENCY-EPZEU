using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    public abstract class ApplicationFormGBase<TField> : ApplicationWithFieldsFormBase<TField>
        where TField : ApplicationFormGFieldsBase
    { }

    public class ApplicationFormGFieldsBase : ApplicationFormFieldsBase
    {
        #region Fields

        [XmlElement("StatementsA", Order = 10019)]
        public F10019A_StatementsA Statements { get; set; }

        #endregion
    }
}
