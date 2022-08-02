using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Б7  Заявление за вписване на обстоятелства относно действителни собственици"
    /// </summary>
    internal class B7Provider : ApplicationFormBProviderBase<B7>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.B7_ActualOwner;

        protected override CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
                return ReturnErrorResult("CR_APP_00096_E");

            return new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted);
        }

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region AdditionalData, F529_ReasonForEntry529

            if (application.Fields.ReasonForEntry529 == null)
            {
                application.Fields.ReasonForEntry529 = new F529_ReasonForEntry529();

                if (application.ApplicationState == ProcessStates.ForChange 
                    && application.Fields.ReasonForEntry529.Article63 == false
                    && application.Fields.ReasonForEntry529.Article6 == false)
                {
                    application.Fields.ReasonForEntry529.RecordOperation = Domain.Fields.Common.RecordOperations.Add;
                    application.Fields.ReasonForEntry529.Article6 = true;
                }
            }

            if (initParams.AdditionalData != null
                && application.Fields.ReasonForEntry529.Article63 == false
                && application.Fields.ReasonForEntry529.Article6 == false)
            {
                application.Fields.ReasonForEntry529.RecordOperation = Domain.Fields.Common.RecordOperations.Add;

                if (initParams.AdditionalData.ContainsKey("article63")
                    && bool.TryParse(initParams.AdditionalData["article63"], out bool article63))
                {
                    application.Fields.ReasonForEntry529.Article63 = article63;
                }

                if (initParams.AdditionalData.ContainsKey("article6")
                    && bool.TryParse(initParams.AdditionalData["article6"], out bool article6))
                {
                    application.Fields.ReasonForEntry529.Article6 = article6;
                }
            }

            #endregion

            #region OffshoreRepresentatives

            if (application.Fields.OffshoreRepresentatives == null)
                application.Fields.OffshoreRepresentatives = new F534_OffshoreRepresentatives();

            if (application.Fields.OffshoreRepresentatives.OffshoreRepresentativesList == null)
                application.Fields.OffshoreRepresentatives.OffshoreRepresentativesList = new List<F5340_OffshoreRepresentative>();

            if (application.Fields.OffshoreRepresentatives.OffshoreRepresentativesList.Count == 0)
            {
                var representative = new F5340_OffshoreRepresentative();
                application.Fields.OffshoreRepresentatives.OffshoreRepresentativesList.Add(representative);

                application.Fields.OffshoreRepresentatives.OffshoreRepresentativesList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID
                };

                application.Fields.OffshoreRepresentatives.OffshoreRepresentativesList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID
                };
            }

            #endregion

            #region OffshoreDirectControlCompanyRepresentatives

            if (application.Fields.OffshoreDirectControlCompanyRepresentatives == null)
                application.Fields.OffshoreDirectControlCompanyRepresentatives = new F5371_OffshoreDirectControlCompanyRepresentatives();

            if (application.Fields.OffshoreDirectControlCompanyRepresentatives.OffshoreDirectControlCompanyRepresentativesList == null)
                application.Fields.OffshoreDirectControlCompanyRepresentatives.OffshoreDirectControlCompanyRepresentativesList = new List<F53710_OffshoreDirectControlCompanyRepresentative>();

            if (application.Fields.OffshoreDirectControlCompanyRepresentatives.OffshoreDirectControlCompanyRepresentativesList.Count == 0)
            {
                var representative = new F53710_OffshoreDirectControlCompanyRepresentative();
                application.Fields.OffshoreDirectControlCompanyRepresentatives.OffshoreDirectControlCompanyRepresentativesList.Add(representative);

                application.Fields.OffshoreDirectControlCompanyRepresentatives.OffshoreDirectControlCompanyRepresentativesList[0].Person = new Domain.Fields.Common.Person();
                application.Fields.OffshoreDirectControlCompanyRepresentatives.OffshoreDirectControlCompanyRepresentativesList[0].Address = new Domain.Fields.Common.Address();
                application.Fields.OffshoreDirectControlCompanyRepresentatives.OffshoreDirectControlCompanyRepresentativesList[0].CountryOfResidence = new Domain.Fields.Common.Address();
            }

            #endregion

            #region OffshoreNoDirectControlCompanyRepresentatives

            if (application.Fields.OffshoreNoDirectControlCompanyRepresentatives == null)
                application.Fields.OffshoreNoDirectControlCompanyRepresentatives = new F5381_OffshoreNoDirectControlCompanyRepresentatives();

            if (application.Fields.OffshoreNoDirectControlCompanyRepresentatives.OffshoreNoDirectControlCompanyRepresentativesList == null)
                application.Fields.OffshoreNoDirectControlCompanyRepresentatives.OffshoreNoDirectControlCompanyRepresentativesList = new List<F53810_OffshoreNoDirectControlCompanyRepresentative>();

            if (application.Fields.OffshoreNoDirectControlCompanyRepresentatives.OffshoreNoDirectControlCompanyRepresentativesList.Count == 0)
            {
                var representatives = new F53810_OffshoreNoDirectControlCompanyRepresentative();
                application.Fields.OffshoreNoDirectControlCompanyRepresentatives.OffshoreNoDirectControlCompanyRepresentativesList.Add(representatives);

                application.Fields.OffshoreNoDirectControlCompanyRepresentatives.OffshoreNoDirectControlCompanyRepresentativesList[0].Person = new Domain.Fields.Common.Person();
                application.Fields.OffshoreNoDirectControlCompanyRepresentatives.OffshoreNoDirectControlCompanyRepresentativesList[0].Address = new Domain.Fields.Common.Address();
                application.Fields.OffshoreNoDirectControlCompanyRepresentatives.OffshoreNoDirectControlCompanyRepresentativesList[0].CountryOfResidence = new Domain.Fields.Common.Address();
            }

            #endregion

            #region F550_ActualOwners

            if (application.Fields.ActualOwners == null)
                application.Fields.ActualOwners = new F550_ActualOwners();

            if (application.Fields.ActualOwners.ActualOwnersList == null)
                application.Fields.ActualOwners.ActualOwnersList = new List<F5500_ActualOwner>();

            if (application.Fields.ActualOwners.ActualOwnersList.Count == 0)
            {
                var item = new F5500_ActualOwner();
                application.Fields.ActualOwners.ActualOwnersList.Add(item);

                application.Fields.ActualOwners.ActualOwnersList[0].Person = new Domain.Fields.Common.Person()
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID
                };

                application.Fields.ActualOwners.ActualOwnersList[0].Address = new Domain.Fields.Common.Address();
                application.Fields.ActualOwners.ActualOwnersList[0].CountryOfResidence = new Domain.Fields.Common.Address();
            }

            #endregion

            #region F550a_ContactPerson550a

            if (application.Fields.ContactPerson550a == null)
            {
                application.Fields.ContactPerson550a = new F550a_ContactPerson550a()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    },
                    PermanentAddress = new Domain.Fields.Common.Address()
                    {
                        Country = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };
            }

            #endregion

            return result;
        }
    }
}