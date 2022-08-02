using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F0224_DiscontinuanceOfTheEUIEView : FieldViewBase<F0224_DiscontinuanceOfTheEUIE>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F0224_DiscontinuanceOfTheEUIE field)
        {
            if (field.StopOfLiquidation)
            {
                writer.Write(LocalizeLabel("CR_APP_TERMINATION_LIQUIDATION_PROCESS_L"));
            }

            if (field.ContinuationOfActivity)
            {
                writer.Write(LocalizeLabel("CR_APP_RUSUMPTION_ACTIVITY_L"));
            }

            if (field.BeginOfLiquidation)
            {
                writer.Write(LocalizeLabel("CR_APP_OPEN_LIQUIDATION_PROCEEDING_L"));
            }

            if (field.StopEUIE)
            {
                writer.Write(LocalizeLabel("CR_APP_TERMINATION_EOII_L"));
            }
        }
    }
}
