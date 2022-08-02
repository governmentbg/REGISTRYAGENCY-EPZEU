using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F006_SubjectOfActivityView : FieldViewBase<F006_SubjectOfActivity>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F006_SubjectOfActivity field)
        {
            if (field.IsBank)
                writer.Write(field.IsBankText);

            if (field.IsInsurer && field.IsBank)
                writer.Write("<br />");

            if (field.IsInsurer)
                writer.Write(field.IsInsurerText);

            if ((!string.IsNullOrEmpty(field.Text) && (field.IsBank || field.IsInsurer)))
                writer.Write("<br />");

            writer.Write(field.Text);
        }
    }
}
