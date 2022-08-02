using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F102a_PutUnderParticularSupervisionView : FieldViewBase<F102a_PutUnderParticularSupervision>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F102a_PutUnderParticularSupervision field)
        {
            writer.Write(LocalizeLabel("GL_TERM_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.Date));
            writer.Write(" ");
            writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("GL_CONDITITIONS_L"));
            writer.Write(": ");
            writer.Write(HttpUtility.HtmlEncode(field.Conditions));
        }
    }
}
