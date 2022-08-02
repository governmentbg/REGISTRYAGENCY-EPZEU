using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F320_RestoringManagementRightView : FieldViewBase<F320_RestoringManagementRight>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F320_RestoringManagementRight field)
        {
            if (field.Checked)
            {
                writer.Write(LocalizeLabel("CR_APP_00048_L"));
            }
        }
    }
}
