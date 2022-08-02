using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F015_ControllingBoardView : FieldViewBase<F015_ControllingBoard>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F015_ControllingBoard field)
        {
            if (field.ControllingBoardMandate != null)
            {
                WrapRecordForDisplay(writer, field.ControllingBoardMandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.ControllingBoardPersonList, (wr, f) => ObjectHtmlDisplay(wr, f.Person));
        }
    }
}