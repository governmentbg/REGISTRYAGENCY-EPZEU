using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    public abstract class ApplicationFormABase<TField> : ApplicationWithFieldsFormBase<TField>
        where TField : ApplicationFormAFieldsBase
    { }

    public class ApplicationFormAFieldsBase : ApplicationFormFieldsBase
    {
        #region Fields

        [XmlElement(Order = 11)]
        public F001a_NumberNationalRegister NumberNationalRegister { get; set; }
        
        [XmlElement(Order = 20)]
        public F002_Company Company { get; set; }
        
        [XmlElement(Order = 30)]
        public F003_LegalForm LegalForm { get; set; }

        [XmlElement(Order = 40)]
        public F004_Transliteration Transliteration { get; set; }

        [XmlElement(Order = 50)]
        public F005_Seat Seat { get; set; }

        [XmlElement(Order = 51)]
        public F005a_SeatForCorrespondence SeatForCorrespondence { get; set; }

        [XmlElement(Order = 60)]
        public F006_SubjectOfActivity SubjectOfActivity { get; set; }

        [XmlElement(Order = 61)]
        public F006a_SubjectOfActivityNKID SubjectOfActivityNKID { get; set; }
        
        [XmlElement(Order = 62)]
        public F006b_Objectives Objectives { get; set; }

        [XmlElement(Order = 64)]
        public F006g_SubjectToAdditionalBusinessActivity SubjectToAdditionalBusinessActivity { get; set; }

        [XmlElement(Order = 63)]
        public F006v_MeansOfAchievingTheObjectives MeansOfAchievingTheObjectives { get; set; }

        #endregion
    }
}
