using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F003_LegalFormView : FieldViewBase<F003_LegalForm>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F003_LegalForm field)
        {
            if (!string.IsNullOrEmpty(field.Text))
                writer.Write(field.Text);
        }
    }
}