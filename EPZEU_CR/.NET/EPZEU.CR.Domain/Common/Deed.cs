using CNSys.Xml;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common
{
    /// <summary>
    /// Партида.
    /// </summary>
    [XmlRoot("Deed", Namespace = Namespaces.DeedsNamespace)]
    [XmlType("Deed", Namespace = Namespaces.DeedsNamespace)]
    public class Deed : IDeedSummary
    {
        [XmlIgnore]
        [JsonIgnore]
        public long? DeedID { get; set; }

        /// <summary>
        /// ЕИК.
        /// </summary>
        [XmlAttribute(AttributeName = "UIC")]
        public string UIC { get; set; }

        /// <summary>
        /// Име  на фирма.
        /// </summary>
        [XmlAttribute]
        public string CompanyName { get; set; }

        /// <summary>
        /// Пълно име на фирма.
        /// </summary>
        [XmlAttribute]
        public string CompanyFullName { get; set; }

        #region LegalForm

        /// <summary>
        /// Правна форма.
        /// </summary>
        [XmlIgnore]
        public LegalForms? LegalForm { get; set; }

        /// <summary>
        /// Атрибут за правна форма.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "LegalForm")]
        public LegalForms LegalFormAttribute
        {
            get
            {
                return LegalForm.HasValue ? LegalForm.Value : LegalForms.ET;
            }
            set
            {
                LegalForm = value;
            }
        }

        /// <summary>
        /// Флаг указващ дали има правна форма.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool LegalFormAttributeSpecified
        {
            get { return LegalForm.HasValue; }
        }

        #endregion

        #region Status

        /// <summary>
        /// Статус.
        /// </summary>
        [XmlIgnore]
        public DeedStatuses? Status { get; set; }

        /// <summary>
        /// Атрибут за статус.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "DeedStatus")]
        public DeedStatuses StatusAttribute
        {
            get
            {
                return Status.HasValue ? Status.Value : DeedStatuses.New;
            }
            set
            {
                Status = value;
            }
        }

        /// <summary>
        /// Флаг указващ дали има атрибут за статус.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool StatusAttributeSpecified
        {
            get { return Status.HasValue; }
        }

        #endregion

        #region CompanyNameSuffixFlag

        /// <summary>
        /// Флаг заприставка на име на фирма.
        /// </summary>
        [XmlIgnore]
        public CompanyNameSuffixFlags? CompanyNameSuffixFlag { get; set; }

        /// <summary>
        /// Атрибут за флаг заприставка на име на фирма.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "CompanyNameSuffixFlag")]
        public CompanyNameSuffixFlags CompanyNameSuffixFlagAttribute
        {
            get
            {
                return CompanyNameSuffixFlag.HasValue ? CompanyNameSuffixFlag.Value : CompanyNameSuffixFlags.None;
            }
            set
            {
                CompanyNameSuffixFlag = value;
            }
        }

        /// <summary>
        /// Флаг дали има атрибут за флаг заприставка на име на фирма.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool CompanyNameSuffixFlagAttributeSpecified
        {
            get { return CompanyNameSuffixFlag.HasValue; }
        }

        #endregion

        #region ElementHolderAdditionFlag

        /// <summary>
        ///  Допълнителeн флаг за съдържател на елемент
        /// </summary>
        [XmlIgnore]
        public ElementHolderAdditionFlags? ElementHolderAdditionFlag { get; set; }

        /// <summary>
        /// Атрибут за допълнителeн флаг за съдържател на елемент.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "ElementHolderAdditionFlag")]
        public ElementHolderAdditionFlags ElementHolderAdditionFlagAttribute
        {
            get
            {
                return ElementHolderAdditionFlag.HasValue ? ElementHolderAdditionFlag.Value : ElementHolderAdditionFlags.None;
            }
            set
            {
                ElementHolderAdditionFlag = value;
            }
        }

        /// <summary>
        /// Флаг дали има атрибут за допълнителeн флаг за съдържател на елемент.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool ElementHolderAdditionFlagAttributeSpecified
        {
            get { return ElementHolderAdditionFlag.HasValue; }
        }

        #endregion

        #region HasCompanyCases

        /// <summary>
        /// Флаг указващ дали има фирмени дела.
        /// </summary>
        [XmlIgnore]
        public bool? HasCompanyCases { get; set; }

        /// <summary>
        /// Атрибут за флаг указващ дали има фирмени дела.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "HasCompanyCases")]
        public bool HasCompanyCasesAttribute
        {
            get
            {
                return HasCompanyCases.HasValue ? HasCompanyCases.Value : false;
            }
            set
            {
                HasCompanyCases = value;
            }
        }

        /// <summary>
        /// Флаг дали има атрибут за флаг указващ дали има фирмени дела.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool HasCompanyCasesAttributeSpecified
        {
            get { return HasCompanyCases.HasValue; }
        }

        #endregion

        #region CourtNumber

        /// <summary>
        /// Номер на съд.
        /// </summary>
        [XmlIgnore]
        public int? CourtNumber { get; set; }

        /// <summary>
        /// Атрибут за номер на съд.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "CourtNumber")]
        public int CourtNumberAttribute
        {
            get
            {
                return CourtNumber.HasValue ? CourtNumber.Value : int.MinValue;
            }
            set
            {
                CourtNumber = value;
            }
        }

        /// <summary>
        /// Флаг дали има атрибут за номер на съд.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool CourtNumberAttributeSpecified
        {
            get { return CourtNumber.HasValue; }
        }

        #endregion

        /// <summary>
        /// Номер на дело.
        /// </summary>
        [XmlAttribute]
        public string CaseNumber { get; set; }

        #region CaseYear

        /// <summary>
        /// Година на дело.
        /// </summary>
        [XmlIgnore]
        public int? CaseYear { get; set; }

        /// <summary>
        /// Атрибут за година на дело.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "CaseYear")]
        public int CaseYearAttribute
        {
            get
            {
                return CaseYear.HasValue ? CaseYear.Value : int.MinValue;
            }
            set
            {
                CaseYear = value;
            }
        }

        /// <summary>
        /// Флаг дали има атрибут за година на дело.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool CaseYearAttributeSpecified
        {
            get { return CaseYear.HasValue; }
        }

        #endregion

        #region CreatedOn

        /// <summary>
        /// Създадена на.
        /// </summary>
        [XmlIgnore]
        public DateTime? CreatedOn { get; set; }

        /// <summary>
        /// Атрибут за създадена на.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "CreatedOn")]
        public DateTime CreatedOnAttribute
        {
            get
            {
                return CreatedOn.HasValue ? CreatedOn.Value : DateTime.MinValue;
            }
            set
            {
                CreatedOn = value;
            }
        }

        /// <summary>
        /// Флаг дали има атрибут за създадена на.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool CreatedOnAttributeSpecified
        {
            get { return CreatedOn.HasValue; }
        }

        #endregion

        #region IsTranfsormedWithLegalFormChanged

        /// <summary>
        /// Флаг указващ дали трансформацията е с промяна на правна форма.
        /// </summary>
        [XmlIgnore]
        public bool? IsTranfsormedWithLegalFormChanged { get; set; }

        /// <summary>
        /// Атрибут за Флаг указващ дали трансформацията е с промяна на правна форма.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "IsTranfsormedWithLegalFormChanged")]
        public bool IsTranfsormedWithLegalFormChangedAttribute
        {
            get
            {
                return IsTranfsormedWithLegalFormChanged.HasValue ? IsTranfsormedWithLegalFormChanged.Value : false;
            }
            set
            {
                IsTranfsormedWithLegalFormChanged = value;
            }
        }

        /// <summary>
        /// Дали има атрибут за Флаг указващ дали трансформацията е с промяна на правна форма.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool IsTranfsormedWithLegalFormChangedAttributeSpecified
        {
            get { return IsTranfsormedWithLegalFormChanged.HasValue; }
        }

        #endregion

        #region HasInstructions

        /// <summary>
        /// Флаг указващ дали има инструкции.
        /// </summary>
        [XmlIgnore]
        public bool? HasInstructions { get; set; }

        /// <summary>
        /// Атрибут за флаг указващ дали има инструкции.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "HasInstructions")]
        public bool HasInstructionsAttribute
        {
            get
            {
                return HasInstructions.HasValue ? HasInstructions.Value : false;
            }
            set
            {
                HasInstructions = value;
            }
        }

        /// <summary>
        /// Дали има атрибут за флаг указващ дали има инструкции.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool HasInstructionsAttributeSpecified
        {
            get { return HasInstructions.HasValue; }
        }

        #endregion

        #region HasAssignments

        /// <summary>
        /// Флаг указващ дали има назначения.
        /// </summary>
        [XmlIgnore]
        public bool? HasAssignments { get; set; }

        /// <summary>
        /// Атрибут за флаг указващ дали има назначения.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "HasAssignments")]
        public bool HasAssignmentsAttribute
        {
            get
            {
                return HasAssignments.HasValue ? HasAssignments.Value : false;
            }
            set
            {
                HasAssignments = value;
            }
        }

        /// <summary>
        /// Дали има атрибут за флаг указващ дали има назначения.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool HasAssignmentsAttributeSpecified
        {
            get { return HasAssignments.HasValue; }
        }

        #endregion

        #region HasNotifications

        /// <summary>
        /// Флаг дали има нотификации.
        /// </summary>
        [XmlIgnore]
        public bool? HasNotifications { get; set; }

        /// <summary>
        /// Атрибут за флаг дали има нотификации.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "HasNotifications")]
        public bool HasNotificationsAttribute
        {
            get
            {
                return HasNotifications.HasValue ? HasNotifications.Value : false;
            }
            set
            {
                HasNotifications = value;
            }
        }

        /// <summary>
        /// Дали има атрибут за флаг дали има нотификации.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool HasNotificationsAttributeSpecified
        {
            get { return HasNotifications.HasValue; }
        }

        #endregion

        /// <summary>
        /// Подпартиди.
        /// </summary>
        [XmlElement(Type = typeof(SubDeed), ElementName = "SubDeed")]
        public List<SubDeed> SubDeeds { get; set; }

        /// <summary>
        /// Свързани партиди.
        /// </summary>
        public List<DeedSummary> LinkedDeeds { get; set; }
    }
}
