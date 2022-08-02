using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F301_DebtorOverSecureClaimsView : FieldViewBase<F301_DebtorOverSecureClaims>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F301_DebtorOverSecureClaims field)
        {
            WrapRecordListForDisplay(writer, field.DebtorOverSecureClaimList, (wr, f) => {
                ObjectHtmlDisplay(wr, f.Subject);
                //TRIR-5245
                //writer.Write("<br/>");
                //ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}
