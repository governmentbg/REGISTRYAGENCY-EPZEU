using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F802_ReorganizeCoOperativesView : FieldViewBase<F802_ReorganizeCoOperatives>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F802_ReorganizeCoOperatives field)
        {
            WrapRecordListForDisplay(writer, field.CoOperativeList, (w, r) => ObjectHtmlDisplay(w, r.Subject));
        }
    }
}
