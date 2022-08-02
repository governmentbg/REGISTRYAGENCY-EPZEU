using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F051_BranchSeatView : FieldViewBase<F051_BranchSeat>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F051_BranchSeat field)
        {
            ObjectHtmlDisplay(writer, field.Address);

            if (!field.Contacts.IsEmpty())
            {
                writer.Write("<br/>");
                ObjectHtmlDisplay(writer, field.Contacts);
            }
        }
    }
}
