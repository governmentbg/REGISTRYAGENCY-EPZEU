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
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "В24 Заявление за вписване на обстоятелства относно преобразуване с участие на дружества от държави-членки на ЕС"
    /// </summary>
    internal class V24Provider : ApplicationFormVProviderBase<V24>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.V2_Conversion;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region TransformingCompanys

            if (application.Fields.TransformingCompanys2 == null)
            {
                application.Fields.TransformingCompanys2 = new F702a_TransformingCompanys2();
            }

            if (application.Fields.TransformingCompanys2.TransformingCompany2List == null)
            {
                application.Fields.TransformingCompanys2.TransformingCompany2List = new List<F702a0_TransformingCompany2>();
            }

            //Трябва да има поне едно преобразуващо се дружество.
            if (application.Fields.TransformingCompanys2.TransformingCompany2List.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();
                var transformingCompany = new F702a0_TransformingCompany2() { Subject=new Person() {CountryName= bgCountry.Name } };

                application.Fields.TransformingCompanys2.TransformingCompany2List.Add(transformingCompany);
            }

            #endregion

            #region Successors

            if (application.Fields.Successors703 == null)
            {
                application.Fields.Successors703 = new F703_Successors();
            }

            if (application.Fields.Successors703.SuccessorList == null)
            {
                application.Fields.Successors703.SuccessorList = new List<F7030_Successor>();
            }

            //Трябва да има поне един правоприемник.
            if (application.Fields.Successors703.SuccessorList.Count == 0)
            {
                var successor = new F7030_Successor();

                application.Fields.Successors703.SuccessorList.Add(successor);
            }

            #endregion

            return result;
        }
    }
}
