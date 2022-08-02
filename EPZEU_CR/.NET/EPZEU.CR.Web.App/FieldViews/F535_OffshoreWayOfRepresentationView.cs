using System.IO;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F535_OffshoreWayOfRepresentationView : FieldViewBase<F535_OffshoreWayOfRepresentation>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F535_OffshoreWayOfRepresentation field)
        {
            ObjectHtmlDisplay<MannerRecordHolder>(writer, field);
        }
    }
}