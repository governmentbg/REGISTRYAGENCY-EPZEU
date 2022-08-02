using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F318_InvitationForAppointingOfManagerView : FieldViewBase<F318_InvitationForAppointingOfManager>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F318_InvitationForAppointingOfManager field)
        {
            if (field.Checked)
            {
                writer.Write(LocalizeLabel("CR_APP_00047_L"));
            }
        }
    }
}
