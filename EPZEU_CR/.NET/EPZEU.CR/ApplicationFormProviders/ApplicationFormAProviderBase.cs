using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IDeedContext с данни за партидата в чиито контекс се попълват А заявленията
    /// </summary>
    public class ApplicationADeedContext : IDeedContext
    {
        private IApplicationAProvider provider;
        private string uic;
        private BulstatDeed bulstatDeed;
        private string companyName;

        public ApplicationADeedContext(IApplicationAProvider provider, string uic = null, string companyName = null, BulstatDeed bulstatDeed = null)
        {
            this.provider = provider;
            this.uic = uic;
            this.companyName = companyName;
            this.bulstatDeed = bulstatDeed;
        }

        public string UIC => uic;

        public BulstatDeed BulstatDeed => bulstatDeed;

        public Integration.EPZEU.Models.LegalForms? LegalForm => provider.LegalFormBase;

        public string CompanyName => companyName;
    }

    /// <summary>
    /// Интерфейс за работа със съдържанието на заявления А
    /// </summary>
    public interface IApplicationAProvider : IApplicationWithFieldsProvider
    {
        /// <summary>
        /// Правна форма по подразбиране на заявлението 
        /// </summary>
        Integration.EPZEU.Models.LegalForms LegalFormBase { get; }
    }

    /// <summary>
    /// Базова реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявления А
    /// </summary>
    /// <typeparam name="TApplication">Тип на заявлението</typeparam>
    internal abstract class ApplicationFormAProviderBase<TApplication> : ApplicationWithFieldsFormProviderBase<TApplication>, IApplicationAProvider
        where TApplication : IApplicationWithFieldsForm
    {
        /// <summary>
        /// Базова правна форма на партидата, използва се за инициялизиране на поле Правна форма, ако е изчетена от справка актуално състояние 
        /// </summary>
        public abstract Integration.EPZEU.Models.LegalForms LegalFormBase { get; }

        #region Overrided methods

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            var appFields = (ApplicationFormAFieldsBase)application.GetFiledsContainer();

            if ((((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange ||
                (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.Preregistration && appFields.LegalForm != null && !string.IsNullOrEmpty(appFields.LegalForm.Code))) &&
                DeedHelpers.GetApplicationTypeForLegalForm((Integration.EPZEU.Models.LegalForms)Convert.ToInt32(appFields.LegalForm.Code)) != application.AppType)
            {
                return new OperationResult("CR_GL_INCONSISTENCY_BETWEEN_LEGAL_FORM_AND_APPLICATION_Е", "CR_GL_INCONSISTENCY_BETWEEN_LEGAL_FORM_AND_APPLICATION_Е");
            }

            if ((((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New || ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.Preregistration) &&
                (appFields.LegalForm == null || string.IsNullOrEmpty(appFields.LegalForm.Code)))
            {
                var legalForm = GetRequiredService<ILegalForms>().GetLegalForm((int)LegalFormBase);

                appFields.LegalForm = new F003_LegalForm()
                {
                    Code = ((int)LegalFormBase).ToString(),
                    Text = legalForm.Name,
                    RecordOperation = Domain.Fields.Common.RecordOperations.Add
                };
            }

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region Seat

            if (appFields.Seat == null)
            {
                appFields.Seat = new Domain.Fields.F005_Seat();
            }

            if (appFields.Seat.Address == null)
            {
                appFields.Seat.Address = new Domain.Fields.Common.Address();
            }

            if (string.IsNullOrEmpty(appFields.Seat.Address.Country))
            {
                appFields.Seat.Address.Country = bgCountry.Name;
                appFields.Seat.Address.CountryCode = bgCountry.Code;
                appFields.Seat.Address.CountryID = bgCountry.ID;
            }

            #endregion

            #region SeatForCorrespondence

            if (appFields.SeatForCorrespondence == null)
            {
                appFields.SeatForCorrespondence = new Domain.Fields.F005a_SeatForCorrespondence();
            }

            if (appFields.SeatForCorrespondence.Address == null)
            {
                appFields.SeatForCorrespondence.Address = new Domain.Fields.Common.Address();
            }

            if (string.IsNullOrEmpty(appFields.SeatForCorrespondence.Address.Country))
            {
                appFields.SeatForCorrespondence.Address.Country = bgCountry.Name;
                appFields.SeatForCorrespondence.Address.CountryCode = bgCountry.Code;
                appFields.SeatForCorrespondence.Address.CountryID = bgCountry.ID;
            }

            #endregion 

            return result;
        }

        protected override async Task<CNSys.OperationResult> InitApplicationWithBulstatDataAsync(ApplicationWithFieldsInitParameters initParams)
        {
            var result = await base.InitApplicationWithBulstatDataAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            var appFields = (ApplicationFormAFieldsBase)application.GetFiledsContainer();
            appFields.Company = new F002_Company();
            appFields.Company.Text = initParams.CompanyName;
            appFields.Company.RecordOperation = RecordOperations.Add;

            var bulstatDeed = await GetRequiredService<IBulstatReportServiceClient>().GetBulstatSummaryAsync(initParams.UIC);

            if (bulstatDeed != null)
            {
                if (bulstatDeed.LegalFormID.HasValue && bulstatDeed.LegalFormID > 0)
                {
                    var legalForm = GetRequiredService<ILegalForms>().GetLegalForm((int)bulstatDeed.LegalFormID.Value);

                    if (legalForm != null)
                    {
                        appFields.LegalForm = new F003_LegalForm()
                        {
                            Code = legalForm.ID.ToString(),
                            Text = legalForm.Name,
                            RecordOperation = RecordOperations.Add
                        };
                    }
                }

                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();

                appFields.Seat = new F005_Seat()
                {
                    Address = new Address()
                    {
                        Country = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };

                //TRIR-4786 Създаваме InitialState за поле 5, защото ако човек върне в първоначално състояние и имаме данни по Булстат, се зачиства всичко и не може да избере държава.
                InitRocordInitialState(appFields.Seat);

                appFields.Seat.Address.PostCode = bulstatDeed.PostCode;
                appFields.Seat.Address.HousingEstate = bulstatDeed.HousingEstate;
                appFields.Seat.Address.Street = bulstatDeed.Street;
                appFields.Seat.Address.StreetNumber = bulstatDeed.StreetNumber;
                appFields.Seat.Address.Entrance = bulstatDeed.Entrance;
                appFields.Seat.Address.Floor = bulstatDeed.BuildingFloor;
                appFields.Seat.Address.Apartment = bulstatDeed.Appartment;

                appFields.Seat.RecordOperation = RecordOperations.Add;

                var ekatte = GetRequiredService<IEkatte>();
                await ekatte.EnsureLoadedAsync(CancellationToken.None);

                if (!string.IsNullOrEmpty(bulstatDeed.DistrictEkatteCode))
                {
                    var district = ekatte.GetDistrict(bulstatDeed.DistrictEkatteCode);
                    appFields.Seat.Address.DistrictID = district.ID;
                    appFields.Seat.Address.DistrictEkatte = district.EkatteCode;
                    appFields.Seat.Address.District = district.Name;
                }

                if (!string.IsNullOrEmpty(bulstatDeed.MunicipalityEkatteCode))
                {
                    var municipality = ekatte.GetMunicipality(bulstatDeed.MunicipalityEkatteCode);
                    appFields.Seat.Address.Municipalityid = municipality.ID;
                    appFields.Seat.Address.MunicipalityEkatte = municipality.EkatteCode;
                    appFields.Seat.Address.Municipality = municipality.Name;
                }

                if (!string.IsNullOrEmpty(bulstatDeed.SettlementEkatteCode))
                {
                    var settlement = ekatte.GetSettlement(bulstatDeed.SettlementEkatteCode);
                    appFields.Seat.Address.SettlementID = settlement.ID;
                    appFields.Seat.Address.SettlementEKATTE = settlement.EkatteCode;
                    appFields.Seat.Address.Settlement = settlement.Name;
                }

                if (!string.IsNullOrEmpty(bulstatDeed.AreaEkatteCote))
                {
                    var area = ekatte.GetArea(bulstatDeed.AreaEkatteCote);
                    appFields.Seat.Address.AreaID = area.ID;
                    appFields.Seat.Address.AreaEkatte = area.EkatteCode;
                    appFields.Seat.Address.Area = area.Name;
                }
            }

            return result;
        }

        #endregion
    }
}
