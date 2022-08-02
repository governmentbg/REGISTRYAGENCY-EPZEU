using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F031b_MinimumAmountView : FieldViewBase<F031b_MinimumAmount>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F031b_MinimumAmount field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(field.Text);
                writer.Write(" ");

                if (field.IsInEuro)
                    writer.Write(LocalizeLabel("CR_GL_EURO_L"));
                else
                    writer.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
            }
        }
    }
}