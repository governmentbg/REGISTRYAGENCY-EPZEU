using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F111_LimitSubjectOfActivity111View : FieldViewBase<F111_LimitSubjectOfActivity111>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F111_LimitSubjectOfActivity111 field)
        {
            WrapRecordListForDisplay(writer, field.ZPPCKOrganizationLimitsList, (wr, f) =>
            {
                wr.Write(LocalizeLabel("CR_APP_SECURITIES_L"));
                wr.Write(":<br/>");
                wr.Write(HttpUtility.HtmlEncode(f.Securities));

                if (f.CessasionOfSales || f.CessasionOfDeals)
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_STOP_OF_L"));
                    wr.Write(":<br/>");
                    if (f.CessasionOfSales)
                    {
                        wr.Write(LocalizeLabel("GL_SELL_L"));
                    }
                    else
                    {
                        wr.Write(LocalizeLabel("CR_APP_CARRYING_TRANSACTION_L"));
                    }
                }
                wr.Write("<br/>");
                wr.Write(LocalizeLabel("CR_APP_STOP_TO_L"));
                wr.Write(": ");
                wr.Write(HttpUtility.HtmlEncode(f.CessatedTill));
                wr.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            });
        }
    }
}
