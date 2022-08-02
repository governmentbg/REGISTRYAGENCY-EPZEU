using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    public abstract class ApplicationFormVBase<TField> : ApplicationWithFieldsFormBase<TField>

        where TField : ApplicationFormVFieldsBase
    {
        [XmlIgnore]
        public List<DraftDeedInfo> DraftDeedInfoList { get; set; }
    }

    public class ApplicationFormVFieldsBase : ApplicationFormFieldsBase
    {
        [XmlIgnore]
        public List<DraftDeedInfo> DraftDeedInfoList { get; set; }
    }

    public class DraftDeedInfo
    {
        public int? LegalForm { get; set; }
        public string CompanyFullName { get; set; }
        public string CompanyName { get; set; }
        public string UIC { get; set; }
    }
}