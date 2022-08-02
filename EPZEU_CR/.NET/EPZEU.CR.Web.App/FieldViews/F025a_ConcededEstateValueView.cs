using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F025a_ConcededEstateValueView : FieldViewBase<F025a_ConcededEstateValue>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F025a_ConcededEstateValue field)
        {
            writer.Write(field.Text);
            writer.Write(" ");

            if (!string.IsNullOrEmpty(field.Text))
                writer.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
        }
    }
}