using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F305_ReasonView : FieldViewBase<F305_Reason>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F305_Reason field)
        {
            if (field.Contract)
            {
                writer.Write(LocalizeLabel("CR_APP_CONTRACT_L"));
            }

            if (field.CourtOrder)
            {
                writer.Write(LocalizeLabel("CR_APP_JUDGMENT_DECISION_L"));
            }

            if (field.AdministrativAct)
            {
                writer.Write(LocalizeLabel("CR_APP_ADMINISTRATIVE_ACT_L"));
            }

            if (field.OtherSource)
            {
                writer.Write(LocalizeLabel("CR_APP_ANOTHER_SOURCE_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(field.Text));
            }

            writer.Write("<br/>");
            writer.Write(LocalizeLabel("GL_DATE_L"));
            writer.Write(": ");
            writer.Write(field.DateText);
        }
    }
}
