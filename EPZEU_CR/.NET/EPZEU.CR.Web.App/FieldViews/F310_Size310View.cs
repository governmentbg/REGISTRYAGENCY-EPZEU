using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F310_Size310View : FieldViewBase<F310_Size310>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F310_Size310 field)
        {
            ObjectHtmlDisplay(writer, field.Price);
        }
    }
}
