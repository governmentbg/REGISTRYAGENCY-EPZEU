using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F020_UnlimitedLiabilityPartnersView : FieldViewBase<F020_UnlimitedLiabilityPartners>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F020_UnlimitedLiabilityPartners field)
        {
            WrapRecordListForDisplay(writer, field.UnlimitedLiabilityPartnerList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
                wr.Write("<br/>");
                ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}