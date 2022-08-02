using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F502_LiquidatorsView : FieldViewBase<F502_Liquidators>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F502_Liquidators field)
        {
            WrapRecordListForDisplay(writer, field.LiquidatorList, (w, r) => ObjectHtmlDisplay(w, r.Subject));
        }
    }
}
