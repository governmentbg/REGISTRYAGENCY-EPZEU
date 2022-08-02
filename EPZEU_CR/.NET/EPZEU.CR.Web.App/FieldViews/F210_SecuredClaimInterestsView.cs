using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F210_SecuredClaimInterestsView : FieldViewBase<F210_SecuredClaimInterests>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F210_SecuredClaimInterests field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(HttpUtility.HtmlEncode(field.Text));
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_PERCENT_ABBRAVETION_L"));
            }
        }
    }
} 