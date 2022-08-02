using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F209_SecuredClaimAmountView : FieldViewBase<F209_SecuredClaimAmount>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F209_SecuredClaimAmount field)
        {
            writer.Write(LocalizeLabel("CR_APP_AMOUNT_DUE_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.AmountDue));
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("CR_APP_UNITS_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.Units));
        }
    }
}