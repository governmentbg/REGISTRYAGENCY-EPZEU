using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F021_LimitedLiabilityPartnersView : FieldViewBase<F021_LimitedLiabilityPartners>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F021_LimitedLiabilityPartners field)
        {
            WrapRecordListForDisplay(writer, field.LiabilityPartnerList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
                wr.Write("<br/>");
                ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}
