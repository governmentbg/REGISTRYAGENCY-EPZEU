using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F317_DepositorView : FieldViewBase<F317_Depositor>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F317_Depositor field)
        {
            ObjectHtmlDisplay(writer, field.Person);
            //TRIR-5245
            //writer.Write("<br/>");
            //ObjectHtmlDisplay(writer, field.Address);
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("GL_CR_BIC_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.BIC));
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("GL_CR_IBAN_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.IBAN));
        }
    }
}
