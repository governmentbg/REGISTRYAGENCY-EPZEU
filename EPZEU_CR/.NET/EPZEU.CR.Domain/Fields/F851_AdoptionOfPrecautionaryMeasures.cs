using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StabilizationAdoptionOfPrecautionaryMeasures", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationAdoptionOfPrecautionaryMeasures", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F8510_StabilizationAdoptionOfPrecautionaryMeasures : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08510";

        [XmlElement(ElementName = "StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance")]
        public F85101_StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance { get; set; }

        [XmlElement(ElementName = "StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance")]
        public F85102_StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance { get; set; }

        [XmlElement(ElementName = "StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance")]
        public F85103_StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance { get; set; }

    }

    [XmlType(TypeName = "StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85101_StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085101";

        [XmlIgnore]
        public string description = string.Empty;

        public string Description { get; set; }

        [XmlIgnore]
        public bool Distraint { get; set; }

        [XmlIgnore]
        public bool ForeClosure { get; set; }

        [XmlIgnore]
        public bool Other { get; set; }

        [XmlAttribute("Distraint")]
        public string DistraintText { get; set; }

        [XmlAttribute("Foreclosure")]
        public string ForeclosureText { get; set; }

        [XmlAttribute("Other")]
        public string OtherText { get; set; }

        private string title = string.Empty;
        public string Title { get; set; }

        private bool isVisible = true;
        [XmlIgnore]
        public bool IsVisible { get; set; }

        [XmlAttribute]
        public string Visible { get; set; }

        public BankruptcyAct ActData { get; set; }
    }


    [XmlType(TypeName = "StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85102_StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085102";

        [XmlIgnore]
        public string description = string.Empty;

        public string Description { get; set; }

        [XmlIgnore]
        public bool Distraint { get; set; }

        [XmlIgnore]
        public bool ForeClosure { get; set; }

        [XmlIgnore]
        public bool Other { get; set; }

        [XmlAttribute("Distraint")]
        public string DistraintText
        {
            get { return Distraint ? "1" : "0"; }
            set { Distraint = (value == "1"); }
        }

        [XmlAttribute("Foreclosure")]
        public string ForeclosureText
        {
            get { return ForeClosure ? "1" : "0"; }
            set { ForeClosure = (value == "1"); }
        }

        [XmlAttribute("Other")]
        public string OtherText
        {
            get { return Other ? "1" : "0"; }
            set { Other = (value == "1"); }
        }

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

    [XmlType(TypeName = "StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85103_StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085103";

        [XmlIgnore]
        public string description = string.Empty;

        public string Description { get; set; }

        [XmlIgnore]
        public bool Distraint { get; set; }

        [XmlIgnore]
        public bool ForeClosure { get; set; }

        [XmlIgnore]
        public bool Other { get; set; }

        [XmlAttribute("Distraint")]
        public string DistraintText
        {
            get { return Distraint ? "1" : "0"; }
            set { Distraint = (value == "1"); }
        }

        [XmlAttribute("Foreclosure")]
        public string ForeclosureText
        {
            get { return ForeClosure ? "1" : "0"; }
            set { ForeClosure = (value == "1"); }
        }

        [XmlAttribute("Other")]
        public string OtherText
        {
            get { return Other ? "1" : "0"; }
            set { Other = (value == "1"); }
        }

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
