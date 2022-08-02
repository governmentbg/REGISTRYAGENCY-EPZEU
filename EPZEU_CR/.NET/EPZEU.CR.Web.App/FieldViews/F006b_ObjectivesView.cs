using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F006b_ObjectivesView : FieldViewBase<F006b_Objectives>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F006b_Objectives field)
        {
            if (field.IsBFLE)
            {
                if (!string.IsNullOrEmpty(field.Text))
                {
                    writer.Write(LocalizeLabel("CR_GL_FOREIGN_NPO_GOALS_L"));
                    writer.Write(":");
                    writer.Write("<br />");
                    writer.Write(field.Text);
                }

                if (!string.IsNullOrEmpty(field.TextExt))
                {
                    if (!string.IsNullOrEmpty(field.Text))
                        writer.Write("<br />");

                    writer.Write(LocalizeLabel("CR_GL_FOREIGN_NPO_BRANCH_GOALS_L"));
                    writer.Write(":");
                    writer.Write("<br />");
                    writer.Write(field.TextExt);
                }
            }
            else
                writer.Write(field.Text);
        }
    }
}