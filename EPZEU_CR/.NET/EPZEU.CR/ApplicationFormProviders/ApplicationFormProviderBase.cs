using CNSys;
using EPZEU.CR.ApplicationFormValidators;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using EPZEU.Utilities;
using Integration.EPZEU.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Интерфейс за работа със съдържанието на заявление.
    /// </summary>
    public interface IApplicationProvider
    {
        /// <summary>
        /// Съдържание на заявление.
        /// </summary>
        IApplicationForm ApplicationForm { get; }

        /// <summary>
        /// Инициализира съдържанието на заявлението.
        /// </summary>
        /// <param name="initParams">Инициализационни параметри на заявлението.</param>
        /// <returns></returns>
        Task<OperationResult> InitApplicationAsync(ApplicationInitParameters initParams);

        /// <summary>
        /// Зарежда заявлението от Xml.
        /// </summary>
        /// <param name="reader">XmlReader за изчитане на заявлението.</param>
        void LoadFromXml(XmlReader reader);

        /// <summary>
        /// Зарежда заявлението от Json
        /// </summary>
        /// <param name="reader">JsonReader за изчитане на заявлението.</param>
        Task LoadFromJsonAsync(Stream reader);

        /// <summary>
        /// Записва заявлението като Xml
        /// </summary>
        /// <param name="writer">XmlWriter за запис на заявлението.</param>
        void SaveAsXml(XmlWriter writer);

        /// <summary>
        /// Записва заявлението като Json
        /// </summary>
        /// <param name="writer">JsonWriter за запис на заявлението.</param>
        Task SaveAsJsonAsync(Stream writer);

        /// <summary>
        /// Подготвя заявлението за подписване.
        /// </summary>
        void PrepareForSinging();

        Task<IErrorCollection> ValidateAsync();

        void SetGDPRAgreementText(string text);
    }

    /// <summary>
    /// Инициализационни параметри на заявление.
    /// </summary>
    public class ApplicationInitParameters
    {
        /// <summary>
        /// Флаг, дали заявлението е основно заявление
        /// </summary>
        public bool? IsMainApplication { get; set; }

        /// <summary>
        /// Допълнителни инициализационни прарамтри на заявлението
        /// </summary>
        public AdditionalData AdditionalData { get; set; }

        protected string GetAdditionalDataValue(string propName)
        {
            if (AdditionalData != null && AdditionalData.ContainsKey(propName) && !string.IsNullOrEmpty(AdditionalData[propName]))
            {
                return AdditionalData[propName];
            }
            else
            {
                return null;
            }
        }

        protected void SetAdditionalDataValue(string propName, string value)
        {
            if (AdditionalData == null)
            {
                AdditionalData = new AdditionalData();
            }

            AdditionalData[propName] = value;
        }
    }

    /// <summary>
    /// Базова реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление
    /// </summary>
    /// <typeparam name="TApplication">Тип на заявлението</typeparam>
    public abstract class ApplicationFormProviderBase<TApplication> : IApplicationProvider
        where TApplication : IApplicationForm
    {
        protected TApplication application { get; set; }

        public IServiceProvider ServiceProvider { get; set; }

        #region IApplicationProvider

        public IApplicationForm ApplicationForm { get { return application; } }

        public virtual async Task<OperationResult> InitApplicationAsync(ApplicationInitParameters initParams)
        {
            OperationResult result = null;

            if (application == null)
            {
                application = Activator.CreateInstance<TApplication>();
            }

            result = await InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            InitObject(application);

            if (!initParams.IsMainApplication.GetValueOrDefault())
            {
                application.ApplicantInfo = null;
                application.ApplicantExchange = null;
            }

            return result;
        }

        public virtual void PrepareForSinging()
        {
            ObjectUtility.ClearEmptyFields(application);

            if (application.ApplicantExchange != null &&
                string.IsNullOrEmpty(application.ApplicantExchange.Email) &&
                string.IsNullOrEmpty(application.ApplicantExchange.Addressee) &&
                (application.ApplicantExchange.Address == null ||
                    (application.ApplicantExchange.Address != null &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.District) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Municipality) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.PostCode) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Settlement) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Street) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Apartment) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Area) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Block) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Entrance) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.Floor) &&
                     string.IsNullOrEmpty(application.ApplicantExchange.Address.StreetNumber))))
            {
                application.ApplicantExchange = null;
            }

            if (application.ApplicantInfo != null && ObjectUtility.IsEmpty(application.ApplicantInfo.ApplicantRepresentative))
            {
                application.ApplicantInfo.ApplicantRepresentative = null;
            }
        }

        public async Task LoadFromJsonAsync(Stream reader)
        {
            application = await EPZEUJsonSerializer.DeserializeAsync<TApplication>(reader);
        }

        public void LoadFromXml(XmlReader reader)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(TApplication));

            application = (TApplication)serializer.Deserialize(reader);
        }

        public async Task SaveAsJsonAsync(Stream writer)
        {
            await EPZEUJsonSerializer.SerializeAsync(writer, application);
        }

        public void SaveAsXml(XmlWriter writer)
        {
            XmlSerializerNamespaces ns = new XmlSerializerNamespaces();

            ns.Add("xsi", "http://www.w3.org/2001/XMLSchema-instance");
            ns.Add("xsd", "http://www.w3.org/2001/XMLSchema");
            ns.Add("f", Namespaces.FieldsNamespace);
            ns.Add("app", Namespaces.ApplicationsNamespace);


            XmlSerializer serializer = new XmlSerializer(typeof(TApplication));

            serializer.Serialize(writer, application, ns);
        }

        #endregion

        #region Virtual methods 

        protected virtual Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            if (initParams.IsMainApplication.GetValueOrDefault())
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();

                application.GDPRAgreement = new GDPRAgreement();

                application.ApplicantExchange = new ApplicantExchange();
                application.ApplicantExchange.Address = new Address();

                application.ApplicantExchange.Address.Country = bgCountry.Name;
                application.ApplicantExchange.Address.CountryCode = bgCountry.Code;
                application.ApplicantExchange.Address.CountryID = bgCountry.ID;
                application.ApplicantExchange.Agree = true;

                application.ApplicantInfo = new ApplicantInfo();
                application.ApplicantInfo.Applicants = new Applicants();
                application.ApplicantInfo.Applicants.ApplicantsList = new List<Applicant>();
                application.ApplicantInfo.Applicants.ApplicantsList.Add(new Applicant());

                application.ApplicantInfo.ApplicantCapacity = new ApplicantCapacity();
            }

            return Task.FromResult(new OperationResult(OperationResultTypes.SuccessfullyCompleted));
        }

        /// <summary>
        /// Стопиращи валидации
        /// </summary>
        /// <returns></returns>
        public virtual Task<IErrorCollection> ValidateAsync()
        {
            return Task.FromResult(GetRequiredService<IApplicationValidatorFactory>().CreateApplicationFormValidator(application.AppType.ToString()).Validate(application, true));
        }

        public void SetGDPRAgreementText(string text)
        {
            application.GDPRAgreement.GDPRAgreementText = text;
        }

        #endregion

        #region Helpers

        protected T GetRequiredService<T>()
        {
            return ServiceProvider.GetRequiredService<T>();
        }

        protected bool HasPreregistrationOption(ApplicationFormTypes appType)
        {
            return appType == ApplicationFormTypes.A1 ||
            appType == ApplicationFormTypes.A2 ||
            appType == ApplicationFormTypes.A3 ||
            appType == ApplicationFormTypes.A4 ||
            appType == ApplicationFormTypes.A5 ||
            appType == ApplicationFormTypes.A6 ||
            appType == ApplicationFormTypes.A7 ||
            appType == ApplicationFormTypes.A8 ||
            appType == ApplicationFormTypes.A9 ||
            appType == ApplicationFormTypes.A15 ||
            appType == ApplicationFormTypes.A16 ||
            appType == ApplicationFormTypes.A17 ||
            appType == ApplicationFormTypes.A18;
        }

        private void InitObject(object obj)
        {
            foreach (var propInfo in obj.GetType().GetProperties())
            {
                var propVal = propInfo.GetValue(obj);

                if (propInfo.PropertyType.IsGenericType && typeof(IEnumerable).IsAssignableFrom(propInfo.PropertyType))
                {
                    if (propVal == null)
                    {
                        propVal = Activator.CreateInstance(propInfo.PropertyType);
                        propInfo.SetValue(obj, propVal);
                    }

                    foreach (var val in (IEnumerable)propVal)
                    {
                        if (propInfo.PropertyType.IsClass)
                        {
                            InitObject(val);
                        }
                    }
                }
                else if (propInfo.PropertyType == typeof(string))
                {
                    if (string.IsNullOrEmpty((string)propVal))
                    {
                        propVal = "";
                        propInfo.SetValue(obj, propVal);
                    }
                }
                else if (propInfo.PropertyType.IsClass)
                {
                    if (propVal == null)
                    {
                        propVal = Activator.CreateInstance(propInfo.PropertyType);
                        propInfo.SetValue(obj, propVal);
                    }

                    InitObject(propVal);
                }
            }
        }

        #endregion
    }
}
