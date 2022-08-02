using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F025_SharePaymentResponsibilityView : FieldViewBase<F025_SharePaymentResponsibility>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F025_SharePaymentResponsibility field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(HttpUtility.HtmlEncode(field.Text));
                writer.Write(" лв.");
            }
        }
    }
}