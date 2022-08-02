using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F014_SupervisingBoardView : FieldViewBase<F014_SupervisingBoard>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F014_SupervisingBoard field)
        {
            if (field.SupervisingBoardMandate != null)
            {
                WrapRecordForDisplay(writer, field.SupervisingBoardMandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.SupervisorList, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));
        }
    }
}