using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F533_OffshoreSeatView : FieldViewBase<F533_OffshoreSeat>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F533_OffshoreSeat field)
        {
            ObjectHtmlDisplay(writer, field.Address);
            writer.Write("<br/>");
            ObjectHtmlDisplay(writer, field.Contacts);
        }
    }
}
