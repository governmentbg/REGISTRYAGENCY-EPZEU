using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F043_WayOfRepresentation43View : FieldViewBase<F043_WayOfRepresentation43>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F043_WayOfRepresentation43 field)
        {
            if (field.Jointly)
                writer.Write(LocalizeLabel("GL_TOGETHER_L"));

            if (field.Severally)
            {
                if (field.Jointly)
                    writer.Write(" ");
                else
                    writer.Write(LocalizeLabel("GL_SEPARATELY_L"));
            }

            if (field.OtherWay)
            {
                if (field.Jointly || field.Severally)
                    writer.Write(" ");

                writer.Write(LocalizeLabel("GL_OTHER_WAY_L"));
                writer.Write(":<br />");
                writer.Write(field.Text);
            }
        }
    }
} 
