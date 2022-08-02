using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F007a_AssignedManagersView : FieldViewBase<F007a_AssignedManagers>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F007a_AssignedManagers field)
        {
            WrapRecordListForDisplay(writer, field.AssignedManageList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
            });
        }
    }
}