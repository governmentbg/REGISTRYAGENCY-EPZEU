using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Text;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F208_SecuredClaimSubjectView : FieldViewBase<F208_SecuredClaimSubject>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F208_SecuredClaimSubject field)
        {
            if (field.GivingMoney)
            {
                writer.Write(LocalizeLabel("CR_APP_00035_L"));
            }

            if (field.GivingThing)
            {
                if (field.GivingMoney)
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("CR_APP_00042_L"));
            }

            if (field.DoingActions)
            {
                if (field.GivingMoney || field.GivingThing)
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("CR_APP_00044_L"));
            }

            if (field.NotDoingActions)
            {
                if (field.GivingMoney || field.GivingThing || field.DoingActions)
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("CR_APP_00043_L"));
            }
        }
    }
}