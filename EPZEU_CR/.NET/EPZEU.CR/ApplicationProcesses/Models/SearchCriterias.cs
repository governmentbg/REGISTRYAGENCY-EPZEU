using System;
using System.Collections.Generic;

namespace EPZEU.CR.ApplicationProcesses.Models
{
    /// <summary>
    /// Базови критерии за търсене в EPZEU.CR.
    /// </summary>
    public class EpzeuCRSearchCriteriaBase
    {
        public EpzeuCRSearchCriteriaBase()
        {

        }

        public EpzeuCRSearchCriteriaBase(bool loadMaxNumberOfRecords)
        {
            LoadMaxNumberOfRecords = loadMaxNumberOfRecords;
        }

        /// <summary>
        /// Флаг указващ дали да се използва "Брой максимално допустими записи от върнат резултат" от конфигурационните параметри.
        /// </summary>
        public bool LoadMaxNumberOfRecords { get; set; }

        private int? _maxNumberOfRecords;

        /// <summary>
        /// Брой максимално допустими записи от върнат резултат.
        /// </summary>
        public int? MaxNumberOfRecords
        {
            get
            {
                if (LoadMaxNumberOfRecords && _maxNumberOfRecords == null)
                {
                    return int.MaxValue;
                    //todo da se napravi APP_PARAMETERS TABLE
                    //var appParams = NomenclaturesCache.GetAppParameters();
                    //_maxNumberOfRecords = appParams.Single(x => x.ParameterName == AppParameters.MAX_SEARCH_COUNT.ToString()).NumberValue;
                }
                return _maxNumberOfRecords;
            }
            set
            {
                _maxNumberOfRecords = value;
            }

        }
    }

    /// <summary>
    /// Критерии за търсене на пакет за вписване. При търсене трябва да има поне един параметър.
    /// </summary>
    public class ApplicationProcessSearchCriteria : EpzeuCRSearchCriteriaBase
    {
        public ApplicationProcessSearchCriteria()
        {
            LoadOption = new ApplicationProcessLoadOption();
        }

        /// <summary>
        /// Търсене по идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// Търсене по CIN на заявителя.
        /// </summary>
        public int? ApplicantCIN { get; set; }

        /// <summary>
        /// Търсене по тип на заявлението.
        /// </summary>
        public Integration.EPZEU.Models.ApplicationFormTypes? MainApplicationType { get; set; }

        /// <summary>
        /// Търсене по тип на процеса родител или дете
        /// </summary>
        public bool? IsParent { get; set; }

        public Guid? SigningGiud { get; set; }

        /// <summary>
        /// Опции за зареждане.
        /// </summary>
        public ApplicationProcessLoadOption LoadOption { get; set; }
    }

    /// <summary>
    /// Критерии за търсене на съдържание на пакет за вписване.
    /// </summary>
    public class ApplicationProcessContentSearchCriteria : EpzeuCRSearchCriteriaBase
    {
        public ApplicationProcessContentSearchCriteria()
        {
            LoadOption = new ApplicationProcessContentLoadOption();
        }

        /// <summary>
        /// Търсене по идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// Търсене по списък от идентификатори на заявители.
        /// </summary>
        public List<long> ApplicationIDs { get; set; }

        /// <summary>
        /// Търсене по тип на данните
        /// </summary>
        public ApplicationProcessContentTypes? Type { get; set; }

        /// <summary>
        /// Опции за зареждане.
        /// </summary>
        public ApplicationProcessContentLoadOption LoadOption { get; set; }
    }

    /// <summary>
    /// Критерии за търсене на заявление
    /// </summary>
    public class ApplicationSearchCriteria : EpzeuCRSearchCriteriaBase
    {
        public ApplicationSearchCriteria()
        {
            LoadOption = new ApplicationLoadOption();
        }

        /// <summary>
        /// Търсене по идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// Търсене по списък от идентификатори на заявители.
        /// </summary>
        public List<long> ApplicationIDs { get; set; }

        /// <summary>
        /// Опции за зареждане.
        /// </summary>
        public ApplicationLoadOption LoadOption { get; set; }
    }

    /// <summary>
    /// Критерии за търсене на документи.
    /// </summary>
    public class ApplicationDocumentSearchCriteria : EpzeuCRSearchCriteriaBase
    {
        /// <summary>
        /// Търсене по списък от идентификатори на заявители.
        /// </summary>
        public List<long> ApplicationIDs { get; set; }

        /// <summary>
        /// Търсене по списък от уникалени идентификатори на съдържание на пакети за вписване.
        /// </summary>
        public List<long> ApplDocumentIDs { get; set; }

        /// <summary>
        /// Търсене по списък от идентификатори на документа в ТР
        /// </summary>
        public List<string> ApplDocumentGUIDs { get; set; }

        public Guid? SigningGiud { get; set; }
    }
}
