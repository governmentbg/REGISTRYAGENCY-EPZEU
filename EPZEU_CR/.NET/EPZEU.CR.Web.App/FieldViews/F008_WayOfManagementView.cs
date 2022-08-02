using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F008_WayOfManagementView : FieldViewBase<F008_WayOfManagement>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F008_WayOfManagement field)
        {
            ObjectHtmlDisplay<MannerRecordHolder>(writer, field);
        }
    }
}