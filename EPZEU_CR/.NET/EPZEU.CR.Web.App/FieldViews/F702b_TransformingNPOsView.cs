using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F702b_TransformingNPOsView : FieldViewBase<F702b_TransformingNPOs>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F702b_TransformingNPOs field)
        {
            WrapRecordListForDisplay(writer, field.TransformingNPOList, (w, r) =>
            {
                if (string.IsNullOrEmpty(r.Subject.Name))
                    r.Subject.Name = " ";

                ObjectHtmlDisplay(w, r.Subject);
            });
        }
    }
}
