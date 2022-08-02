using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление - В25 Заявление за вписване на обстоятелства относно преобразуване на сдружения, фондации и читалища - разделяне и отделяне
    /// </summary>
    internal class V25Provider : ApplicationFormVProviderBase<V25>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.V2_Conversion;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            #region TransformingNPOs

            if (application.Fields.TransformingNPOs == null)
                application.Fields.TransformingNPOs = new F702b_TransformingNPOs();

            if (application.Fields.TransformingNPOs.TransformingNPOList == null)
                application.Fields.TransformingNPOs.TransformingNPOList = new List<F702b0_TransformingNPO>();

            //Трябва да има поне едно преобразуващо се дружество.
            if (application.Fields.TransformingNPOs.TransformingNPOList.Count == 0)
            {
                var transformingNPO = new F702b0_TransformingNPO();

                application.Fields.TransformingNPOs.TransformingNPOList.Add(transformingNPO);
            }

            #endregion

            #region Successors

            if (application.Fields.Successors703 == null)
                application.Fields.Successors703 = new F703_Successors();

            if (application.Fields.Successors703.SuccessorList == null)
                application.Fields.Successors703.SuccessorList = new List<F7030_Successor>();

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
