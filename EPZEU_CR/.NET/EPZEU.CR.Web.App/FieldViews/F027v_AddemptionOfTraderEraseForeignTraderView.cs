using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F027v_AddemptionOfTraderEraseForeignTraderView : FieldViewBase<F027v_AddemptionOfTraderEraseForeignTrader>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F027v_AddemptionOfTraderEraseForeignTrader field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("CR_GL_CLOSED_BATCH_L"));
        }
    }
}