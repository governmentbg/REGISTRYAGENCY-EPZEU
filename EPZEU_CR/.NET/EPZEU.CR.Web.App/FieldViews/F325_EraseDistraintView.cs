using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F325_EraseDistraintView : FieldViewBase<F325_EraseDistraint>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F325_EraseDistraint field)
        {
            if (field.Checked)
            {
                writer.Write(LocalizeLabel("GL_DELETED_L"));
            }
            else
            {
                writer.Write(LocalizeLabel("GL_NO_L"));
            }
        }
    }
}
