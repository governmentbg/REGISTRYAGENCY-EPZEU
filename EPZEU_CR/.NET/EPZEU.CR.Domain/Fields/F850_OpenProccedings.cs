using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StabilizationOpenProccedings", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationOpenProccedings", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F8500_StabilizationOpenProccedings : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08500";

        [XmlElement(ElementName = "StabilizationOpenProccedingFirstInstance")]
        public F85001_StabilizationOpenProccedingFirstInstance StabilizationOpenProccedingFirstInstance { get; set; }

        [XmlElement(ElementName = "StabilizationOpenProccedingSecondInstance")]
        public F85002_StabilizationOpenProccedingSecondInstance StabilizationOpenProccedingSecondInstance { get; set; }

        [XmlElement(ElementName = "StabilizationOpenProccedingThirdInstance")]
        public F85003_StabilizationOpenProccedingThirdInstance StabilizationOpenProccedingThirdInstance { get; set; }



        [XmlType(TypeName = "StabilizationOpenProccedingFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
        [XmlRoot(ElementName = "StabilizationOpenProccedingFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
        public partial class F85001_StabilizationOpenProccedingFirstInstance : RecordField
        {
            protected override string FieldIdentInternal => FieldIdentCode;

            public const string FieldIdentCode = "085001";

            private string title = string.Empty;
            public string Title { get; set; }

            private bool isVisible = true;

            [XmlIgnore]
            public bool IsVisible { get; set; }

            [XmlAttribute]
            public string Visible { get; set; }

            public BankruptcyAct ActData { get; set; }
        }


        [XmlType(TypeName = "StabilizationOpenProccedingSecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
        [XmlRoot(ElementName = "StabilizationOpenProccedingSecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
        public partial class F85002_StabilizationOpenProccedingSecondInstance : RecordField
        {
            protected override string FieldIdentInternal => FieldIdentCode;

            public const string FieldIdentCode = "085002";

            private string title = string.Empty;
            public string Title { get; set; }

            private bool isVisible = true;

            [XmlIgnore]
            public bool IsVisible { get; set; }

            [XmlAttribute]
            public string Visible
            {
                get { return IsVisible ? "1" : "0"; }
                set { IsVisible = (value == "1"); }
            }

            public BankruptcyAct ActData { get; set; }
        }

        [XmlType(TypeName = "StabilizationOpenProccedingThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
        [XmlRoot(ElementName = "StabilizationOpenProccedingThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
        public partial class F85003_StabilizationOpenProccedingThirdInstance : RecordField
        {
            protected override string FieldIdentInternal => FieldIdentCode;

            public const string FieldIdentCode = "085003";

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



}
