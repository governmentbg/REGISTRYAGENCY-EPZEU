using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F403_Reason403View : FieldViewBase<F403_Reason403>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F403_Reason403 field)
        {
            writer.Write(LocalizeLabel("CR_GL_REASON_L"));
            writer.Write(": ");

            if (field.Court)
            {
                writer.Write(LocalizeLabel("GL_COURT_CODE_L"));
                writer.Write("<br/>");
            }

            if (field.LegalExecutor)
            {
                writer.Write(LocalizeLabel("CR_APP_BAILIFF_L"));
                writer.Write("<br/>");
            }

            if (field.ADV)
            {
                writer.Write(LocalizeLabel("CR_APP_ADV_L"));
                writer.Write("<br/>");
            }

            if (!string.IsNullOrEmpty(field.CourtLegalExecutor))
            {
                writer.Write(LocalizeLabel("CR_APP_COURT_BAILIFF_L"));
                writer.Write(": ");

                if (field.Court)
                {
                    var courtLegalExecutor = Authorities.GetAuthorities().SingleOrDefault(x => x.AuthorityID.ToString() == field.CourtLegalExecutor);

                    if (courtLegalExecutor != null && !string.IsNullOrEmpty(courtLegalExecutor.AuthorityName))
                    {
                        writer.Write(HttpUtility.HtmlEncode(courtLegalExecutor.AuthorityName));
                    }
                }
                else
                {
                    writer.Write(HttpUtility.HtmlEncode(field.CourtLegalExecutor));
                }

                if (!string.IsNullOrEmpty(field.CaseNumber))
                {
                    writer.Write(", ");
                }
                else
                {
                    writer.Write("<br/>");
                }
            }

            if (!string.IsNullOrEmpty(field.CaseNumber))
            {
                writer.Write(LocalizeLabel("CR_APP_COURT_NUMBER_L"));
                writer.Write(": ");
                writer.Write(field.CaseNumber);
                writer.Write("<br />");
            }
        }
    }
}
