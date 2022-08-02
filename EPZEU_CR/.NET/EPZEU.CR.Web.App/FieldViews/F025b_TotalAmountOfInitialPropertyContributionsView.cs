using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F025b_TotalAmountOfInitialPropertyContributionsView : FieldViewBase<F025b_TotalAmountOfInitialPropertyContributions>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F025b_TotalAmountOfInitialPropertyContributions field)
        {
            writer.Write(field.Text);
            writer.Write(" ");

            if (!string.IsNullOrEmpty(field.Text))
                writer.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
        }
    }
}