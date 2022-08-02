using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F308_InterestView : FieldViewBase<F308_Interest>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F308_Interest field)
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
