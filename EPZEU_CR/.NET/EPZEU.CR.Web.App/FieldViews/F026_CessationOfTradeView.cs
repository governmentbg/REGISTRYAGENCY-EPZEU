using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F026_CessationOfTradeView : FieldViewBase<F026_CessationOfTrade>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F026_CessationOfTrade field)
        {
            var fieldName = LocalizeLabel("CR_F_26_L");

            writer.Write(fieldName.Substring(fieldName.IndexOf('.') + 2));
        }
    }
}