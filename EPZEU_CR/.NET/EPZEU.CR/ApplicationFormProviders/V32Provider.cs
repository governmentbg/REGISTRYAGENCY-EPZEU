using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "В32 Заявление за вписване на обстоятелства относно преустройство на кооперации - разделяне и отделяне"
    /// </summary>
    internal class V32Provider : ApplicationFormVProviderBase<V32>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.V3_Reorganization_K;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region ReorganizeCoOperatives

            if (application.Fields.ReorganizeCoOperatives == null)
            {
                application.Fields.ReorganizeCoOperatives = new F802_ReorganizeCoOperatives();
            }

            if (application.Fields.ReorganizeCoOperatives.CoOperativeList == null)
            {
                application.Fields.ReorganizeCoOperatives.CoOperativeList = new List<F8020_CoOperative>();
            }

            //Трябва да има поне едно преобразуващо се дружество.
            if (application.Fields.ReorganizeCoOperatives.CoOperativeList.Count == 0)
            {
                var coOperative = new F8020_CoOperative();

                application.Fields.ReorganizeCoOperatives.CoOperativeList.Add(coOperative);
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

            #region BranchSubjects

            if (application.Fields.Branches804 == null)
            {
                application.Fields.Branches804 = new F804_ReorgBranches();
            }

            if (application.Fields.Branches804.BranchList == null)
            {
                application.Fields.Branches804.BranchList = new List<F8040_ReorgBranch>();
            }

            if (application.Fields.Branches804.BranchList.Count == 0)
            {
                var successor = new F8040_ReorgBranch();
                successor.Branches = new List<Branch>() { new Branch() };

                application.Fields.Branches804.BranchList.Add(successor);
            }

            #endregion

            return result;
        }
    }
}
