using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F071_SeatChangeView : FieldViewBase<F071_SeatChange>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F071_SeatChange field)
        {
            ObjectHtmlDisplay(writer, field.ForeignAuthority);
            if (!field.Address.IsEmpty())
            {
                writer.Write("<br />");
                ObjectHtmlDisplay(writer, field.Address);
            }
            if (!field.Contacts.IsEmpty())
            {
                writer.Write("<br />");
                ObjectHtmlDisplay(writer, field.Contacts);
            }
        }
    }
}