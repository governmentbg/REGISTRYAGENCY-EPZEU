using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F022b_InsolvenciesOfForeignTraderView : FieldViewBase<F022b_InsolvenciesOfForeignTrader>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F022b_InsolvenciesOfForeignTrader field)
        {
            WrapRecordListForDisplay(writer, field.InsolvencyOfForeignTraderList, (wr, f) =>
            {
                if (!string.IsNullOrEmpty(f.InsolvencyText))
                {
                    wr.Write(HttpUtility.HtmlEncode(f.InsolvencyText));
                    wr.Write("<br />");
                }

                if (!string.IsNullOrEmpty(f.ActNumber))
                {
                    wr.Write(LocalizeLabel("CR_APP_COURT_ACT_L"));
                    wr.Write("<br />");
                    wr.Write(" ");
                    wr.Write(LocalizeLabel("CR_GL_NUMBER_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.ActNumber));
                }

                if (!string.IsNullOrEmpty(f.ActDate))
                {
                    wr.Write(", ");
                    wr.Write(LocalizeLabel("GL_DATE_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.ActDate));
                }

                if (!string.IsNullOrEmpty(f.JudicialCode))
                {
                    wr.Write(", ");
                    wr.Write(LocalizeLabel("GL_COURT_CODE_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.JudicialCode));
                }

                if (f.Decision759)
                {
                    wr.Write("<br/> ");
                    wr.Write(LocalizeLabel("CR_APP_00019_L"));
                }

                if (f.Decision760)
                {
                    wr.Write("<br/> ");
                    wr.Write(LocalizeLabel("CR_APP_00020_L"));
                }
            });
        }
    }
}