using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F052a_MainActivityNKIDView : FieldViewBase<F052a_MainActivityNKID>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F052a_MainActivityNKID field)
        {
            if (!string.IsNullOrEmpty(field.CodeNkid)
                && !string.IsNullOrEmpty(field.TextNkid))
            {
                writer.Write(LocalizeLabel("CR_GL_NKID_GROUP_L"));
                writer.Write(": ");
                writer.Write(field.CodeNkid);
                writer.Write("<br />");
                writer.Write(LocalizeLabel("CR_GL_NKID_CLASS_L"));
                writer.Write(": ");
                writer.Write(field.TextNkid);
            }
        }
    }
}
