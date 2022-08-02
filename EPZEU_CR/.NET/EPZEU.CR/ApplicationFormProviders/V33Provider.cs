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
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "В33 Заявление за вписване на обстоятелства относно преобразуване на европейско кооперативно дружество в кооперация"
    /// </summary>
    internal class V33Provider : ApplicationFormVProviderBase<V33>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.V3_Reorganization_K;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region TransformingCompanys

            if (application.Fields.ReorganizeCoOperatives2 == null)
            {
                application.Fields.ReorganizeCoOperatives2 = new F802a_ReorganizeCoOperatives2();
            }

            if (application.Fields.ReorganizeCoOperatives2.CoOperative2List == null)
            {
                application.Fields.ReorganizeCoOperatives2.CoOperative2List = new List<F802a0_CoOperative2>();
            }

            //Трябва да има поне едно преобразуващо се дружество.
            if (application.Fields.ReorganizeCoOperatives2.CoOperative2List.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();
                var cooperative = new F802a0_CoOperative2() { Subject = new Person() { CountryName = bgCountry.Name } };

                application.Fields.ReorganizeCoOperatives2.CoOperative2List.Add(cooperative);
            }

            #endregion

            #region Successors

            if (application.Fields.Successors803 == null)
            {
                application.Fields.Successors803 = new F803_Successors803();
            }

            if (application.Fields.Successors803.SuccessorList == null)
            {
                application.Fields.Successors803.SuccessorList = new List<F8030_Successor803>();
            }

            //Трябва да има поне един правоприемник.
            if (application.Fields.Successors803.SuccessorList.Count == 0)
            {
                var successor = new F8030_Successor803();

                application.Fields.Successors803.SuccessorList.Add(successor);
            }
            #endregion

            return result;
        }
    }
}
