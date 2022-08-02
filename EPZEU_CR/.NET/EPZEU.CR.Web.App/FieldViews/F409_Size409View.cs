using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F409_Size409View : FieldViewBase<F409_Size409>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F409_Size409 field)
        {
            ObjectHtmlDisplay(writer, field.Price);
        }
    }
}
