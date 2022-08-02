using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F802a_ReorganizeCoOperatives2View : FieldViewBase<F802a_ReorganizeCoOperatives2>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F802a_ReorganizeCoOperatives2 field)
        {
            WrapRecordListForDisplay(writer, field.CoOperative2List, (w, r) =>
            {
                ObjectHtmlDisplay(w, r.Subject);
                if (!r.Subject.IsEmpty() && !r.Address.IsEmpty()) w.Write("<br/>");
                ObjectHtmlDisplay(w, r.Address);
            });
        }
    }
}
