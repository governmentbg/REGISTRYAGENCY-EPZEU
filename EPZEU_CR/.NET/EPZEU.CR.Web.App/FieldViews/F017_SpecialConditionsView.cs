using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F017_SpecialConditionsView : FieldViewBase<F017_SpecialConditions>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F017_SpecialConditions field)
        {
            string baseHtml = field.Text;

            if (field.IsConsortium)
                writer.Write(LocalizeLabel("CR_GL_CONSOURTIUM_COMPANY_L"));

            if (field.IsHolding && field.IsConsortium)
                writer.Write("<br/>");

            if (field.IsHolding)
                writer.Write(LocalizeLabel("CR_GL_HOLDING_COMPANY_L"));

            if (!string.IsNullOrEmpty(baseHtml) && (field.IsHolding || field.IsConsortium))
                writer.Write("<br/>");

            writer.Write(baseHtml);
        }
    }
}
