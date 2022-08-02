using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F022a_DiscontinuanceOfForeignTraderView : FieldViewBase<F022a_DiscontinuanceOfForeignTrader>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F022a_DiscontinuanceOfForeignTrader field)
        {

            if (field.FinishingOfLiquidation)
            {
                writer.Write(LocalizeLabel("CR_APP_INITIATION_SUSPENSION_TERMINATION_LIQUIDATION_PROCEEDING_L"));
                writer.Write("<br />");
            }

            if (field.StopOfLiquidation)
            {
                writer.Write(LocalizeLabel("CR_APP_TERMINATION_LIQUIDATION_PROCESS_L"));
                writer.Write("<br />");
            }

            if (field.ContinuationOfActivity)
            {
                writer.Write(LocalizeLabel("CR_APP_RUSUMPTION_ACTIVITY_L"));
                writer.Write("<br />");
            }

            if (field.BeginOfLiquidation)
            {
                writer.Write(LocalizeLabel("CR_APP_OPEN_LIQUIDATION_PROCEEDING_L"));
                writer.Write("<br />");
            }

            if (field.StopForeignerTrader)
            {
                writer.Write(LocalizeLabel("CR_APP_TERMINATION_FOREIGN_PERSON_L"));
                writer.Write("<br />");
            }
        }
    }
}