using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F706_NumberApplicationView : FieldViewBase<F706_NumberApplication>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F706_NumberApplication field)
        {
            bool hasIncomingNumber = !string.IsNullOrEmpty(field.IncomingNumber);
            bool hasFromDate = !string.IsNullOrEmpty(field.FromDate);

            if (hasIncomingNumber)
            {
                writer.Write(field.IncomingNumber);
            }

            if(hasFromDate)
            {
                if(hasIncomingNumber) writer.Write(" ");
                writer.Write(LocalizeLabel("CR_APP_FROM_DATE_L").ToLower());
                writer.Write(" ");
                writer.Write(field.FromDate);
            }

            if(!string.IsNullOrEmpty(field.CourtCode))
            {
                if(hasIncomingNumber || hasFromDate)
                {
                    writer.Write(", ");
                }

                writer.Write(LocalizeLabel("GL_COURT_CODE_L"));
                writer.Write(": ");
                writer.Write(field.CourtCode);
            }
        }
    }
}
