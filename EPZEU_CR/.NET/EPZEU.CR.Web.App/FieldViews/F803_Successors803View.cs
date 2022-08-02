using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F803_Successors803View : FieldViewBase<F803_Successors803>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F803_Successors803 field)
        {
            WrapRecordListForDisplay(writer, field.SuccessorList, (w, r) => ObjectHtmlDisplay(w, r.Subject));
        }
    }
}
