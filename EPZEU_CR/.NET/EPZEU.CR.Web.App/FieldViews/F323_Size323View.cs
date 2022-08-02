using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F323_Size323View : FieldViewBase<F323_Size323>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F323_Size323 field)
        {
            if (field.Price != null)
            {
                ObjectHtmlDisplay(writer, field.Price);
            }
        }
    }
}
