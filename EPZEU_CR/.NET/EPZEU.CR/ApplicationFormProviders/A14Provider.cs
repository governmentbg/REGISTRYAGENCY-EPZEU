using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А14 Заявление за вписване на обстоятелства относно дружество, регистрирано в юрисдикция с преференциален данъчен режим"
    /// </summary>
    internal class A14Provider : ApplicationFormAProviderBase<A14>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.CHD;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region Representatives

            if (application.Fields.Representatives == null)
            {
                application.Fields.Representatives = new F010_Representatives();
            }

            if (application.Fields.Representatives.RepresentativeList == null)
            {
                application.Fields.Representatives.RepresentativeList = new List<F0100_Representative>();
            }

            //Трябва да има поне един
            if (application.Fields.Representatives.RepresentativeList.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();
                var representative = new F0100_Representative()
                {
                    Person = new Domain.Fields.Common.Person(),
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.Representatives.RepresentativeList.Add(representative);
            }

            #endregion

            return result;
        }
    }
}
