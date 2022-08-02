using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{

    [XmlType(TypeName = "MembershipFees25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "MembershipFees25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02530_MembershipFees25v : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002530";

        #region Private members 

        private bool _checked;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "CulturalEducationalAndInformationActivities25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "CulturalEducationalAndInformationActivities25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02531_CulturalEducationalAndInformationActivities25v : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002531";

        #region Private members 

        private bool _checked;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "SubsidyFromStateAndMunicipalBudgets25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SubsidyFromStateAndMunicipalBudgets25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02532_SubsidyFromStateAndMunicipalBudgets25v : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002532";

        #region Private members 

        private bool _checked;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "RentalОfМovableАndImmovableProperty25v")]
    public partial class F02533_RentalOfMovableAndImmovableProperty25v : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002533";

        #region Private members 

        private bool _checked;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "DonationАndWills25v")]
    public partial class F02534_DonationAndWills25v : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002534";

        #region Private members 

        private bool _checked;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "OtherExpenses25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OtherExpenses25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02535_OtherExpenses25v : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002535";

        [XmlText]
        public string Text { get; set; }

        #region Private members 

        private bool _checked;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        [XmlIgnore]
        public bool OtherWay { get; set; }

        #endregion

        #region Xml Properties



        [XmlAttribute("otherWay")]
        [JsonIgnore]
        public string OtherWayText
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "SourcesOfInitialFinancing25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SourcesOfInitialFinancing25v", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F025v_SourcesOfInitialFinancing25v : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00253";

        public F02530_MembershipFees25v MembershipFees25v { get; set; }

        public F02531_CulturalEducationalAndInformationActivities25v CulturalEducationalAndInformationActivities25v { get; set; }

        public F02532_SubsidyFromStateAndMunicipalBudgets25v SubsidyFromStateAndMunicipalBudgets25v { get; set; }

        [XmlElement(elementName: "RentalОfМovableАndImmovableProperty25v")]
        public F02533_RentalOfMovableAndImmovableProperty25v RentalOfMovableAndImmovableProperty25v { get; set; }

        [XmlElement(elementName: "DonationАndWills25v")]
        public F02534_DonationAndWills25v DonationAndWills25v { get; set; }

        [XmlElement(elementName: "OtherExpenses25v")]
        public F02535_OtherExpenses25v OtherExpenses25v { get; set; }
    }
}