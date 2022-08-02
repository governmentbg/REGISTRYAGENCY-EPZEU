using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F016b_TermOfExistingEUIEView : FieldViewBase<F016b_TermOfExistingEUIE>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F016b_TermOfExistingEUIE field)
        {
            string baseHtml = HttpUtility.HtmlEncode(field.Text);
            writer.Write(baseHtml);

            if (!string.IsNullOrEmpty(field.TermTypeEUIE))
            {
                if (!string.IsNullOrEmpty(baseHtml) && !string.IsNullOrEmpty(field.TermTypeEUIE))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("CR_APP_WAY_DETERMINATE_TERM_L").ToLower());
                }
                else
                {
                    writer.Write(LocalizeLabel("CR_APP_WAY_DETERMINATE_TERM_L"));
                }
               
                writer.Write(": ");
                writer.Write(field.TermTypeEUIE);
            }
        }
    }
}