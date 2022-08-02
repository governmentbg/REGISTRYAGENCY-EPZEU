using EPZEU.CR.Domain.ApplicationForms;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class ContestationActView : FieldViewBase<ContestationAct>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, ContestationAct field)
        {
            if(!field.IsEmpty())
            {
                writer.Write(LocalizeLabel("GL_INCOMING_NO_L"));
                writer.Write(": ");
                writer.Write(field.IncomingNumber);
                writer.Write("<br />");
                writer.Write(LocalizeLabel("GL_DATE_L"));
                writer.Write(": ");
                writer.Write(field.FromDateAttribute);
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
                writer.Write("<br />");
                writer.Write(LocalizeLabel("CR_APP_COURT_CODE_L"));
                writer.Write(": ");
                writer.Write(field.CourtCode);
                writer.Write("<br />");
                writer.Write(LocalizeLabel("GL_OUTGOING_NO_L"));
                writer.Write(": ");
                writer.Write(field.OutgoingNumber);
                writer.Write("<br />");
                writer.Write(LocalizeLabel("CR_GL_ACT_NUMBER_L"));
                writer.Write(": ");
                writer.Write(field.ActNumber);
            }
        }

    }
}