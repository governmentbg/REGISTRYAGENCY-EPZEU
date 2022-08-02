using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class LicenseView : FieldViewBase<CheckRecordField>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, CheckRecordField field)
        {
            if(field.Cheked)
            {
                writer.Write("Отнет");
                writer.Write(": ");
                writer.Write(LocalizeLabel("GL_OK_L"));
            }
        }
    }
}
