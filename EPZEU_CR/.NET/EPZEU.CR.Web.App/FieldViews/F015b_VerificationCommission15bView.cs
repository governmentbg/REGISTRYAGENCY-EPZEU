using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F015b_VerificationCommission15bView : FieldViewBase<F015b_VerificationCommission15b>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F015b_VerificationCommission15b field)
        {
            if (field.VerificationCommission15bMandate != null)
            {
                WrapRecordForDisplay(writer, field.VerificationCommission15bMandate, (wr, f) => ObjectHtmlDisplay<Mandate>(wr, f));
            }

            WrapRecordListForDisplay(writer, field.CommissionMembers15bList, (wr, f) => ObjectHtmlDisplay(wr, f.Person));
        }
    }
}
