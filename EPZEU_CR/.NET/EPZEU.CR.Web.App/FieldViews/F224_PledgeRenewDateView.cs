using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F224_PledgeRenewDateView : FieldViewBase<F224_PledgeRenewDate>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F224_PledgeRenewDate field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(HttpUtility.HtmlEncode(field.Text));
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            }
        }
    }
}
