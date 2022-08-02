using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F007_ManagersView : FieldViewBase<F007_Managers>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F007_Managers field)
        {
            WrapRecordListForDisplay(writer, field.ManagersList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
            });
        }
    }
}
