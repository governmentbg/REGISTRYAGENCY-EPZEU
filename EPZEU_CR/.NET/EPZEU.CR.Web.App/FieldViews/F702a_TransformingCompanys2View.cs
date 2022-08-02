using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F702a_TransformingCompanys2View : FieldViewBase<F702a_TransformingCompanys2>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F702a_TransformingCompanys2 field)
        {
            WrapRecordListForDisplay(writer, field.TransformingCompany2List, (w, r) =>
            {
                ObjectHtmlDisplay(w, r.Subject);
                if (!r.Subject.IsEmpty() && !r.Address.IsEmpty()) w.Write("<br/>");
                ObjectHtmlDisplay(w, r.Address);
            });
        }
    }
}
