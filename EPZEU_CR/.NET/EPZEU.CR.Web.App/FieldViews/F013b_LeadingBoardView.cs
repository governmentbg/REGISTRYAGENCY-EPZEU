using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F013b_LeadingBoardView : FieldViewBase<F013b_LeadingBoard>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F013b_LeadingBoard field)
        {
            if (field.LeadingBoardMandate != null)
            {
                WrapRecordForDisplay(writer, field.LeadingBoardMandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.LeaderList, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));
        }
    }
}