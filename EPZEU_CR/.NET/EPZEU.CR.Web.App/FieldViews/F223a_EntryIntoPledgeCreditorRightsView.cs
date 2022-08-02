using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F223a_EntryIntoPledgeCreditorRightsView : FieldViewBase<F223a_EntryIntoPledgeCreditorRights>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F223a_EntryIntoPledgeCreditorRights field)
        {
            WrapRecordListForDisplay(writer, field.EntryIntoPledgeCreditorRightList, (wr, f) => {
                ObjectHtmlDisplay(wr, f.Subject);
                //TRIR-5245
                //wr.Write("<br/>");
                //ObjectHtmlDisplay(wr, f.Address);
                //wr.Write("<br/>");
            });
        }
    }
}