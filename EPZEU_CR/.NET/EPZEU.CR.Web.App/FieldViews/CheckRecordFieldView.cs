using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class CheckRecordFieldView : FieldViewBase<CheckRecordField>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, CheckRecordField field)
        {
            writer.Write(LocalizeLabel(field.Cheked ? "GL_OK_L" : "GL_NO_L"));
        }
    }
}