using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F027a_AddemptionOfTraderSeatChangeView : FieldViewBase<F027a_AddemptionOfTraderSeatChange>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F027a_AddemptionOfTraderSeatChange field)
        {
            if (field.IsTraderAddempted)
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("CR_APP_DELETION_DUE_TO_RELOCATION_OFFICE_TO_ANOTHER_COUNTRY_L"));
            }

            if (!field.ForeignAuthority.IsEmpty())
            {
                writer.Write("<br/>");
                ObjectHtmlDisplay(writer, field.ForeignAuthority);
            }

            if (!field.Address.IsEmpty())
            {
                writer.Write("<br/>");
                ObjectHtmlDisplay(writer, field.Address);
            }

            if (!field.Contacts.IsEmpty())
            {
                writer.Write("<br/>");
                ObjectHtmlDisplay(writer, field.Contacts);
            }
        }
    }
}