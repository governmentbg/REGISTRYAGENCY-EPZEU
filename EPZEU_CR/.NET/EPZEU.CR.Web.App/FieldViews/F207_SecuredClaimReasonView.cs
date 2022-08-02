using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Text;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F207_SecuredClaimReasonView : FieldViewBase<F207_SecuredClaimReason>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F207_SecuredClaimReason field)
        {
            if (field.Contract)
            {
                writer.Write(LocalizeLabel("CR_APP_CONTRACT_L"));
            }
            else if (field.CourtOrder)
            {
                writer.Write(LocalizeLabel("CR_APP_JUDGMENT_DECISION_L"));
            }
            else if (field.AdministrativeAct)
            {
                writer.Write(LocalizeLabel("CR_APP_ADMINISTRATIVE_ACT_L"));
            }
            else if (field.OtherSource)
            {
                writer.Write(LocalizeLabel("CR_APP_ANOTHER_SOURCE_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(field.Description));
            }

            writer.Write("<br/>");
            writer.Write(LocalizeLabel("GL_DATE_L"));
            writer.Write(": ");
            writer.Write(field.ReasonDate);
            writer.Write(" ");
            writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
        }
    }
}