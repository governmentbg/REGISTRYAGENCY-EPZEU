using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F404_Size404View : FieldViewBase<F404_Size404>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F404_Size404 field)
        {
            ObjectHtmlDisplay(writer, field.Price);
        }
    }
}
