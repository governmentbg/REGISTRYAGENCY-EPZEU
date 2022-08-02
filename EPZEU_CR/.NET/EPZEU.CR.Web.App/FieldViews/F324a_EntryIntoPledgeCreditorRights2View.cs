using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F324a_EntryIntoPledgeCreditorRights2View : FieldViewBase<F324a_EntryIntoPledgeCreditorRights2>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F324a_EntryIntoPledgeCreditorRights2 field)
        {
            WrapRecordListForDisplay(writer, field.EntryIntoPledgeCreditorRight2List, (wr, f) => {
                ObjectHtmlDisplay(wr, f.Subject);
                //TRIR-5245
                //writer.Write("<br/>");
                //ObjectHtmlDisplay(wr, f.Address);
                //writer.Write("<br/>");
            });
        }
    }
}