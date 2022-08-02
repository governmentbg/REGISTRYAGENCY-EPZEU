using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F505_StopOfLiquidationView : FieldViewBase<F505_StopOfLiquidation>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F505_StopOfLiquidation field)
        {
            if (field.StoppingOfLiquidation)
            {
                writer.Write(LocalizeLabel("CR_APP_STOP_PROCESS_LIQUIDATION_L"));
            }

            if (field.CessationOfLiquidation)
            {
                writer.Write(LocalizeLabel("CR_APP_TERMINATION_PROCESS_LIQUIDATION_L"));
            }
        }
    }
}
