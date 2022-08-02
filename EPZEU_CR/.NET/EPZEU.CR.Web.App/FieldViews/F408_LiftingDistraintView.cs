using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F408_LiftingDistraintView : FieldViewBase<F408_LiftingDistraint>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F408_LiftingDistraint field)
        {
            if (!string.IsNullOrEmpty(field.CaseNumber))
            {
                writer.Write(LocalizeLabel("GL_LIFTED_L"));
                writer.Write("<br/>");
            }

            var court = Authorities.GetAuthorities().SingleOrDefault(x => x.AuthorityID.ToString() == field.CourtLegalExecutor);

            writer.Write(LocalizeLabel("CR_APP_COURT_BAILIFF_L"));
            writer.Write(": ");
            if (court != null && !string.IsNullOrEmpty(court.AuthorityName))
            {
                writer.Write(court.AuthorityName);
            }
            else
            {
                writer.Write(field.CourtLegalExecutor);
            }

            if (!string.IsNullOrEmpty(field.CaseNumber))
            {
                writer.Write("<br/>");
            }

            if (!string.IsNullOrEmpty(field.CaseNumber))
            {
                writer.Write(LocalizeLabel("CR_APP_COURT_NUMBER_L"));
                writer.Write(": ");
                writer.Write(field.CaseNumber);
            }
        }
    }
}
