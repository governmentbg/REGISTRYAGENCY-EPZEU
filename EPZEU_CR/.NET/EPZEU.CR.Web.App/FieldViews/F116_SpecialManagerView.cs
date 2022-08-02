using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F116_SpecialManagerView : FieldViewBase<F116_SpecialManager>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F116_SpecialManager field)
        {
            ObjectHtmlDisplay(writer, field.Person);
            writer.Write("<br/>");
            ObjectHtmlDisplay(writer, field.Address);
        }
    }
}
