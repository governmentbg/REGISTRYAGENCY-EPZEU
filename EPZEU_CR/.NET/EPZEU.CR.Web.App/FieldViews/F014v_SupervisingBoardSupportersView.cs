using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F014v_SupervisingBoardSupportersView : FieldViewBase<F014v_SupervisingBoardSupporters>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F014v_SupervisingBoardSupporters field)
        {
            WrapRecordListForDisplay(writer, field.SupervisingBoardSupporterList, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));
        }
    }
}