using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "В22 Заявление за вписване на обстоятелства относно преобразуване на търговски дружества - разделяне и отделяне"
    /// </summary>
    internal class V22Provider : ApplicationFormVProviderBase<V22>
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

            if (application.Fields.TransformingCompanys == null)
            {
                application.Fields.TransformingCompanys = new F702_TransformingCompanys();
            }

            if (application.Fields.TransformingCompanys.TransformingCompanyList == null)
            {
                application.Fields.TransformingCompanys.TransformingCompanyList = new List<F7020_TransformingCompany>();
            }

            //Трябва да има поне едно преобразуващо се дружество.
            if (application.Fields.TransformingCompanys.TransformingCompanyList.Count == 0)
            {
                var transformingCompany = new F7020_TransformingCompany();

                application.Fields.TransformingCompanys.TransformingCompanyList.Add(transformingCompany);
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

            #region BranchSubjects

            if (application.Fields.Branches704 == null)
            {
                application.Fields.Branches704 = new F704_Branches704();
            }

            if (application.Fields.Branches704.BranchList == null)
            {
                application.Fields.Branches704.BranchList = new List<F7040_Branch704Subject>();
            }

            if (application.Fields.Branches704.BranchList.Count == 0)
            {
                var successor = new F7040_Branch704Subject();
                successor.Branches = new List<Branch>() { new Branch()};

                application.Fields.Branches704.BranchList.Add(successor);
            }

            #endregion

            return result;
        }
    }
}
