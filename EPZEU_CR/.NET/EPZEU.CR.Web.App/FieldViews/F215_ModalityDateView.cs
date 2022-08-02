using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F215_ModalityDateView : FieldViewBase<F215_ModalityDate>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F215_ModalityDate field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(HttpUtility.HtmlEncode(field.Text));
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            }
        }
    }
}
