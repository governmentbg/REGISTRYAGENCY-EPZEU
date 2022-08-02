using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F012v_AdministrativeBoardSupportersView : FieldViewBase<F012v_AdministrativeBoardSupporters>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F012v_AdministrativeBoardSupporters field)
        {
            WrapRecordListForDisplay(writer, field.AdministrativeBoardSupporterList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
            });
        }
    }
}