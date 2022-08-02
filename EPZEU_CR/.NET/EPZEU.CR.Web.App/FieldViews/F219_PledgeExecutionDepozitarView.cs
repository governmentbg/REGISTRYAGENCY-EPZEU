using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F219_PledgeExecutionDepozitarView : FieldViewBase<F219_PledgeExecutionDepozitar>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F219_PledgeExecutionDepozitar field)
        {
            ObjectHtmlDisplay(writer,field.Person);
            //TRIR-5245
            //writer.Write("<br/>");
            //ObjectHtmlDisplay(writer, field.Address);
            if (field.BIC != null && field.BIC.Length >= 1 )
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("EP_PAY_AV_BIC_L"));
                writer.Write(": ");
            }
            writer.Write(HttpUtility.HtmlEncode(field.BIC));
            if (field.IBAN != null && field.IBAN.Length >= 1)
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("EP_PAY_AV_IBAN_L"));
                writer.Write(": ");
            }
            writer.Write(HttpUtility.HtmlEncode(field.IBAN));
        }
    }
}