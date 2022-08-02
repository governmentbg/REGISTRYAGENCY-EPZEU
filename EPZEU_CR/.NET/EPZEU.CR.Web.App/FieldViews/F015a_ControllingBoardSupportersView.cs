using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F015a_ControllingBoardSupportersView : FieldViewBase<F015a_ControllingBoardSupporters>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F015a_ControllingBoardSupporters field)
        {
            WrapRecordListForDisplay(writer, field.ControllingBoardSupportersPersonList, (wr, f) => ObjectHtmlDisplay(wr, f.Person));
        }
    }
}