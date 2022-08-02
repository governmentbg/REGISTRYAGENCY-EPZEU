using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F029_PersonConcernedView : FieldViewBase<F029_PersonConcerned>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F029_PersonConcerned field)
        {
            ObjectHtmlDisplay(writer, field.Subject);
            writer.Write(", ");
            writer.Write(field.Quality);
            writer.Write("<br/>");
            ObjectHtmlDisplay(writer, field.Address);
        }
    }
}