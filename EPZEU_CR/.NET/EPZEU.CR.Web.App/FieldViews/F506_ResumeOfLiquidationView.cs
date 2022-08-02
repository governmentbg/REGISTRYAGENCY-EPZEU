using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F506_ResumeOfLiquidationView : FieldViewBase<F506_ResumeOfLiquidation>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F506_ResumeOfLiquidation field)
        {
            if(field.Cheked)
            {
                writer.Write(LocalizeLabel("CR_APP_RESUMPTION_LIQUIDATION_L"));
            }
        }
    }
}
