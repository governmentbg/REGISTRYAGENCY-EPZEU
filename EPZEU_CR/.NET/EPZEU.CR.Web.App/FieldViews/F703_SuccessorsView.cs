using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F703_SuccessorsView : FieldViewBase<F703_Successors>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F703_Successors field)
        {
            WrapRecordListForDisplay(writer, field.SuccessorList, (w, r) => ObjectHtmlDisplay(w, r.Subject));
        }
    }
}
