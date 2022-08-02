using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F702_TransformingCompanysView : FieldViewBase<F702_TransformingCompanys>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F702_TransformingCompanys field)
        {
            WrapRecordListForDisplay(writer, field.TransformingCompanyList, (w, r) =>
            {
                if (string.IsNullOrEmpty(r.Subject.Name))
                    r.Subject.Name = " ";

                ObjectHtmlDisplay(w, r.Subject);
            });
        }
    }
}
