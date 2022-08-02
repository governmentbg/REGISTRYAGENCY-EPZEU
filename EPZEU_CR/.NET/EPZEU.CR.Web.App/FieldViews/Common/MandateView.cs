using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class MandateView : ObjectViewBase<Mandate>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, Mandate model)
        {
            if (!string.IsNullOrEmpty(model.Text))
            {
                writer.Write(LocalizeLabel("CR_APP_EXPIRY_DATE_MANDATE_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(model.Text));
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));

                if (!string.IsNullOrEmpty(model.MandateTypeText))
                {
                    writer.Write("<br/>");
                }
                else
                {
                    writer.Write(" ");
                }
            }

            if (!string.IsNullOrEmpty(model.MandateTypeText))
            {
                writer.Write(LocalizeLabel("CR_APP_WAY_DETERMINATE_MANDATE_L"));
                writer.Write(": ");
                writer.Write(model.MandateTypeText);
            }
        }
    }
}
