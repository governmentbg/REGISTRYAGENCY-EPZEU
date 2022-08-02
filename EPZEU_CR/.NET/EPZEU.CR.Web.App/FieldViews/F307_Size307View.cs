using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F307_Size307View : FieldViewBase<F307_Size307>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F307_Size307 field)
        {
            writer.Write(LocalizeLabel("CR_APP_AMOUNT_DUE_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.QuantityDue));
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("CR_APP_UNITS_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.Units));
        }
    }
}
