using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F404a_MoratoryRateView : FieldViewBase<F404a_MoratoryRate>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F404a_MoratoryRate field)
        {
            ObjectHtmlDisplay(writer, field.Price);

            if (!string.IsNullOrEmpty(field.Price.Amount) && !string.IsNullOrEmpty(field.DateOfCalculation))
            {
                writer.Write(", ");
            }

            if (!string.IsNullOrEmpty(field.DateOfCalculation))
            {
                writer.Write(LocalizeLabel("CR_APP_CALCULATED_DATE_L").ToLower());
                writer.Write(": ");
                writer.Write(field.DateOfCalculation);
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            }
        }
    }
}
