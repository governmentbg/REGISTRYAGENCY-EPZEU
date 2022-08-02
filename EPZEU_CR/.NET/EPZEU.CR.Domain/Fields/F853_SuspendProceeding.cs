using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StabilizationSuspendProceeding", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationSuspendProceeding", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F8530_StabilizationSuspendProceeding : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08530";

        [XmlElement(ElementName = "StabilizationSuspendProceedingFirstInstance")]
        public F85301_StabilizationSuspendProceedingFirstInstance StabilizationSuspendProceedingFirstInstance { get; set; }

        [XmlElement(ElementName = "StabilizationSuspendProceedingSecondInstance")]
        public F85302_StabilizationSuspendProceedingSecondInstance StabilizationSuspendProceedingSecondInstance { get; set; }

        [XmlElement(ElementName = "StabilizationSuspendProceedingThirdInstance")]
        public F85303_StabilizationSuspendProceedingThirdInstance StabilizationSuspendProceedingThirdInstance { get; set; }

    }

    [XmlType(TypeName = "StabilizationSuspendProceedingFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationSuspendProceedingFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85301_StabilizationSuspendProceedingFirstInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085301";

        [XmlElement(ElementName = "SuspendReason")]
        public BankruptcySuspendReason SuspendReson { get; set; }

        private string title = string.Empty;
        public string Title { get; set; }

        private bool isVisible = true;
        [XmlIgnore]
        public bool IsVisible{ get; set; }

        [XmlAttribute]
        public string Visible{ get; set; }

        public BankruptcyAct ActData { get; set; }
    }

    [XmlType(TypeName = "StabilizationSuspendProceedingSecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationSuspendProceedingSecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85302_StabilizationSuspendProceedingSecondInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085302";

        [XmlElement(ElementName = "SuspendReason")]
        public BankruptcySuspendReason SuspendReson { get; set; }

        private string title = string.Empty;
        public string Title { get; set; }

        private bool isVisible = true;
        [XmlIgnore]
        public bool IsVisible { get; set; }

        [XmlAttribute]
        public string Visible { get; set; }

        public BankruptcyAct ActData { get; set; }
    }


    [XmlType(TypeName = "StabilizationSuspendProceedingThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationSuspendProceedingThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85303_StabilizationSuspendProceedingThirdInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085303";

        [XmlElement(ElementName = "SuspendReason")]
        public BankruptcySuspendReason SuspendReson { get; set; }

        private string title = string.Empty;
        public string Title { get; set; }

        private bool isVisible = true;
        [XmlIgnore]
        public bool IsVisible { get; set; }

        [XmlAttribute]
        public string Visible { get; set; }

        public BankruptcyAct ActData { get; set; }
    }
}
