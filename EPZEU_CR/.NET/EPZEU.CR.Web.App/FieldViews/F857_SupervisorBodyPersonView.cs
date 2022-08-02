using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F8570_StabilizationSupervisorBodyView : FieldViewBase<F8570_StabilizationSupervisorBody>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F8570_StabilizationSupervisorBody field)
        {
            WrapRecordFieldListForDisplay(writer, field.StabilizationSupervisorBodyPersonList, (w, rf) =>
            {
                if (rf.FirstInstanceText != "0")
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_FIRST_INSTANCE_L").ToUpper());
                    w.Write("</b>");
                }
                else if (rf.SeconfInstanceText != "0")
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_SECOND_INSTANCE_L").ToUpper());
                    w.Write("</b>");
                }
                else if (rf.ThirdInstanceText != "0")
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_THIRD_INSTANCE_L").ToUpper());
                    w.Write("</b>");
                }

                w.Write("<br/>");
                ObjectHtmlDisplay(w, rf.Person);
                w.Write(" ");
                ObjectHtmlDisplay(w, rf.Address);
                w.Write("<br/>");
                ObjectHtmlDisplay(w, rf.Contacts);

                ObjectHtmlDisplay(w, rf.ActData);
            });
        }
    }
}
