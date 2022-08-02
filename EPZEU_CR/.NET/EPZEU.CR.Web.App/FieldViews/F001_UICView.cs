using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F001_UICView : FieldViewBase<F001_UIC>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F001_UIC field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(field.Text);
            }

            if (!string.IsNullOrEmpty(field.BulstatDeed?.Deed)
               || !string.IsNullOrEmpty(field.BulstatDeed?.Year)
               || !string.IsNullOrEmpty(field.BulstatDeed?.CourtCode))
            {
                if (!string.IsNullOrEmpty(field.Text))
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("CR_GL_COMPANY_CASE_L"));
                writer.Write(": ");
                writer.Write(field.BulstatDeed.Deed);
                writer.Write("/");
                writer.Write(field.BulstatDeed.Year);
                writer.Write(" ");
                writer.Write(field.BulstatDeed.CourtCode);
            }
        }
    }
}
