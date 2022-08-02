using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F032_DepositedFundsView : FieldViewBase<F032_DepositedFunds>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F032_DepositedFunds field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(field.Text);
                writer.Write(" ");

                if (field.IsInEuro)
                    writer.Write(LocalizeLabel("CR_GL_EURO_L"));
                else
                    writer.Write(LocalizeLabel("GL_BGN_L"));
            }
        }
    }
}