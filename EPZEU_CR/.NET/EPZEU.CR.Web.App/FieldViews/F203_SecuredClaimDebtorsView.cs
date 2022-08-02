using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F203_SecuredClaimDebtorsView : FieldViewBase<F203_SecuredClaimDebtors>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F203_SecuredClaimDebtors field)
        {
            WrapRecordListForDisplay(writer, field.SecuredClaimDebtorList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
                //TRIR-5245
                //wr.Write("<br/>");
                //ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}