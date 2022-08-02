using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F006a_SubjectOfActivityNKIDView : FieldViewBase<F006a_SubjectOfActivityNKID>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F006a_SubjectOfActivityNKID field)
        {
            writer.Write(LocalizeLabel("CR_GL_NKID_GROUP_L"));
            writer.Write(": ");
            writer.Write(field.CodeNkid);
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("CR_GL_NKID_CLASS_L"));
            writer.Write(": ");
            writer.Write(field.TextNkid);
        }
    }
}