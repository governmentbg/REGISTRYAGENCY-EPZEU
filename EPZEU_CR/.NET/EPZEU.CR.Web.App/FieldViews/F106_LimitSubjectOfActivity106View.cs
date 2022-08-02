using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F106_LimitSubjectOfActivity106View : FieldViewBase<F106_LimitSubjectOfActivity106>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F106_LimitSubjectOfActivity106 field)
        {
            WrapRecordListForDisplay(writer, field.LimitInsuaranceActivityList, (wr, f) =>
            {
                writer.Write(LocalizeLabel("CR_APP_TYPE_INSURANCE_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(f.InsuaranceType));
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("CR_APP_PROHIBITION_FOR_L"));
                writer.Write(":<br/>");

                if (f.ForbiddanceOfNewContracts)
                {
                    writer.Write(LocalizeLabel("CR_APP_NEW_CONTRACTS_CONCLUSION_L"));
                    writer.Write("<br/>");
                }

                if (f.ForbiddanceToExtendContracts)
                {
                    writer.Write(LocalizeLabel("CR_APP_CONCLUDED_CONTRACTS_EXTENTION_TERM_L"));
                    writer.Write("<br/>");
                }

                if (f.ForbiddanceToWidenContracts)
                {
                    writer.Write(LocalizeLabel("CR_APP_CONCLUDED_CONTRACTS_EXTENTION_COVERGE_L"));
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("CR_APP_PROHIBITION_TO_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(f.FobiddenTill));
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            });
        }
    }
}
