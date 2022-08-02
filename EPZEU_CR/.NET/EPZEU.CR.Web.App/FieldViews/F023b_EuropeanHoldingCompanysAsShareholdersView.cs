using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F023b_EuropeanHoldingCompanysAsShareholdersView : FieldViewBase<F023b_EuropeanHoldingCompanysAsShareholders>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F023b_EuropeanHoldingCompanysAsShareholders field)
        {
            WrapRecordListForDisplay(writer, field.EuropeanHoldingCompanyAsShareholderList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
                wr.Write("<br/>");
                ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}
