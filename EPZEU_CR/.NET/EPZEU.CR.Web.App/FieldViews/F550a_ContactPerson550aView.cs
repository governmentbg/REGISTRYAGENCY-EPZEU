using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F550a_ContactPerson550aView : FieldViewBase<F550a_ContactPerson550a>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F550a_ContactPerson550a field)
        {
            ObjectHtmlDisplay(writer, field.Person);

            if(!field.Address.IsEmpty())
            {
                writer.Write("<br/>");
                ObjectHtmlDisplay(writer, field.Address);
            }

            if(!field.PermanentAddress.IsEmpty())
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("GL_PERMANENT_ADDRESS_BULGARIA_L"));
                writer.Write("<br/>");
                ObjectHtmlDisplay(writer, field.PermanentAddress);
            }
        }
    }
}
