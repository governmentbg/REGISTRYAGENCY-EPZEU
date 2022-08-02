using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F405_InterestsView : FieldViewBase<F405_Interests>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F405_Interests field)
        {
            if(!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(field.Text);
                writer.Write(" %");
            }
        }
    }
}
