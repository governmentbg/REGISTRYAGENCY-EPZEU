using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F322_RaiseDistraintView : FieldViewBase<F322_RaiseDistraint>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F322_RaiseDistraint field)
        {
            if (!string.IsNullOrEmpty(field.Court))
            {
                var court = this.Authorities.GetAuthorities().SingleOrDefault(x => x.AuthorityID.ToString() == field.Court);

                writer.Write(LocalizeLabel("GL_COURT_CODE_L"));
                writer.Write(": ");
                if (court != null && !string.IsNullOrEmpty(court.AuthorityName))
                {
                    writer.Write(HttpUtility.HtmlEncode(court.AuthorityName));
                }
                else
                {
                    writer.Write(HttpUtility.HtmlEncode(field.Court));
                }

                if (!string.IsNullOrEmpty(field.CaseNumber))
                {
                    writer.Write("<br/>");
                }
            }

            if (!string.IsNullOrEmpty(field.CaseNumber))
            {
                writer.Write(LocalizeLabel("CR_APP_COURT_NUMBER_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(field.CaseNumber));
            }
        }
    }
}
