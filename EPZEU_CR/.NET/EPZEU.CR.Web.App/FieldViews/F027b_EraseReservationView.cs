using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F027b_EraseReservationView : FieldViewBase<F027b_EraseReservation>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F027b_EraseReservation field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("CR_GL_EFFACEMENT_OF_COMPANY_NAME_RETENTION_L"));

            if (!string.IsNullOrEmpty(field.ReservedFirmIncomingNumber))
            {
                writer.Write(", ");
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("GL_INCOMING_NO_L"));
                writer.Write(": ");
                writer.Write(field.ReservedFirmIncomingNumber);
            }
        }
    }
}