using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F0225_InsolvenciesOfEUIEView : FieldViewBase<F0225_InsolvenciesOfEUIE>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F0225_InsolvenciesOfEUIE field)
        {
            WrapRecordListForDisplay(writer, field.InsolvencyOfEUIEList, (wr, f) =>
            {
                var court = Authorities.GetAuthorities().SingleOrDefault(x => x.AuthorityID.ToString() == f.JudicialCode);

                if (!string.IsNullOrEmpty(f.InsolvencyText))
                {
                    wr.Write(LocalizeLabel("CR_APP_BANKRUPTCY_EEIG_L"));
                    wr.Write(":<br/>");
                    wr.Write(HttpUtility.HtmlEncode(f.InsolvencyText));
                }

                if (!string.IsNullOrEmpty(f.ActNumber))
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_COURT_ACT_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.ActNumber));

                    if (!string.IsNullOrEmpty(f.ActDate))
                    {
                        wr.Write("/");
                        wr.Write(HttpUtility.HtmlEncode(f.ActDate));
                        wr.Write(" ");
                        wr.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
                    }
                }

                if (court != null && !string.IsNullOrEmpty(court.AuthorityName))
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("GL_COURT_CODE_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(court.AuthorityName));
                }

                if (f.Decision759)
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_00019_L"));
                }

                if (f.Decision760)
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_00020_L"));
                }
            });
        }
    }
}