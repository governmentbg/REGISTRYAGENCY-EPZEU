using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F016_TermsOfPartnershipView : FieldViewBase<F016_TermsOfPartnership>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F016_TermsOfPartnership field)
        {
            var hasBaseHtml = false;

            if (!string.IsNullOrEmpty(field.Text))
            {
                hasBaseHtml = true;
                writer.Write(LocalizeLabel("CR_APP_EXPIRY_DATE_L"));
                writer.Write(": ");
                writer.Write(field.Text);
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            }

            if (!string.IsNullOrEmpty(field.TermType))
            {
                if (hasBaseHtml)
                    writer.Write("<br/>");

                writer.Write(LocalizeLabel("CR_APP_WAY_DETERMINATE_TERM_L"));
                writer.Write(": ");
                writer.Write(field.TermType);
            }
        }
    }
}
