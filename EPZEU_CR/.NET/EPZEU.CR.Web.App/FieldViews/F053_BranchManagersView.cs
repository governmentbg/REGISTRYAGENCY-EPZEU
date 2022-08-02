using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F053_BranchManagersView : FieldViewBase<F053_BranchManagers>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F053_BranchManagers field)
        {
            WrapRecordListForDisplay(writer, field.ManagersList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
                wr.Write("<br/>");
                ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}