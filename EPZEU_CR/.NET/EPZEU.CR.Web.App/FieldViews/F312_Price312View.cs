using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F312_Price312View : FieldViewBase<F312_Price312>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F312_Price312 field)
        {
            ObjectHtmlDisplay(writer, field.Price);
        }
    }
}
