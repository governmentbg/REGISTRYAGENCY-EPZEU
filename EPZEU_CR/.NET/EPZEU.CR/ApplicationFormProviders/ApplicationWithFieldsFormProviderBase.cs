using CNSys;
using EPZEU.CR.ApplicationFormValidators;
using EPZEU.CR.ApplicationProcesses.Models;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Utilities;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Инициализационни параметри на заявление с полета.
    /// </summary>
    public class ApplicationWithFieldsInitParameters : ApplicationInitParameters
    {
        /// <summary>
        /// Вид на заявлението.
        /// </summary>
        public ProcessStates? State
        {
            get
            {
                var stateString = GetAdditionalDataValue("state");

                return string.IsNullOrEmpty(stateString) ? (ProcessStates?)null : (ProcessStates)int.Parse(stateString);
            }
        }

        /// <summary>
        /// ЕИК.
        /// </summary>
        public string UIC
        {
            get
            {
                return GetAdditionalDataValue("uic");
            }
        }

        /// <summary>
        /// Идентификатор на раздел.
        /// </summary>
        public string SubUIC
        {
            get
            {
                return GetAdditionalDataValue("subUIC");
            }
            set
            {
                SetAdditionalDataValue("subUIC", value);
            }
        }

        /// <summary>
        /// Данни за партида в регистър БУЛСТАТ.
        /// </summary>
        public BulstatDeed BulstatDeed
        {
            get
            {
                var deedString = GetAdditionalDataValue("deed");
                var yearString = GetAdditionalDataValue("year");
                var courtCodeString = GetAdditionalDataValue("courtCode");

                if (string.IsNullOrEmpty(deedString) &&
                    string.IsNullOrEmpty(yearString) &&
                    string.IsNullOrEmpty(courtCodeString))
                {
                    return null;
                }
                else
                {
                    return new BulstatDeed()
                    {
                        Deed = deedString,
                        Year = yearString,
                        CourtCode = courtCodeString
                    };
                }
            }
        }

        /// <summary>
        /// Име на юридическо лице 
        /// </summary>
        public string CompanyName
        {
            get
            {
                return GetAdditionalDataValue("companyName");
            }
        }

        /// <summary>
        /// Флаг оказващ дали e допълнителен процес към процес по пререгистрация
        /// </summary>
        public bool IsPreregistrationChildProcess
        {
            get
            {
                var isPreregistrationChildProcess = GetAdditionalDataValue("isPreregistrationChildProcess");

                return string.IsNullOrEmpty(isPreregistrationChildProcess) ? false : Convert.ToBoolean(isPreregistrationChildProcess);
            }
        }

        /// <summary>
        /// Идентификато на заявлението за пререгистрация, което ще се променя
        /// </summary>
        public long? ApplicationToChangeID
        {
            get
            {
                var applicationToChangeID = GetAdditionalDataValue("applicationToChangeID");

                return string.IsNullOrEmpty(applicationToChangeID) ? (long?)null : Convert.ToInt64(applicationToChangeID);
            }
        }

        /// <summary>
        /// Данни за инициялизиране на съдържанието на заявлението.
        /// </summary>
        public List<IField> Fields { get; set; }

        /// <summary>
        /// Данни за партидата на главното заявление на услугата.
        /// </summary>
        public IDeedContext DeedContext { get; set; }

        /// <summary>
        /// Данни за заявител
        /// </summary>
        public ApplicantInfo ApplicantInfo { get; set; }

        /// <summary>
        /// Данни за контатни с заявител
        /// </summary>
        public ApplicantExchange ApplicantExchange { get; set; }
    }

    /// <summary>
    /// Интерфейс с данни за партидата в чиито контекс се попълват заявленията
    /// </summary>
    public interface IDeedContext
    {
        string UIC { get; }

        BulstatDeed BulstatDeed { get; }

        LegalForms? LegalForm { get; }

        string CompanyName { get; }
    }

    /// <summary>
    /// Реализация на интерфейс IDeedContext с данни за партидата в чиито контекс се попълват допълнителните заявления.
    /// </summary>
    public class ApplicationDeedContext : IDeedContext
    {
        private Application application;

        public ApplicationDeedContext(Application application)
        {
            this.application = application;
        }


        public string UIC
        {
            get
            {
                return GetAdditionalDataValue("uic");
            }
        }

        public BulstatDeed BulstatDeed
        {
            get
            {
                var deedString = GetAdditionalDataValue("deed");
                var yearString = GetAdditionalDataValue("year");
                var courtCodeString = GetAdditionalDataValue("courtCode");

                if (string.IsNullOrEmpty(deedString) &&
                    string.IsNullOrEmpty(yearString) &&
                    string.IsNullOrEmpty(courtCodeString))
                {
                    return null;
                }
                else
                {
                    return new BulstatDeed()
                    {
                        Deed = deedString,
                        Year = yearString,
                        CourtCode = courtCodeString
                    };
                }
            }
        }

        public LegalForms? LegalForm
        {
            get
            {
                var stateString = GetAdditionalDataValue("legalForm");

                return string.IsNullOrEmpty(stateString) ? (LegalForms?)null : (LegalForms)int.Parse(stateString);
            }
        }

        public string CompanyName
        {
            get
            {
                return GetAdditionalDataValue("companyName");
            }
        }

        protected string GetAdditionalDataValue(string propName)
        {
            if (application != null && application.AdditionalData != null && application.AdditionalData.ContainsKey(propName) && !string.IsNullOrEmpty(application.AdditionalData[propName]))
            {
                return application.AdditionalData[propName];
            }

            else return null;
        }
    }

    /// <summary>
    /// Реализация на интерфейс IDeedContext с данни за партидата в чиито контекс се попълваt заявления за промяна.
    /// </summary>
    public class DeedSummaryContext : IDeedContext
    {
        private IDeedSummary deed;

        public DeedSummaryContext(IDeedSummary deed)
        {
            this.deed = deed;
        }

        public string UIC => deed.UIC;

        public BulstatDeed BulstatDeed => null;

        public LegalForms? LegalForm => deed.LegalForm;

        public string CompanyName => deed.CompanyName;
    }

    /// <summary>
    ///  Реализация на интерфейс IDeedContext с данни за партидата в за пререгистрация.
    /// </summary>
    public class ApplicationPreregistrationContext : IDeedContext
    {
        private LegalForms? _legalForm;
        private string uic;
        private BulstatDeed bulstatDeed;
        private string companyName;

        public ApplicationPreregistrationContext(string uic, string companyName, BulstatDeed bulstatDeed, LegalForms? legalForm)
        {
            this._legalForm = legalForm;
            this.uic = uic;
            this.companyName = companyName;
            this.bulstatDeed = bulstatDeed;
        }

        public string UIC => uic;

        public BulstatDeed BulstatDeed => bulstatDeed;

        public Integration.EPZEU.Models.LegalForms? LegalForm => _legalForm;

        public string CompanyName => companyName;
    }

    /// <summary>
    /// Интерфейс за работа със съдържанието на заявление с полета.
    /// </summary>
    public interface IApplicationWithFieldsProvider : IApplicationProvider
    {
        /// <summary>
        /// Тип на раздел от партидата, в който заявлението вписва данни.
        /// </summary>
        Integration.EPZEU.Models.SubUICTypes SubUICType { get; }
    }

    /// <summary>
    /// Базова реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление  с полета.
    /// </summary>
    /// <typeparam name="TApplication">Тип на заявлението</typeparam>
    public abstract class ApplicationWithFieldsFormProviderBase<TApplication> : ApplicationFormProviderBase<TApplication>, IApplicationWithFieldsProvider
        where TApplication : IApplicationWithFieldsForm
    {
        public abstract Integration.EPZEU.Models.SubUICTypes SubUICType { get; }

        protected virtual CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
            {
                return new CNSys.OperationResult("GL_CR_COMPANY_NOT_FOUND_E", "GL_CR_COMPANY_NOT_FOUND_E");
            }

            return new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted);
        }

        #region ApplicationFormProviderBase<TApplication>

        public override async Task<CNSys.OperationResult> InitApplicationAsync(ApplicationInitParameters initParams)
        {
            CNSys.OperationResult result = null;

            application = Activator.CreateInstance<TApplication>();

            //Зареждаме данните за заявлението от справката актуално състояние
            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange && application.AppType != ApplicationFormTypes.D1)
            {
                result = await InitApplicationWithActualStateDataAsync((ApplicationWithFieldsInitParameters)initParams);

                if (!result.IsSuccessfullyCompleted)
                {
                    return result;
                }
            }

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.Preregistration)
            {
                if (!HasPreregistrationOption(application.AppType) && ((ApplicationWithFieldsInitParameters)initParams).IsMainApplication.GetValueOrDefault())
                    return new CNSys.OperationResult("GL_UNABLE_ACCEPT_APPLICATION_E", "GL_UNABLE_ACCEPT_APPLICATION_E");

                var deeds = await GetRequiredService<IDeedReportServiceClient>().SearchDeedSummaryAsync(new DeedSummarySearchCriteria() { UICs = new List<string>() { ((ApplicationWithFieldsInitParameters)initParams).UIC } });

                if (deeds.Count != null && deeds.Count > 0)
                {
                    return new CNSys.OperationResult("CR_APP_00225_E", "CR_APP_00225_E");
                }

                result = await InitApplicationWithBulstatDataAsync((ApplicationWithFieldsInitParameters)initParams);

                if (!result.IsSuccessfullyCompleted)
                {
                    return result;
                }
            }

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New && application.AppType == ApplicationFormTypes.B6)
            {
                var deeds = await GetRequiredService<IDeedReportServiceClient>().SearchDeedSummaryAsync(new DeedSummarySearchCriteria() { UICs = new List<string>() { ((ApplicationWithFieldsInitParameters)initParams).UIC } });

                if (deeds.Count == 0)
                {
                    result = await InitApplicationWithBulstatDataAsync((ApplicationWithFieldsInitParameters)initParams);

                    if (!result.IsSuccessfullyCompleted)
                    {
                        return result;
                    }
                }
            }

            result = await base.InitApplicationAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            InitRecordsInitialState();

            if (((ApplicationWithFieldsInitParameters)initParams).ApplicantInfo != null)
            {
                application.ApplicantInfo = ((ApplicationWithFieldsInitParameters)initParams).ApplicantInfo;
            }

            if (((ApplicationWithFieldsInitParameters)initParams).ApplicantExchange != null)
            {
                application.ApplicantExchange = ((ApplicationWithFieldsInitParameters)initParams).ApplicantExchange;
            }

            //Когато подаваме допълнителен пакет към пакет за пререгистрация секцията UIC се копира от заявлението за пререгистрация 
            if (((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
            {
                var uic = ((ApplicationWithFieldsInitParameters)initParams).Fields.SingleOrDefault(f => f.FieldIdent == F001_UIC.FieldIdentCode);

                if (uic != null)
                {
                    application.GetFiledsContainer().UIC = (F001_UIC)uic;
                }
            }

            return result;
        }

        public override void PrepareForSinging()
        {
            base.PrepareForSinging();

            ClearUnchangedRecords(application);
        }

        public override async Task<IErrorCollection> ValidateAsync()
        {
            var errors = new ErrorCollection();
            var mainAppErrors = await base.ValidateAsync();

            if (mainAppErrors != null && mainAppErrors.Count > 0)
                errors.AddRange(mainAppErrors);

            //Валидиране на добавените заявления към А и В заявленията.
            if (application.Applications != null && application.Applications.Count > 0)
            {
                foreach (var additionalApp in application.Applications)
                {
                    var additionalAppErrors = GetRequiredService<IApplicationValidatorFactory>().CreateApplicationFormValidator(additionalApp.AppType.ToString()).Validate(additionalApp, false);
                    if (additionalAppErrors != null && additionalAppErrors.Count > 0)
                        errors.AddRange(additionalAppErrors);
                }
            }

            return errors.Count > 0 ? errors : null;
        }

        protected override async Task<CNSys.OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            application.SubUICType = SubUICType;

            application.SubUIC = ((ApplicationWithFieldsInitParameters)initParams).SubUIC;

            application.ApplicationState = ((ApplicationWithFieldsInitParameters)initParams).State;

            var appFields = application.GetFiledsContainer();

            #region UIC

            if (appFields.UIC == null)
            {
                appFields.UIC = new F001_UIC();
            }

            if (!((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
            {
                if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange)
                {
                    appFields.UIC.IsNew = false;
                }
                else
                {
                    appFields.UIC.IsNew = true;
                    appFields.UIC.RecordOperation = RecordOperations.Add;
                }

                appFields.UIC.Text = ((ApplicationWithFieldsInitParameters)initParams).UIC;
            }

            #endregion

            return result;
        }

        #endregion

        #region Helpers

        private void InitRecordsInitialState()
        {
            var fileds = application.GetFiledsContainer().GetFields();

            foreach (var field in fileds)
            {
                if (typeof(RecordField).IsAssignableFrom(field.GetType()))
                {
                    InitRocordInitialState((RecordField)field);
                }

                if (typeof(CompositeField).IsAssignableFrom(field.GetType()))
                {
                    var records = ((CompositeField)field).GetRecords();

                    foreach (var rec in records)
                    {
                        InitRocordInitialState(rec);
                    }
                }
            }
        }

        protected void InitRocordInitialState(Record record)
        {
            if (record.RecordOperation == RecordOperations.Current)
            {
                var serializerOptions = EPZEUJsonSerializer.GetDefaultSerializerOptionsCopy();
                serializerOptions.IgnoreNullValues = false;

                var jsonString = EPZEUJsonSerializer.Serialize((object)record, serializerOptions);

                var recordJsonData = EPZEUJsonSerializer.Deserialize<JsonData>(jsonString);

                recordJsonData.JsonElements.Remove("initialState");

                using (var jDocument = JsonDocument.Parse(EPZEUJsonSerializer.Serialize(recordJsonData)))
                {
                    record.InitialState = jDocument.RootElement.Clone();
                }
            }
        }

        protected Task<CNSys.OperationResult> InitApplicationWithActualStateDataAsync(ApplicationWithFieldsInitParameters initParams)
        {
            var result = ValidateApplicationInitFields(initParams.Fields);

            if (result.IsSuccessfullyCompleted)
            {
                var appFileds = application.GetFiledsContainer();

                foreach (var field in initParams.Fields)
                {
                    if (field.FieldIdent != F024_ShareTransfers.FieldIdentCode)
                    {
                        appFileds.AddField(field);
                    }
                }
            }
            else
                return Task.FromResult(result);

            return Task.FromResult(new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted));
        }

        protected virtual Task<CNSys.OperationResult> InitApplicationWithBulstatDataAsync(ApplicationWithFieldsInitParameters initParams)
        {
            var appFields = application.GetFiledsContainer();

            if (appFields.UIC == null)
            {
                appFields.UIC = new F001_UIC();
            }

            appFields.UIC.Text = initParams.UIC;
            appFields.UIC.BulstatDeed = initParams.BulstatDeed;
            appFields.UIC.CompanyControl = initParams.CompanyName;

            return Task.FromResult(new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted));
        }

        private void ClearUnchangedRecords(IApplicationWithFieldsForm appication)
        {
            var fields = appication.GetFiledsContainer().GetFields();

            foreach (var field in fields)
            {
                //TODO: Полето F001_UIC трябва да не се зачиств а само за Главното заявление
                if (typeof(RecordField).IsAssignableFrom(field.GetType()) && ((RecordField)field).RecordOperation == RecordOperations.Current && ((RecordField)field).FieldIdent != F001_UIC.FieldIdentCode)
                {
                    appication.GetFiledsContainer().DeleteField(field);
                }

                if (typeof(CompositeField).IsAssignableFrom(field.GetType()))
                {
                    var records = ((CompositeField)field).GetRecords();

                    if (records.Count == 0 || records.All(r => r.RecordOperation == RecordOperations.Current))
                    {
                        appication.GetFiledsContainer().DeleteField(field);
                    }
                    else
                    {
                        foreach (var rec in records)
                        {
                            if (rec.RecordOperation == RecordOperations.Current)
                            {
                                ((CompositeField)field).DeleteRecord(rec);
                            }
                        }
                    }
                }
            }

            if (appication.Applications != null && appication.Applications.Count > 0)
            {
                foreach (var appItem in appication.Applications)
                {
                    ClearUnchangedRecords(appItem);
                }
            }

        }

        #endregion
    }
}
