using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F306_Object306View : FieldViewBase<F306_Object306>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F306_Object306 field)
        {
            if (field.ForGivingAmount)
            {
                writer.Write(LocalizeLabel("CR_APP_00035_L"));
                writer.Write("<br/>");
            }

            if (field.ForGive)
            {
                writer.Write(LocalizeLabel("CR_APP_00042_L"));
                writer.Write("<br/>");
            }

            if (field.ForDoingActivity)
            {
                writer.Write(LocalizeLabel("CR_APP_00044_L"));
                writer.Write("<br/>");
            }

            if (field.ForNotDoingActivity)
            {
                writer.Write(LocalizeLabel("CR_APP_00043_L"));
                writer.Write("<br/>");
            }
        }
    }
}
