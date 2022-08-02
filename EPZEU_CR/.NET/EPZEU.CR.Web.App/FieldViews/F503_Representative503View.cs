using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F503_Representative503View : FieldViewBase<F503_Representative503>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F503_Representative503 field)
        {
            ObjectHtmlDisplay(writer, field.Person);
        }
    }
}
