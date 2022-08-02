using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F325a_PartialEraseDistraintView : FieldViewBase<F325a_PartialEraseDistraint>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F325a_PartialEraseDistraint field)
        {
            if (field.Checked)
            {
                writer.Write(LocalizeLabel("CR_APP_PARTIALLY_ERASED_PLEDGE_L"));
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("GL_DESCRIPTION_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(field.description));
            }
        }
    }
}
