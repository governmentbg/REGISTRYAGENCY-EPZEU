using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F027_AddemptionOfTraderView : FieldViewBase<F027_AddemptionOfTrader>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F027_AddemptionOfTrader field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("GL_DELETED_TRADER_NPO_L"));
        }
    }
}