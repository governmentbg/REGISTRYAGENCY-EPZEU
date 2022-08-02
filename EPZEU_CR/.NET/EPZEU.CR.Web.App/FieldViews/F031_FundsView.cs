using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F031_FundsView : FieldViewBase<F031_Funds>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F031_Funds field)
        {
            if (field.IsInEuro)
            {
                writer.Write(field.Text);

                if (!string.IsNullOrEmpty(field.Text))
                {
                    writer.Write(" ");
                    writer.Write(LocalizeLabel("CR_GL_EURO_L"));
                }
            }
            else
            {
                writer.Write(field.Text);

                if (!string.IsNullOrEmpty(field.Text))
                {
                    writer.Write(" ");
                    writer.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
                }
            }
        }
    }
}