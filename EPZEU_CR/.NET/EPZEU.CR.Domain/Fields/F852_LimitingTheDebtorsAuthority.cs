using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StabilizatioLimitingTheDebtorsAuthority", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizatioLimitingTheDebtorsAuthority", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F8520_StabilizatioLimitingTheDebtorsAuthority : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08520";

        [XmlElement(ElementName = "StabilizationLimitingTheDebtorsAuthorityFirstInstance")]
        public F85201_StabilizationLimitingTheDebtorsAuthorityFirstInstance StabilizationLimitingTheDebtorsAuthorityFirstInstance { get; set; }

        [XmlElement(ElementName = "StabilizationLimitingTheDebtorsAuthoritySecondInstance")]
        public F85202_StabilizationLimitingTheDebtorsAuthoritySecondInstance StabilizationLimitingTheDebtorsAuthoritySecondInstance { get; set; }

        [XmlElement(ElementName = "StabilizationLimitingTheDebtorsAuthorityThirdInstance")]
        public F85203_StabilizationLimitingTheDebtorsAuthorityThirdInstance StabilizationLimitingTheDebtorsAuthorityThirdInstance { get; set; }

    }

    [XmlType(TypeName = "StabilizationLimitingTheDebtorsAuthorityFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationLimitingTheDebtorsAuthorityFirstInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85201_StabilizationLimitingTheDebtorsAuthorityFirstInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085201";

        [XmlIgnore]
        public bool TheActivityContinuesUnderTheSupervisionOfTheTrustee { get; set; }
        [XmlIgnore]
        public bool TheTraderIsDeprivedOfAuthority { get; set; }
        [XmlIgnore]
        public bool TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee { get; set; }
        [XmlIgnore]
        public bool TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee { get; set; }

        [XmlAttribute("TheActivityContinuesUnderTheSupervisionOfTheTrustee")]
        public string TheActivityContinuesUnderTheSupervisionOfTheTrusteeText
        {
            get { return TheActivityContinuesUnderTheSupervisionOfTheTrustee ? "1" : "0"; }
            set { TheActivityContinuesUnderTheSupervisionOfTheTrustee = (value == "1"); }
        }

        [XmlAttribute("TheTraderIsDeprivedOfAuthority")]
        public string TheTraderIsDeprivedOfAuthorityText
        {
            get { return TheTraderIsDeprivedOfAuthority ? "1" : "0"; }
            set { TheTraderIsDeprivedOfAuthority = (value == "1"); }
        }

        [XmlAttribute("TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee")]
        public string TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrusteeText
        {
            get { return TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee ? "1" : "0"; }
            set { TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee = (value == "1"); }
        }

        [XmlAttribute("TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee")]
        public string TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrusteeText {
            get { return TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee ? "1" : "0"; }
            set { TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee = (value == "1"); }
        }

        private string title = string.Empty;
        public string Title { get; set; }

        private bool isVisible = true;

        [XmlIgnore]
        public bool IsVisible
        {
            get { return isVisible; }
            set { isVisible = value; }
        }

        [XmlAttribute]
        public string Visible
        {
            get { return IsVisible ? "1" : "0"; }
            set { IsVisible = (value == "1"); }
        }

        public BankruptcyAct ActData { get; set; }
    }


    [XmlType(TypeName = "StabilizationLimitingTheDebtorsAuthoritySecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationLimitingTheDebtorsAuthoritySecondInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85202_StabilizationLimitingTheDebtorsAuthoritySecondInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085202";

        [XmlIgnore]
        public bool TheActivityContinuesUnderTheSupervisionOfTheTrustee { get; set; }
        [XmlIgnore]
        public bool TheTraderIsDeprivedOfAuthority { get; set; }
        [XmlIgnore]
        public bool TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee { get; set; }
        [XmlIgnore]
        public bool TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee { get; set; }

        [XmlAttribute("TheActivityContinuesUnderTheSupervisionOfTheTrustee")]
        public string TheActivityContinuesUnderTheSupervisionOfTheTrusteeText
        {
            get { return TheActivityContinuesUnderTheSupervisionOfTheTrustee ? "1" : "0"; }
            set { TheActivityContinuesUnderTheSupervisionOfTheTrustee = (value == "1"); }
        }

        [XmlAttribute("TheTraderIsDeprivedOfAuthority")]
        public string TheTraderIsDeprivedOfAuthorityText
        {
            get { return TheTraderIsDeprivedOfAuthority ? "1" : "0"; }
            set { TheTraderIsDeprivedOfAuthority = (value == "1"); }
        }

        [XmlAttribute("TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee")]
        public string TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrusteeText
        {
            get { return TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee ? "1" : "0"; }
            set { TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee = (value == "1"); }
        }

        [XmlAttribute("TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee")]
        public string TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrusteeText
        {
            get { return TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee ? "1" : "0"; }
            set { TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee = (value == "1"); }
        }

        private string title = string.Empty;
        public string Title
        {
            get { return title; }
            set { title = value; }
        }

        private bool isVisible = true;

        [XmlIgnore]
        public bool IsVisible
        {
            get { return isVisible; }
            set { isVisible = value; }
        }

        [XmlAttribute]
        public string Visible
        {
            get { return IsVisible ? "1" : "0"; }
            set { IsVisible = (value == "1"); }
        }

        public BankruptcyAct ActData { get; set; }
    }


    [XmlType(TypeName = "StabilizationLimitingTheDebtorsAuthorityThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationLimitingTheDebtorsAuthorityThirdInstance", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85203_StabilizationLimitingTheDebtorsAuthorityThirdInstance : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085203";

        [XmlIgnore]
        public bool TheActivityContinuesUnderTheSupervisionOfTheTrustee { get; set; }

        [XmlIgnore]
        public bool TheTraderIsDeprivedOfAuthority { get; set; }

        [XmlIgnore]
        public bool TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee { get; set; }

        [XmlIgnore]
        public bool TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee { get; set; }

        [XmlAttribute("TheActivityContinuesUnderTheSupervisionOfTheTrustee")]
        public string TheActivityContinuesUnderTheSupervisionOfTheTrusteeText
        {
            get { return TheActivityContinuesUnderTheSupervisionOfTheTrustee ? "1" : "0"; }
            set { TheActivityContinuesUnderTheSupervisionOfTheTrustee = (value == "1"); }
        }

        [XmlAttribute("TheTraderIsDeprivedOfAuthority")]
        public string TheTraderIsDeprivedOfAuthorityText
        {
            get { return TheTraderIsDeprivedOfAuthority ? "1" : "0"; }
            set { TheTraderIsDeprivedOfAuthority = (value == "1"); }
        }
                
        [XmlAttribute("TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee")]
        public string TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrusteeText
        {
            get { return TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee ? "1" : "0"; }
            set { TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee = (value == "1"); }
        }


        [XmlAttribute("TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee")]
        public string TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrusteeText
        {
            get { return TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee ? "1" : "0"; }
            set { TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee = (value == "1"); }
        }
               
        public string Title { get; set; }
           
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


}
