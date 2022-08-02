using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F005_SeatView : FieldViewBase<F005_Seat>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F005_Seat field)
        {
            ObjectHtmlDisplay(writer, field.Address);
            writer.Write(" ");
            ObjectHtmlDisplay(writer, field.Contacts);
        }
    }
}